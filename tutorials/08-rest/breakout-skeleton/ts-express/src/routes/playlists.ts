import { Router } from "express";
import { CustomRequest } from "../models/request";

const router = Router();

router.get("/", (req: CustomRequest, res) => {
  const playlists = req.dataStorage!.getAllPlaylists();
  res.send(playlists);
});

router.get("/:playlistId", (req: CustomRequest, res) => {
  const playlistId = Number(req.params.playlistId);
  const playlist = req.dataStorage!.getPlaylistById(playlistId);

  if (!playlist) return res.status(404).send({ error: "Playlist not found" });

  res.send({
    id: playlist.id,
    name: playlist.name,
  });
});

router.get("/:playlistId/songs", (req: CustomRequest, res) => {
  const playlistId = Number(req.params.playlistId);

  const songIds = req.dataStorage!.getSongsOfPlaylist(playlistId);
  if (!songIds) return res.status(404).send({ error: "Playlist not found" });

  res.send(songIds);
});

router.get("/:playlistId/songs/:songId", (req: CustomRequest, res) => {
  const songId = Number(req.params.songId);

  const songDetail = req.dataStorage!.getSongDetail(songId);
  if (!songDetail) return res.status(404).send({ error: "Song not found" });

  res.send(songDetail);
});

router.post("/:playlistId/songs/:songId", async (req: CustomRequest, res) => {
  const playlistId = Number(req.params.playlistId);
  const songId = Number(req.params.songId);

  const success = await req.dataStorage!.addSongToPlaylist(
    playlistId,
    songId,
    false,
  );
  if (!success) throw new Error("Could not add");

  res.status(201).send();
});

router.put("/:playlistId/songs/:songId", async (req: CustomRequest, res) => {
  const playlistId = Number(req.params.playlistId);
  const songId = Number(req.params.songId);

  req.dataStorage!.addSongToPlaylist(playlistId, songId, true);

  res.status(201).send();
});

router.delete("/:playlistId/songs/:songId", (req: CustomRequest, res) => {
  const playlistId = Number(req.params.playlistId);
  const songId = Number(req.params.songId);

  req.dataStorage!.deleteSongFromPlaylist(playlistId, songId);

  res.status(200).send();
});

export default router;
