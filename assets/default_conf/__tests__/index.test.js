const { setupStrapi } = require("strapi-plugin-testing");

setupStrapi();

describe("Global setup", () => {
  it("strapi is defined", async (done) => {
    expect(strapi).toBeDefined();
    done();
  });
});

require("./user/user");
