const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const validateSignup = [
  check("email").exists({ checkFalsy: true }).isEmail().withMessage("Please provide a valid email."),
  check("firstName").exists({ checkFalsy: true }).withMessage("Please provide a first name."),
  check("lastName").exists({ checkFalsy: true }).withMessage("Please provide a last name."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];
//get user by ID
router.get(
  "/profile/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    console.log("working");
    const user = await User.findByPk(userId);
    return res.json({
      user,
    });
    // console.log(user);
  })
);

router.post(
  "/users",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, roleId } = req.body;
    const user = await User.signup({ firstName, lastName, email, password, roleId });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

router.post(
  "/providers",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, roleId } = req.body;

    const user = await User.signup({ firstName, lastName, email, password, roleId });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

module.exports = router;
