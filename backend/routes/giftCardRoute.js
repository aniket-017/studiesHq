const express = require("express");
const {
  getAllGiftCards,
  createGiftCard,
  updateGiftCard,
  deleteGiftCard,
  getGiftCardDetails,
} = require("../controllers/giftCardController");
const router = express.Router();

router.route("/gift-cards").get(getAllGiftCards);
router.route("/gift-card/new").post(createGiftCard);
router.route("/gift-card/:id").delete(deleteGiftCard);
router.route("/gift-card/:id").put(updateGiftCard);
router.route("/gift-card/:id").get(getGiftCardDetails);

module.exports = router;
