"use strict";
module.exports = (sequelize, DataTypes) => {
  const BoatRating = sequelize.define(
    "BoatRating",
    {
      boatId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      cleanliness: DataTypes.INTEGER,
      functional: DataTypes.INTEGER,
      comfort: DataTypes.INTEGER,
      average: DataTypes.INTEGER,
      boatReviewId: DataTypes.INTEGER,
    },
    {}
  );
  BoatRating.associate = function (models) {
    // associations can be defined here
    BoatRating.belongsTo(models.Boat, { foreignKey: "boatId" });
    BoatRating.belongsTo(models.BoatReview, { foreignKey: "boatReviewId" });
    BoatRating.belongsTo(models.User, { foreignKey: "userId" });
  };
  return BoatRating;
};
