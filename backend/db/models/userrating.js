"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserRating = sequelize.define(
    "UserRating",
    {
      userId: DataTypes.INTEGER,
      reviewerId: DataTypes.INTEGER,
      friendliness: DataTypes.INTEGER,
      punctuality: DataTypes.INTEGER,
      trustworthy: DataTypes.INTEGER,
      average: DataTypes.INTEGER,
      userReviewId: DataTypes.INTEGER,
    },
    {}
  );
  UserRating.associate = function (models) {
    // associations can be defined here
    UserRating.belongsTo(models.User, { foreignKey: "reviewerId" });
    UserRating.belongsTo(models.UserReview, { foreignKey: "userReviewId" });
  };
  return UserRating;
};
