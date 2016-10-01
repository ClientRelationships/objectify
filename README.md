# objectify

Serialise and deserialise JavaScript objects in TypeScript.

This is an example of my "best practice" JavaScript in 2016 using TypeScript/UglifyJS to build, mocha/chai to test and npm scripts.

## Install
    npm install jadaradix/objectify --save

## Use

`package.json` defines the entry point via `main` as `dist/index.js` so you can use this module natively via a CommonJS loader:

    const objectify = require("objectify");

## Build
    npm run build

This will output minified ES5 to the `dist` directory.

## Test
    npm test