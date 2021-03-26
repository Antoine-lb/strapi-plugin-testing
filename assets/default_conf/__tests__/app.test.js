const fs = require("fs");
const request = require("supertest");
const { setupStrapi } = require("./helpers/strapi");

/** this code is called once before any test is called */
beforeAll(async (done) => {
  jest.setTimeout(50000);
  await setupStrapi(); // singleton so it can be called many times
  done();
});

const testDBfilePath = process.env.PWD + "/tests__config/database.js";
const originalDBfilePath = process.env.PWD + "/config/database.js";
const originalDBfilePath_tmp = process.env.PWD + "/config/database_original.js";

/** this code is called once before all the tested are finished */
afterAll(async (done) => {
  const dbSettings = strapi.config.get("database.connections.default.settings");

  //delete test database after all tests
  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = `${__dirname}/../${dbSettings.filename}`;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }

  fs.copy(originalDBfilePath_tmp, originalDBfilePath, (err) => {
    if (err) return console.error(err);
    console.log("moved test db to config");
  });
  done();
});

it("strapi is defined", async (done) => {
  expect(strapi).toBeDefined();
  done();
});

require("./user");
