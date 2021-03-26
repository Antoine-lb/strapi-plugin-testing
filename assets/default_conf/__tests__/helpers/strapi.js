const Strapi = require("strapi");
const http = require("http");
const fs = require("fs-extra");

const testDBfilePath = process.env.PWD + "/tests__config/database.js";
const originalDBfilePath = process.env.PWD + "/config/database.js";
const originalDBfilePath_tmp = process.env.PWD + "/config/database_original.js";

let instance;

async function setupStrapi() {
  if (!instance) {
    fs.copy(originalDBfilePath, originalDBfilePath_tmp, (err) => {
      if (err) return console.error(err);
      console.log("moved original DB");
    });

    fs.copy(testDBfilePath, originalDBfilePath, (err) => {
      if (err) return console.error(err);
      console.log("moved test db to config");
    });

    /** the following code in copied from `./node_modules/strapi/lib/Strapi.js` */
    await Strapi().load();
    instance = strapi; // strapi is global now
    await instance.app
      .use(instance.router.routes()) // populate KOA routes
      .use(instance.router.allowedMethods()); // populate KOA methods

    instance.server = http.createServer(instance.app.callback());
  }
  return instance;
}
module.exports = { setupStrapi };
