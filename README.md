# BeyondWords Player Ghost helper

[![Build](https://github.com/beyondwords-io/ghost-helper/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/beyondwords-io/ghost-helper/actions/workflows/build.yml)
[![npm version](https://badge.fury.io/js/@beyondwords%2Fghost-helper.svg)](https://badge.fury.io/js/@beyondwords%2Fghost-helper)

Helper script for easier integration of the [BeyondWords Player](https://github.com/BeyondWords-io/player) with [Ghosts](https://ghost.org)

# Documentation

1. [Getting started guide](https://docs.beyondwords.io/docs-and-guides/integrations/ghost)
2. [Ghost docs](https://ghost.org/integrations/beyondwords/)

# Development

To work on the project you must have installed:

- [Node.js](https://nodejs.org/en/download) 16 or higher

- npm 8 or higher

- Install NPM dependencies:

    ```
    npm install
    ```

## Build

The `build` script will produce artifacts in the `/dist` directory, using [Vite](https://vitejs.dev/)

The build artifact is a single js file using the umd format.

```
npm run build
```

## Lint

The `lint` script does a full static analysis of the source code, using [ESLint](https://eslint.org/)

```
npm run lint
```

## Release

A new version of the Ghost helper will be published automatically to [NPM](https://www.npmjs.com/package/@beyondwords/ghost-helper) using the [release Github Actions workflow](.github/workflows/release.yml) on each new published Github release.

## License

BeyondWords Player Ghost helper is [MIT licensed](LICENSE).
