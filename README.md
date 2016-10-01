# objectify

Serialise and deserialise JavaScript objects.

This is an example of my "best practice" JavaScript in 2016 using TypeScript/UglifyJS to build, mocha/chai to test and npm scripts.

## Install
```
npm install jadaradix/objectify --save
```

## Use

`package.json` defines the entry point (`main`) as `dist/index.js` so you can load this module natively through CommonJS:

```js
const objectify = require("objectify");
```

`test/index.js` demonstrates this module.

## Build
```
npm run build
```

This will output minified ES5 to the `dist` directory.

## Test
```
npm test
```
