const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const csrf = require("csurf");

const csrfProtection = csrf({ cookie: true });

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Boat, Image, UserRating, UserReview, Booking } = require("../../db/models");

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

    const user = await User.findByPk(userId, {
      include: [{ model: Boat, include: Image }, UserRating, UserReview],
    });
    return res.json({
      user,
    });
  })
);

//gets all boats from specific user
router.get(
  "/:userId/boats",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: [{ model: Boat, include: { model: Image } }],
    });
    return res.json({
      user,
    });
  })
);

router.get(
  "/:userId/boats",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: [{ model: Boat, include: { model: Image } }],
    });
    return res.json({
      user,
    });
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
