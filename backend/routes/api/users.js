const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const csrf = require("csurf");

const csrfProtection = csrf({ cookie: true });

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Boat, Image, UserRating, UserReview, Booking, BoatRating } = require("../../db/models");
const { singlePublicFileUpload, singleMulterUpload } = require("../aws");

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
      include: [
        { model: Boat, include: [Image, BoatRating] },
        { model: UserRating, include: [User] },
        { model: UserReview, include: [UserRating, User] },
        //
      ],
    });
    const userReviews = await UserReview.findAll({ where: { userId } });
    // console.log(userReviews);
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
      include: [{ model: Boat, include: [Image, BoatRating, User] }],
      // include: { model: Image },
      // [Image, BoatRating, User]
    });
    return res.json({
      user,
    });
  })
);

router.put(
  "/:userId",
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    console.log("kdsajg;lsdajgf;lkjsad-========", userId);
    console.log(req.file, "-----------");
    const profileUrl = await singlePublicFileUpload(req.file);
    console.log(profileUrl, "jdsklagjlskadjglksdj--------------");
    const user = await User.findByPk(userId);
    await user.update({
      profilePicture: profileUrl,
    });
    return res.json({
      user,
    });
    // console.log(user, "-=---------------");
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
    const { firstName, lastName, email, password, roleId, profilePicture } = req.body;
    const user = await User.signup({ firstName, lastName, email, password, roleId, profilePicture });

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
    const { firstName, lastName, email, password, roleId, profilePicture } = req.body;

    const user = await User.signup({ firstName, lastName, email, password, roleId, profilePicture });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

module.exports = router;
