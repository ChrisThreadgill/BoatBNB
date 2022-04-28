"use strict";
const { Validator } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING(75),
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING(75),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: true,
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING.BINARY,
      },
      roleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 2,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  },
};
