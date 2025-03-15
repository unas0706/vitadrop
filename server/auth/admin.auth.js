import asyncErrorHandler from "../utility/asyncErrorHandler.js";
import JsonWebToken from "jsonwebtoken";
import customError from "../utility/customError.js";
import { admin } from "../models/admin.model.js";

const adminAuth = asyncErrorHandler(async (req, res, next) => {
  // let cookie = req.cookies["adminToken"];
  let { token } = req.body;

  if (!token) {
    return next(new customError(400, "Your not Logged In  "));
  }
  let id = JsonWebToken.verify(token, process.env.JWT_SCRETE_KEY);
  if (!id) return next(new customError(400, "Your not authorized "));
  let user = await admin.findById(id.id);
  if (!user) return next(new customError(400, "Your not authorized "));
  req.user = user;

  return next();
});

export default adminAuth;
