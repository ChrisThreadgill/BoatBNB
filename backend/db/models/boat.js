"use strict";
module.exports = (sequelize, DataTypes) => {
  const Boat = sequelize.define(
    "Boat",
    {
      userId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      year: DataTypes.INTEGER,
      model: DataTypes.STRING,
      description: DataTypes.STRING,
      captain: DataTypes.BOOLEAN,
      price: DataTypes.INTEGER,
      lat: DataTypes.NUMERIC,
      lng: DataTypes.NUMERIC,
    },
    {}
  );
  Boat.associate = function (models) {
    // associations can be defined here
    Boat.hasMany(models.Booking, { foreignKey: "boatId", onDelete: "CASCADE", hooks: true });
    Boat.belongsTo(models.User, { foreignKey: "userId" });
    Boat.hasMany(models.Image, { foreignKey: "boatId", onDelete: "CASCADE", hooks: true });
    Boat.hasMany(models.BoatReview, { foreignKey: "boatId", onDelete: "CASCADE", hooks: true });
    Boat.hasMany(models.BoatRating, { foreignKey: "boatId", onDelete: "CASCADE", hooks: true });
  };
  return Boat;
};
