const express = require("express");
const router = new express.Router();
const cors = require("cors");
const SpotifyApi = require("../spotifyApi");
const { Music, practiceRun } = require("../model");
const { BadRequestError } = require("../expressError");
require("dotenv").config();

const spotifyApi = new SpotifyApi();
const dbConnection = new Music();

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
  const token = req.body.token;
  const username = req.body.username;
  console.log(req.body);
  console.log(token);
  console.log("token");
  console.log("uswrname", username);

  try {
    const response = await spotifyApi.getTracksFeatures(token);
    const responseFromDb = await dbConnection.insertManyIntoSongs(response);
    const responseFromDb2 = await dbConnection.insertSongsToUsers(
      response[0],
      username
    );
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
    const responseFromDb = await dbConnection.insertIntoUsers(response);
    console.log("response from db", responseFromDb);
    return res.json({ responseFromDb });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
