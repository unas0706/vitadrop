import express from "express";
import {
  allTransactions,
  bloodBankLogin,
  changePwd,
  checkoutTransaction,
  checkTransaction,
  createTransaction,
  deleteTransaction,
  logout,
  Me,
  updateData,
  userTransaction,
} from "../controllers/bloodBank.controller.js";
import bloodBankAuth from "../auth/bloodBank.auth.js";
import { login } from "../controllers/donor.controller.js";

const bloodBankRouter = express.Router();

bloodBankRouter.post("/bloodBank/login", bloodBankLogin);
bloodBankRouter.patch("/update", bloodBankAuth, updateData);
bloodBankRouter.patch("/changePassword", bloodBankAuth, changePwd);
bloodBankRouter.post("/createTransaction", bloodBankAuth, createTransaction);
bloodBankRouter.post("/getUser", bloodBankAuth, login);
bloodBankRouter.post("/userTransaction", bloodBankAuth, userTransaction);
bloodBankRouter.get("/checkTransaction", bloodBankAuth, checkTransaction);
bloodBankRouter.post(
  "/checkoutTransaction",
  bloodBankAuth,
  checkoutTransaction
);
bloodBankRouter.post("/bloodbank", bloodBankAuth, Me);
bloodBankRouter.get("/getAllTransactions", bloodBankAuth, allTransactions);
bloodBankRouter.post(
  "/deleteTransaction/:id",
  bloodBankAuth,
  deleteTransaction
);
bloodBankRouter.get("/bloodbank/logout", bloodBankAuth, logout);

export default bloodBankRouter;
