const fs = require("fs-extra");

const testsPath = process.env.PWD + "/__tests__/";
const sampleTestPath =
  process.env.PWD +
  "/node_modules/strapi-plugin-unit-test/assets/sample.test.js";

async function createEndpoint(endPointName) {
  const endPointPath = testsPath + endPointName;

  const exists = await fs.pathExists(endPointPath);

  if (!exists) {
    try {
      await fs.ensureDir(endPointPath);
      console.log(endPointName, " folder created");
    } catch (err) {
      console.error(err);
    }
    // console.log("before fs.copy");

    fs.copy(sampleTestPath, `${endPointPath}/${endPointName}.test.js`)
      .then(() => {
        console.log("success!");
      })
      .catch((err) => {
        console.error(err);
      });
    // try {

    //   // With a callback:
    //   console.log(endPointName, ".test.js created?");
    //   // await fs.copy(sampleTestPath, `${endPointPath}/${endPointName}.test.js`);
    // } catch (err) {
    //   console.error(err);
    // }
  }
}

async function createEndpoints(strapiInstance) {
  await Object.keys(strapiInstance.api).forEach(
    async (endPointName) => await createEndpoint(endPointName)
  );
}

module.exports = { createEndpoints };
