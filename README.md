# CREST V2 README

React 18 + Vite 7. Node 22 or newer. Maps render with MapLibre GL 6 through
`@vis.gl/react-maplibre`; tiles are plain raster sources (legacy `{z}/{x}/{y}.png` folders) or
PMTiles archives through the `pmtiles://` protocol registered in `src/main.jsx`. Basemaps are
ArcGIS Basemap Styles v2 with the AGOL key. Drawing uses terra-draw.

Stored map state (`mapProperties.zoom`, region configs, share links) keeps Leaflet's zoom
convention; `src/utility/viewState.js` converts to MapLibre's, which is one level lower.

## Deployments

| Branch        | Site                        | Infrastructure                                     |
| ------------- | --------------------------- | -------------------------------------------------- |
| `development` | https://crest.nemac.org     | S3 `crest.nemac.org` + CloudFront `E1WM3CCMHRFQOS` |
| `master`      | https://resilientcoasts.org | S3 `crest-v2` + CloudFront `EC6NN4OQJPSC3`         |

Pushing to a branch above builds the site and syncs it to its S3 bucket via GitHub Actions
(`.github/workflows/`). The development deploy also invalidates its CloudFront cache.

## Local development

```
npm install --legacy-peer-deps
npm start
```

The development site builds with `VITE_CREST_DATA_CHANNEL=dev`, which swaps the North Atlantic
region's data to the refreshed layers served as PMTiles from
`tiles.resilientcoasts.org/dev/conus/` and enables the analysis tools for that region
against the dev backend. Production builds never set it. To see the dev data locally:

```
VITE_CREST_DATA_CHANNEL=dev npm start
```

To point the app at the dev backend, copy `.env.example` to `.env.local`, fill the five URLs from
`aws cloudformation describe-stacks --stack-name crest-api-dev --query "Stacks[0].Outputs"`, and run
`npm run dev`; without them the app calls the production API.
