import { Router } from "express";
import { CustomRequest } from "../models/request";
import { UserDTO } from "../models/userDto";
import { User } from "../schemas/user";
import { cannot } from "./auth";

const router = Router();

router.get("/", async (req: CustomRequest, res) => {
  if (cannot(req, ["admin"])) {
    return res.status(403).send("Forbidden");
  }

  const dbUsers = await User.find()
    .lean()
    .transform<UserDTO[]>((docs) =>
      docs.map((doc) => ({
        id: doc._id.toString(),
        username: doc.username,
        permissions: doc.permissions,
      })),
    );

  res.json(dbUsers);
});

router.get("/:id", async (req: CustomRequest, res) => {
  if (cannot(req, ["admin"])) {
    return res.status(403).send("Forbidden");
  }

  const dbUser = await User.findById(req.params.id);
  if (!dbUser) return res.status(404).json({ error: "User not found" });

  const dto: UserDTO = {
    id: dbUser._id.toString(),
    username: dbUser.username,
    permissions: dbUser.permissions,
  };

  res.json(dto);
});

export default router;
