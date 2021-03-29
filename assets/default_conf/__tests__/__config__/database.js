module.exports = ({ env }) => {
  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: "sqlite",
          filename: ".tmp/test.db",
        },
        options: {
          useNullAsDefault: true,
        },
      },
    },
  };
};
