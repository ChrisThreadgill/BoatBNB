"use strict";
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      userId: DataTypes.INTEGER,
      boatId: DataTypes.INTEGER,
      checkIn: DataTypes.INTEGER,
      bookingDate: DataTypes.DATE,
    },
    {}
  );
  Booking.associate = function (models) {
    Booking.belongsTo(models.User, { foreignKey: "userId" });
    Booking.belongsTo(models.Boat, { foreignKey: "boatId" });
  };
  return Booking;
};
