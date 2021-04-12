const { startStrapi } = require("./startStrapi");
const fs = require("fs-extra");

const startStrapiJest = async (callBack) => {
  /** this code is called once before any test is called */
  beforeAll(async (done) => {
    jest.setTimeout(50000);
    await startStrapi(callBack); // singleton so it can be called many times
    done();
  });

  /** this code is called once before all the tested are finished */
  afterAll(async (done) => {
    const dbSettings = strapi.config.get(
      "database.connections.default.settings"
    );

    //delete test database after all tests
    if (dbSettings && dbSettings.filename) {
      // await putOriginalDB();
      const tmpDbFile = `${process.env.PWD}/${dbSettings.filename}`;
      if (fs.existsSync(tmpDbFile)) {
        fs.unlinkSync(tmpDbFile);
      }
    }

    done();
  });
};

module.exports = { startStrapiJest };
