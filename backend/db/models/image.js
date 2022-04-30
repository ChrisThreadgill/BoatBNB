"use strict";
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      boatId: DataTypes.INTEGER,
      url: DataTypes.STRING,
    },
    {}
  );
  Image.associate = function (models) {
    // associations can be defined here
    Image.belongsTo(models.Boat, { foreignKey: "boatId" });
  };
  return Image;
};
