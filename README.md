# Testing plugin for Strapi
This community plugin automates all the steps in the [unit test page of the documentation](https://strapi.io/documentation/developer-docs/latest/guides/unit-testing.html).

It will also automatically replaces the `database.js` when the tests are running so the production/develop database config does not need to be shared with testing database config.

## Installation

1. Install dependecy:

```
yarn add strapi-plugin-testing
```

2. To generate all the necesary files lunch Strapi by running `yarn develop`, and check if `__tests__` folder has been created

3. Add test command in `package.json`:

```
"test": "NODE_ENV=test jest --config ./__tests__/__config__/jest.config.js --forceExit --detectOpenHandles",
```

## How to use

`Jest` will execute all the files inside of `/__tests__/` that end in `.test.js`. Every `.test.js` file will be it's own instance of Strapi with it's own database, wich can add a lot of loading time (~10 seconds) before the tests start running.

To avoid re-creating a new Strapi instance for every test, a `.js` file can be manually added to a `.test.js` file with `require(...)`. In this case they will share the same instance and database so the order at which the tests run can have an impact on the result.

## Configuration
Inside of `/__tests__/__config__/` are all the files realted to configuration.

- `/__config__/database.js` will be the database used for the tests
- `/__config__/jest.config.js` is the jest configuration

## Trouble shooting
- Delete `.tmp` folder and try again. If that fixes the issue maybe the database is not being deleted properly or is not running the proper database configuration.

## Exmaples

Check [this gist](https://gist.github.com/Antoine-lb/d5c104ef4a2e8835a59186f826255d60)
