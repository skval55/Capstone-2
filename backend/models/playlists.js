const db = require("../db");

class Playlist {
  async getPlaylist(playlist_id) {
    const res = await db.query(`SELECT name FROM playlists WHERE id = $1;`, [
      playlist_id,
    ]);
    return res.rows;
  }

  async getUserPlaylists(username) {
    // console.log("username from playlists", username);
    try {
      const res = await db.query(
        `SELECT id
     FROM users
     WHERE username = $1`,
        [username]
      );

      const userId = res.rows[0].id;

      const playlistsRes = await db.query(
        `SELECT id, name, in_db FROM playlists WHERE user_id = $1`,
        [userId]
      );
      // console.log("res from playlists", playlistsRes.rows);
      return playlistsRes.rows;
    } catch (error) {
      console.error(error);
    }
  }
  async insertPlaylists(playlists, username) {
    try {
      const userId = await db.query(
        `SELECT id
     FROM users
     WHERE username = $1`,
        [username]
      );
      // console.log("userid", userId.rows[0].id);
      const values = [];
      for (let i = 0; i < playlists.length; i++) {
        const val = `('${playlists[i].id}', '${userId.rows[0].id}', '${playlists[i].name}', FALSE)`;
        values.push(val);
      }

      const loopVals = () => {
        let string = "";
        for (let i = 0; i < values.length; i++) {
          const str = i + 1 === values.length ? values[i] : `${values[i]},`;
          string = string + str;
        }
        return string;
      };
      // console.log("loopVals", loopVals());
      const query = `INSERT INTO playlists (id, user_id, name, in_db) VALUES
      ${loopVals()}
      ON CONFLICT (id) DO UPDATE SET
      user_id = EXCLUDED.user_id, name = EXCLUDED.name;`;
      await db.query(query);
      return "success!";
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }

  async insertStartPlaylist(username) {
    try {
      const userId = await db.query(
        `SELECT id
   FROM users
   WHERE username = $1`,
        [username]
      );
      await db.query(
        `INSERT INTO playlists (id, user_id, name, in_db) VALUES
      ($1, $2, $3, TRUE)
      ON CONFLICT (id) DO UPDATE SET
      user_id = EXCLUDED.user_id, name = EXCLUDED.name;`,
        [userId.rows[0].id, userId.rows[0].id, `${username}s liked songs`]
      );
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }

  async insertSongsToPlaylists(songs, username) {
    try {
      const res = await db.query(
        `SELECT id
 FROM users
 WHERE username = $1`,
        [username]
      );
      const userId = res.rows[0].id;
      const values = [];
      for (let i = 0; i < songs.length; i++) {
        const val = `('${songs[i].id}', '${
          songs[i].playlist_id === null ? userId : songs[i].playlist_id
        }')`;
        values.push(val);
      }
      // console.log(values);

      const loopVals = () => {
        let string = "";
        for (let i = 0; i < values.length; i++) {
          const str = i + 1 === values.length ? values[i] : `${values[i]},`;
          string = string + str;
        }
        return string;
      };
      const query = `INSERT INTO songs_to_playlists (song_id, playlist_id) VALUES
      ${loopVals()}
      ON CONFLICT (song_id, playlist_id) DO NOTHING;`;
      await db.query(query);
      return "success!";
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }

  async alterPlaylistStatus(id) {
    try {
      const query = `UPDATE playlists
  SET in_db = TRUE
  WHERE id = '${id}';
  `;
      await db.query(query);
      return "success!";
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }
}

module.exports = { Playlist };
