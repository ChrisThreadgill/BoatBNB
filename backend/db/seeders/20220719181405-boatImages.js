"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Images",
      [
        {
          boatId: 9,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255613121.jpg",
        },
        {
          boatId: 9,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 3,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 1,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 2,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 1,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 1,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 2,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 2,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 3,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 3,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 4,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 4,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 5,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 5,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 6,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 6,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 7,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 7,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 8,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
        },
        {
          boatId: 8,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658255646596.jpg",
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
    return queryInterface.bulkDelete("Images", null, {});
  },
};
