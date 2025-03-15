import { admin } from "../models/admin.model.js";
import { BloodBank } from "../models/bloodBank.model.js";
import asyncErrorHandler from "../utility/asyncErrorHandler.js";
import customError from "../utility/customError.js";

export const addAdmin = asyncErrorHandler(async (req, res, next) => {
  await admin.create(req.body);
  res.status(200).json({
    sucess: true,
    message: "Admin created successfully",
  });
});

export const adminLogin = asyncErrorHandler(async (req, res, next) => {
  let { mail, password } = req.body;
  if (!mail || !password) {
    return next(new customError(400, "Please fill the form"));
  }
  const user = await admin.findOne({ mail });
  if (!user) {
    return next(
      new customError(400, "No admin with these credentails are available")
    );
  }
  let pwdMatched = user.password == password;

  if (!pwdMatched) {
    return next(new customError(400, "Incorrect password"));
  }

  let token = await user.generateJWT();

  res.status(200).json({
    sucess: true,
    user,
    token,
  });
});

export const addBloodBank = asyncErrorHandler(async (req, res, next) => {
  let { name, password, contact, pincode, address, operatingHours, inventory } =
    req.body.bb;
  if (
    !name ||
    !password ||
    !contact ||
    !address ||
    !operatingHours ||
    !pincode
  ) {
    return next(new customError(400, "Please fill the form"));
  }
  await BloodBank.create({
    name,
    password,
    contact,
    address,
    operatingHours,
    pincode,
    inventory,
  });
  res.status(201).json({
    sucess: true,
    message: "Blood Bank created successfully",
  });
});

export const me = (req, res, next) => {
  res.status(200).json({
    admin: req.user,
  });
};

// export const changePwd = asyncErrorHandler(async (req, res, next) => {
//   let { oldpwd, newpwd } = req.body;
//   const user = await BloodBank.findById(req.user.id);
//   let pwdMatched = await user.comparePwd(oldpwd);

//   if (!pwdMatched) {
//     return next(new customError(400, "Incorrect password"));
//   }

//   const updatedBank = await BloodBank.findByIdAndUpdate(
//     req.user.id,
//     {
//       password: newpwd,
//     },
//     {
//       new: true,
//     }
//   );

//   res.status(200).json({
//     sucess: true,
//     user: updatedBank,
//   });
// });
