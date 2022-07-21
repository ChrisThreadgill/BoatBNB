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
          address: "Beaver Lake Marina",
          city: "Bentonville",
          state: "AR",
          year: 2022,
          model: "BayLiner",
          description: "Great sound system! Fun for the family and everyone!",
          captain: false,
          price: 500,
          lat: 37.0902,
          lng: 95.7129,
        },
        {
          userId: 1,
          address: "Beaver Lake Marina",
          city: "Bentonville",
          state: "AR",
          year: 2022,
          model: "BayLiner",
          description: "Coolers, Fishing Poles, Tubes, and Rafts!",
          captain: false,
          price: 500,
          lat: 37.0902,
          lng: 95.7129,
        },
        {
          userId: 2,
          address: "Beaver Lake Marina",
          city: "Bentonville",
          state: "AR",
          year: 2020,
          model: "Bass Pro",
          description: "Fishing Poles and Live Well Storage",
          captain: false,
          price: 350,
          lat: 37.0902,
          lng: 95.7129,
        },
        {
          userId: 2,
          address: "Beaver Lake Marina",
          city: "Bentonville",
          state: "AR",
          year: 2009,
          model: "Bass Master",
          description: "Tackle Box",
          captain: false,
          price: 222,
          lat: 37.0902,
          lng: 95.7129,
        },
        {
          userId: 3,
          address: "Dallas Marina",
          city: "Dallas",
          state: "TX",
          year: 2020,
          model: "Bass Pro",
          description: "Fishing Poles and Live Well Storage",
          captain: false,
          price: 350,
          lat: 37.0902,
          lng: 95.7129,
        },
        {
          userId: 3,
          address: "Dallas Marina",
          city: "Dallas",
          state: "TX",
          year: 2009,
          model: "Bass Master",
          description: "Tackle Box",
          captain: false,
          price: 222,
          lat: 37.0902,
          lng: 95.7129,
        },
        {
          userId: 4,
          address: "Portland Marina",
          city: "Portland",
          state: "ME",
          year: 2002,
          model: "Bayliner Deep Sea",
          description: "Deep Sea Fishing Guided Tour",
          captain: true,
          price: 1500,
          lat: 37.0902,
          lng: 95.7129,
        },
        {
          userId: 4,
          address: "Portland Marina",
          city: "Portland",
          state: "ME",
          year: 2012,
          model: "Luxury Yacht",
          description: "Full Size Kitchen, Master Bedroom, and Bar",
          captain: true,
          price: 1337,
          lat: 37.0902,
          lng: 95.7129,
        },
        {
          userId: 7,
          address: "New York City Marina",
          city: "New York City",
          state: "NY",
          year: 1911,
          model: "Titanic",
          description: "Full Size Kitchen, Master Bedroom, and Bar",
          captain: true,
          price: 40,
          lat: 37.0902,
          lng: 95.7129,
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
