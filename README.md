# CREST V2 README

React 18 + Vite 7. Node 22 or newer.

## Deployments

| Branch | Site | Infrastructure |
| --- | --- | --- |
| `development` | https://crest.nemac.org | S3 `crest.nemac.org` + CloudFront `E1WM3CCMHRFQOS` |
| `master` | https://resilientcoasts.org | S3 `crest-v2` + CloudFront `EC6NN4OQJPSC3` |

Pushing to a branch above builds the site and syncs it to its S3 bucket via GitHub Actions
(`.github/workflows/`). The development deploy also invalidates its CloudFront cache.

## Local development

```
npm install --legacy-peer-deps
npm start
```
