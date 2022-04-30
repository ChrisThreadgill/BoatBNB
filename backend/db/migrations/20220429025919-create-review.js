"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Reviews", {
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
      boatId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Boats" },
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      communication: {
        type: Sequelize.INTEGER,
      },
      cleanliness: {
        type: Sequelize.INTEGER,
      },
      communication: {
        type: Sequelize.INTEGER,
      },
      punctual: {
        type: Sequelize.INTEGER,
      },
      rentAgain: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable("Reviews");
  },
};
