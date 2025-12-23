const express = require("express");
const upload = require("../middleware/upload");
const { uploadFile } = require("../controllers/upload");

const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "Upload successful",
    fileUrl: req.file.location,
  });
});

module.exports = router;
