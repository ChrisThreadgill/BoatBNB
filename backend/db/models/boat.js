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
    Boat.hasMany(models.Booking, { foreignKey: "boatId", onDelete: "CASCADE", hooks: true });
    Boat.belongsTo(models.User, { foreignKey: "userId" });
    Boat.hasMany(models.Image, { foreignKey: "boatId", onDelete: "CASCADE", hooks: true });
    Boat.hasMany(models.Review, { foreignKey: "boatId" });
  };
  return Boat;
};
