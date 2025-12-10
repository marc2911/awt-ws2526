import { Router } from "express";
import { SongDetail } from "../models/dataStore";
import { CustomRequest } from "../models/request";

const router = Router();

const ITUNES_SEARCH_URL = "https://itunes.apple.com/search";

router.get("/", async (req: CustomRequest, res) => {
  const term = req.query.term as string | undefined;
  const sanitized = term?.trim().replace(/\s+/g, "+");

  if (!sanitized) {
    res.status(400).send({ error: "Query term is required" });
    return;
  }

  const searchUrl = `${ITUNES_SEARCH_URL}?term=${sanitized}`;

  console.info(`Requesting ${searchUrl} ...`);

  const responseJson = await (await fetch(searchUrl)).json();

  const songsResponse = responseJson.results as any[];

  const songs: SongDetail[] = songsResponse.map(songJson => ({
    id: songJson.trackId,
    artist: songJson.artistName,
    title: songJson.trackName,
  }));

  req.dataStorage!.addNewSongs(songs);

  res.send(songs);
});

export default router;
