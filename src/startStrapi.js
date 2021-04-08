/**
 * startStrapiJest([callback])
 *  
 * Starts a new Strapi instance before every test (with singleton pattern) 
 * and makes the instance globally available with the variable name `strapi`.
 * 
 * The optional callback will be called at the end with the new Strapi instance.
 * 
 * Example:

function populateDatabase(strapiInstance) {
  await strapiInstance.services.restaurant.create({
    name: "Pizza",
  });
}

// creates instance and populates data
startStrapiJest(async (strapiInstance) => {
  await mockApplicationData(strapiInstance);
});

describe("Global setup", () => {
  it("strapi is defined", async (done) => {
    expect(strapi).toBeDefined(); // strapi globally available
    done();
  });
});

 * 
 */

const Strapi = require("strapi");
const http = require("http");

let instance;

async function startStrapi(callBack) {
  if (!instance) {
    /** the following code in copied from `./node_modules/strapi/lib/Strapi.js` */
    await Strapi().load();
    instance = strapi; // strapi is global now
    await instance.app
      .use(instance.router.routes()) // populate KOA routes
      .use(instance.router.allowedMethods()); // populate KOA methods

    instance.server = http.createServer(instance.app.callback());
  }
  if (callBack) {
    await callBack(instance);
  }
  return instance;
}

module.exports = { startStrapi };
