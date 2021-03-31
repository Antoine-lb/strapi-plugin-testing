const fs = require("fs-extra");

const {
  testFolderPath,
  pluginFolderPath,
  originalDBfilePath_tmp,
} = require("./paths.js");
const { putOriginalDB } = require("./setupStrapi.js");
// const { createEndpoints } = require("./createEndpoints.js");

function log(str) {
  console.log("🧪 [strapi-plugin-testing]: " + str);
}

function log_err(str) {
  console.error("🧪 [strapi-plugin-testing]: " + str);
}

const initStrapiPluginTesting = async (strapiInstance = undefined) => {
  // check if __tests__ folder exists
  let exists;
  try {
    exists = await fs.pathExists(testFolderPath);
  } catch (err) {
    log_err("Error checking if /__tests__ folder exists");
    console.error(err);
  }

  // create __tests__folder if doesn't exists
  if (!exists) {
    log("/__tests__ doesn't exists, adding default config");
    try {
      await fs.copy(pluginFolderPath + "/assets/default_conf", process.env.PWD);
    } catch (err) {
      log_err("Error while copying /__tests__ folder");
      console.error(err);
    }
  }

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

  // if (strapiInstance) {
  //   createEndpoints(strapiInstance);
  // }
};

module.exports = { initStrapiPluginTesting };
