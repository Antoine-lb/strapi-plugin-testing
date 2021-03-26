"use strict";
const fs = require("fs-extra");

const testFolderPath = process.env.PWD + "/__tests__";
const pluginFolderPath =
  process.env.PWD + "/node_modules/strapi-plugin-my-plugin";

function log(str) {
  console.log("🧪 [strapi-plugin-unit-testing]: " + str);
}

function log_err(str) {
  console.error("🧪 [strapi-plugin-unit-testing]: " + str);
}

module.exports = async () => {
  log("Checking if /__tests__ folder exists");

  fs.pathExists(testFolderPath, (err, exists) => {
    if (err) {
      log_err("Error checking if /__tests__ folder exists");
      console.error(err);
      return;
    }

    if (!exists) {
      log("/__tests__ doesn't exists, adding default config");
      fs.copy(
        pluginFolderPath + "/assets/default_conf",
        process.env.PWD,
        (err) => {
          if (err) {
            log_err("Error while copying /__tests__ folder");
            return console.error(err);
          }
          log("Success copying default /__tests__ file in root directory");
        }
      );
    } else {
      log("/__tests__ already exists, ignoring file creation step");
    }
  });
};
