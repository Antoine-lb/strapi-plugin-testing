const { setupStrapi } = require("strapi-plugin-unit-test");

setupStrapi();

it("strapi is defined", async (done) => {
  expect(strapi).toBeDefined();
  done();
});
