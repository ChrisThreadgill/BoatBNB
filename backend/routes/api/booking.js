const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Boat, Image, Booking, UserRating, BoatRating } = require("../../db/models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

//TODO SETUP ROUTE TO GET ALL BOOKINGS BY USER ID
//gets all bookings by user ID
router.get(
  "/user/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const today = new Date();
    const bookingsNoBoats = await User.findByPk(userId, {
      include: [
        {
          model: Booking,
          where: {
            bookingDate: {
              [Op.gt]: today,
            },
          },
          include: [{ model: Boat, include: [Image, BoatRating, Booking] }],
        },
      ],
    });
    if (bookingsNoBoats === null) {
      console.log(bookingsNoBoats);
      console.log("workingggggggggggggggg");
      return res.json({});
    } else {
      return res.json({
        bookingsNoBoats,
      });
    }
  })
);
router.get(
  "/provider/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const today = new Date();
    const providerBookings = [];
    const bookingsWithBoats = await User.findByPk(userId, {
      include: [
        {
          model: Booking,

          include: [{ model: Boat, include: [Image, BoatRating, Booking] }],
        },
        {
          model: Boat,
          include: [
            {
              model: Booking,

              include: [{ model: Boat, include: [Image, BoatRating, Booking] }],
            },
          ],
        },
      ],
    });
    const Bookings = [null];
    // console.log(bookingsWithBoats.Bookings.length, "-----------------------------");
    for (let b = 0; b < bookingsWithBoats.Bookings.length; b++) {
      const currBooking = bookingsWithBoats.Bookings[b];
      // console.log(currBooking.dataValues);
      if (currBooking.dataValues.bookingDate < new Date()) {
        // bookingsWithBoats.Bookings.splice(b, 1);
        // console.log(currBooking.dataValues.bookingDate, "------------");
        continue;
        //setting up past personal appointments goes here.
      } else {
        const today = new Date();
        // console.log(currBooking.dataValues.bookingDate < today);
        // console.log(currBooking.dataValues.bookingDate, "workingggggggggggggggggg", "------------");
        // Bookings.push(currBooking);
      }
    }
    bookingsWithBoats["Bookings"] = Bookings;
    // console.log(bookingsWithBoats, "-------------------");
    // console.log(bookingsWithBoats, "------------------");
    if (bookingsWithBoats.Boats.length > 1) {
      for (let i = 0; i < bookingsWithBoats.Boats.length; i++) {
        let currBoat = bookingsWithBoats.Boats[i];
        if (currBoat.Bookings.length < 1) continue;

        for (let b = 0; b < currBoat.Bookings.length; b++) {
          const currBoatBooking = currBoat.Bookings[b];
          if (currBoatBooking.bookingDate < new Date()) {
            // setup new object for past appointments here
            continue;
          } else {
            providerBookings.push({
              id: currBoatBooking.id,
              boatId: currBoatBooking.boatId,
              bookingDate: currBoatBooking.bookingDate,
              checkIn: currBoatBooking.checkIn,
            });
          }
        }
      }
    }
    // console.log(providerBookings, "========== should be all the boats bookings");
    return res.json({
      bookingsWithBoats,
      providerBookings,
    });
  })
);

router.get(
  "/boat/:boatId",
  asyncHandler(async (req, res) => {
    const { boatId } = req.params;
    const bookingsForBoat = await Booking.findAll({
      where: {
        boatId,
      },
      include: [
        {
          model: User,
          include: UserRating,
        },
      ],
    });

    return res.json({
      bookingsForBoat,
    });
  })
);

//post create a new booking for a boat
router.post(
  "/:boatId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { boatId } = req.params;
    const { userId, bookingDate, checkIn } = req.body;

    const newBooking = await Booking.build({
      userId,
      boatId,
      bookingDate,
      checkIn,
    });
    await newBooking.save();
    return res.json({
      newBooking,
    });
  })
);

router.delete(
  "/:bookingId",
  asyncHandler(async (req, res) => {
    const { bookingId } = req.params;

    const bookingToDelete = await Booking.findByPk(bookingId);
    await bookingToDelete.destroy();
    if (bookingToDelete) {
      res.json({ message: "Successfully Cancelled Booking" });
    }
  })
);

module.exports = router;
