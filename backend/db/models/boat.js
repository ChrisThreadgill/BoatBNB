"use strict";
module.exports = (sequelize, DataTypes) => {
  const Boat = sequelize.define(
    "Boat",
    {
      userId: DataTypes.INTEGER,
      marina: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      year: DataTypes.INTEGER,
      model: DataTypes.STRING,
      accessories: DataTypes.STRING,
      captain: DataTypes.BOOLEAN,
      price: DataTypes.INTEGER,
      scheduleId: DataTypes.INTEGER,
    },
    {}
  );
  Boat.associate = function (models) {
    // associations can be defined here
    Boat.hasMany(models.Booking, { foreignKey: "boatId" });
    Boat.belongsTo(models.User, { foreignKey: "userId" });
    Boat.hasMany(models.Image, { foreignKey: "boatId" });
    Boat.hasMany(models.Review, { foreignKey: "boatId" });
  };
  return Boat;
};
