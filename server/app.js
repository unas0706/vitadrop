import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import errorHandler from "./controllers/errorHandler.js";
import adminRouter from "./routers/admin.Router.js";
import bloodBankRouter from "./routers/bloodBank.router.js";

dotenv.config({ path: "./.env" });

const app = express();

//adding middlewares

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

app.use(userRouter);
app.use(adminRouter);
app.use(bloodBankRouter);

app.use(errorHandler);

//return app

export default app;
