var express = require("express");
var router = express.Router();

const ITUNES_SEARCH_URL = "https://itunes.apple.com/search";

router.get("/", async (req, res, next) => {
  /**@type {import('../model/DataStorage')}*/
  const dataStore = req.dataStorage;

  /**@type{string} */
  const term = req.query.term;
  const sanitized = term.trim().replace(/\s+/g, "+");

  const searchUrl = `${ITUNES_SEARCH_URL}?term=${sanitized}`;

  console.info(`Requesting ${searchUrl} ...`);

  const responseJson = await (await fetch(searchUrl)).json();
  const songsResponse = responseJson.results;
  const songs = songsResponse.map(songsJson => ({
    id: songsJson.trackId,
    artist: songsJson.artistName,
    title: songsJson.trackName,
  }));

  dataStore.addNewSongs(songs);

  res.send(songs);
});

module.exports = router;
