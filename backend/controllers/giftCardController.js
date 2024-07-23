const mongoose = require("mongoose");
const GiftCard = require("../models/giftCardModel");
const ErrorHandler = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createGiftCard = catchAsyncErrors(async (req, res, next) => {
  try {
    const giftCard = await GiftCard.create(req.body);

    res.status(201).json({
      success: true,
      giftCard,
    });
  } catch (error) {
    next(error);
  }
});

exports.getAllGiftCards = catchAsyncErrors(async (req, res, next) => {
  const giftCardsCount = await GiftCard.countDocuments();
  const resultPerPage = 1000;

  const giftCards = await GiftCard.find();

  res.status(200).json({
    success: true,
    giftCards,
    giftCardsCount,
    resultPerPage,
  });
});

exports.getGiftCardDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const giftCard = await GiftCard.findById(req.params.id);

    if (!giftCard) {
      return next(new ErrorHandler("Gift card not found", 404));
    }

    res.status(200).json({
      success: true,
      giftCard,
    });
  } catch (error) {
    next(error);
  }
});

exports.updateGiftCard = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;

    let giftCard = await GiftCard.findById(id);

    if (!giftCard) {
      return next(new ErrorHandler("Gift card not found", 404));
    }

    giftCard = await GiftCard.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      giftCard,
    });
  } catch (error) {
    next(error);
  }
});

exports.deleteGiftCard = catchAsyncErrors(async (req, res, next) => {
  try {
    const giftCard = await GiftCard.findById(req.params.id);

    if (!giftCard) {
      return next(new ErrorHandler("Gift card not found", 404));
    }

    await giftCard.deleteOne();

    res.status(200).json({
      success: true,
      message: "Gift card deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});
