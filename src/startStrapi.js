const Strapi = require("strapi");
const http = require("http");

let instance;

const startStrapi = async (callBack) => {
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
};

module.exports = { startStrapi };
