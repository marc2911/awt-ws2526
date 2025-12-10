import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";
import { DataStorage } from "./models/dataStore";
import { CustomRequest } from "./models/request";
import playlistsRouter from "./routes/playlists";
import searchRouter from "./routes/search";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const dataStorage = new DataStorage();
// a way to make that one instance accessible from every middleware: attaching it to the request object
app.use((req: CustomRequest, res, next) => {
  req.dataStorage = dataStorage;
  next();
});

app.get("/", (req, res) => {
  // just a redirect
  res.location("/ipod-ui").status(301).send();
});

// routes
app.use("/playlists", playlistsRouter);
app.use("/search", searchRouter);

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
