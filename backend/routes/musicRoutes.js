const { Music, practiceRun } = require("../model");
const express = require("express");
const router = new express.Router();
const { BadRequestError } = require("../expressError");

// router.get("/:id", async function (req, res, next) {
//     try {
//       const job = await Job.get(req.params.id);
//       return res.json({ job });
//     } catch (err) {
//       return next(err);
//     }
//   });

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/search", async function (req, res, next) {
  try {
    const { prompt } = req.body;
    const response = await practiceRun.searchSongs(prompt);
    console.log("from routes");
    console.log(response);
    return res.json({ response });
  } catch (err) {
    return next(err);
  }
});

router.get("/playlists/:username", async function (req, res, next) {
  try {
    const username = req.params.username;
    console.log(username);
    console.log("username **********************************");
    const response = await practiceRun.getUserPlaylists(username);
    return res.json({ response });
  } catch (err) {
    return next(err);
  }
});
router.get("/check-curr-user/:username", async function (req, res, next) {
  try {
    const username = req.params.username;
    const response = await practiceRun.checkIfUserExists(username);
    return res.json({ userExists: response });
  } catch (err) {
    return next(err);
  }
});

router.post("/insert-db", async function (req, res, next) {
  try {
    const { userInfo, musicInfo, prompts } = req.body;
    console.log("userInfo***********************************");
    console.log(userInfo);
    console.log("userInfo***********************************");
    await practiceRun.insertManyIntoSongs(musicInfo, prompts);
    console.log("from routes");
    console.log(response);
    return res.json({ message: "data inserted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
