"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Boats",
      [
        {
          userId: 1,
          marina: "Beaver Lake Marina",
          city: "Bentonville",
          state: "AR",
          year: 2022,
          model: "BayLiner",
          accessories: "Great sound system! Fun for the family and everyone!",
          captain: false,
          price: 500,
        },
        {
          userId: 1,
          marina: "Beaver Lake Marina",
          city: "Bentonville",
          state: "AR",
          year: 2022,
          model: "BayLiner",
          accessories: "Coolers, Fishing Poles, Tubes, and Rafts!",
          captain: false,
          price: 500,
        },
        {
          userId: 2,
          marina: "Beaver Lake Marina",
          city: "Bentonville",
          state: "AR",
          year: 2020,
          model: "Bass Pro",
          accessories: "Fishing Poles and Live Well Storage",
          captain: false,
          price: 350,
        },
        {
          userId: 2,
          marina: "Beaver Lake Marina",
          city: "Bentonville",
          state: "AR",
          year: 2009,
          model: "Bass Master",
          accessories: "Tackle Box",
          captain: false,
          price: 222,
        },
        {
          userId: 3,
          marina: "Dallas Marina",
          city: "Dallas",
          state: "TX",
          year: 2020,
          model: "Bass Pro",
          accessories: "Fishing Poles and Live Well Storage",
          captain: false,
          price: 350,
        },
        {
          userId: 3,
          marina: "Dallas Marina",
          city: "Dallas",
          state: "TX",
          year: 2009,
          model: "Bass Master",
          accessories: "Tackle Box",
          captain: false,
          price: 222,
        },
        {
          userId: 4,
          marina: "Portland Marina",
          city: "Portland",
          state: "ME",
          year: 2002,
          model: "Bayliner Deep Sea",
          accessories: "Deep Sea Fishing Guided Tour",
          captain: true,
          price: 1500,
        },
        {
          userId: 4,
          marina: "Portland Marina",
          city: "Portland",
          state: "ME",
          year: 2012,
          model: "Luxury Yacht",
          accessories: "Full Size Kitchen, Master Bedroom, and Bar",
          captain: true,
          price: 1337,
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
    return queryInterface.bulkDelete("Boats", null, {});
  },
};
