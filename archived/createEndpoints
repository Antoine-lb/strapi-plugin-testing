const fs = require("fs-extra");

const { testFolderPath, sampleTestPath } = require("./paths.js");

async function createEndpoint(endPointName) {
  const endPointPath = testFolderPath + endPointName;

  const exists = await fs.pathExists(endPointPath);

  if (!exists) {
    try {
      await fs.ensureDir(endPointPath);
    } catch (err) {
      console.error(err);
    }
    fs.copy(sampleTestPath, `${endPointPath}/${endPointName}.test.js`).catch(
      (err) => {
        console.error(err);
      }
    );
  }
}

async function createEndpoints(strapiInstance) {
  await Object.keys(strapiInstance.api).forEach(
    async (endPointName) => await createEndpoint(endPointName)
  );
}

module.exports = { createEndpoints };
