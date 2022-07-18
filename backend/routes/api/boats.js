const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");
const { googleMapsAPIKey } = require("../../config");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Boat, Image, Booking, BoatRating, BoatReview, UserRating } = require("../../db/models");

//gets all boats
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { boatId } = req.body;
    console.log(req.body, "-------------------- in the get all route for some goddamn reason");
    const boats = await Boat.findAll({
      include: [Image, BoatRating, User],
    });

    return res.json({
      boats,
    });
  })
);

router.post("/key", (req, res) => {
  res.json({ googleMapsAPIKey });
});

//search by state
router.get(
  "/search/:state",
  asyncHandler(async (req, res) => {
    console.log(googleMapsAPIKey);
    const { state } = req.params;

    const boats = await Boat.findAll({
      where: {
        state: state.toUpperCase(),
      },
      include: [Image, BoatRating, User],
      // include: [{ model: Boat, include: Image }],
    });

    return res.json({
      boats,
    });
  })
);

router.get(
  `/:boatId/bookings`,
  asyncHandler(async (req, res) => {
    const { boatId } = req.params;
    const boatBookings = await Boat.findByPk(boatId, {
      include: [Image, BoatRating, User],
    });

    return res.json({
      boatBookings,
    });
  })
);

//gets specific boat by id
router.get(
  "/:boatId",
  asyncHandler(async (req, res) => {
    const { boatId } = req.params;
    let boatBookings = [];

    const boat = await Boat.findByPk(boatId, {
      include: [
        { model: User, include: [UserRating] },
        Image,
        { model: BoatRating, include: [BoatReview, User] },

        Booking,
      ],
    });

    const boatReviews = await BoatReview.findAll({
      include: [
        { model: User, include: [UserRating] },
        { model: BoatRating, include: [User] },
      ],
    });
    if (boat.Bookings.length >= 1) {
      for (let i = 0; i < boat.Bookings.length; i++) {
        boatBookings.push(new Date(boat.Bookings[i].bookingDate));
      }
    }
    // if (boatReviews.length >= 1) {
    //   for (let i = 0; i < boatReviews.length; i++) {
    //     let curr = boatReviews[i];
    //     if (curr.dataValues.BoatRating) {
    //       continue;
    //     } else {
    //       boatReviewsNoRating.push(curr);
    //     }
    //   }
    // }

    return res.json({
      boat,
      boatBookings,
      boatReviews,
    });
  })
);

const validateBoatAddForm = [
  check("marina").exists({ checkFalsy: true }).withMessage("Please Provide a Marina"),
  check("marina").isLength({ max: 70 }).withMessage("Your marina name must be within 75 characters."),
  check("city").exists({ checkFalsy: true }).withMessage("Please provide a city."),
  check("city").isLength({ max: 50 }).withMessage("City must be within 50 characters."),
  check("state").exists({ checkFalsy: true }).withMessage("Please provide state."),
  check("state").isLength({ max: 2 }).withMessage("State Can only be 2 characters."),
  check("year").exists({ checkFalsy: true }).withMessage("Must provide a year."),
  check("model").exists({ checkFalsy: true }).withMessage("Please a model name."),
  check("price").exists({ checkFalsy: true }).withMessage("please provide a price."),
  handleValidationErrors,
];

//post create a new boat for a user
router.post(
  "/:userId/boats",
  requireAuth,
  validateBoatAddForm,
  asyncHandler(async (req, res) => {
    const { userId, marina, city, state, year, model, accessories, captain, price, schedule } = req.body;

    const newBoat = await Boat.build({
      userId,
      marina,
      city,
      state,
      year,
      model,
      accessories,
      captain,
      price,
      schedule,
    });
    await newBoat.save();
    return res.json({
      newBoat,
    });
  })
);

router.put(
  "/:boatId",
  requireAuth,
  validateBoatAddForm,
  asyncHandler(async (req, res) => {
    const { boatId } = req.params;

    const { userId, marina, city, state, year, model, accessories, captain, price, schedule } = req.body;

    const boatToUpdate = await Boat.findByPk(boatId, {
      include: [Image, BoatRating, User],
    });

    if (userId === boatToUpdate.userId) {
      await boatToUpdate.update({
        marina,
        city,
        state,
        year,
        model,
        accessories,
        captain,
        price,
        schedule,
      });
    }

    res.json({
      boatToUpdate,
    });
  })
);

router.delete(
  "/:boatId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { boatId } = req.params;

    const boatToDelete = await Boat.findByPk(boatId);
    if (boatToDelete) {
      await boatToDelete.destroy();
      res.json({ message: "Successfully Removed Boat" });
    }
  })
);

module.exports = router;
