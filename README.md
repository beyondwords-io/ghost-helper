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

## Segments Playback

```html
<script async defer src="https://proxy.beyondwords.io/npm/@beyondwords/ghost-helper@latest/dist/umd.js"
  onload="new BeyondWords.GhostHelper({
    projectId: <ID>,
    assignMarkersEnabled: true,
    contentTarget: '.c-content'
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

Copyright (c) 2023 Lstn Ltd (trading as BeyondWords). All rights reserved.

This repository and its contents, including but not limited to source code, documentation, and assets, are the sole property of BeyondWords and are protected by applicable copyright, trademark, and other intellectual property laws.

You are granted permission to use the player embed, SDK and the provided NPM package for your projects. No part of this repository may be otherwise reproduced, distributed, modified, or transmitted in any form or by any means, electronic or mechanical, without the prior written permission of BeyondWords, except for the purpose of submitting pull requests and contributing to the project.

Contributions in the form of pull requests are welcome; however, BeyondWords reserves the right to review, approve, or reject any modifications to the code.

For inquiries and permission requests, please contact support@beyondwords.io.
