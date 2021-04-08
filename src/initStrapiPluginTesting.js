const fs = require("fs-extra");

const {
  testFolderPath,
  pluginFolderPath,
  CONFIG_ENV_PATH,
  CONFIG_ENV_TEST_PATH,
  NODEMODULES_PLUGIN_ASSETS_JESTCONFIG,
} = require("./paths.js");

function log(str) {
  console.log("🧪 [strapi-plugin-testing]: " + str);
}

function log_err(str) {
  console.error("🧪 [strapi-plugin-testing]: " + str);
}

const checkIfExistsAndCopy = async (
  checkIfThisExists,
  sourcePath,
  targetPath
) => {
  let exists;
  try {
    exists = await fs.pathExists(checkIfThisExists);
  } catch (err) {
    log_err(`Error checking if ${checkIfThisExists} exists`);
    console.error(err);
  }

  // create __tests__ folder if doesn't exists
  if (!exists) {
    log(`${checkIfThisExists} doesn't exists, adding default config`);
    try {
      await fs.copy(sourcePath, targetPath);
    } catch (err) {
      console.error(err);
    }
  }
};

const initStrapiPluginTesting = async (strapiInstance = undefined) => {
  await checkIfExistsAndCopy(
    testFolderPath,
    pluginFolderPath + "/assets/__test__-template",
    process.env.PWD
  );

  await checkIfExistsAndCopy(
    `${process.env.PWD}/jest.config.js`,
    NODEMODULES_PLUGIN_ASSETS_JESTCONFIG,
    `${process.env.PWD}/jest.config.js`
  );

  try {
    await fs.ensureDir(CONFIG_ENV_PATH);
  } catch (err) {
    log_err("Error checking if /config/env folder exists");
    console.error(err);
  }

  await checkIfExistsAndCopy(
    CONFIG_ENV_TEST_PATH,
    pluginFolderPath + "/assets/config-template",
    CONFIG_ENV_PATH
  );
};

module.exports = { initStrapiPluginTesting, log, log_err };
