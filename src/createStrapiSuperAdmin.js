const createStrapiSuperAdmin = async (
  email = "admin@test.test",
  password = "test"
) => {
  const params = {
    username: "test",
    password,
    firstname: "test",
    lastname: "test",
    email,
    blocked: false,
    isActive: true,
  };
  //Check if any account exists.
  const admins = await strapi.query("user", "admin").find();

  if (admins.length === 0) {
    let verifyRole = await strapi
      .query("role", "admin")
      .findOne({ code: "strapi-super-admin" });
    if (!verifyRole) {
      verifyRole = await strapi.query("role", "admin").create({
        name: "Super Admin",
        code: "strapi-super-admin",
        description:
          "Super Admins can access and manage all features and settings.",
      });
    }
    params.roles = [verifyRole.id];
    params.password = await strapi.admin.services.auth.hashPassword(
      params.password
    );
    try {
      await strapi.query("user", "admin").create({
        ...params,
      });
    } catch (error) {
      strapi.log.error(
        `Couldn't create Admin account during bootstrap: `,
        error
      );
      console.error(`Couldn't create Admin account during bootstrap: `, error);
    }
  }
};

module.exports = { createStrapiSuperAdmin };
