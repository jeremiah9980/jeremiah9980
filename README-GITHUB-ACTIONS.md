# Automated portfolio image pipeline

This repo can use a GitHub Actions workflow to:

1. Read source PDFs from `source-diagrams/`
2. Render selected pages to PNG files in `assets/infra/`
3. Commit the generated images back to the repo
4. Publish the updated GitHub Pages site automatically

Expected source files:
- `source-diagrams/CMTX201 Network Map.pdf`
- `source-diagrams/Harbor Health.pdf`
- `source-diagrams/EC_WORKFLOW.pdf`
- `source-diagrams/mfa print environment.pdf`
- `source-diagrams/CMM Support.pdf`

Expected output files:
- `assets/infra/cmtx-multisite.png`
- `assets/infra/cmtx-datacenter.png`
- `assets/infra/access-control.png`
- `assets/infra/harbor-health-sites.png`
- `assets/infra/harbor-clinic-standard.png`
- `assets/infra/ec-workflow.png`
- `assets/infra/mfa-print-workflow.png`
- `assets/infra/cmm-support-cloud.png`

The workflow uses `pdftoppm` to render PNG images from specific pages.
