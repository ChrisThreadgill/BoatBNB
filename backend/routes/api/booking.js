const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Boat, Image, Booking, UserRating } = require("../../db/models");

//TODO SETUP ROUTE TO GET ALL BOOKINGS BY USER ID
//gets all bookings by user ID
router.get(
  "/user/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const bookingsForSpecificUser = await Booking.findAll({
      where: {
        userId,
      },
      include: [{ model: Boat, include: Image }],
    });

    return res.json({
      bookingsForSpecificUser,
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

//post create a new boat for a user
router.post(
  "/:boatId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, boatId, bookingDate, checkIn, checkOut } = req.body;

    const newBooking = await Booking.build({
      userId,
      boatId,
      bookingDate,
      checkIn,
      checkOut,
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
    if (bookingToDelete) {
      await bookingToDelete.destroy();
      res.json({ message: "Successfully Cancelled Booking" });
    }
  })
);

module.exports = router;
