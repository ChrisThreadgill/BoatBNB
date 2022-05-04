const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Boat, Image, Booking } = require("../../db/models");

//gets all boats
router.get(
  "/",
  asyncHandler(async (req, res) => {
    // console.log("working");
    const boats = await Boat.findAll({
      include: Image,
    });
    // console.log(boats);
    return res.json({
      boats,
    });
  })
);

//TODO COME BACK TO THIS GET BOATS WITH SPECIFIC RATINGS

// router.get(
//   "/boat/:boatId",
//   asyncHandler(async (req, res) => {
//     // console.log("working");
//     const { boatId } = req.params;
//     const boatRatings = await BoatRating.findAll({
//       where: {
//         boatId,
//         average: {
//           [Op.gt]: 2,
//         },
//       },
//     });
//     // console.log(boats);
//     return res.json({
//       boatRatings,
//     });
//   })
// );

router.get(
  `/:boatId/bookings`,
  asyncHandler(async (req, res) => {
    const { boatId } = req.params;
    const boatBookings = await Boat.findByPk(boatId, {
      include: Booking,
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
    // console.log("working");
    const { boatId } = req.params;
    // console.log(boatId, "------------");
    const boat = await Boat.findByPk(boatId, {
      include: Image,
    });
    // console.log(boat);
    return res.json({
      boat,
    });
  })
);

//post create a new boat for a user
router.post(
  "/:userId/boats",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, marina, city, state, year, model, accessories, captain, price, schedule } = req.body;
    // console.log(userId);
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

  asyncHandler(async (req, res) => {
    console.log(req.body);
    const { boatId } = req.params;

    const { userId, marina, city, state, year, model, accessories, captain, price, schedule } = req.body;

    const boatToUpdate = await Boat.findByPk(boatId);

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
