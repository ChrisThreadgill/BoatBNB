const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

router.post(
  "/users",
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.signup({ firstName, lastName, email, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

router.post(
  "/providers",
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const roleId = 1;
    const user = await User.signup({ firstName, lastName, email, password, roleId });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

module.exports = router;
