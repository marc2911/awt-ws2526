import { Request } from "express";
import { DataStorage } from "./dataStore";

export interface CustomRequest extends Request {
  dataStorage?: DataStorage;
}
