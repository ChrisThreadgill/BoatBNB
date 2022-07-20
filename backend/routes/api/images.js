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

// const singleMulterUpload = (nameOfKey) => multer({ storage: storage }).single(nameOfKey);

// const storage = multer.memoryStorage({
//   destination: function (req, file, callback) {
//     callback(null, "");
//   },
// });

// const singlePublicFileUpload = async (file) => {
//   const { originalname, mimetype, buffer } = await file;
//   const path = require("path");
//   // name of the file in your S3 bucket will be the date in ms plus the extension name
//   const Key = new Date().getTime().toString() + path.extname(originalname);
//   const uploadParams = {
//     Bucket: process.env.AWS_BUCKET,
//     Key,
//     Body: buffer,
//     ACL: "public-read",
//   };
//   const result = await s3.upload(uploadParams).promise();
//   console.log(result, "----------------");

//   // save the name of the file in your bucket as the key in your database to retrieve for later
//   // return result.Location;
// };
// router.post(
//   "/",
//   singleMulterUpload("image"),
//   asyncHandler(async (req, res) => {
//     // const { email, password, username } = req.body;
//     console.log(req.file, "---------------------------");
//     const profileImageUrl = await singlePublicFileUpload(req.file);
//     console.log(profileImageUrl, "========================");
//     // const user = await User.signup({
//     //   username,
//     //   email,
//     //   password,
//     //   profileImageUrl,
//     // });

//     // setTokenCookie(res, user);

//     // return res.json({
//     //   user,
//     // });
//   })
// );

// router.post(
//   "/:boatId",

//   asyncHandler(async (req, res) => {
//     const { boatId } = req.params;
//     const { url } = req.body;
//     const newImage = await Image.build({
//       boatId,
//       url,
//     });
//     await newImage.save();
//     return res.json({
//       newImage,
//     });
//   })
// );

// function uploadFile(file) {
//   const fileStream = fs.createReadStream(file.path);

//   const uploadParams = {
//     Bucket: process.env.AWS_BUCKET,
//     Body: fileStream,
//     Key: file.filename,
//   };
//   return s3.upload(uploadParams).promise();
// }
// function getFileStream(fileKey) {
//   const downloadParams = {
//     Key: fileKey,
//     Bucket: process.env.AWS_BUCKET,
//   };
//   return s3.getObject(downloadParams).createReadStream();
// }

// router.get("/:key", (req, res) => {
//   const key = req.params.key;

//   const readStream = getFileStream(key);
//   readStream.pipe(res);
// });

// // router.post(
// //   "/",
// //   upload.single("image"),
// //   asyncHandler(async (req, res) => {
// //     const file = req.file;
// //     const boatId = req.body.boatId;

// //     const result = await uploadFile(file);

// //     const url = result.key;

// //     if (result.key) {
// //       if (boatId) {
// //         const newImage = await Image.build({
// //           boatId,
// //           url,
// //         });
// //         await newImage.save();

// //         await unlinkFile(file.path);
// //         return res.json({
// //           newImage,
// //         });
// //       } else {
// //         await unlinkFile(file.path);
// //         return res.json({ url });
// //       }
// //     }
// //   })
// // );

// router.delete(
//   "/:imageId",
//   asyncHandler(async (req, res) => {
//     const { imageId } = req.params;

//     const imageToDelete = await Image.findByPk(imageId);
//     if (imageToDelete) {
//       await imageToDelete.destroy();
//       res.json({ message: "Image Removed" });
//     }
//   })
// );

module.exports = router;
