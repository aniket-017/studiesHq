const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const giftController = require("../controllers/giftController.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/importGift", upload.single("file"), giftController.importGiftCards);

module.exports = router;
