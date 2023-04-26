# BeyondWords Ghost Helper

[![Build](https://github.com/beyondwords-io/ghost-helper/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/beyondwords-io/ghost-helper/actions/workflows/build.yml)
[![npm version](https://badge.fury.io/js/@beyondwords%2Fghost-helper.svg)](https://badge.fury.io/js/@beyondwords%2Fghost-helper)

The Ghost Helper aims to make the integration with [Ghosts](https://ghost.org) easier by placing the [BeyondWords Player](https://github.com/beyondwords-io/player) in the right place for your theme and by selecting the correct content based on the page URL.

# Documentation

1. [Getting started guide](https://docs.beyondwords.io/docs-and-guides/integrations/ghost)
2. [Ghost docs](https://ghost.org/integrations/beyondwords/)

# Examples

## Basic

```html
<script async defer src="https://proxy.beyondwords.io/npm/@beyondwords/ghost-helper@latest/dist/umd.js"
  onload="new BeyondWords.GhostHelper({
    projectId: <ID>
  })">
</script>
```

## Custom position

```html
<script async defer src="https://proxy.beyondwords.io/npm/@beyondwords/ghost-helper@latest/dist/umd.js"
  onload="new BeyondWords.GhostHelper({
    projectId: <ID>,
    target: '.custom-target',
  })">
</script>
```

## Custom styles

```html
<style>
    #beyondwords-player {
        margin: 16px 0;
    }
</style>
<script async defer src="https://proxy.beyondwords.io/npm/@beyondwords/ghost-helper@latest/dist/umd.js"
  onload="new BeyondWords.GhostHelper({
    projectId: <ID>
  })">
</script>
```

## Player reference

```js
const helper = new BeyondWords.GhostHelper({
  projectId: <ID>
});
await helper.playerLoader;
helper.player.addEventListener("<any>", console.log);
```

## Other

For further customization you can refer to the [BeyondWords Player](https://github.com/beyondwords-io/player) documentation as the arguments of the GhostHelper constructor matches the BeyondWords Player constructor.

# Development

## Prerequisites

To work on the project you must have installed:

- [Node.js](https://nodejs.org/en/download) 16 or higher

- npm 8 or higher

- npm dependencies:

    ```
    npm install
    ```

## Build

The `build` script will produce artifacts in the `/dist` directory, using [Vite](https://vitejs.dev/).

The build artifact is a single js file using the umd format.

```
npm run build
```

## Lint

The `lint` script does a full static analysis of the source code, using [ESLint](https://eslint.org/).

```
npm run lint
```

## Release

A new version of the Ghost Helper will be published automatically to [NPM](https://www.npmjs.com/package/@beyondwords/ghost-helper) using the [release Github Actions workflow](.github/workflows/release.yml) on each new published Github release.

## License

BeyondWords Ghost Helper is [MIT licensed](LICENSE).
