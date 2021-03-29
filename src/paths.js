const testFolderPath = process.env.PWD + "/__tests__/";
const pluginFolderPath =
  process.env.PWD + "/node_modules/strapi-plugin-testing";

const testDBfilePath = process.env.PWD + "/__tests__/__config__/database.js";
const originalDBfilePath = process.env.PWD + "/config/database.js";
const originalDBfilePath_tmp = process.env.PWD + "/config/database_original.js";

const sampleTestPath =
  process.env.PWD + "/node_modules/strapi-plugin-testing/assets/sample.test";

module.exports = {
  testFolderPath,
  pluginFolderPath,
  testDBfilePath,
  originalDBfilePath,
  originalDBfilePath_tmp,
  sampleTestPath,
};
