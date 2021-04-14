// const request = require("supertest");
// const { createEndpoints } = require("./src/createEndpoints.js");

const { startStrapi } = require("./src/startStrapi.js");
const { startStrapiJest } = require("./src/startStrapiJest.js");
const { initStrapiPluginTesting } = require("./src/initStrapiPluginTesting.js");
const { createStrapiSuperAdmin } = require("./src/createStrapiSuperAdmin.js");
const { activatePrivileges } = require("./src/activatePrivileges.js");
const { getPublicRole } = require("./src/getPublicRole.js");
const { getAuthenticatedRole } = require("./src/getAuthenticatedRole.js");

module.exports = {
  // createEndpoints,
  // request,
  startStrapi,
  startStrapiJest,
  initStrapiPluginTesting,
  createStrapiSuperAdmin,
  activatePrivileges,
  getAuthenticatedRole,
  getPublicRole,
};
