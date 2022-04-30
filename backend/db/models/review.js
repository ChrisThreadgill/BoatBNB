"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      userId: DataTypes.INTEGER,
      boatId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      communication: DataTypes.INTEGER,
      cleanliness: DataTypes.INTEGER,
      communication: DataTypes.INTEGER,
      punctual: DataTypes.INTEGER,
      rentAgain: DataTypes.BOOLEAN,
    },
    {}
  );
  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: "userId" });
    Review.belongsTo(models.Boat, { foreignKey: "boatId" });
  };
  return Review;
};
