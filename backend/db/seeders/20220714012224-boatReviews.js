"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "BoatReviews",
      [
        {
          userId: 2,
          boatId: 1,
          review: "Great Boat!! Amazing fun!",
        },
        {
          userId: 14,
          boatId: 1,
          review: "Awesome guy! Heard he's a decent coder too.",
        },
        {
          userId: 5,
          boatId: 1,
          review: "Would rent again no problems at all",
        },
        {
          userId: 4,
          boatId: 1,
          review: "Awesome guy awesome boat",
        },
        {
          userId: 2,
          boatId: 2,
          review: "Great Boat!! Amazing fun!",
        },
        {
          userId: 14,
          boatId: 2,
          review: "Stayed up too late coding and was late to the boat drop off.",
        },
        {
          userId: 5,
          boatId: 2,
          review: "Would rent again no problems at all",
        },
        {
          userId: 4,
          boatId: 2,
          review: "Awesome guy awesome boat",
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
    return queryInterface.bulkDelete("BoatReviews", null, {});
  },
};
