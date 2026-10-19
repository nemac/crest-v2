# CREST V2 README

## Getting started

Everything needed to run, test and lint the site and the backend on a Mac. Each part is
independent: the site alone needs only step 1 and 2.

1. **Tools.** Node 22 or newer (`.nvmrc`; `nvm use`), Python 3.13 and GDAL (`brew install node@22 python@3.13 gdal`).
   For backend deploys only: the AWS CLI and SAM CLI (`brew install awscli aws-sam-cli`). For
   tiling only: `brew install pmtiles` (see `tiling/README.md`).
2. **Site.**
   ```bash
   npm ci                # exact versions from package-lock.json
   npm run dev           # http://localhost:8080 with the refreshed North Atlantic data (dev channel)
   npm start             # same, with production data
   npm run check         # Prettier, ESLint and the vitest suite; CI runs the same command
   npm run build         # production build into dist/
   ```
3. **Point the site at the dev backend (optional).** Without this it calls the production API.
   `cp .env.example .env.local`, then fill the four URLs from
   `aws cloudformation describe-stacks --stack-name crest-api-dev --query "Stacks[0].Outputs"`.
4. **Backend** (`lambda_functions/`, details in its README).
   ```bash
   cd lambda_functions
   python3.13 -m venv .venv
   .venv/bin/pip install -r requirements-dev.txt -r requirements-tools.txt   # hash-locked
   .venv/bin/python -m pytest -q
   make lint PYTHON=.venv/bin/python                                       # ruff
   ```
   To add or bump a Python package, edit the matching `requirements*.in`, then
   `.venv/bin/pip install pip-tools && make lock PYTHON=.venv/bin/python`.
5. **Editor.** ESLint 9 reads `eslint.config.js` (flat config). In WebStorm set Settings → ESLint
   to Automatic so it picks that file up, and enable Prettier on save.

## Overview

React 18 + Vite 7. Node 22 or newer. Maps render with MapLibre GL 6 through
`@vis.gl/react-maplibre`; tiles are plain raster sources (legacy `{z}/{x}/{y}.png` folders) or
PMTiles archives through the `pmtiles://` protocol registered in `src/main.jsx`. Basemaps are
ArcGIS Basemap Styles v2 with the AGOL key. Drawing uses terra-draw.

Stored map state (`mapProperties.zoom`, region configs, share links) keeps Leaflet's zoom
convention; `src/utility/viewState.js` converts to MapLibre's, which is one level lower.

## Deployments

| Branch    | Site                        | Infrastructure                                     |
| --------- | --------------------------- | -------------------------------------------------- |
| `develop` | https://crest.nemac.org     | S3 `crest.nemac.org` + CloudFront `E1WM3CCMHRFQOS` |
| `master`  | https://resilientcoasts.org | S3 `crest-v2` + CloudFront `EC6NN4OQJPSC3`         |

Pushing to a branch above builds the site and syncs it to its S3 bucket via GitHub Actions
(`.github/workflows/`). The development deploy also invalidates its CloudFront cache.

## Data channels

The development site builds with `VITE_CREST_DATA_CHANNEL=dev`, which swaps the North Atlantic
region's data to the refreshed layers served as PMTiles from
`tiles.resilientcoasts.org/dev/conus/` and enables the analysis tools for that region
against the dev backend. Production builds never set it. To see the dev data locally:

```
VITE_CREST_DATA_CHANNEL=dev npm start
```

Backend URLs for local runs come from `.env.local` (Getting started, step 3).
