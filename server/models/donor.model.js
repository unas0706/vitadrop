import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },

  bloodType: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
  },
});

donorSchema.methods.generateJWT = async function () {
  return jsonwebtoken.sign({ id: this.id }, process.env.JWT_SCRETE_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const donor = mongoose.model("Donor", donorSchema);

export default donor;
