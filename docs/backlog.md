# CREST v2 backlog

Everything that is known to be outstanding, in one tracked file. Update it in the same PR that
closes an item. Planning documents (specs, plans, the execution ledger) are local and gitignored;
this file is the durable list.
Findings reviewed and deliberately accepted (for example the React Router `npm audit` advisories)
are recorded in `docs/accepted-risks.md`, not here.

Last updated: 2026-10-19, audit follow-ups and CI and deploy hardening added to section 3; share-link 404 check in section 1 verified against the dev API.

## 1. Now: finish the backend migration (PR #175)

- [ ] Merge PR #175 after the check passes; the dev workflow then redeploys crest.nemac.org from
      `develop` and reads the backend URLs from the `crest-api-dev` stack.
- [ ] Test on crest.nemac.org: identify, sketch, shapefile upload, place search, **share link round
      trip** (writes under `dev/` in the share bucket now), CSV export, sort.
- [x] After the `audit-fixes` backend deployed to dev (2026-10-19, from `audit-fixes` at f5f682db),
      a request for a well-formed share id that was never written answered **404** with
      "share link not found", so the `s3:prefix` condition on the read role's `s3:ListBucket` does
      not block the 404 check. Still to confirm in the browser on crest.nemac.org after the merge:
      open `https://crest.nemac.org/AnalyzeProjectSites?shareUrl=00000000-0000-4000-8000-000000000000_2026-Oct-19`,
      click Proceed, and expect a "Share Link Error" dialog ending in "share link not found".
- [ ] Decide: legacy chart range text now reads "1-10" instead of "0-10" (0 is the no-data class).
      Accept, or revert in `getRange` in `src/components/AnalyzeArea/ChartFunctions.jsx`, before
      `develop` goes to `master`.
- [ ] Optional: Land Cover map layer for North Atlantic, tiled from
      `CREST_TIFS/landcover/CONUS_NAtl_Land_Cover_CCAP_2021.tif` (plan task 12: tile-source copy with
      NoData 0, `land_cover` entry in `tiling/layers.json`, 25-class palette, dev config entry).

## 1b. Feedback from Jessica Orlando on the North Atlantic dev site (October 2026)

Proposed order: items 5 to 7 together (no-data handling), then 2, 1, 4, 3.

- [x] **1. Threats chart x-axis labels overlap** (done 2026-10-12: font shrinks and long words hyphenate) ("Impermeability" runs into "Landslide
      Susceptibility"): eight bars now share the width that held seven, and single long words cannot
      wrap. Proposed: a tick renderer that shrinks the font and allows a hyphen break when a label
      is wider than its slot; alternatively shorter `chartLabel` values for the chart only.
- [x] **2. Negative Vertical Land Motion mean is invisible** (done 2026-10-12: drawn below the baseline in the uplift green, VLM only) in the Threats chart: the bar is drawn at
      zero height (the tooltip shows -1.00). Options: draw the bar below the Low baseline in the
      uplift green, or draw a short green bar labelled "Uplift". Needs a decision; see questions.
- [x] **3. C-CAP land cover as a map overlay** (done 2026-10-12 as a 24th tiled layer with the vertical 24-class legend; tiles uploaded to `dev/conus/land_cover.pmtiles` 2026-10-12, 206 ranges verified) (was plan task 12, optional; now requested): tile the
      clipped C-CAP raster, add a `land_cover` palette and a Land Cover layer under a Visual
      Overlays group in the dev config. Depends on a categorical legend layout: 25 classes do not
      fit the one-row ramp legend.
- [x] **4. "Explore Resilience Hubs" tab** removed from the nav and the Home page for every region
      (done 2026-10-12; the `/ResilienceProject` route still answers a direct URL and the About page
      still mentions the tab, both left for the content pass). Later it may return under a new name as a pixel-value tool. Also give
      the identify "i" button a visible hover tooltip ("Identify a location" exists only as an
      aria-label) and reconsider its icon.
- [x] **5. Keep input columns when a polygon has no data** (done 2026-10-12) for them (e.g. no assets in Area 3 leaves
      the Community Assets chart empty): render every configured column with its label and a
      zero-height bar or "No data" marker instead of dropping it. For legacy regions keep dropping
      keys the region does not have at all; only `"NaN"` values get the empty column.
- [x] **6. Identify shows 255 where an index has no data** (done 2026-10-12: identify returns "NaN"): the backend returns the raw NoData value
      stringified and the popup draws a full-height bar with tooltip "255.00". Backend: identify
      returns `"NaN"` for a band's NoData (like off-raster); frontend: render the column as
      "No data" per item 5. One-line change in `lambda_functions/src/identify.py` plus a test.
- [x] **7. Polygon stats with no data** (done 2026-10-12 with item 5) correctly omit the 255 bar; with item 5 the column stays
      visible with a "No data" marker instead of disappearing.

## 2. Backend follow-ups (`lambda_functions/`)

Deploy automation
- [ ] GitHub Actions workflow `deploy-backend-development.yml`: push to `develop` filtered to
      `lambda_functions/**` plus `workflow_dispatch`; OIDC role `crest-api-github-actions-dev` with
      trust `repo:nemac/crest-v2:environment:develop`; steps pytest, `sam build`, `sam deploy
      --config-env dev`. Needs the role, a GitHub environment, and `gdal-bin` on the runner for the
      tests. Until then the backend deploys by hand: `PYTHON=.venv/bin/python sam build &&
      AWS_PROFILE=jbliss sam deploy --config-env dev`.
- [ ] Mirror workflow for `master` and prod, armed only at cutover (section 5).
- [x] Python tests in `pr.yml` (done 2026-10-13: `backend-tests` job on `ubuntu-24.04` with `gdal-bin`, Python 3.13, `requirements-dev.txt` and `requirements-tools.txt`).

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
- [ ] CORS is one global GET+POST setting on every function URL; could be one method each.
- [ ] Per-feature 413 in zonal_stats. `polygon_mask` raises `ValidationError(..., 413)` when one
      polygon's window exceeds `MAX_WINDOW_PIXELS` (50 M), and `get_response` loops over the features
      without catching it, so one oversized shape fails a whole upload of up to 50. Catch it per
      feature, mark that feature (for example `properties.error = "area too large to analyze"` and no
      `mean`), and return 200 for the rest; the frontend then adds the areas that worked and names
      the ones that did not (today `analysisErrors.js` shows one "Area Too Large" message for the
      batch). Tests: a batch with one oversized and one normal polygon returns both, only the normal
      one with statistics; a batch where every polygon is oversized still answers clearly.
- [ ] Decide whether to empty or delete `s3://nfwf-tool-user-shapes`. The `upload_shape` Lambda that
      wrote to it (anyone could store up to 6 MB of public-read JSON) was removed from this repo on
      2026-10-19 and leaves AWS with the next `crest-api-dev` deploy. The older stacks retired in
      section 5 (`crest-api-prod-v2`, `crest-api-beta`, `crest-api-prod`) may still have their own
      upload function writing there, so decide after they are gone: list the object count and size
      (`aws s3 ls s3://nfwf-tool-user-shapes --recursive --summarize`), confirm nothing reads the
      bucket, then either empty it or delete it (and its bucket policy).

Tooling
- [ ] Hubs and boundary batch script: `tools/prep_hubs.py` and `tools/hubs_config.py` import the
      new modules again and take `--config` instead of `--local` (fixed 2026-10-13, with
      `requirements-tools.txt` for fiona and pyproj), but have not been run end to end against a
      boundary shapefile since the migration. Plan: one script `prep_zonal_stats.py --region R
      --boundary hubs|states|counties|huc8 [--id-field] [--keep]`, statistic fields derived from
      `config.yml`, GeoJSON output by default. Open question: does the ArcGIS Online upload need a
      shapefile or accept GeoJSON? The original hubs configuration is in this repo's history at
      `ca6f0a8d^` (`git show ca6f0a8d^:lambda_functions/hubs_config.py`); the boundary variant is the
      current file.
      Found by a one-feature smoke run on 2026-10-13 (zonal stats succeed; the write step needed the
      fiona 1.10 fixes now in place), still open for the rewrite:
      - Land cover columns are truncated by the shapefile driver: the schema names them
        `landcover_open_water` and so on, over the 10-character limit, so the output gets
        `landcover_`, `landcove_1` ... `landcove19`, and a resumed run (append mode) then reads those
        truncated names back as the schema. Short names or GeoJSON output.
      - The API returns land cover as `lc_open_water` while the schema and `field_maps` expect
        `landcover_open_water`, so every land cover value is dropped from the output rows.
      - `hubs_config.py` has no `north_atlantic` entry, and `continental_us` is configured for state
        boundaries (`STATEFP`), not hubs; the hubs variant is the commented-out `TARGET_FID` block.
- [x] `tools/download_rasters.py` imports the removed `util` (fixed 2026-10-13; covered by `tests/test_tools.py`).
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
- [x] Dead exports `currentRegionKey` and `ANALYSIS_DISABLED_MESSAGE` (removed 2026-10-19 with
      `setupStore`, `uploadShapeEndpoint` and `s3ShapeFileBucket`).
- [ ] `DrawTools.jsx` keeps a file-wide exhaustive-deps disable inherited from the Leaflet version.
- [ ] Older audit leftovers: `ResiliencePieChart.jsx` JSX conditional, `analyzeAreaSlice`
      `chartSortAsc` case mismatch, `NavBar.jsx` comparison, favicon 404, shared nav-items array,
      dead pages and dependencies.
- [ ] Returning dev-site users keep old CONUS drawn areas as empty chart cards ("Clear" fixes it).
- [ ] Deep links on both sites return the app shell with HTTP 404 (S3 website error-document
      pattern).
- [ ] Optional experiment: MapLibre `color-relief` for browser-side categorical restyling.

Audit follow-ups, each its own branch and PR into `develop` (audit 2026-10-19)
- [ ] **MultiPolygon shapefiles.** Uploads with multipart shapes (islands) fail as "Something wrong
      with zipfile" because `utilityFunctions.js` calls `turf.polygon()` on MultiPolygon coordinates.
      Use `turf.area(feature)` and `turf.coordAll(feature).length` in `validPolygon`; merge the array
      shpjs returns for zips with several `.shp` files into one FeatureCollection; reject points and
      lines with a clear message; on the correction screen (terra-draw edits Polygons only) split
      invalid MultiPolygons with `turf.flatten` and recombine them after editing. Map display and the
      backend already accept MultiPolygon. Tests for each case.
- [ ] **One bar chart component.** `AnalyzeBarChart.jsx` and `IdentifyBarChart.jsx` are about 70%
      identical: a `useBarChartData` hook plus one `IndexBarChart` with an optional `onSelect` and a
      title slot. Also fixes a bug: the Identify popup renders `IdentifyBarChart` without
      `setChartLabel`/`setChartDescription`/`setChartDescriptionFor`, so clicking a bar there throws
      a TypeError (`IdentifyBarChart.jsx:132`). In the same PR:
      - The one nested ternary in each file, `noData ? null : raw === 0 ? 0.000000000001 : raw`
        (`AnalyzeBarChart.jsx` ~210, `IdentifyBarChart.jsx` ~92), becomes a shared helper such as
        `toBarValue(raw, noData)` (no data is `null`; a real 0 becomes a tiny positive value so its
        bar still draws), and both file-wide `/* eslint-disable no-nested-ternary */` lines go.
      - `EditName` (inside `AnalyzeBarChart.jsx`) moves to its own file and its rename input
        becomes controlled (`value={inputValue}` instead of `defaultValue`). The "hacky but so what"
        line in `handleInputBlur` (`e.target.value = title`) exists only because the input is
        uncontrolled, so it goes away; blur then just resets the state.
- [ ] **One ActionButton.** Merge `All/ActionButton`, `Example/ExampleActionButton`,
      `Map/ShapeActionButton` and `AnalyzeArea/ChartHeaderActionButton` into one component with
      `layout` (stacked, icon first, icon last), `dense` and `disabled` props; delete the other three.
- [ ] **Active tab from the URL.** `navBar.activeTab` is always the first path segment, so derive it
      with `useLocation` instead of storing it in Redux; delete `changeActiveTab` and its seven
      dispatches, and move the GA `change_tab` event (now in `src/analyticsListeners.js`) into a NavBar
      effect on the path. Fixes stale highlights (Home's link to `/Examples` never dispatches;
      `NavBar.jsx` compares an object to a string). Plain `<Link component={RouterLink}>` after that.
- [ ] **Dialog helpers instead of `setErrorState`.** Every dialog copies whatever fields the
      previous one left (`setErrorState((previous) => ({ ...previous, ... }))`). After Clear →
      Dismiss, the next plain error (for example "Sketch an Area Error") shows the Clear dialog's
      Proceed button, which runs `localStorage.clear()` and reloads; `errorType: "warning"` leaks the
      same way. Plan:
      - `App.jsx` owns `DEFAULT_DIALOG` (every field the dialog reads: `error`, `errorType`,
        `errorTitle`, `errorMessage`, `errorButtonText`, `acceptButtonText: null`, `errorClose`,
        `acceptButtonClose`) and a pure `buildDialogState(options)` that always starts from it.
      - Provide `showDialog(options)` and `closeDialog()` through a small `DialogContext` with a
        `useDialog()` hook instead of threading `setErrorState` through props (today it passes
        through `ResilienceProject`, `AnalyzeProjectSites`, `MapActionCard` and into `DrawTools`,
        `UploadShapeFile`, `ResilienceMapCard`, `AnalyzeProjectSitesMapCard`).
      - Convert the 12 call sites: `DrawTools.jsx` (2), `UploadShapeFile.jsx` (5, including the
        `correctionDialog` builder and the long-processing chain, which must call `showDialog` for
        the second dialog instead of restoring a saved snapshot), `ResilienceMapCard.jsx` (1),
        `AnalyzeProjectSitesMapCard.jsx` (1, Clear), `AnalyzeProjectSites.jsx` (3, share warning,
        share error and share problem).
      - Tests: `buildDialogState` unit tests (no field from a previous dialog survives; `errorType`
        and the accept button reset; defaults fill missing fields), plus an ESLint
        `no-restricted-syntax` rule that forbids `setErrorState` outside `App.jsx` so new code must
        use the helpers. Browser check: Clear → Dismiss → sketch an oversized area shows only Dismiss.
- [ ] **Stable `areaId` for drawn areas** (also fixes punctuation in area names). Area names act as
      identities today, so duplicates (searching the same place twice, renaming to an existing
      "Area N", clicking an example's "View on map" again) break React keys, renames hit the first
      match, hover and "More" state are shared, and image export picks the wrong chart; a name with
      punctuation (`St. Mary's`) makes `querySelector` throw on every mouse move. Plan:
      - Assign `properties.areaId` (`uuid` is already a dependency) where areas are created:
        `DrawTools` `processGeojson` (sketch, upload, search circle), `SearchCustom`, and the
        examples (fixed ids, and do not re-add an example that is already on the map). Keep
        `areaName` as the label only; trim names and reject empty ones on rename.
      - Migration `migrateAreaIds` added to `migrateSavedState` (`src/stateMigrations.js`), so saved
        and shared state both pass through it: assign ids to areas without one and re-key
        `analyzeArea.isMore` from name to id. Old share files in S3 cannot change, so they get new ids
        each time they load; ids only need to be stable within a session.
      - Switch every identity use to `areaId`: React keys (`AnalyzeProjectSitesChartsHolder.jsx`,
        `DrawnAreas.jsx`, `AnalyzeProjectSitesTableData.jsx`); `changeAreaName({ areaId,
        newAreaName })` and `changeMore(areaId)`; DOM ids in `ChartCard`/`AnalyzeBarChart`/
        `IdentifyBarChart` and the image export's `getElementById`; hover state and the MapLibre
        `["get", "areaName"]` paint expressions (`DrawnAreas.jsx`, `drawnAreaData.js`).
      - Punctuation: ids become `box-${areaId}` (hex and hyphens only), looked up with
        `getElementById`; delete `escapeSelector` and the duplicated `slug` logic.
      - Tests: migration (ids assigned, `isMore` re-keyed, running it twice changes nothing, two
        areas with the same name get different ids); reducers (rename and remove by id with
        duplicate names present); creation helpers assign ids; a name with `. ' # ( ) ,` survives
        the id helpers. Browser check: two areas with the same name, rename one, hover both, export
        an image of each.
- [ ] **Old CONUS share links after the regional split.** Production (`master`) still labels the
      legacy all-coasts CONUS region "Atlantic, Gulf of America, and Pacific Coasts" (shares older than
      March 2025 say "Gulf of Mexico"). `develop` relabelled that same legacy config "North Atlantic"
      on 2026-09-22 (`f0601401`) only as a placeholder: the dev site, on the dev data channel, already
      shows the real North Atlantic. The cutover rule in section 5 keeps `develop` off `master` until
      every CONUS region is public, so production never saves "North Atlantic" for all of CONUS, and
      the two legacy names alone mark pre-split state (no state version needed). Plan, at the split:
      - Stop mapping the two legacy CONUS names to "North Atlantic" in `legacyRegionKeys`
        (`src/configuration/regionAliases.js`); that alias is right only while the placeholder exists.
        Route those names to a per-area migration in `migrateSavedState` instead.
      - Ship simplified boundaries of North Atlantic, South Atlantic, Gulf and Pacific with the
        frontend and assign each legacy area to the region containing its centroid
        (`turf.booleanPointInPolygon`), falling back to the nearest region for areas just offshore.
        Select the region of the saved map center, or of the most areas.
      - Drop each migrated area's legacy statistics (legacy rasters, different keys) and re-request
        zonal statistics for its new region, one request per region.
      - Legacy layer ids in `mapLayerList` are already dropped by `migrateMapLayerList`.
      - Local `npm start` without the dev channel still shows the legacy config as "North Atlantic";
        state saved that way exists only on developer machines (Reset saved state clears it).
      - Tests: fixture shares under both legacy names with areas in each of the four regions, an
        offshore area, an area spanning two regions (centroid wins), a share with no areas, and a
        dev-site "North Atlantic" share passing through unchanged.
- [ ] **Zonal statistics always for the area's own region.** The request reads the region selected
      when it is sent (`DrawTools.jsx`, `region: mapConfig.regions[selectedRegion].regionName`), so a
      region change while it runs re-sends it against the new region's rasters (the Change Region
      button is now disabled while a request is pending, which covers the menu but not the cause).
      - Build the request from the area's own region: every new area already stores
        `properties.region`; keep it in `currentDrawn` (set at the sketch, upload and place-search
        call sites) and use `mapConfig.regions[currentDrawn.region].regionName` in the query args, so
        changing region cannot change a request already made.
      - Ignore results that belong to replaced state: keep a counter that increases when a share link
        loads or Clear / Remove All runs, store its value with each request, and drop a result whose
        value no longer matches instead of adding the area to the new state.
      - Keep the backend check: a polygon outside the region's rasters comes back as all `NaN` and
        DrawTools already shows "outside the specified region"; zonal_stats also rejects an unknown
        region (400) and an oversized window (413).
      - Tests: a pure helper that builds the query args from `currentDrawn` (region change after the
        request does not change the args); the stale-result check (result dropped after a share load,
        kept otherwise); browser check: start an analysis, switch region via a share link, confirm the
        area is not added.
- [ ] **ESLint 10.** ESLint 9.39 is the newest version this config can use, and npm already marks 9
      as no longer supported. Blocked by `eslint-plugin-react` and `eslint-plugin-react-redux`
      (peer ESLint up to 9.7) and `eslint-plugin-import` (up to 9). When `eslint-plugin-react`
      supports 10: switch `eslint-plugin-import` to `eslint-plugin-import-x` (supports 10), drop or
      replace `eslint-plugin-react-redux` (its rules mostly target `connect()`, which this codebase
      does not use), move `eslint-plugin-react-hooks` to 7.x, and keep `eslint.airbnb-rules.js` as is.
- [ ] **Nested ternaries and oversized components.** The five files with a file-wide
      `no-nested-ternary` disable each have exactly one violation (`IdentifyBarChart`,
      `AnalyzeBarChart`, `ResilienceLeftColumn`, `AnalyzeProjectSitesLeftColumn`,
      `ShapeFileCorrectionMap`): replace each with a named boolean or small helper and drop the
      disable. Then split the large components one per PR: `ChartCard` (455 lines) into a description
      hook, indicator and summary sections and one `ExportMenu`; `ShapeFileCorrectionMap` into a
      `StepNavigator` (written out twice today), a status header and an edit-tools panel.

CI and deploy hardening (audit 2026-10-19)
- [ ] Deploy workflows configure AWS credentials before `npm install`, so every dependency's install
      script runs with the AWS keys (and `AGOL_DEV_KEY` in dev). Install and build first, then
      configure credentials only for describe-stacks, sync and invalidation.
- [ ] Use `npm ci` instead of `npm install --legacy-peer-deps` in all three workflows so the lockfile
      is enforced. Checked 2026-10-19: a strict `npm ci` (no flag) now installs cleanly.
- [ ] Add `permissions: contents: read` to every workflow; today `GITHUB_TOKEN` gets the repo default.
- [ ] Pin actions to full commit SHAs (tag in a trailing comment); `configure-aws-credentials` receives
      the long-lived keys.
- [ ] Add a `concurrency:` group to each deploy workflow so two `s3 sync --delete` runs cannot overlap.
- [ ] `pr.yml` `branches: "*"` does not match base branches containing `/`.

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

Note for the cutover: since PR #178, saved and shared state keeps only layer ids and opacity
(`{ [layerId]: { opacity } }`). The new code migrates the old format on load, but the old code cannot
read the new one: anything still running the old bundle after the deploy shows the layers in a
new-format share link as checked but draws none of them (no crash; a reload on the new bundle fixes
it). The likely cause is a cached old `index.html`, and the production workflow does not invalidate
CloudFront yet (section 3), so add that invalidation before or with the cutover deploy, then open one
share link made after the deploy in a fresh browser to confirm layers draw.

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
   `ktj0thaws0`, `w9nr8na6tb`; SNS topics `Crest_Upload_Shape_File` and
   `Crest_Upload_Shapefile_Response` (granted to the old API, never published to). Archive
   `nemac/nfwf_crest_api` on GitHub after closing its two open issues and eleven dependabot PRs and
   removing its Travis webhook (audit 2026-10-13: every branch except the 2019 `natureserve`
   prototype is in this repo's history; nothing else to carry over).
5. Move the frontend deploys from the `crest-v2-user` access key to OIDC roles as well.

## Reference

- Backend: `lambda_functions/README.md`. Dev stack `crest-api-dev` (us-east-1); function URLs are
  the stack outputs (`aws cloudformation describe-stacks --stack-name crest-api-dev`).
- Rasters: `s3://nfwf-tool/north-atlantic/` (23 COGs plus C-CAP land cover); legacy regions under
  their own prefixes; tiles at `https://tiles.resilientcoasts.org/dev/conus/`.
- Local data (gitignored): `CREST_TIFS/` originals, `CREST_TIFS/cog/`, `CREST_TIFS/landcover/`,
  `regional_boundary/`.
