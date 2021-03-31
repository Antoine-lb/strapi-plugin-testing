# Un-official testing plugin for Strapi (POC)

## Installation

1. Install dependecy:

```
yarn add strapi-plugin-testing
```

2. To generate all the necesary files run `yarn develop` to lunch Strapi, and check if `__tests__` folder has been created
3. Add test command in `package.json`:

```
"test": "NODE_ENV=test jest --config ./__tests__/__config__/jest.config.js --forceExit --detectOpenHandles",
```

## How to use

`Jest` will execute all the files inside of `/__tests__/` that end in `.test.js`. Every `.test.js` file will be it's own instance of Strapi with it's own database, wich can add a lot of loading time (~10 seconds) before the tests start running.

To avoid re-creating a new Strapi instance for every test, a `.js` file can be manually added to a `.test.js` file with `require(...)`. In this case they will share the same instance and database so the order at which the tests run can have an impact on the result.

## How to mock

Check [this gist](https://github.com/Antoine-lb/strapi-plugin-testing)
