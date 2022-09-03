# Vercel Rollback

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

CLI to rollback Vercel deployments

## Install

```bash
npm install vercel-rollback
```

## Usage

```ts
import 'vercel-rollback';
```

## Development Status

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) for versioning.
Any time the major version changes, there may be breaking changes. If it is working well for you, consider
pegging to the current major version, e.g. `vercel-rollback@v1`, to avoid breaking changes. Alternatively,
you can always point to the most recent stable release with the `vercel-rollback@latest`.

## Developing

Clone the repo and then run `npm install` to set up the pre-commit hooks.

Run `npm run dev` to start the development server, and `npm run build` to create a production build
of the library.

The library files are stored in `src`, while the files for the development page are in `dev-src`.

## Author

Created by Nick DeRobertis. MIT License.

[build-img]:https://github.com/nickderobertis/vercel-rollback/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/nickderobertis/vercel-rollback/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/vercel-rollback
[downloads-url]:https://www.npmtrends.com/vercel-rollback
[npm-img]:https://img.shields.io/npm/v/vercel-rollback
[npm-url]:https://www.npmjs.com/package/vercel-rollback
[issues-img]:https://img.shields.io/github/issues/nickderobertis/vercel-rollback
[issues-url]:https://github.com/nickderobertis/vercel-rollback/issues
[codecov-img]:https://codecov.io/gh/nickderobertis/vercel-rollback/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/nickderobertis/vercel-rollback
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
