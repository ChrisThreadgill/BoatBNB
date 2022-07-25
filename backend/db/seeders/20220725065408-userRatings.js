"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "UserRatings",
      [
        {
          userId: 1,
          reviewerId: 2,
          friendliness: 5,
          punctuality: 5,
          trustworthy: 5,
          average: 5,
          userReviewId: 1,
        },
        {
          userId: 1,
          reviewerId: 7,
          friendliness: 5,
          punctuality: 5,
          trustworthy: 5,
          average: 5,
          userReviewId: 2,
        },
        {
          userId: 1,
          reviewerId: 4,
          friendliness: 5,
          punctuality: 3,
          trustworthy: 5,
          average: 4,
          userReviewId: 4,
        },
        {
          userId: 1,
          reviewerId: 9,
          friendliness: 5,
          punctuality: 5,
          trustworthy: 5,
          average: 5,
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
    return queryInterface.bulkDelete("UserRatings", null, {});
  },
};
