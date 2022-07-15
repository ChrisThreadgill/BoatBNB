"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "BoatRatings",
      [
        {
          boatId: 1,
          userId: 2,
          cleanliness: 5,
          functional: 5,
          comfort: 4,
          boatReviewId: 1,
          average: 5,
        },
        {
          boatId: 1,
          userId: 14,
          cleanliness: 5,
          functional: 5,
          comfort: 5,
          boatReviewId: 2,
          average: 5,
        },
        {
          boatId: 1,
          userId: 7,
          cleanliness: 5,
          functional: 5,
          comfort: 5,
          boatReviewId: null,
          average: 5,
        },
        {
          boatId: 1,
          userId: 5,
          cleanliness: 5,
          functional: 5,
          comfort: 5,
          boatReviewId: null,
          average: 5,
        },
        {
          boatId: 2,
          userId: 2,
          cleanliness: 5,
          functional: 5,
          comfort: 4,
          boatReviewId: 5,
          average: 5,
        },
        {
          boatId: 2,
          userId: 14,
          cleanliness: 1,
          functional: 1,
          comfort: 1,
          boatReviewId: 6,
          average: 1,
        },
        {
          boatId: 2,
          userId: 5,
          cleanliness: 5,
          functional: 5,
          comfort: 5,
          boatReviewId: 7,
          average: 5,
        },
        {
          boatId: 2,
          userId: 4,
          cleanliness: 5,
          functional: 5,
          comfort: 5,
          boatReviewId: 8,
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
    return queryInterface.bulkDelete("BoatRatings", null, {});
  },
};
