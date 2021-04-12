const { startStrapiJest } = require("strapi-plugin-testing");

startStrapiJest();

describe("Global setup", () => {
  it("strapi is defined", async (done) => {
    expect(strapi).toBeDefined();
    done();
  });
});

require("./user/user");
