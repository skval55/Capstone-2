const { Music, practiceRun } = require("./model");
const express = require("express");
const router = new express.Router();
const { BadRequestError } = require("./expressError");

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

module.exports = router;
