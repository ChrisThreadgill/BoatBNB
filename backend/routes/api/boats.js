const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");
const { googleMapsAPIKey } = require("../../config");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Boat, Image, Booking, BoatRating, BoatReview, UserRating } = require("../../db/models");
const {
  singlePublicFileUpload,
  singleMulterUpload,
  multipleMulterUpload,
  multiplePublicFileUpload,
} = require("../aws");

//gets all boats
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { boatId } = req.body;
    // console.log(req.body, "-------------------- in the get all route for some goddamn reason");
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
    const { state } = req.params;

    const boats = await Boat.findAll({
      where: {
        state: state.toUpperCase(),
      },
      include: [Image, BoatRating, User],
      // include: [{ model: Boat, include: Image }],
    });
    // console.log(boats, "oooooooooooooooooooooboatssssssssssssss");

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

router.get(
  "/:userId/boats",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const boats = await Boat.findAll({
      where: {
        userId,
      },
      include: [Image, BoatRating, User],
      // include: [{ model: Boat, include: Image }],
    });

    return res.json({
      boats,
    });
  })
);

const validateBoatAddForm = [
  check("address").exists({ checkFalsy: true }).withMessage("Please Provide a Marina"),
  check("address").isLength({ max: 100 }).withMessage("Your address must be within 100 characters."),
  check("city").exists({ checkFalsy: true }).withMessage("Please provide a city."),
  check("city").isLength({ max: 100 }).withMessage("City must be within 100 characters."),
  check("state").exists({ checkFalsy: true }).withMessage("Please provide state."),
  check("state").isLength({ max: 2 }).withMessage("State Can only be 2 characters."),
  check("year").exists({ checkFalsy: true }).withMessage("Must provide a year."),
  check("model").exists({ checkFalsy: true }).withMessage("Please a model name."),
  check("model").isLength({ max: 100 }).withMessage("Model name must be within 100 characters."),
  check("price").exists({ checkFalsy: true }).withMessage("please provide a price."),
  handleValidationErrors,
];

//post create a new boat for a user
router.post(
  "/:userId/boats",
  requireAuth,
  validateBoatAddForm,
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { address, city, state, year, model, description, price, captain, lat, lng } = req.body;

    const boat = await Boat.build({
      userId,
      address,
      city,
      state,
      year,
      model,
      description,
      price,
      lat,
      lng,
      captain,
    });
    await boat.save();
    return res.json({
      boat,
    });
  })
);
//post new image for boat
router.post("/:boatId/image", requireAuth);

router.post(
  "/:boatId/image",
  singleMulterUpload("image"),
  // multipleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const { boatId } = req.params;
    const url = await singlePublicFileUpload(req.file);

    const image = await Image.create({
      boatId,
      url,
    });
    // console.log(image);
    // return res.json({
    //   user,
    // });
    // console.log(user, "-=---------------");
  })
);
router.post(
  "/:boatId/images",
  // singleMulterUpload("image"),
  multipleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const { boatId } = req.params;
    // console.log("kdsajg;lsdajgf;lkjsad-========", boatId);
    const urls = await multiplePublicFileUpload(req.files);
    // const url = await singlePublicFileUpload(req.file);
    // console.log(urls, "jdsklagjlskadjglksdj--------------");
    // const user = await User.findByPk(userId);
    const imagesArr = [];
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const image = await Image.create({
        boatId,
        url,
      });
      imagesArr.push(image);
    }
    // console.log(imagesArr);
    // const image = await Image.create({
    //   boatId,
    //   url,
    // });
    // console.log(image);
    // return res.json({
    //   user,
    // });
    // console.log(user, "-=---------------");
  })
);

// //multiple image upload
// router.post(
//   "/:boatId/images",
//   // singleMulterUpload("image"),

//   multipleMulterUpload("image"),
//   asyncHandler(async (req, res) => {
//     const { boatId } = req.params;
//     console.log("kdsajg;lsdajgf;lkjsad-========", boatId);
//     console.log(req.file, "--------------------");

//     const urls = await multiplePublicFileUpload(req.file);
//     console.log(urls, "jdsklagjlskadjglksdj--------------");
//     // const user = await User.findByPk(userId);
//     // const image = await Image.create({
//     //   boatId,
//     //   url,
//     // });
//     // console.log(image);
//     // return res.json({
//     //   user,
//     // });
//     // console.log(user, "-=---------------");
//   })
// );

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
