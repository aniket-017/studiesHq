const GiftCard = require("../models/giftCardModel");
const csv = require("csvtojson");

const importGiftCards = async (req, res) => {
  try {
    const giftCardData = [];

    await csv()
      .fromFile(req.file.path)
      .then((response) => {
        response.forEach((row) => {
          giftCardData.push({
            firstName: row.firstName,
            lastName: row.lastName,
            email: row.email,
            amount: row.amount,
            giftCardType: row.giftCardType,
          });
        });
      });

    await GiftCard.insertMany(giftCardData);

    res.status(200).json({ success: true, message: "Gift cards imported successfully" });
  } catch (error) {
    console.error("Error importing gift cards:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { importGiftCards };
