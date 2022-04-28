const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

router.get("/", (req, res) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.send("hello World");
});

router.post("/test", (req, res) => {
  res.json({ requestBody: req });
});

module.exports = router;
