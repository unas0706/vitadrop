import asyncErrorHandler from "../utility/asyncErrorHandler.js";
import JsonWebToken from "jsonwebtoken";
import customError from "../utility/customError.js";
import { BloodBank } from "../models/bloodBank.model.js";

const bloodBankAuth = asyncErrorHandler(async (req, res, next) => {
  // let cookie = req.cookies["BloodBankToken"];
  let { token } = req.body;

  if (!token) {
    return next(new customError(400, "Your not Logged In  "));
  }
  let id = JsonWebToken.verify(token, process.env.JWT_SCRETE_KEY);
  if (!id) return next(new customError(400, "Your not authorized "));
  let user = await BloodBank.findById(id.id);
  if (!user) return next(new customError(400, "Your not authorized "));
  req.user = user;
  return next();
});

export default bloodBankAuth;
