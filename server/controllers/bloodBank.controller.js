import { BloodBank } from "../models/bloodBank.model.js";
import asyncErrorHandler from "../utility/asyncErrorHandler.js";
import customError from "../utility/customError.js";
import donor from "../models/donor.model.js";
import Transaction from "../models/transaction.model.js";

export const bloodBankLogin = asyncErrorHandler(async (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return next(new customError(400, "Please fill the form"));
  }
  const user = await BloodBank.findOne({ "contact.email": email });
  if (!user) {
    return next(
      new customError(400, "No blood bank with these credentails are available")
    );
  }

  // let pwdMatched = await user.comparePwd(password);

  if (password !== user.password) {
    return next(new customError(400, "Incorrect password"));
  }

  let token = await user.generateJWT();

  res.status(200).json({
    sucess: true,
    user,
    token,
  });
});

export const updateData = asyncErrorHandler(async (req, res, next) => {
  let id = req.user.id;
  const updatedBank = await BloodBank.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    sucess: true,
    user: updatedBank,
  });
});

// export const createTransaction = asyncErrorHandler(async (req, res, next) => {
//   let { phone, bloodType, units } = req.body;

//   let bloodBankId = req.user.id;

//   const donorUser = await donor.findOne({ phone });

//   if (!donorUser) {
//     return res.status(404).json({ success: false, message: "Donor not found" });
//   }

//   let donorId = donorUser.id;

//   let preTransactions = req.user.transaction;
//   preTransactions.push({
//     phone,
//     bloodType,
//     units,
//     bloodBankId,
//     donorId,
//   });

//   let preTransactionsDonor = donorUser.transaction;

//   preTransactionsDonor.push({
//     phone,
//     bloodType,
//     units,
//     bloodBankId,
//     donorId,
//   });

//   const updatedBank = await BloodBank.findByIdAndUpdate(
//     bloodBankId,
//     { transaction: preTransactions },
//     {
//       new: true,
//     }
//   );

//   await donor.findByIdAndUpdate(
//     donorId,
//     { transaction: preTransactionsDonor },
//     {
//       new: true,
//     }
//   );

//   res.status(200).json({
//     success: true,
//     user: updatedBank,
//   });
// });

export const createTransaction = asyncErrorHandler(async (req, res, next) => {
  let { phone, bloodType, units } = req.body;

  let bloodBankId = req.user.id;

  const donorUser = await donor.findOne({ phone });

  if (!donorUser) {
    return res.status(404).json({ success: false, message: "Donor not found" });
  }

  let donorId = donorUser.id;

  let transaction = await Transaction.create({
    phone,
    bloodType,
    units,
    bloodBankId,
    donorId,
  });
  res.status(200).json({
    sucess: true,
    transaction,
  });
});

export const changePwd = asyncErrorHandler(async (req, res, next) => {
  let { oldpwd, newpwd } = req.body;
  const user = await BloodBank.findById(req.user.id);
  // let pwdMatched = await user.comparePwd(oldpwd);

  let pwdMatched = user.password == oldpwd;
  if (!pwdMatched) {
    return next(new customError(400, "Incorrect password"));
  }

  const updatedBank = await BloodBank.findByIdAndUpdate(
    req.user.id,
    {
      password: newpwd,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    sucess: true,
    user: updatedBank,
  });
});

export const checkTransaction = asyncErrorHandler(async (req, res, next) => {
  let { transactionId } = req.query;

  let transaction = await Transaction.findById(transactionId);

  res.status(200).json({
    sucess: true,
    transaction,
  });
});

export const checkoutTransaction = asyncErrorHandler(async (req, res, next) => {
  let { transactionId } = req.query;

  let transaction = await Transaction.findByIdAndUpdate(
    transactionId,
    {
      $set: {
        valid: false,
      },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    sucess: true,
    transaction,
  });
});

export const Me = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    sucess: true,
    bloodbank: req.user,
  });
});

export const allTransactions = asyncErrorHandler(async (req, res, next) => {
  let id = req.user.id;

  let transactions = await Transaction.find({ bloodBankId: id });
  res.status(200).json({
    sucess: true,
    transactions,
  });
});

export const deleteTransaction = asyncErrorHandler(async (req, res, next) => {
  let id = req.params.id;
  await Transaction.findByIdAndDelete(id);
  res.status(200).json({
    sucess: true,
    message: "Transaction deleted successfully",
  });
});

export const logout = asyncErrorHandler(async (req, res, next) => {
  res.cookie("BloodBankToken", "").status(200).json({
    sucess: true,
    message: "Bloodbank logged ou0t successfully",
  });
});

export const userTransaction = asyncErrorHandler(async (req, res, next) => {
  let { id } = req.body;
  let transactions = await Transaction.find({ donorId: id, valid: true });

  res.status(200).json({
    sucess: true,
    transactions,
  });
});
