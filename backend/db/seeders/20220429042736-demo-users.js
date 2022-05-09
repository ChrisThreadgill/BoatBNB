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
          firstName: "Demo",
          lastName: "Boat Provider",
          email: "demo@user.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 1,
          profilePicture: "e1719a50a2edddb206b5d573d207991c",
        },
        {
          firstName: "Ara",
          lastName: "Sargsyan",
          email: "ara@ara.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 1,
          profilePicture: "3e872599ccbdbf6036c6272acba9f456",
        },
        {
          firstName: "JP",
          lastName: "Beacham",
          email: "jp@jp.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: "aa32be9f0cf08a175725c2748989a3a1",
        },
        {
          firstName: "Darren",
          lastName: "Kong",
          email: "darren@darren.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 1,
          profilePicture: "aa32be9f0cf08a175725c2748989a3a1",
        },
        {
          firstName: "Vern",
          lastName: "Chao",
          email: "user4@user.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: "aa32be9f0cf08a175725c2748989a3a1",
        },
        {
          firstName: "Leo",
          lastName: "Lad",
          email: "leo@leo.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: "aa32be9f0cf08a175725c2748989a3a1",
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
