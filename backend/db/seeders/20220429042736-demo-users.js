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
        {
          firstName: "Steve",
          lastName: "Miller",
          email: "steve@miller.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: null,
        },
        {
          firstName: "Veronica",
          lastName: "Miller",
          email: "veronica@miller.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: null,
        },
        {
          firstName: "Jack",
          lastName: "Chipper",
          email: "Jack@chipper.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: null,
        },
        {
          firstName: "William",
          lastName: "Mann",
          email: "William@mann.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: null,
        },
        {
          firstName: "Sharon",
          lastName: "Moore",
          email: "sharon@moore.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: null,
        },
        {
          firstName: "Sharon",
          lastName: "Toomoore",
          email: "sharon@Toomoore.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: null,
        },
        {
          firstName: "Chris",
          lastName: "Hello?",
          email: "chris@hello.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: null,
        },
        {
          firstName: "JayRod",
          lastName: "Bee",
          email: "jayrod@cbd.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: null,
        },
        {
          firstName: "Hellorm",
          lastName: "Shalavaka",
          email: "Hellorm@Shalavake.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: null,
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
