const getAuthenticatedRole = async (strapiInstance) => {
  const result = await strapiInstance
    .query("role", "users-permissions")
    .findOne({ type: "authenticated" });
  return result;
};

module.exports = { getAuthenticatedRole };
