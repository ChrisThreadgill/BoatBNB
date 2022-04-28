const router = require("express").Router();

const asyncHandler = require("express-async-handler");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

router.get(
  "/set-token-cookie",
  asyncHandler(async (_req, res) => {
    const user = await User.findOne({
      where: {
        email: "demo@user.io",
      },
    });
    // console.log(user);
    setTokenCookie(res, user);
    return res.json({ user });
  })
);

router.get("/restore-user", restoreUser, (req, res) => {
  return res.json(req.user);
});

router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
