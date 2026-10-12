# CREST v2 backlog

Everything that is known to be outstanding, in one tracked file. Update it in the same PR that
closes an item. Planning documents (specs, plans, the execution ledger) are local and gitignored;
this file is the durable list.

Last updated: 2026-10-12, with PR #175 (backend migration) open against `develop`.

## 1. Now: finish the backend migration (PR #175)

- [ ] Merge PR #175 after the check passes; the dev workflow then redeploys crest.nemac.org from
      `develop` and reads the backend URLs from the `crest-api-dev` stack.
- [ ] Test on crest.nemac.org: identify, sketch, shapefile upload, place search, **share link round
      trip** (writes under `dev/` in the share bucket now), CSV export, sort.
- [ ] Decide: legacy chart range text now reads "1-10" instead of "0-10" (0 is the no-data class).
      Accept, or revert in `getRange` in `src/components/AnalyzeArea/ChartFunctions.jsx`, before
      `develop` goes to `master`.
- [ ] Optional: Land Cover map layer for North Atlantic, tiled from
      `CREST_TIFS/landcover/CONUS_NAtl_Land_Cover_CCAP_2021.tif` (plan task 12: tile-source copy with
      NoData 0, `land_cover` entry in `tiling/layers.json`, 25-class palette, dev config entry).

## 2. Backend follow-ups (`lambda_functions/`)

Deploy automation
- [ ] GitHub Actions workflow `deploy-backend-development.yml`: push to `develop` filtered to
      `lambda_functions/**` plus `workflow_dispatch`; OIDC role `crest-api-github-actions-dev` with
      trust `repo:nemac/crest-v2:environment:develop`; steps pytest, `sam build`, `sam deploy
      --config-env dev`. Needs the role, a GitHub environment, and `gdal-bin` on the runner for the
      tests. Until then the backend deploys by hand: `PYTHON=.venv/bin/python sam build &&
      AWS_PROFILE=jbliss sam deploy --config-env dev`.
- [ ] Mirror workflow for `master` and prod, armed only at cutover (section 5).
- [ ] Python tests in `pr.yml` (needs the GDAL CLI on the runner).

Hardening
- [ ] `ReservedConcurrentExecutions` on zonal_stats: it is a public, unauthenticated 2048 MB / 120 s
      URL; a cap is cheap cost insurance.
- [ ] Log-group retention (`LoggingConfig` plus `AWS::Logs::LogGroup`, e.g. 90 days) for all five
      functions; today the groups are created implicitly and never expire.
- [ ] Validation gaps that still return 500 instead of 400: non-object feature or geometry,
      malformed Polygon coordinates. Share keys accept DEL and C1 control characters (harmless for
      S3).
- [ ] Tests for the per-request JSON log line (it is the usage metric), the 413 path, and the logged
      traceback on 500; `botocore.stub.Stubber` instead of the hand-written FakeS3.
- [ ] `src/config.py`: cache `load_config()` at module scope; guard an empty YAML file.
- [ ] `src/rasters.py`: `MAX_VALID = 100` is global; a per-dataset `max_valid` in `config.yml` if a
      layer ever needs values above 100. `np.bincount` is unguarded for negative class codes.
- [ ] `tools/build_vrt.py`: check pixel size across bands (do this **before the next CONUS
      sub-region**; mixed resolutions would produce a silently misaligned VRT); clearer errors when
      `gdalbuildvrt` fails; `--vsi` assumes a trailing slash.
- [ ] `lib/libexpat.so.1` is a vendored binary (expat 2.8.3, Amazon Linux 2023) that will not
      auto-update: watch for expat CVEs and refresh it from the AL2023 package.
- [ ] Identify returns NoData as the stringified raw value (`"255"`, `"0"`); returning `null` needs
      a matching frontend change.
- [ ] CORS is one global GET+POST setting on every function URL; could be one method each.

Tooling
- [ ] Hubs and boundary batch script: `tools/prep_hubs.py` and `tools/hubs_config.py` are carried
      over unchanged and currently broken (they import the removed `util` module and pass a bool
      where `get_response` now takes a config). Plan: one script `prep_zonal_stats.py --region R
      --boundary hubs|states|counties|huc8 [--id-field] [--keep]`, statistic fields derived from
      `config.yml`, GeoJSON output by default. Open question: does the ArcGIS Online upload need a
      shapefile or accept GeoJSON? The original hubs configuration is in the old repo's history at
      commit `8474977^` of `nfwf_crest_api`; the boundary variant is the current file.
- [ ] `tools/download_rasters.py` also imports the removed `util`.
- [ ] `tools/parity_check.py`: run it after any change to `src/rasters.py`
      (`--base <prod zonal URL> --candidate <dev zonal URL>`).

## 3. Frontend backlog

From the backend migration
- [ ] North Atlantic land cover pie never shows a "No Data" slice (the C-CAP keys are
      `lc_background` and `lc_unclassified`; the legend expects `lc_no_data`).
- [ ] `analyzeArea.sortBy` is kept across region changes, so a legacy sort key can carry into
      North Atlantic where no button matches it (harmless, sorts by an absent key).
- [ ] `continental_us_dev.test.js` reads `lambda_functions/src/config.yml` relative to the working
      directory; `new URL(..., import.meta.url)` would not depend on where vitest runs.
- [ ] Share links are not channel-tagged: a link made on the dev site carries `CONUS_dev_*` layer ids
      and `pmtiles://` URLs and would render dev tiles if opened on production.
- [ ] `continental_us_dev.js` is evaluated in production bundles; a palette-name typo would throw at
      load (tests guard it).

Carried from the MapLibre migration and the dev CONUS config (September 2026)
- [ ] Rebuild tiles as lossless WebP with the next TIF delivery (250 MB vs 468 MB PNG measured on
      Resilience Opportunities; one flag in the tiler; about 15 minutes plus a 2.6 GB re-upload).
- [ ] Production workflow: add CloudFront invalidation for `EC6NN4OQJPSC3`, drop the vestigial
      `git config` and token lines, add `workflow_dispatch`.
- [ ] Branch protection for `master` and `develop`.
- [ ] Analyze card keeps its 250 px height and its help popup still describes hidden tools on dev
      CONUS.
- [ ] Single-class palettes still show "Low / High"; a categorical legend layout (needed for a
      25-class land cover legend; the current layout puts every swatch in one row).
- [ ] `SearchCustom` has no stale-response guard (the geocoder does); sketch outline clears before
      stats return; after a basemap swap terra-draw layers stack under drawn areas until the next
      change.
- [ ] Dead exports `currentRegionKey` and `ANALYSIS_DISABLED_MESSAGE`; `DrawTools.jsx` keeps a
      file-wide exhaustive-deps disable inherited from the Leaflet version.
- [ ] Older audit leftovers: `ResiliencePieChart.jsx` JSX conditional, `analyzeAreaSlice`
      `chartSortAsc` case mismatch, `NavBar.jsx` comparison, favicon 404, shared nav-items array,
      dead pages and dependencies.
- [ ] Returning dev-site users keep old CONUS drawn areas as empty chart cards ("Clear" fixes it).
- [ ] Deep links on both sites return the app shell with HTTP 404 (S3 website error-document
      pattern).
- [ ] Optional experiment: MapLibre `color-relief` for browser-side categorical restyling.

## 4. Data

- [ ] Still missing from NFWF (asked Jessica Orlando): Freshwater Fish Species (probably a
      duplicate of Fish Species), Land Cover as a delivered layer, AIANNH Areas, Department of
      Defense Lands. Tsunami is intentionally absent for North Atlantic.
- [ ] Other CONUS regions: each repeats the tiling pipeline (`tiling/layers.json`, palettes,
      `node tiling/build.js`, upload with go-ahead), the COG conversion, an S3 prefix per region,
      `regions`/`datasets` entries in `config.yml`, `tools/build_vrt.py --region <key>`, and a
      region config in `src/configuration/regions/`. Land cover for each is the same C-CAP 2021
      source clipped to that region's boundary on its grid.
- [ ] The dev ArcGIS key (`AGOL_DEV_KEY` secret) expires about September 2027; referrer-restricted
      to crest.nemac.org and localhost.
- [ ] `s3://nfwf-tool`: `nfwf_download_data/` (96 GB) and `natureserve/` (6 GB) are 2018 to 2023
      leftovers and most of the storage bill.

## 5. Production cutover (pinned until the team decides)

Preconditions: dev tested; every CONUS region public (the rule for merging `master`); prod stack
name decided (deleting v1 frees `crest-api-prod`; `samconfig.toml` has an unarmed `[prod]` section).

1. Create the prod OIDC role and GitHub environment; delete the v1 `crest-api-prod` stack if the
   name is reused.
2. Merge `develop` into `master`; the backend workflow deploys the prod stack; the production
   workflow reads its outputs; `SHARE_PREFIX` is empty in prod so existing share links resolve;
   remove the prod-v2 fallbacks from `src/configuration/config.js` in the same merge.
3. Verify resilientcoasts.org: identify, sketch, upload, search, share round trip.
4. Retire, in order: stacks `crest-api-prod-v2`, `crest-api-beta`, `crest-api-prod` (v1),
   `nfwf-tool-api`, `nfwf-tool-api-dev`, `nfwf-tool-api-natureserve`, `nfwf-tool-api-natureserve-dev`
   and their `*serverlessdeploymentbucket*` buckets; API Gateway custom domain
   `api.resilientcoasts.org` with its `beta`, `prod`, `prod-v2` mappings, the Route53 A record, and
   the ACM certificate; CloudFront `E2VQLKHSBSW35B` and the `resilientcoasts.org` S3 bucket (the v1
   site, confirmed retirable 2026-09-16); the dead REST APIs `dm3kiccxv2`, `lg0njzoglg`,
   `ktj0thaws0`, `w9nr8na6tb`. Archive `nemac/nfwf_crest_api` on GitHub.
5. Move the frontend deploys from the `crest-v2-user` access key to OIDC roles as well.

## Reference

- Backend: `lambda_functions/README.md`. Dev stack `crest-api-dev` (us-east-1); function URLs are
  the stack outputs (`aws cloudformation describe-stacks --stack-name crest-api-dev`).
- Rasters: `s3://nfwf-tool/north-atlantic/` (23 COGs plus C-CAP land cover); legacy regions under
  their own prefixes; tiles at `https://tiles.resilientcoasts.org/dev/conus/`.
- Local data (gitignored): `CREST_TIFS/` originals, `CREST_TIFS/cog/`, `CREST_TIFS/landcover/`,
  `regional_boundary/`.
