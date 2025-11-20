import bcrypt from "bcrypt";
import { NextFunction, Request, Response, Router } from "express";
import { body, query, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { Claims, Permission } from "../models/claims";
import { MongoServerError } from "../models/mongo-errors";
import { CustomRequest } from "../models/request";
import { User } from "../schemas/user";

const router = Router();

async function hashPassword(password: string) {
  const hashed = await bcrypt.hash(password, env.SALT_ROUNDS);
  return hashed;
}

export function cannot(req: CustomRequest, permission: Permission[]) {
  const cannot = !req.claims?.permission.some((p) => permission.includes(p));

  return cannot;
}

router.post(
  "/register",
  [
    body("username").isString().notEmpty().withMessage("Username is required"),
    body("password").isString().notEmpty().withMessage("Password is required"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const username = req.body.username;
    const password = req.body.password;

    const passwordHash = await hashPassword(password);

    const newUser = new User({
      username: username,
      passwordHash: passwordHash,
      permissions: ["admin"],
    });

    try {
      await newUser.save();
    } catch (err) {
      if (err instanceof Error && err.name === "MongoServerError") {
        const mongoErr = err as MongoServerError;
        // Duplicate key error
        const affectedKeys = mongoErr.keyValue;
        return res.status(400).json({
          error: {
            message: "User already exists with these values",
            values: affectedKeys,
          },
        });
      }

      return next(err);
    }

    res.status(201).send();
  },
);

router.get(
  "/login",
  [
    query("username").isString().notEmpty().withMessage("Username is required"),
    query("password").isString().notEmpty().withMessage("Password is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.set("WWW-Authenticate", 'Basic realm="401"');
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const username = req.query.username as string;
    console.log("Logging in user:", username);

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send("User not found");
    }

    const passw = req.query.password as string;

    const valid = await bcrypt.compare(passw, user.passwordHash);
    console.log("Password valid:", valid);

    if (!valid) {
      res.set("WWW-Authenticate", 'Basic realm="401"');
      res.status(401).send("Invalid credentials");
      return;
    }

    const perm = user.permissions;

    const claims: Claims = { permission: perm, username };
    const token = jwt.sign(claims, env.SECRET_KEY);
    res.send(token);
  },
);

export default router;
