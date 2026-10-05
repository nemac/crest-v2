# CREST API

The Lambda backend for CREST: identify, zonal statistics, shape upload, and share links.
It lives in this repository so the API deploys from the same branch as the site that calls it.
The history of the former `nemac/nfwf_crest_api` repository is preserved under this folder.

## Layout

- `src/` the five Lambda handlers, shared modules, `config.yml`, and the region VRTs in `src/vrt/`
- `tests/` pytest suite with synthetic rasters built in a temp directory
- `tools/` offline utilities: VRT builder, COG conversion, raster download, hubs batch script
- `template.yaml`, `samconfig.toml`, `Makefile` AWS SAM deployment

Sections on local setup, tests, data preparation, VRTs, and deployment are filled in as the
migration lands (see `docs/superpowers/specs/2026-09-17-backend-migration-sam-design.md`).
