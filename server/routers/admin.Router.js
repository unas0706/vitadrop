import express from "express";
import {
  addAdmin,
  addBloodBank,
  adminLogin,
  me,
} from "../controllers/admin.controller.js";
import adminAuth from "../auth/admin.auth.js";

const adminRouter = express.Router();

adminRouter.post("/addadmin", adminAuth, addAdmin);
adminRouter.post("/admin/addBloodBank", adminAuth, addBloodBank);
adminRouter.post("/admin/login", adminLogin);
adminRouter.post("/me", adminAuth, me);

export default adminRouter;
