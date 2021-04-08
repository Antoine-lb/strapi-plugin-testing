const request = require("supertest");

// const { createEndpoints } = require("./src/createEndpoints.js");
const { startStrapiJest } = require("./src/startStrapiJest.js");
const { initStrapiPluginTesting } = require("./src/initStrapiPluginTesting.js");
const { createStrapiSuperAdmin } = require("./src/createStrapiSuperAdmin.js");

module.exports = {
  startStrapiJest,
  // createEndpoints,
  initStrapiPluginTesting,
  createStrapiSuperAdmin,
  request,
};
