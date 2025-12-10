var express = require("express");
var router = express.Router();

// ... mounts to /playlists/
router.get("/", function (req, res, next) {
  let playlists = req.dataStorage.getAllPlaylists();
  res.send(playlists);
});

// ... mounts to /playlists/:playlistId
router.get("/:playlistId", function (req, res, next) {
  // get the value of the here so called :playlistId placeholder
  let playlistId = req.params.playlistId;
  // get the playlist metadata from the data storage
  let playlist = req.dataStorage.getPlaylistById(playlistId);

  // send only meta data (no songs), to reduce data traffic
  res.send({
    id: playlist.id,
    name: playlist.name,
  });
});

router.get("/:playlistId/songs", (req, res, next) => {
  /**@type {import('../model/DataStorage')}*/
  const dataStore = req.dataStorage;

  const playlistId = req.params.playlistId;
  const songIds = dataStore.getSongsOfPlaylist(playlistId);

  res.send(songIds);
});

router.get("/:playlistId/songs/:songId", (req, res, next) => {
  /**@type {import('../model/DataStorage')}*/
  const dataStore = req.dataStorage;

  const songId = req.params.songId;
  const songDetail = dataStore.getSongDetail(songId);

  res.send(songDetail);
});

router.post("/:playlistId/songs/:songId", (req, res, next) => {
  /**@type {import('../model/DataStorage')}*/
  const dataStore = req.dataStorage;

  const playlistId = req.params.playlistId;
  const songId = req.params.songId;
  const success = dataStore.addSongToPlaylist(playlistId, songId, false);
  if (!success) throw new Error("Could not add");

  res.status(201).send();
});

router.put("/:playlistId/songs/:songId", (req, res, next) => {
  /**@type {import('../model/DataStorage')}*/
  const dataStore = req.dataStorage;

  const playlistId = req.params.playlistId;
  const songId = req.params.songId;
  dataStore.addSongToPlaylist(playlistId, songId, true);

  res.status(201).send();
});

router.delete("/:playlistId/songs/:songId", (req, res, next) => {
  /**@type {import('../model/DataStorage')}*/
  const dataStore = req.dataStorage;

  const playlistId = req.params.playlistId;
  const songId = req.params.songId;
  dataStore.deleteSongFromPlaylist(playlistId, songId);

  res.status(200).send();
});

module.exports = router;
