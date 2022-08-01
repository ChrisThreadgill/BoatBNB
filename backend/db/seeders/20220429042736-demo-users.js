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
          profilePicture: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255947693.jpg",
        },
        {
          firstName: "Ara",
          lastName: "Sargsyan",
          email: "ara@ara.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 1,
          profilePicture: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255989375.JPG",
        },
        {
          firstName: "JP",
          lastName: "Beacham",
          email: "jp@jp.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: null,
        },
        {
          firstName: "Darren",
          lastName: "Kong",
          email: "darren@darren.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 1,
          profilePicture: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658256386097.jpg",
        },
        {
          firstName: "Vern",
          lastName: "Chao",
          email: "user4@user.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658256353072.png",
        },
        {
          firstName: "Leo",
          lastName: "Lad",
          email: "leo@leo.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658256291880.jpg",
        },
        {
          firstName: "Edward",
          lastName: "Smith",
          email: "e.smith@titanic.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 2,
          profilePicture: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658256483714.jpg",
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
        {
          firstName: "Maica",
          lastName: "Santos",
          email: "maica@maica.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 1,
          profilePicture: null,
        },
        {
          firstName: "Steven",
          lastName: "Smith",
          email: "steven@smith.io",
          hashedPassword: bcrypt.hashSync("password"),
          roleId: 1,
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
