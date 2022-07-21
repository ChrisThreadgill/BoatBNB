"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("UserRatings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      reviewerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      friendliness: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      punctuality: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      trustworthy: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      average: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      userReviewId: {
        type: Sequelize.INTEGER,
        references: { model: "UserReviews" },
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
    return queryInterface.dropTable("UserRatings");
  },
};
