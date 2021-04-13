const createStrapiSuperAdmin = async (
  strapiInstance,
  email = "admin@test.test",
  password = "test",
  username = "test",
  firstname = "test",
  lastname = "test",
  blocked = false,
  isActive = true,
  displayLogs = true // print success logs
) => {
  const params = {
    username,
    password,
    firstname,
    lastname,
    email,
    blocked,
    isActive,
  };
  let verifyRole = await strapiInstance
    .query("role", "admin")
    .findOne({ code: "strapi-super-admin" });
  if (!verifyRole) {
    verifyRole = await strapiInstance.query("role", "admin").create({
      name: "Super Admin",
      code: "strapi-super-admin",
      description:
        "Super Admins can access and manage all features and settings.",
    });
  }
  params.roles = [verifyRole.id];
  let tmp_pass = params.password;
  params.password = await strapiInstance.admin.services.auth.hashPassword(
    params.password
  );
  try {
    await strapiInstance.query("user", "admin").create({
      ...params,
    });
    if (displayLogs) {
      strapiInstance.log.info("Admin account was successfully created.");
      strapiInstance.log.info(`Email: ${params.email}`);
      strapiInstance.log.info(`Password: ${tmp_pass}`);
    }
  } catch (error) {
    strapiInstance.log.error(
      `Couldn't create Admin account during bootstrap: `,
      error
    );
    console.error(`Couldn't create Admin account during bootstrap: `, error);
  }
};

module.exports = { createStrapiSuperAdmin };
