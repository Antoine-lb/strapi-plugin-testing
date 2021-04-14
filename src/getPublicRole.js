const getPublicRole = async (strapiInstance) => {
  const result = await strapiInstance
    .query("role", "users-permissions")
    .findOne({ type: "public" });
  return result;
};

module.exports = { getPublicRole };
