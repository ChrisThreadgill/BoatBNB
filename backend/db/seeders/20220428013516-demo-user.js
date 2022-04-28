"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Boat",
          lastName: "Demo",
          email: "demo@user.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 1,
        },
        {
          firstName: "Ara",
          lastName: "Sargsyan",
          email: "user1@user.io",
          hashedPassword: bcrypt.hashSync("password2"),
          roleId: 1,
        },
        {
          firstName: "JP",
          lastName: "Beacham",
          email: "user2@user.io",
          hashedPassword: bcrypt.hashSync("password3"),
          roleId: 2,
        },
        {
          firstName: "Darren",
          lastName: "Kong",
          email: "user3@user.io",
          hashedPassword: bcrypt.hashSync("password4"),
          roleId: 2,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
