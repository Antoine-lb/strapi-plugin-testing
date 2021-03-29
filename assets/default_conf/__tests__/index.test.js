const { setupStrapi } = require("strapi-plugin-testing");

setupStrapi();

it("strapi is defined", async (done) => {
  expect(strapi).toBeDefined();
  done();
});
