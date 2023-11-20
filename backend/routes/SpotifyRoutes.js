const express = require("express");
const router = new express.Router();
const cors = require("cors");
const SpotifyApi = require("../spotifyApi");
const { Song } = require("../models/model");
const { User } = require("../models/users");
const { Playlist } = require("../models/playlists");
const { BadRequestError } = require("../expressError");

require("dotenv").config();

const spotifyApi = new SpotifyApi();
const songs = new Song();
const users = new User();
const playlists = new Playlist();

router.get("/playlists", async function (req, res, next) {
  const token = req.headers.token;

  try {
    const response = await spotifyApi.getPlaylists(token);

    return res.json({ response });
  } catch (err) {
    return next(err);
  }
});

router.get("/curr-user", async function (req, res, next) {
  const token = req.headers.token;

  try {
    const response = await spotifyApi.getCurrUser(token);

    return res.json({ response });
  } catch (err) {
    return next(err);
  }
});
router.get("/music-deets", async function (req, res, next) {
  const token = req.headers.token;

  try {
    const response = await spotifyApi.getTracksFeatures(token);

    return res.json({ response });
  } catch (err) {
    return next(err);
  }
});
router.put("/update-db", async function (req, res, next) {
  console.log("db updating");
  const token = req.body.token;
  const username = req.body.username;
  console.log(req.body);
  console.log(token);
  console.log("token");
  console.log("uswrname", username);

  try {
    const response = await spotifyApi.getTracksFeatures(token);
    await songs.insertManyIntoSongs(response);
    const responseFromDb2 = await songs.insertSongsToUsers(
      response[0],
      username
    );
    await songs.insertStartPlaylist(username);
    await playlists.insertSongsToPlaylists(response[0], username);
    const responsePlaylists = await spotifyApi.getPlaylists(token);
    await playlists.insertPLaylists(responsePlaylists, username);
    console.log("db updated");
    return res.json({ responseFromDb2 });
  } catch (err) {
    return next(err);
  }
});
router.put("/update-user", async function (req, res, next) {
  const token = req.body.token;
  console.log(token);
  console.log("token");

  try {
    const response = await spotifyApi.getCurrUser(token);
    const responseFromDb = await users.insertIntoUsers(response);
    console.log("response from db", responseFromDb);
    return res.json({ responseFromDb });
  } catch (err) {
    return next(err);
  }
});
router.put("/update-playlists", async function (req, res, next) {
  const token = req.body.token;
  const username = req.body.username;
  console.log(token);
  console.log("token");

  try {
    const response = await spotifyApi.getPlaylists(token);
    const responseFromDb = await playlists.insertPLaylists(response, username);
    console.log("response from db", responseFromDb);
    return res.json({ responseFromDb });
  } catch (err) {
    return next(err);
  }
});

router.post("/add-playlist", async function (req, res, next) {
  const token = req.body.token;
  const id = req.body.id;
  const username = req.body.username;
  try {
    const response = await spotifyApi.getTracksFeatures(token, id);
    await songs.insertManyIntoSongs(response);
    const responseFromDb2 = await songs.insertSongsToUsers(
      response[0],
      username
    );
    await playlists.insertSongsToPlaylists(response[0], username);
    await playlists.alterPlaylistStatus(id);
    return res.json(responseFromDb2);
  } catch (err) {
    return next(err);
  }
});

router.post("/create-playlist", async function (req, res, next) {
  console.log("create playlist route hit!");
  const name = req.body.name;
  const description = req.body.description;
  const username = req.body.username;
  const token = req.body.token;
  const songs = req.body.songs;
  console.log(name);
  console.log(description);
  console.log(songs);
  console.log("Songs in spotifyRoutes.js");
  try {
    const playlist_id = await spotifyApi.createPlaylist(
      name,
      description,
      username,
      token
    );
    await spotifyApi.addSongsToPlaylist(playlist_id, songs, token);

    console.log("true");
    return res.json({ status: "success" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
