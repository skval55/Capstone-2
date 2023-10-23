const { Client } = require("pg");
require("dotenv").config();
// const { OpenAI } = require("langchain/llms/openai");
// const { PGVectorStore } = require("langchain/vectorstores/pgvector");
// if (process.env.NODE_ENV === "production") {
//     db = new Client({
//       connectionString: getDatabaseUri(),
//       ssl: {
//         rejectUnauthorized: false
//       }
//     });
//   } else {
//     db = new Client({
//       connectionString: getDatabaseUri()
//     });
//   }

//   db.connect();
const openaiKey = process.env.OPENAI_API_KEY;

db = new Client({
  connectionString: `music_search_test`,
});

db.connect();

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: openaiKey,
});

async function main(input) {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: input,
  });

  //   console.log(embedding.data[0].embedding);
  //   console.log(embedding.data[0]);
  //   console.log(embedding.data);
  //   console.log(embedding.data.length);
  return embedding.data;
}

class Music {
  async createTable() {
    const res = await db.query(
      `CREATE TABLE songs3 (id varchar PRIMARY KEY, username varchar ,embedding vector(1536));`
    );
    console.log(res);
  }

  async read() {
    const res = await db.query(
      `SELECT *
             FROM songs;
             `
    );
    console.log(res);
  }

  //   async searchSongs(input) {
  //     try {
  //       const embedding = await main(input);
  //       const query = `SELECT id FROM songs ORDER BY 1 - (embedding <=> '[${embedding[0].embedding.toString()}]') LIMIT 5;`;
  //       //   const query = `SELECT 1 - (embedding <=> '[${embedding[0].embedding.toString()}]') AS cosine_similarity FROM songs`;

  //       const res = await db.query(query);
  //       console.log(res);
  //     } catch (error) {
  //       console.error("Error inserting data:", error);
  //     }
  //   }
  async getUserId(username) {
    const res = await db.query(
      `SELECT id
   FROM users
   WHERE username = $1`,
      [username]
    );

    console.log("userId*******************");
    const userId = res.rows[0].id;
    console.log(userId);
    return userId;
  }
  async checkIfUserExists(username) {
    try {
      const res = await db.query(
        `SELECT id
     FROM users
     WHERE username = $1`,
        [username]
      );
      const userExists = res.rows[0] ? true : false;
      return userExists;
    } catch (error) {}
  }
  async getUserPlaylists(username) {
    console.log("username from playlists", username);
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
      console.log("res from playlists", playlistsRes.rows);
      return playlistsRes.rows;
    } catch (error) {
      console.error(error);
    }
  }

  async searchSongs(input) {
    try {
      const embedding = await main(input);

      // Assuming the embedding is stored as an array in the database
      const embeddingString = JSON.stringify(embedding[0].embedding);

      const query = `
            SELECT id
            FROM songs3
            ORDER BY 1 - (embedding <=> '[${embedding[0].embedding.toString()}]') DESC
            LIMIT 5;
          `;

      const res = await db.query(query);
      console.log(res.rows);
      return res.rows;
    } catch (error) {
      console.error("Error searching songs:", error);
    }
  }
  async searchSongsUserId(input, username, count) {
    console.log(count);
    console.log("count****************");
    try {
      const userId = await this.getUserId(username);
      const embedding = await main(input);

      // Assuming the embedding is stored as an array in the database
      const embeddingString = JSON.stringify(embedding[0].embedding);

      const query = await db.query(
        `
      SELECT s.id, s.title, s.artist, s.album, s.img_url, s.mp3_url
      FROM songs AS s
      LEFT JOIN songs_to_users AS su ON s.id = su.song_id AND su.user_id = $1
      WHERE su.user_id = $1
      ORDER BY 1 - (s.embedding <=> '[${embedding[0].embedding.toString()}]') DESC
      LIMIT $2;
      
          `,
        [userId, count]
      );

      console.log(query.rows);
      console.log(count);
      console.log("count****************");
      return query.rows;
    } catch (error) {
      console.error("Error searching songs:", error);
    }
  }

  async searchSongsWithPlaylistId(input, playlist_id, count) {
    try {
      // const userId = await this.getUserId(username);
      const embedding = await main(input);

      // Assuming the embedding is stored as an array in the database
      const embeddingString = JSON.stringify(embedding[0].embedding);

      const query = await db.query(
        `
    SELECT s.id, s.title, s.artist, s.album, s.img_url, s.mp3_url
    FROM songs AS s
    LEFT JOIN songs_to_playlists AS sp ON s.id = sp.song_id AND sp.playlist_id = $1
    WHERE sp.playlist_id = $1
    ORDER BY 1 - (s.embedding <=> '[${embedding[0].embedding.toString()}]') DESC
    LIMIT $2;
    
        `,
        [playlist_id, count]
      );
      //   const query = await db.query(
      //     `
      // SELECT s.id, s.title, s.artist, s.album, s.img_url, s.mp3_url
      // FROM songs AS s
      // LEFT JOIN songs_to_playlists AS sp ON s.id = sp.song_id AND sp.playlist_id = $1
      // ORDER BY 1 - (s.embedding <=> '[${embedding[0].embedding.toString()}]') DESC
      // LIMIT $2;

      //     `,
      //     [playlist_id, count]
      //   );

      console.log(query.rows);
      console.log(count);
      console.log("count****************");
      return query.rows;
    } catch (error) {
      console.error("Error searching songs:", error);
    }
  }

  async insert(id, username, input) {
    try {
      const embedding = await main(input);
      const query = {
        text: "INSERT INTO songs (id, username, embedding) VALUES ($1, $2, $3)",
        values: [id, username, `[${embedding[0].embedding.toString()}]`],
      };

      await db.query(query);

      const selectQuery = "SELECT * FROM songs";
      const res = await db.query(selectQuery);

      console.log(res.rows);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }
  async insertManyIntoSongs([songs, prompts]) {
    console.log(songs);
    console.log("songs");
    console.log(prompts);
    console.log("prompts");
    const values = [];
    const embeddings = await main(prompts);

    for (let i = 0; i < songs.length; i++) {
      songs[i].songName = songs[i].songName.replaceAll("'", "''");
      songs[i].artist = songs[i].artist.replaceAll("'", "''");
      songs[i].album = songs[i].album.replaceAll("'", "''");
      console.log(songs[i].songName);

      const val = `('${songs[i].id}', '[${embeddings[
        i
      ].embedding.toString()}]', '${songs[i].songName}', '${
        songs[i].artist
      }', '${songs[i].album}', '${songs[i].image_urls[1].url}', '${
        songs[i].mp3_url
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
    console.log(loopVals());
    try {
      const query = `INSERT INTO songs (id, embedding, title, artist, album, img_url, mp3_url) VALUES
      ${loopVals()}
      ON CONFLICT (id) DO UPDATE SET
      embedding = EXCLUDED.embedding, title = EXCLUDED.title, artist = EXCLUDED.artist, album = EXCLUDED.album, img_url = EXCLUDED.img_url, mp3_url = EXCLUDED.mp3_url`;
      // console.log(query);
      await db.query(query);

      const selectQuery = "SELECT * FROM songs";
      const res = await db.query(selectQuery);

      console.log(res.rows);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }
  async insertIntoUsers(user) {
    console.log("user", user);
    const duplicateCheck = await db.query(
      `SELECT username
       FROM users
       WHERE username = $1`,
      [user.display_name]
    );
    if (duplicateCheck.rows[0]) return user.display_name;
    try {
      const result = await db.query(
        `INSERT INTO users (username, img_url) VALUES ($1, $2) RETURNING username;
    `,
        [user.display_name, user.images[1].url]
      );
      console.log(result);
      return user.display_name;
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }
  async insertSongsToUsers(arrOfSongs, username) {
    try {
      const userId = await db.query(
        `SELECT id
       FROM users
       WHERE username = $1`,
        [username]
      );
      console.log("userid", userId.rows[0].id);
      const values = [];
      for (let i = 0; i < arrOfSongs.length; i++) {
        const val = `('${arrOfSongs[i].id}', '${userId.rows[0].id}')`;
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

      const query = `INSERT INTO songs_to_users (song_id, user_id) VALUES
      ${loopVals()}
      ON CONFLICT (song_id, user_id) DO NOTHING;`;
      await db.query(query);
      return "success!";
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }
  async insertPLaylists(playlists, username) {
    try {
      const userId = await db.query(
        `SELECT id
     FROM users
     WHERE username = $1`,
        [username]
      );
      console.log("userid", userId.rows[0].id);
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
      console.log("loopVals", loopVals());
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
  async getUsersPlaylists(username) {
    const res = await db.query(
      `SELECT id
   FROM users
   WHERE username = $1`,
      [username]
    );
    const userId = res.rows[0].id;
    const playlistsRes = await db.query(
      `SELECT id, name FROM playlists WHERE user_id = $1`,
      [userId]
    );
    return playlistsRes.rows;
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
      console.log(values);

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

  async deleteSongFromUser() {}
  async deleteSongFromPlaylist() {}
}

const practiceRun = new Music();

// const embedding = main();

module.exports = { Music, practiceRun };
