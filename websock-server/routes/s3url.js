const express = require("express");
const router = express.Router();
const generateUploadURL = require("../src/s3");

router.get("", async (req, res) => {
  console.log("gettings url");
  const url = await generateUploadURL();

  console.log("got the url");
  res.send({ url });
});

module.exports = router;
