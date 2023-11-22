"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { Playlist } = require("./playlists");
const { Song } = require("./songs");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

const playlists = new Playlist();
const songs = new Song();

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** gets users playlists */

describe("get users playlists", function () {
  test("works", async function () {
    const res = await playlists.getUserPlaylists("testUser1");

    expect(res).toEqual([
      { id: "testPlaylist1", in_db: false, name: "testPlaylist1" },
      { id: "testPlaylist2", in_db: false, name: "testPlaylist2" },
    ]);
  });
});

/************************************** insert playlists */

describe("insert playlist", function () {
  const playlistArr = [
    { id: "testPlaylist3", name: "testPlaylist3" },
    { id: "testPlaylist4", name: "testPlaylist4" },
  ];

  test("works", async function () {
    await playlists.insertPlaylists(playlistArr, "testUser1");

    const res1 = await db.query(
      `SELECT name FROM playlists WHERE id = 'testPlaylist3';`
    );
    const res2 = await db.query(
      `SELECT name FROM playlists WHERE id = 'testPlaylist4';`
    );

    expect(res1.rows[0]).toEqual({ name: "testPlaylist3" });
    expect(res2.rows[0]).toEqual({ name: "testPlaylist4" });
  });
  test("on dup it updates", async function () {
    await playlists.insertPlaylists(playlistArr, "testUser1");
    await playlists.insertPlaylists(playlistArr, "testUser1");

    const res1 = await db.query(
      `SELECT name FROM playlists WHERE id = 'testPlaylist3';`
    );
    const res2 = await db.query(
      `SELECT name FROM playlists WHERE id = 'testPlaylist4';`
    );

    expect(res1.rows.length).toEqual(1);
    expect(res2.rows.length).toEqual(1);
  });
});

/************************************** insert start playlist */

describe("insert start playlist", function () {
  test("works", async function () {
    await playlists.insertStartPlaylist("testUser1");

    const res = await db.query(
      `SELECT name FROM playlists WHERE name = 'testUser1s liked songs';`
    );

    expect(res.rows[0]).toEqual({ name: "testUser1s liked songs" });
  });
  test("on dup it updates", async function () {
    await playlists.insertStartPlaylist("testUser1");
    await playlists.insertStartPlaylist("testUser1");

    const res = await db.query(
      `SELECT name FROM playlists WHERE name = 'testUser1s liked songs';`
    );

    expect(res.rows.length).toEqual(1);
  });
});

/************************************** insert songs to playlists */

describe("insert songs to playlists", function () {
  const songArr = [
    {
      id: "testSong3",
      songName: "testSong3",
      artist: "testSongArtist3",
      album: "testSongAlbum3",
      popularity: 0.2,
      mp3_url: "testSong1PreviewUrl",
      image_urls: "testSong1Image_url",
      playlist_id: "testPlaylist1",
    },
    {
      id: "testSong4",
      songName: "testSong3",
      artist: "testSongArtist3",
      album: "testSongAlbum3",
      popularity: 0.8,
      mp3_url: "testSong2PreviewUrl",
      image_urls: "testSong2Image_url",
      playlist_id: "testPlaylist2",
    },
  ];

  const prompts = [
    `Describe a song with the following characteristics:
        - Genres: test3
        - Acousticness: test3
        - Danceability: test3
        - Energy: test3
        - Instrumentalness: test3
        - Popularity: test3
        - Tempo: test3
        - Valence: test3
      `,
    `Describe a song with the following characteristics:
        - Genres: test4
        - Acousticness: test4
        - Danceability: test4
        - Energy: test4
        - Instrumentalness: test4
        - Popularity: test4
        - Tempo: test4
        - Valence: test4
      `,
  ];

  test("works", async function () {
    await songs.insertManyIntoSongs([songArr, prompts]);
    await playlists.insertSongsToPlaylists(songArr, "testUser1");

    const res = await db.query(
      `SELECT song_id, playlist_id FROM songs_to_playlists WHERE song_id = 'testSong3';`
    );
    const res2 = await db.query(
      `SELECT song_id, playlist_id FROM songs_to_playlists WHERE song_id = 'testSong4';`
    );

    expect(res.rows[0]).toEqual({
      song_id: "testSong3",
      playlist_id: "testPlaylist1",
    });
    expect(res2.rows[0]).toEqual({
      song_id: "testSong4",
      playlist_id: "testPlaylist2",
    });
  });
});

/************************************** alter playlists status */

describe("alter playlist status", function () {
  test("works", async function () {
    await playlists.alterPlaylistStatus("testPlaylist1");

    const res = await db.query(
      `SELECT in_db FROM playlists WHERE id = 'testPlaylist1'`
    );

    expect(res.rows[0]).toEqual({ in_db: true });
  });
});
