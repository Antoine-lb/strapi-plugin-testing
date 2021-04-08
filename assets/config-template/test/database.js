/**
 * This file will replace `./config/database.js` when tests run and put
 * the original database in `./config/database_original.js`.
 */

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
