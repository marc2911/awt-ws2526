import { JwtPayload } from "jsonwebtoken";
import { Permissions } from "../schemas/user";

export type Permission = (typeof Permissions)[number];
export type Claims = {
  permission: Permission[];
  username: string;
} & JwtPayload;
