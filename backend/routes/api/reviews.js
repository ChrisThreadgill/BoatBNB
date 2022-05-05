const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Boat, Image, Booking, BoatRating, BoatReview, UserRating, UserReview } = require("../../db/models");

//all reviews for specific boat
router.get(
  "/boat/:boatId",
  asyncHandler(async (req, res) => {
    console.log("working");
    const { boatId } = req.params;
    const boatReviews = await BoatReview.findAll({
      where: {
        boatId,
      },
      include: [
        {
          model: User,
          include: UserRating,
        },
        BoatRating,
      ],
    });
    // console.log(boats);
    return res.json({
      boatReviews,
    });
  })
);

//all reviews for specific user
router.get(
  "/user/:userId",
  asyncHandler(async (req, res) => {
    // console.log("working");
    const { userId } = req.params;
    const userReviews = await UserReview.findAll({
      where: {
        userId,
      },
    });
    // console.log(boats);
    return res.json({
      userReviews,
    });
  })
);

router.put(
  "/boat/:reviewId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    const { userId, review } = req.body;
    // console.log(userId);

    const updatedBoatReview = await BoatReview.findByPk(reviewId);
    if (userId === updatedBoatReview.userId) {
      await updatedBoatReview.update({
        review,
      });

      await updatedBoatReview.save();
      return res.json({
        updatedBoatReview,
      });
    } else {
      res.json("You Cannot Update Others Reviews");
    }
  })
);

//edit review for user
router.put(
  "/user/:reviewId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    const { reviewerId, content } = req.body;
    // console.log(userId);

    const updatedUserReview = await UserReview.findByPk(reviewId);
    if (reviewerId === updatedUserReview.reviewerId) {
      await updatedUserReview.update({
        content,
      });

      await updatedUserReview.save();
      return res.json({
        updatedUserReview,
      });
    } else {
      res.json("You Cannot Update Others Reviews");
    }
  })
);

//post new rating for boat
router.post(
  "/boatReview",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, boatId, review } = req.body;
    // console.log(userId);

    const newBoatReview = await BoatReview.build({
      userId,
      boatId,
      review,
    });

    await newBoatReview.save();
    return res.json({
      newBoatReview,
    });
  })
);

//post new review for user
router.post(
  "/userReview",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, reviewerId, content } = req.body;
    // console.log(userId);

    const newUserReview = await UserReview.build({
      userId,
      reviewerId,
      content,
    });

    await newUserReview.save();
    return res.json({
      newUserReview,
    });
  })
);

//delete a boat review
router.delete(
  "/boats/:reviewId",
  asyncHandler(async (req, res) => {
    const { reviewId } = req.params;

    const boatReviewToDelete = await BoatReview.findByPk(reviewId);
    if (boatReviewToDelete) {
      await boatReviewToDelete.destroy();
      res.json({ message: "Successfully Deleted Review" });
    }
  })
);

//delete a user review
router.delete(
  "/users/:reviewId",
  asyncHandler(async (req, res) => {
    const { reviewId } = req.params;

    const userReviewToDelete = await UserReview.findByPk(reviewId);
    if (userReviewToDelete) {
      await userReviewToDelete.destroy();
      res.json({ message: "Successfully Deleted Review" });
    }
  })
);

module.exports = router;
