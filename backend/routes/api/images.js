const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

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

function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET,
  };
  return s3.getObject(downloadParams).createReadStream();
}

router.get("/:key", (req, res) => {
  console.log("workinggggggggggggggg, in the image request");
  const key = req.params.key;
  console.log(key);
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

router.post(
  "/",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const file = req.file;
    const boatId = req.body.boatId;

    const result = await uploadFile(file);

    const url = result.key;
    if (result.key) {
      const newImage = await Image.build({
        boatId,
        url,
      });
      await newImage.save();

      await unlinkFile(file.path);
      return res.json({
        newImage,
      });
    }
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
