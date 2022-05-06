"use strict";
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      userId: DataTypes.INTEGER,
      boatId: DataTypes.INTEGER,
      bookingDate: DataTypes.DATE,
      checkIn: DataTypes.INTEGER,
      checkOut: DataTypes.INTEGER,
    },
    {}
  );
  Booking.associate = function (models) {
    // associations can be defined here
    Booking.belongsTo(models.User, { foreignKey: "userId" });
    Booking.belongsTo(models.Boat, { foreignKey: "boatId" });
  };
  return Booking;
};
