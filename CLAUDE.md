# cloudless-gr

Next.js (App Router) marketing + e-commerce site for cloudless.gr. Deployed to
AWS Amplify Hosting — static assets via S3/CloudFront, API routes via Lambda.

## Commands

- `pnpm dev` — dev server
- `pnpm test` — Vitest suite
- `pnpm tsc --noEmit` — type check
- `pnpm eslint .` — lint
- `pnpm next build` — production build

## Continuous Integration

CI/CD runs via GitHub Actions in `.github/workflows/`. All workflows use
`runs-on: self-hosted` because the GitHub account has been billing-locked,
which disables GitHub-hosted runners (jobs otherwise fail immediately with
"account is locked due to a billing issue").

To run CI, a self-hosted runner must be registered to the repo:

    scripts/setup-runner.sh <TOKEN>

`<TOKEN>` is a runner registration token, or a GitHub PAT with repository
"Administration" permission (the script exchanges a PAT for a registration
token via the API). The token itself must be generated manually in the GitHub
UI — Settings -> Actions -> Runners -> New self-hosted runner. GitHub provides
no API to create PATs or registration tokens unattended; that step cannot be
automated.

If the billing lock is cleared, revert the workflows to `runs-on: ubuntu-latest`
so GitHub-hosted runners are used again.

## Security

Never commit tokens, PATs, AWS keys, or other secrets to this repository,
including to this file.
