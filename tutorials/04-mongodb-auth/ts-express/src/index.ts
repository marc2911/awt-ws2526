import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import jwt, { VerifyErrors } from "jsonwebtoken";
import mongoose from "mongoose";
import logger from "morgan";
import { env } from "./env";
import { Claims } from "./models/claims";
import { CustomRequest } from "./models/request";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript Express!");
});

mongoose.connect(env.DB_URL);

app.use("/auth", authRoutes);

app.use((req: CustomRequest, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).send("Authorization header not provided");

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).send("Malformed token");

  try {
    const claims = jwt.verify(token, env.SECRET_KEY) as Claims;
    req.claims = claims;
    next();
  } catch (err) {
    res.status(401).send((err as VerifyErrors).message);
  }
});

// routes
app.use("/users", userRoutes);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // log the actual error
  res.status(500).json({
    message: err.message,
    ...(req.app.get("env") === "development" && { stack: err.stack }),
  });
});

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
});
