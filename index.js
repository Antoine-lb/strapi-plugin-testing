const { createEndpoints } = require("./src/createEndpoints.js");
const { setupStrapi } = require("./src/setupStrapi.js");
const { initStrapiPluginTesting } = require("./src/initStrapiPluginTesting.js");
const { createStrapiSuperAdmin } = require("./src/createStrapiSuperAdmin.js");

module.exports = {
  setupStrapi,
  createEndpoints,
  initStrapiPluginTesting,
  createStrapiSuperAdmin,
};
