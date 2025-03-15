import mongoose from "mongoose";
import bcrypt from "bcrypt";
import customError from "../utility/customError.js";
import jsonwebtoken from "jsonwebtoken";

const bloodBankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
  },
  pincode: {
    type: String,
    required: true,
  },
  contact: {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  address: {
    type: String,
    required: true,
  },
  operatingHours: {
    open: {
      type: String,
      required: true,
    },
    close: {
      type: String,
      required: true,
    },
  },
  inventory: [
    {
      bloodType: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      },
      units: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  ],
});

// bloodBankSchema.pre("save", async function (next) {
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

// bloodBankSchema.methods.comparePwd = async function (pwd) {
//   try {
//     return await bcrypt.compare(pwd, this.password);
//   } catch (error) {
//     new customError(500, "Error while comparing passwords");
//   }
// };

bloodBankSchema.methods.generateJWT = async function () {
  return jsonwebtoken.sign({ id: this.id }, process.env.JWT_SCRETE_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const BloodBank = mongoose.model("BloodBank", bloodBankSchema);
