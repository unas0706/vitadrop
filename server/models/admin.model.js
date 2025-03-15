import mongoose from "mongoose";
import bcrypt from "bcrypt";
import customError from "../utility/customError.js";
import jsonwebtoken from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// adminSchema.pre("save", async function (next) {
//   if (this.isModified(this.password)) {
//     return next();
//   }
//   try {
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   } catch (error) {
//     next(new customError(500, "Error while hashing"));
//   }
// });

// adminSchema.methods.comparePwd = async function (pwd) {
//   try {
//     return await bcrypt.compare(pwd, this.password);
//   } catch (error) {
//     new customError(500, "Error while comparing passwords");
//   }
// };

adminSchema.methods.generateJWT = async function () {
  return jsonwebtoken.sign({ id: this.id }, process.env.JWT_SCRETE_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const admin = mongoose.model("admin", adminSchema);
