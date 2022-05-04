"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("BoatRatings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      boatId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Boats" },
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      cleanliness: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      functional: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      comfort: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      boatReviewId: {
        type: Sequelize.INTEGER,
        references: { model: "BoatReviews" },
      },
      average: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable("BoatRatings");
  },
};
