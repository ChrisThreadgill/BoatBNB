"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "UserReviews",
      [
        {
          userId: 1,
          reviewerId: 2,
          content: "Great guy really nice and great communication!!",
        },
        {
          userId: 1,
          reviewerId: 7,
          content: "Amazing guy",
        },
        {
          userId: 1,
          reviewerId: 5,
          content: "Cool dude",
        },
        {
          userId: 1,
          reviewerId: 4,
          content: "He alright",
        },
        {
          userId: 1,
          reviewerId: 6,
          content: "Good lad",
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
    return queryInterface.bulkDelete("UserReviews", null, {});
  },
};
