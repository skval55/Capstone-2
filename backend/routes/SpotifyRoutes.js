const express = require("express");
const router = new express.Router();
const cors = require("cors");
const SpotifyApi = require("../spotifyApi");
const { Song } = require("../models/songs");
const { User } = require("../models/users");
const { Playlist } = require("../models/playlists");
const { BadRequestError } = require("../expressError");

require("dotenv").config();

const spotifyApi = new SpotifyApi();
const songs = new Song();
const users = new User();
const playlists = new Playlist();

let trackFeatures = [];

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

router.put("/get-track-features", async function (req, res, next) {
  const token = req.body.token;
  const username = req.body.username;

  try {
    const response = await spotifyApi.getTracksFeatures(token);

    trackFeatures = response;

    // await songs.insertManyIntoSongs(response);

    // const responseFromDb2 = await songs.insertSongsToUsers(
    //   response[0],
    //   username
    // );

    // await playlists.insertSongsToPlaylists(response[0], username);

    return res.json({ message: "success" });
  } catch (err) {
    return next(err);
  }
});
router.put("/update-db", async function (req, res, next) {
  const token = req.body.token;
  const username = req.body.username;

  try {
    // const response = await spotifyApi.getTracksFeatures(token);

    await songs.insertManyIntoSongs(trackFeatures);

    const responseFromDb2 = await songs.insertSongsToUsers(
      trackFeatures[0],
      username
    );

    await playlists.insertSongsToPlaylists(trackFeatures[0], username);

    return res.json({ responseFromDb2 });
  } catch (err) {
    return next(err);
  }
  //   const responseFromDb2 = await songs.insertSongsToUsers(
  //     response[0],
  //     username
  //   );

  //   await playlists.insertStartPlaylist(username);

  //   const responsePlaylists = await spotifyApi.getPlaylists(token);

  //   await playlists.insertPlaylists(responsePlaylists, username);

  //   await playlists.insertSongsToPlaylists(response[0], username);

  //   return res.json({ responseFromDb2 });
  // } catch (err) {
  //   return next(err);
  // }
});
router.put("/update-db-2", async function (req, res, next) {
  const token = req.body.token;
  const username = req.body.username;
  try {
    await playlists.insertStartPlaylist(username);
    const responsePlaylists = await spotifyApi.getPlaylists(token);
    await playlists.insertPlaylists(responsePlaylists, username);
    return res.json({ message: "success" });
  } catch (err) {
    return next(err);
  }
});

router.put("/update-user", async function (req, res, next) {
  const token = req.body.token;

  try {
    const response = await spotifyApi.getCurrUser(token);
    const responseFromDb = await users.insertIntoUsers(response);

    return res.json({ responseFromDb });
  } catch (err) {
    return next(err);
  }
});
router.put("/update-playlists", async function (req, res, next) {
  const token = req.body.token;
  const username = req.body.username;

  try {
    const response = await spotifyApi.getPlaylists(token);
    const responseFromDb = await playlists.insertPlaylists(response, username);
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
  const name = req.body.name;
  const description = req.body.description;
  const username = req.body.username;
  const token = req.body.token;
  const songs = req.body.songs;

  try {
    const playlist_id = await spotifyApi.createPlaylist(
      name,
      description,
      username,
      token
    );
    await spotifyApi.addSongsToPlaylist(playlist_id, songs, token);

    return res.json({ status: "success" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
