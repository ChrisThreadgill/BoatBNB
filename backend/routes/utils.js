const db = require("../db/models");
const csrf = require("csurf");

const csrfProtection = csrf({ cookie: true });

const { check, validationResult } = require("express-validator");

const asyncHandler = (handler) => {
  return (req, res, next) => {
    return handler(req, res, next).catch(next);
  };
};

const contentTypeJson = { "Content-Type": "application/json" };
const emailReg = /^[^\s@]+@\w+\.[A-z]{2,3}$/;

const lowerCase = /^(?=.*[a-z])/;
const upperCase = /^(?=.*[A-Z])/;
const oneNumeric = /(?=.*[0-9])/;
const alphaNumeric = /(?=.*[!@#$%^&*])/;
const eightCharacters = /(?=.{8,})/;

const userValidators = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name")
    .isLength({ max: 50 })
    .withMessage("First name cannot be more than 50 characters long"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name")
    .isLength({ max: 50 })
    .withMessage("Last name cannot be more than 50 characters long"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an email")
    .isLength({ max: 255 })
    .withMessage("email cannot be more than 255 characters long")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject("The provided Email Address is already in use by another account");
        }
      });
    }),
  check("hashedPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please Provide a password")
    .isLength({ max: 255 })
    .withMessage("password must be less than 255 characters")
    .matches(lowerCase)
    .withMessage("Please input a password with at least one lower case character")
    .matches(upperCase)
    .withMessage("Please input a password with at least one upper case character")
    .matches(oneNumeric)
    .withMessage("Please input a password with at least one numeric character")
    .matches(alphaNumeric)
    .withMessage("Please input a password with at least one alpha numeric character")
    .matches(eightCharacters)
    .withMessage("Please input a password at least eight characters long"),

  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password")
    .isLength({ max: 255 })
    .withMessage("Confirm Password must not be more than 255 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.hashedPassword) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),
  check("phoneNumber").isLength({ max: 10 }).withMessage("Please input phone number with at most 10 digits"),
  check("occupation").isLength({ max: 255 }).withMessage("Max character limit is 255 characters"),
];

const loginValidators = [
  check("email").exists({ checkFalsy: true }).withMessage("Please provide your login email address."),
  check("hashedPassword").exists({ checkFalsy: true }).withMessage("Don't forget your password!"),
];

const dateView = (date) => {
  const [year, month, day] = date.split("-");
  return month + "/" + day + "/" + year;
};

module.exports = {
  csrfProtection,
  asyncHandler,
  userValidators,
  loginValidators,
  contentTypeJson,
  projectValidator,
  taskValidator,
  dateView,
};
