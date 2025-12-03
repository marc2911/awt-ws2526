import { Request } from "express";
import { Claims } from "./claims";

export interface CustomRequest extends Request {
  claims?: Claims;
}
