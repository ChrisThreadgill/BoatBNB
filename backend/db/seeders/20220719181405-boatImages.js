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
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658386370764.jpg",
        },
        {
          boatId: 9,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658386370767.jpg",
        },
        {
          boatId: 3,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658386370771.jpg",
        },
        {
          boatId: 1,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658387589086.jpg",
        },
        {
          boatId: 2,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658387589091.jpg",
        },
        {
          boatId: 1,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658387589094.jpg",
        },
        {
          boatId: 1,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658438560633.jpg",
        },
        {
          boatId: 2,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658435466937.jpg",
        },
        {
          boatId: 2,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658435466943.jpg",
        },
        {
          boatId: 3,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658435466943.jpg",
        },
        {
          boatId: 3,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658435466947.jpg",
        },
        {
          boatId: 4,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658435726834.jpg",
        },
        {
          boatId: 4,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658435726838.jpg",
        },
        {
          boatId: 5,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658435726844.jpg",
        },
        {
          boatId: 5,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658438560633.jpg",
        },
        {
          boatId: 6,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658444955400.jpg",
        },
        {
          boatId: 6,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658444955422.jpg",
        },
        {
          boatId: 7,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658444955428.jpg",
        },
        {
          boatId: 9,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658444955433.jpg",
        },
        {
          boatId: 8,
          url: "https://boat-bnb.s3.us-east-2.amazonaws.com/1658444955437.jpg",
        },
        {
          boatId: 9,
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
