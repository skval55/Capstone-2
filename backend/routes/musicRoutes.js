const { Song } = require("../models/songs");
const { User } = require("../models/users");
const { Playlist } = require("../models/playlists");
const express = require("express");
const router = new express.Router();
const { BadRequestError, NotFoundError } = require("../expressError");

const songs = new Song();
const users = new User();
const playlists = new Playlist();

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/search", async function (req, res, next) {
  try {
    const { prompt, username, count, playlist_id } = req.body;

    if (playlist_id === "all-songs") {
      const response = await songs.searchSongsUserId(prompt, username, count);
      if (!response) return res.status(404).json({ message: "user not found" });
      return res.json({ response });
    } else {
      const playlistExists = await playlists.getPlaylist(playlist_id);

      if (playlistExists.length === 0)
        return res.status(404).json({ message: "playlist not found" });

      const response = await songs.searchSongsWithPlaylistId(
        prompt,
        playlist_id,
        count
      );

      return res.json({ response });
    }
  } catch (err) {
    return next(err);
  }
});

router.get("/playlists/:username", async function (req, res, next) {
  try {
    const username = req.params.username;

    const userExists = await users.checkIfUserExists(username);

    if (!userExists) return res.status(404).json({ message: "user not found" });

    const response = await playlists.getUserPlaylists(username);
    console.log("response from /playlists/:username", response);
    return res.json({ response });
  } catch (err) {
    return next(err);
  }
});
router.get("/check-curr-user/:username", async function (req, res, next) {
  try {
    const username = req.params.username;
    const response = await users.checkIfUserExists(username);
    return res.json({ userExists: response });
  } catch (err) {
    return next(err);
  }
});

// router.post("/insert-db", async function (req, res, next) {
//   try {
//     const { userInfo, musicInfo, prompts } = req.body;

//     await songs.insertManyIntoSongs(musicInfo, prompts);

//     return res.json({ message: "data inserted" });
//   } catch (err) {
//     return next(err);
//   }
// });

router.delete("/delete-user/:username", async function (req, res, next) {
  try {
    const username = req.params.username;
    await users.deleteUser(username);
    return res.json({ message: "user deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
