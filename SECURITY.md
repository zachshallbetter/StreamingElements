# Security Policy

## Reporting a vulnerability

If you find a security issue in Streaming Elements, please report it privately rather than opening a public
issue. Use GitHub private vulnerability reporting:
<https://github.com/zachshallbetter/StreamingElements/security/advisories/new>

Include a description of the issue and its impact, steps to reproduce (a minimal example is
ideal), and the affected commit or version.

This project has a solo maintainer. Handling is best-effort with no SLA: there is no guaranteed
response time, and fixes are prioritized by severity as time allows.

## Scope

Streaming Elements is a client-side JavaScript animation helper with no runtime dependencies. It
does not handle authentication, network requests, or persistent storage. The relevant surface is
the DOM: it applies CSS classes to elements the host page passes in. Reports about unsafe handling
of that input are in scope.

## Supported versions

Only the latest commit on `main` receives fixes. The repository has one tag, `v0.1.0`, and no backports.
