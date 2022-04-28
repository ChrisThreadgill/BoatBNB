const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
// const asyncHandler = require("express-async-handler");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

// router.get(
//   "/set-token-cookie",
//   asyncHandler(async (_req, res) => {
//     const user = await User.findOne({
//       where: {
//         email: "demo@user.io",
//       },
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
//   })
// );

// router.get("/restore-user", restoreUser, (req, res) => {
//   return res.json(req.user);
// });

// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user);
// });

// router.post("/test", function (req, res) {
//   res.json({ requestBody: req.body });
// });

module.exports = router;
