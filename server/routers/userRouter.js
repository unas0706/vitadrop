import express from "express";
import {
  deleteDonor,
  donorRegistration,
  editDetails,
  getAllBloodBanks,
  getAllDonors,
  getAllTransactions,
  getMyDetails,
  login,
  logout,
  verifyNumber,
} from "../controllers/donor.controller.js";
import donorAuth from "../auth/donor.auth.js";

const userRouter = express.Router();

userRouter.post("/registerDonor", donorRegistration);
userRouter.post("/donor/login", verifyNumber);
userRouter.post("/donorAllTransactions", donorAuth, getAllTransactions);
userRouter.post("/donor", donorAuth, getMyDetails);
userRouter.patch("/donor/edit", donorAuth, editDetails);
userRouter.post("/donor/delete", donorAuth, deleteDonor);
userRouter.get("/donor/logout", donorAuth, logout);
userRouter.get("/allbloodbanks", getAllBloodBanks);
userRouter.get("/alldonors", getAllDonors);
userRouter.post("/donorLogin", login);

export default userRouter;
