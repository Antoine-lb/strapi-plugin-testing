const activatePrivileges = async (
  strapiInstance,
  controller,
  role,
  actions
) => {
  if (!actions) {
    actions = ["count", "create", "delete", "find", "findone", "update"];
  }

  actions.forEach(async (action) => {
    permission = await strapiInstance
      .query("permission", "users-permissions")
      .findOne({
        type: "application",
        controller,
        action,
        role,
      });
    permission.enabled = 1;
    await strapiInstance
      .query("permission", "users-permissions")
      .update({ id: permission.id }, permission);
    return 0;
  });
};

module.exports = { activatePrivileges };
