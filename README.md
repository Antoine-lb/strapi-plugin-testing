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
"test": "NODE_ENV=test jest --forceExit --detectOpenHandles",
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

## Helper Functions

### startStrapiJest

- `startStrapiJest([callback])`: Starts a new Strapi instance before every test (with singleton pattern) and makes the instance globally available with the variable name `strapi`. The optional callback will be called at the end with the new Strapi instance.

Examples:

```javascript

function populateDatabase(strapiInstance) {
  await strapiInstance.services.restaurant.create({
    name: "Pizza",
  });
}

// creates instance and populates data
startStrapiJest(async (strapiInstance) => {
  await mockApplicationData(strapiInstance);
});

describe("Global setup", () => {
  it("strapi is defined", async (done) => {
    expect(strapi).toBeDefined(); // strapi globally available
    done();
  });
});
```

## More Configuration

Test watch so any time tests will re-run

```
    "testwatch": "NODE_ENV=test jest --watchAll --forceExit --detectOpenHandles",
```

Mock data: by not running tests in the test environment, all the mocked data done in the tests will be stored in the actual database (don't run in production). Which can make onboarding easier.

```
    "mock": "jest --forceExit --detectOpenHandles",
```

## Trouble shooting

- Delete `.tmp` folder and try again. If that fixes the issue maybe the database is not being deleted properly or is not running the proper database configuration.

## Examples

Check [this gist](https://gist.github.com/Antoine-lb/d5c104ef4a2e8835a59186f826255d60)
