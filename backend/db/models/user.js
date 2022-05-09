"use strict";
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      profilePicture: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  User.prototype.toSafeObject = function () {
    const { id, firstName, lastName, email, profilePicture } = this;
    return { id, firstName, lastName, email, profilePicture };
  };
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };
  User.login = async function ({ credential, password }) {
    const user = await User.scope("loginUser").findOne({
      where: {
        email: credential,
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };
  User.signup = async function ({ firstName, lastName, email, password, profilePicture, roleId }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      hashedPassword,
      profilePicture,
      roleId,
    });
    return await User.scope("currentUser").findByPk(user.id);
  };
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Booking, { foreignKey: "userId" });
    User.hasMany(models.Boat, { foreignKey: "userId" });
    User.hasMany(models.UserReview, { foreignKey: "userId" });
    User.hasMany(models.UserRating, { foreignKey: "userId" });
    User.hasMany(models.BoatReview, { foreignKey: "userId" });
    User.hasMany(models.BoatRating, { foreignKey: "userId" });
  };
  return User;
};
