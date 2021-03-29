# Un-official testing plugin for Strapi (POC)

## Installation

1. Install dependecy:

```
yarn add strapi-plugin-testing
```

2. To generate all the necesary files run `yarn develop` to lunch Strapi, and check if `__tests__` folder has been created
3. Add test command in `package.json`:

```
"test": "NODE_ENV=test jest --config ./__tests__/__config__/jest.config.js --testEnvironment=node --forceExit --detectOpenHandles",
```
