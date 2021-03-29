const fs = require("fs-extra");

const { testFolderPath, pluginFolderPath } = require("./paths.js");
const { createEndpoints } = require("./createEndpoints.js");

function log(str) {
  console.log("🧪 [strapi-plugin-testing]: " + str);
}

function log_err(str) {
  console.error("🧪 [strapi-plugin-testing]: " + str);
}

const initStrapiPluginTesting = async (strapiInstance = undefined) => {
  let exists;
  try {
    exists = await fs.pathExists(testFolderPath);
  } catch (err) {
    log_err("Error checking if /__tests__ folder exists");
    console.error(err);
  }

  if (!exists) {
    log("/__tests__ doesn't exists, adding default config");
    try {
      await fs.copy(pluginFolderPath + "/assets/default_conf", process.env.PWD);
    } catch (err) {
      log_err("Error while copying /__tests__ folder");
      console.error(err);
    }
  }

  if (strapiInstance) {
    createEndpoints(strapiInstance);
  }
};

module.exports = { initStrapiPluginTesting };
