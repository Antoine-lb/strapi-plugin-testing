const Strapi = require("strapi");
const http = require("http");
const fs = require("fs-extra");
const { createEndpoints } = require("./src/createEndpoints.js");

const testDBfilePath = process.env.PWD + "/__tests__/__config__/database.js";
const originalDBfilePath = process.env.PWD + "/config/database.js";
const originalDBfilePath_tmp = process.env.PWD + "/config/database_original.js";

let instance;

async function putTestDB() {
  const exists = await fs.pathExists(originalDBfilePath);

  if (exists) {
    try {
      await fs.copy(originalDBfilePath, originalDBfilePath_tmp);
    } catch (err) {
      console.error(err);
    }
  }
  try {
    await fs.copy(testDBfilePath, originalDBfilePath);
  } catch (err) {
    console.error(err);
  }
}

async function putOriginalDB() {
  const exists = await fs.pathExists(originalDBfilePath_tmp);

  if (exists) {
    try {
      await fs.copy(originalDBfilePath_tmp, originalDBfilePath);
    } catch (err) {
      console.error(err);
    }
    try {
      await fs.remove(originalDBfilePath_tmp);
    } catch (err) {
      console.error(err);
    }
  }
}

async function startStrapi() {
  if (!instance) {
    await putTestDB();

    /** the following code in copied from `./node_modules/strapi/lib/Strapi.js` */
    await Strapi().load();
    instance = strapi; // strapi is global now
    await instance.app
      .use(instance.router.routes()) // populate KOA routes
      .use(instance.router.allowedMethods()); // populate KOA methods

    instance.server = http.createServer(instance.app.callback());
  }
  return instance;
}

async function setupStrapi() {
  /** this code is called once before any test is called */
  beforeAll(async (done) => {
    jest.setTimeout(50000);
    await startStrapi(); // singleton so it can be called many times
    done();
  });

  /** this code is called once before all the tested are finished */
  afterAll(async (done) => {
    const dbSettings = strapi.config.get(
      "database.connections.default.settings"
    );

    //delete test database after all tests
    if (dbSettings && dbSettings.filename) {
      await putOriginalDB();

      const tmpDbFile = `${__dirname}/../../${dbSettings.filename}`; // THIS WILL HAVE TO CHANGE
      if (fs.existsSync(tmpDbFile)) {
        fs.unlinkSync(tmpDbFile);
      }
    }

    done();
  });
}

module.exports = { setupStrapi, createEndpoints };
