const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Boat, Image, Booking } = require("../../db/models");

//TODO SETUP ROUTE TO GET ALL BOOKINGS BY USER ID
//gets all bookings by user ID
router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    // console.log("working");
    const { userId } = req.params;
    const boats = await Booking.findAll({
      where: { userId },
    });
    // console.log(boats);
    return res.json({
      boats,
    });
  })
);

//TODO SETUP ROUTE TO GET ALL BOOKINGS BY BOAT ID
//gets all bookings by boat ID
router.get(
  "/:boatId",
  asyncHandler(async (req, res) => {
    // console.log("working");
    const { boatId } = req.params;
    const bookings = await Boat.findByPk(boatId, {
      include: Booking,
    });
    // console.log(boats);
    return res.json({
      bookings,
    });
  })
);

//post create a new boat for a user
router.post(
  "/:boatId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, boatId, startDate, endDate, checkIn, checkOut } = req.body;
    // console.log(userId);
    const newBooking = await Booking.build({
      userId,
      boatId,
      startDate,
      endDate,
      checkIn,
      checkOut,
    });
    await newBooking.save();
    return res.json({
      newBooking,
    });
  })
);

module.exports = router;
