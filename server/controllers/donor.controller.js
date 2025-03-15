import { BloodBank } from "../models/bloodBank.model.js";
import donor from "../models/donor.model.js";
import Transaction from "../models/transaction.model.js";
import asyncErrorHandler from "../utility/asyncErrorHandler.js";
import customError from "../utility/customError.js";
import twilio from "twilio";

export const verifyNumber = asyncErrorHandler(async (req, res, next) => {
  let { phone } = req.body;
  if (!phone) {
    return next(new customError(400, "Please Enter a phone number"));
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);
  const otp = Math.floor(Math.random() * 1000000);

  await client.messages.create({
    body: `Your OTP code is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });

  res.status(200).json({
    sucess: true,
    otp,
  });
});

export const donorRegistration = asyncErrorHandler(async (req, res, next) => {
  let { phone, name, bloodType, address, pincode, isPublic } = req.body;
  if (!phone || !name || !bloodType || !address || !pincode) {
    return next(new customError(400, "Please fill the form"));
  }

  const exist = await donor.findOne({ phone });
  if (exist) {
    return next(new customError(400, "User already exist"));
  }

  // const accountSid = process.env.TWILIO_ACCOUNT_SID;
  // const authToken = process.env.TWILIO_AUTH_TOKEN;
  // const client = twilio(accountSid, authToken);
  // const otp = Math.floor(Math.random() * 1000000);
  // await client.messages.create({
  //   body: `Your OTP code is: ${otp}`,
  //   from: process.env.TWILIO_PHONE_NUMBER,
  //   to: phone,
  // });
  let user = await donor.create({
    phone,
    name,
    bloodType,
    pincode,
    address,
    isPublic,
  });

  let token = await user.generateJWT();

  res
    .cookie("donorToken", token, {
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      sucess: "true",
      user,
      token,
    });
});

export const login = asyncErrorHandler(async (req, res, next) => {
  let { phone } = req.body;

  const exist = await donor.findOne({ phone });
  if (!exist) {
    return next(new customError(400, "User doesn't  exist"));
  }
  let token = await exist.generateJWT();

  res.status(200).json({
    sucess: "true",
    exist,
    token,
  });
});

export const getMyDetails = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    user: req.user,
  });
};

export const getAllTransactions = asyncErrorHandler(async (req, res, next) => {
  let id = req.user.id;

  let transactions = await Transaction.find({ donorId: id });

  res.status(200).json({
    sucess: true,
    transactions,
  });
});

export const editDetails = asyncErrorHandler(async (req, res, next) => {
  let id = req.user.id;
  let change = req.body;

  let user = await donor.findByIdAndUpdate(
    id,
    {
      $set: {
        ...change,
      },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    sucess: true,
    user,
  });
});

export const deleteDonor = asyncErrorHandler(async (req, res, next) => {
  let id = req.user.id;
  await donor.findByIdAndDelete(id);
  res.status(200).json({
    sucess: true,
    message: "Donor deleted successfully",
  });
});

export const logout = asyncErrorHandler(async (req, res, next) => {
  res.cookie("donorToken", "").status(200).json({
    sucess: true,
    message: "Donor log out successfully",
  });
});

export const getAllBloodBanks = asyncErrorHandler(async (req, res, next) => {
  let { pincode } = req.query;

  let bloodbanks = await BloodBank.find({ pincode });
  res.status(200).json({
    sucess: true,
    bloodbanks,
  });
});

export const getAllDonors = asyncErrorHandler(async (req, res, next) => {
  let { pincode } = req.query;

  let donors = await donor.find({ pincode, isPublic: true });
  res.status(200).json({
    sucess: true,
    donors,
  });
});
