"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Boats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(2),
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      description: {
        type: Sequelize.STRING(500),
      },
      captain: {
        type: Sequelize.BOOLEAN,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      lat: {
        type: Sequelize.NUMERIC(10, 7),
      },
      lng: {
        type: Sequelize.NUMERIC(10, 7),
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
    return queryInterface.dropTable("Boats");
  },
};
