"use strict";
module.exports = (sequelize, DataTypes) => {
  const BoatReview = sequelize.define(
    "BoatReview",
    {
      userId: DataTypes.INTEGER,
      boatId: DataTypes.INTEGER,
      review: DataTypes.TEXT,
    },
    {}
  );
  BoatReview.associate = function (models) {
    // associations can be defined here
    BoatReview.belongsTo(models.Boat, { foreignKey: "boatId" });
    BoatReview.hasOne(models.BoatRating, { foreignKey: "boatReviewId", onDelete: "CASCADE", hooks: true });
    BoatReview.belongsTo(models.User, { foreignKey: "userId" });
  };
  return BoatReview;
};
