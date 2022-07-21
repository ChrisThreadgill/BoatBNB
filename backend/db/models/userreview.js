"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserReview = sequelize.define(
    "UserReview",
    {
      userId: DataTypes.INTEGER,
      reviewerId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
    },
    {}
  );
  UserReview.associate = function (models) {
    // associations can be defined here
    UserReview.belongsTo(models.User, { foreignKey: "reviewerId" });
    UserReview.hasOne(models.UserRating, { foreignKey: "userReviewId", onDelete: "CASCADE", hooks: true });
  };
  return UserReview;
};
