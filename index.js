const { createEndpoints } = require("./src/createEndpoints.js");
const { setupStrapi } = require("./src/setupStrapi.js");
const { initStrapiPluginTesting } = require("./src/initStrapiPluginTesting.js");

module.exports = { setupStrapi, createEndpoints, initStrapiPluginTesting };
