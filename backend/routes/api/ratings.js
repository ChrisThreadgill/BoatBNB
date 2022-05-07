const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Boat, Image, Booking, BoatRating, BoatReview, UserRating, UserReview } = require("../../db/models");

//all ratings for specific boat
router.get(
  "/boat/:boatId",
  asyncHandler(async (req, res) => {
    const { boatId } = req.params;
    const boatRatings = await BoatRating.findAll({
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
      boatRatings,
    });
  })
);

router.get(
  "/boat/:boatId/noReview",
  asyncHandler(async (req, res) => {
    const { boatId } = req.params;
    const boatRatings = await BoatRating.findAll({
      where: {
        boatId,
        boatReviewId: null,
      },
      include: [
        {
          model: User,
          include: UserRating,
        },
      ],
    });

    return res.json({
      boatRatings,
    });
  })
);

//all ratings for specific user
router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const userRatings = await UserRating.findAll({
      where: {
        userId,
      },
    });

    return res.json({
      userRatings,
    });
  })
);

router.put(
  "/brEdit/:boatRatingId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { boatRatingId } = req.params;

    const { userId, boatId, cleanliness, functional, comfort, average, boatReviewId } = req.body;

    const boatRatingToUpdate = await BoatRating.findByPk(boatRatingId);

    if (userId === boatRatingToUpdate.userId) {
      await boatRatingToUpdate.update({
        userId,
        boatId,
        cleanliness,
        functional,
        comfort,
        average,
        boatReviewId,
      });
      return res.json({
        boatRatingToUpdate,
      });
    } else {
      res.json("You Cannot Update Others Ratings");
    }
  })
);

router.put(
  "/urEdit/:userRatingId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userRatingId } = req.params;

    const { userId, reviewerId, friendliness, punctuality, trustworthy, average, userReviewId } = req.body;

    const userRatingToUpdate = await UserRating.findByPk(userRatingId);

    if (reviewerId === userRatingToUpdate.reviewerId) {
      await userRatingToUpdate.update({
        userId,
        reviewerId,
        friendliness,
        punctuality,
        trustworthy,
        average,
        userReviewId,
      });
      return res.json({
        userRatingToUpdate,
      });
    } else {
      res.json("You Cannot Update Others Ratings");
    }
  })
);

//post a new rating for a boat
router.post(
  "/boatRating",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, boatId, cleanliness, functional, comfort, average, boatReviewId } = req.body;

    const newBoatRating = await BoatRating.build({
      userId,
      boatId,
      cleanliness,
      functional,
      comfort,
      average,
      boatReviewId,
    });

    await newBoatRating.save();
    return res.json({
      newBoatRating,
    });
  })
);

//post new rating for user
router.post(
  "/userRating",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, reviewerId, friendliness, punctuality, trustworthy, average, userReviewId } = req.body;

    const newUserRating = await UserRating.build({
      userId,
      reviewerId,
      friendliness,
      punctuality,
      trustworthy,
      average,
      userReviewId,
    });

    await newUserRating.save();
    return res.json({
      newUserRating,
    });
  })
);

//delete a boat rating?
router.delete(
  "/boats/:boatRatingId",
  asyncHandler(async (req, res) => {
    const { boatRatingId } = req.params;

    const boatRatingToDelete = await BoatRating.findByPk(boatRatingId);
    if (boatRatingToDelete) {
      await boatRatingToDelete.destroy();
      res.json({ message: "Successfully Cancelled Booking" });
    }
  })
);

//delete a user rating?
router.delete(
  "/users/:userRatingId",
  asyncHandler(async (req, res) => {
    const { userRatingId } = req.params;

    const userRatingToDelete = await UserRating.findByPk(userRatingId);
    if (userRatingToDelete) {
      await userRatingToDelete.destroy();
      res.json({ message: "Successfully Deleted UserRating" });
    }
  })
);

module.exports = router;
