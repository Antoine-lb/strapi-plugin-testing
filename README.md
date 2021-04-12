# Testing plugin for Strapi (Beta)

This community plugin automates all the steps in the [unit test page of the documentation](https://strapi.io/documentation/developer-docs/latest/guides/unit-testing.html) by creating all the default files needed.

## Installation

1. Install dependecy:

```
yarn add strapi-plugin-testing
```

2. To generate all the necesary files lunch Strapi by running `yarn develop`, and check if `__tests__` folder has been created

3. Add test command in `package.json`:

```
"test": "jest --forceExit --detectOpenHandles",
```

## How to use

`Jest` will execute all the files inside of `/__tests__/` that end in `.test.js`. Every `.test.js` file will be it's own instance of Strapi with it's own database, wich can add a lot of loading time (~10 seconds) before the tests start running.

To avoid re-creating a new Strapi instance for every test, `.js` files can be manually added to a `.test.js` file with `require(...)`. In this case they will share the same instance and database.

Warning: If multiple tests share the same instace, the order at which the tests run can have an impact on the result.

## File Structure

```cpp
/__tests__/
  /user/
    user.js // sample tests to check authentication
  index.test.js // is a .test.js so it creates it's own environment

/config/
  /env/
    /test/
      database.js // database config used in tests

jest.config.js // jest config

```

## More Configuration

Test watch so any time a file changes, tests will re-run

```
    "testwatch": "jest --watchAll --forceExit --detectOpenHandles",
```

## Trouble shooting

- Delete `.tmp` folder and try again. If that fixes the issue maybe the database is not being deleted properly or is not running the proper database configuration.

- May not work properly in Windows machines ([check offitial doc for more information](https://strapi.io/documentation/developer-docs/latest/guides/unit-testing.html))

- Feel free to create an issue in this repo

## Helper Functions

### startStrapi

`startStrapi([callback])`

Starts a new Strapi instance and returns it. Build with singleton pattern so it can be called multiple times without re-creating a new strapi instance.

[Check startStrapi's code for more details](https://github.com/Antoine-lb/strapi-plugin-testing/blob/main/src/startStrapi.js)

### startStrapiJest

`startStrapiJest([callback])`

Starts a new Strapi instance before every test (with singleton pattern) and deletes the database and the end of every test. The Strapi instance will be globally available under the variable name `strapi`. The optional callback will be called at the end with the new Strapi instance.

[Check startStrapiJest's code for more details](https://github.com/Antoine-lb/strapi-plugin-testing/blob/main/src/startStrapiJest.js)

Examples:

```javascript

function populateDatabase(strapiInstance) {
  await strapiInstance.services.restaurant.create({
    name: "Pizza",
  });
}

// creates instance and populates data
startStrapiJest(async (strapiInstance) => {
  await mockApplicationData(strapiInstance); // optional parameter
});

describe("Global setup", () => {
  it("strapi is defined", async (done) => {
    expect(strapi).toBeDefined(); // strapi globally available
    done();
  });
});
```
