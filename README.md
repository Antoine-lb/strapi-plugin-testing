# Testing plugin for Strapi (Beta)

This community plugin automates all the steps in the [unit test page of the documentation](https://strapi.io/documentation/developer-docs/latest/guides/unit-testing.html) by creating all the default files needed.

> Compatible with Strapi ^3.5.4

## Installation

1. Install dependecy:

```bash
yarn add strapi-plugin-testing
```

2. Run the project to generate all the files needed(check if `__tests__` folder has been created after running)

```bash
yarn develop
```

3. Add test command in `package.json`:

```json
"test": "jest --forceExit --detectOpenHandles",
```

4. Run the tests

```bash
yarn test
```

## How to use

`Jest` will execute all the files inside of `/__tests__/` that end in `.test.js`. Every `.test.js` file will be it's own instance of Strapi with it's own database, wich can add a lot of loading time (~10 seconds) before the tests start running.

To avoid re-creating a new Strapi instance for every test, `.js` files can be manually added to a `.test.js` file with `require(...)`. In this case they will share the same instance and database.

Warning: If multiple tests share the same instance, the order at which the tests run can have an impact on the result.

## File Structure

```cpp
/__tests__/
  index.test.js

/config/
  /env/
    /test/
      database.js // database config used in tests

jest.config.js

```

## Helper Functions

### startStrapi

```txt
async startStrapi([callback])
```

Starts a new Strapi instance and returns it. Build with singleton pattern so it can be called multiple times without re-creating a new strapi instance.

Will pass the new Strapi instance as a parameter to the callback.

[Check startStrapi's code for more details](https://github.com/Antoine-lb/strapi-plugin-testing/blob/main/src/startStrapi.js)

### startStrapiJest

```txt
async startStrapiJest([callback])
```

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

### createStrapiSuperAdmin

```txt
async createStrapiSuperAdmin(strapiInstance [, email, password, username, firstname, lastname, blocked, isActive, displayLogs])
```

Creates a new Strapi Super Admin. A super admin is the user which can connect to the Strapi back-office, not the one the `users` table. Check the code for the default values.

[Check createStrapiSuperAdmin's code for more details](https://github.com/Antoine-lb/strapi-plugin-testing/blob/main/src/createStrapiSuperAdmin.js)

Examples:

```javascript
const {
  startStrapiJest,
  createStrapiSuperAdmin,
} = require("strapi-plugin-testing");

startStrapiJest();

describe("Global setup", () => {
  it("strapi is defined", async (done) => {
    await createStrapiSuperAdmin(strapi);
    await createStrapiSuperAdmin(strapi, "second-admin@test.com", "password");
    expect(strapi).toBeDefined();
    done();
  });
});
```

### activatePrivileges

```txt
async activatePrivileges(strapiInstance, roleId [, [...actions]])
```

Sets the privileges of `roleId` to true. If third argument omitted; sets all actions in `roleId` to true. Check the code for the default values.

[Check activatePrivileges's code for more details](https://github.com/Antoine-lb/strapi-plugin-testing/blob/main/src/activatePrivileges.js)

Examples:

```javascript
const {
  activatePrivileges,
  getAuthenticatedRole,
} = require("strapi-plugin-testing");

const authenticatedRole = await getAuthenticatedRole(strapiInstance);

await activatePrivileges(strapiInstance, "order", authenticatedRole.id);
await activatePrivileges(
  strapiInstance,
  "product-category",
  authenticatedRole.id,
  ["count"]
);
await activatePrivileges(strapiInstance, "product", authenticatedRole.id, [
  "count",
  "delete",
  "find",
]);
```

### getAuthenticatedRole

```txt
async getAuthenticatedRole(strapiInstance)
```

[Check getAuthenticatedRole's code for more details](https://github.com/Antoine-lb/strapi-plugin-testing/blob/main/src/getAuthenticatedRole.js)

Examples:

```javascript
const { getAuthenticatedRole } = require("strapi-plugin-testing");

const authenticatedRole = await getAuthenticatedRole(strapiInstance);
console.log("authenticatedRole.id", authenticatedRole.id);
```

### getPublicRole

```txt
async getPublicRole(strapiInstance)
```

[Check getPublicRole's code for more details](https://github.com/Antoine-lb/strapi-plugin-testing/blob/main/src/getPublicRole.js)

Examples:

```javascript
const { getPublicRole } = require("strapi-plugin-testing");

const publicRole = await getPublicRole(strapiInstance);
console.log("publicRole.id", publicRole.id);
```

## Other Use Cases

### Test Watch

Test watch so any time a file changes, tests will re-run

```json
    "testwatch": "jest --watchAll --forceExit --detectOpenHandles",
```

### Bootstrap your project with dummy data

Use `config/functions/bootstrap.js` or run the mock functions in development environment so all the mocked data stays in the database.

```javascript
const {
  setupStrapi,
  createStrapiSuperAdmin,
  activatePrivileges,
  getPublicRole,
  getAuthenticatedRole,
} = require("strapi-plugin-testing");

const populatteDatabase = async () => {
  const strapiInstance = await setupStrapi();

  await createStrapiSuperAdmin(strapiInstance, "admin@test.com", "password");

  const authenticatedRole = await getAuthenticatedRole(strapiInstance);
  const publicRole = await getPublicRole(strapiInstance);

  await activatePrivileges(strapiInstance, "products", authenticatedRole.id); // full privilege
  await activatePrivileges(strapiInstance, "products", publicRole.id, [
    "count",
    "find",
    "findOne",
  ]);
  // ...
};
```

## Trouble shooting

- Delete `.tmp` folder and try again. If that fixes the issue maybe the database is not being deleted properly or is not running the proper database configuration.

- May not work properly in Windows machines ([check offitial doc for more information](https://strapi.io/documentation/developer-docs/latest/guides/unit-testing.html))

- Feel free to create an issue in this repo

## Work in progress

The plugin is in Beta, any feedback is welcome.

Possible functionalities for this plugin:

- Automatically creat test files for the each api endpoint

- Test coverage configured for Strapi so only the custom code is accounted for

- Pre-commit test run

- Easy setup for Github Actions
