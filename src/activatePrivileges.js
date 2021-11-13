const activatePrivileges = async (
  strapiInstance,
  controller,
  role,
  actions
) => {
  if (!actions) {
    actions = ["count", "create", "delete", "find", "findone", "update"];
  }

  for (const action of actions) {
    let permission = await strapiInstance
      .query("permission", "users-permissions")
      .findOne({
        type: "application",
        controller,
        action,
        role,
      });
    permission.enabled = 1;
    console.log('?', permission)
    await strapiInstance
      .query("permission", "users-permissions")
      .update({ id: permission.id }, permission);
  }
};

module.exports = { activatePrivileges };
