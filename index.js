const request = require("supertest");

// const { createEndpoints } = require("./src/createEndpoints.js");
const { startStrapi } = require("./src/startStrapi.js");
const { startStrapiJest } = require("./src/startStrapiJest.js");
const { initStrapiPluginTesting } = require("./src/initStrapiPluginTesting.js");
const { createStrapiSuperAdmin } = require("./src/createStrapiSuperAdmin.js");

module.exports = {
  startStrapi,
  startStrapiJest,
  // createEndpoints,
  initStrapiPluginTesting,
  createStrapiSuperAdmin,
  request,
};
