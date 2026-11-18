# Contributing to Streaming Elements

Thanks for your interest. This project is maintained by one person, so reviews are best-effort
(see [SUPPORT.md](SUPPORT.md)).

## Setup

There is nothing to install. The repository has no `package.json`, build step or test runner.
The code is plain ES modules, so serve the repository root with any static file server and open
`index.html` in a browser. Opening it from a `file://` URL will not work.

## Conventions

- Plain JavaScript ES modules under `src/`, with private class fields (`#field`) as used in the
  existing classes.
- Keep animation sequences and parameters in `src/configHandler.js`.
- Commit messages are short descriptive summaries; there is no enforced format.

## Verifying a change

There are no automated checks. Before opening a PR, serve the page, exercise the demo items and
confirm the browser console is clean. `test/test.js` is a demo script, not a test suite, and does
not currently run.

## Pull requests

- Branch off `main`; keep PRs focused.
- Describe the change and how you verified it. The PR template prompts for this.
