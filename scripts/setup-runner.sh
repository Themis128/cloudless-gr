#!/usr/bin/env bash
#
# setup-runner.sh — configure and start a self-hosted GitHub Actions runner
# for this repository.
#
# Use this when GitHub-hosted runners are unavailable (e.g. the GitHub account
# is billing-locked) and the workflows run on `runs-on: self-hosted`.
#
# Usage:
#   scripts/setup-runner.sh <TOKEN>
#
# <TOKEN> may be either:
#   * a runner registration token — short-lived, generated in the GitHub UI at
#     Settings -> Actions -> Runners -> New self-hosted runner; or
#   * a GitHub PAT (ghp_... / github_pat_...) with repository
#     "Administration: read & write" permission — this script then exchanges
#     it for a registration token via the GitHub API.
#
# NOTE: A PAT or registration token CANNOT be created via API. Generating one
# is, by GitHub's design, a manual action in the web UI. This script automates
# everything *after* that point.
#
set -euo pipefail

REPO="${GH_REPO:-Themis128/cloudless-gr}"
# Runner lives as a sibling of the repository checkout by default.
RUNNER_DIR="${RUNNER_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)/actions-runner}"
RUNNER_NAME="${RUNNER_NAME:-cc-runner}"
RUNNER_LABELS="${RUNNER_LABELS:-self-hosted}"
API="https://api.github.com"

TOKEN="${1:-}"
if [ -z "$TOKEN" ]; then
  cat <<EOF
Usage: $0 <TOKEN>

  <TOKEN> = a runner registration token, OR a GitHub PAT with repository
            "Administration: read & write" permission.

  Generate a registration token here:
    https://github.com/${REPO}/settings/actions/runners/new
EOF
  exit 1
fi

# Resolve a registration token from whatever was supplied.
case "$TOKEN" in
  ghp_*|github_pat_*|gho_*|ghs_*|ghu_*)
    echo "Input looks like a GitHub PAT — minting a registration token via the API..."
    response="$(curl -fsS -X POST \
      -H "Authorization: Bearer ${TOKEN}" \
      -H "Accept: application/vnd.github+json" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      "${API}/repos/${REPO}/actions/runners/registration-token")"
    reg_token="$(printf '%s' "$response" | grep -oP '"token":\s*"\K[^"]+' || true)"
    if [ -z "$reg_token" ]; then
      echo "ERROR: failed to mint a registration token." >&2
      echo "       The PAT needs repository 'Administration: read & write'." >&2
      exit 1
    fi
    ;;
  *)
    echo "Input treated as a runner registration token."
    reg_token="$TOKEN"
    ;;
esac

# Ensure the runner binary is present; download the latest if missing.
if [ ! -x "${RUNNER_DIR}/config.sh" ]; then
  echo "Runner not found at ${RUNNER_DIR} — downloading latest release..."
  mkdir -p "$RUNNER_DIR"
  ver="$(curl -fsS "${API}/repos/actions/runner/releases/latest" \
         | grep -oP '"tag_name":\s*"v\K[^"]+')"
  curl -fsSL -o "${RUNNER_DIR}/runner.tar.gz" \
    "https://github.com/actions/runner/releases/download/v${ver}/actions-runner-linux-x64-${ver}.tar.gz"
  tar xzf "${RUNNER_DIR}/runner.tar.gz" -C "$RUNNER_DIR"
fi

cd "$RUNNER_DIR"

echo "Configuring runner '${RUNNER_NAME}' for ${REPO} (labels: ${RUNNER_LABELS})..."
./config.sh \
  --url "https://github.com/${REPO}" \
  --token "$reg_token" \
  --name "$RUNNER_NAME" \
  --labels "$RUNNER_LABELS" \
  --unattended --replace

echo "Runner configured. Starting (Ctrl-C to stop)..."
exec ./run.sh
