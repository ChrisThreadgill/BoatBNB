const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Boat, Image } = require("../../db/models");

router.post(
  "/:boatId",

  asyncHandler(async (req, res) => {
    const { boatId } = req.params;
    const { url } = req.body;
    const newImage = await Image.build({
      boatId,
      url,
    });
    await newImage.save();
    return res.json({
      newImage,
    });
  })
);

router.delete(
  "/:imageId",
  asyncHandler(async (req, res) => {
    const { imageId } = req.params;

    const imageToDelete = await Image.findByPk(imageId);
    if (imageToDelete) {
      await imageToDelete.destroy();
      res.json({ message: "Image Removed" });
    }
  })
);

module.exports = router;
