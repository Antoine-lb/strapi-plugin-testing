const Strapi = require("strapi");
const http = require("http");
const fs = require("fs-extra");
const { log } = require("./initStrapiPluginTesting");

const {
  testDBfilePath,
  originalDBfilePath,
  originalDBfilePath_tmp,
} = require("./paths.js");

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
    // check if production database is in right place
    let tmp_db_exists;
    try {
      tmp_db_exists = await fs.pathExists(originalDBfilePath_tmp);
    } catch (err) {
      console.error(err);
    }
    if (tmp_db_exists) {
      log("database_original.js exists, it will replace database.js");
      await putOriginalDB();
    }

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
      const tmpDbFile = `${process.env.PWD}/${dbSettings.filename}`;
      if (fs.existsSync(tmpDbFile)) {
        fs.unlinkSync(tmpDbFile);
      }
    }

    done();
  });
}

module.exports = { setupStrapi, putOriginalDB };
