"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { Song } = require("./songs");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

const songs = new Song();

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** insert songs */

describe("insert songs", function () {
  const songArr = [
    {
      id: "testSong3",
      songName: "testSong3",
      artist: "testSongArtist3",
      album: "testSongAlbum3",
      popularity: 0.2,
      mp3_url: "testSong3PreviewUrl",
      image_urls: "testSong3Image_url",
      playlist_id: "testPlaylist3",
    },
    {
      id: "testSong4",
      songName: "testSong4",
      artist: "testSongArtist4",
      album: "testSongAlbum4",
      popularity: 0.8,
      mp3_url: "testSong4PreviewUrl",
      image_urls: "testSong4Image_url",
      playlist_id: "testPlaylist4",
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

    const song3res = await db.query(
      `SELECT title FROM songs WHERE id = 'testSong3';`
    );
    const song4res = await db.query(
      `SELECT title FROM songs WHERE id = 'testSong4';`
    );

    expect(song3res.rows[0]).toEqual({
      title: "testSong3",
    });

    expect(song4res.rows[0]).toEqual({
      title: "testSong4",
    });
  });

  test("updates on dup", async function () {
    await songs.insertManyIntoSongs([songArr, prompts]);
    await songs.insertManyIntoSongs([songArr, prompts]);

    const song3res = await db.query(
      `SELECT title FROM songs WHERE id = 'testSong3';`
    );
    const song4res = await db.query(
      `SELECT title FROM songs WHERE id = 'testSong4';`
    );

    expect(song3res.rows.length).toEqual(1);
    expect(song4res.rows.length).toEqual(1);
  });
});

/************************************** insert songs to users */

describe("insert songs to users", function () {
  const songArr = [
    {
      id: "testSong1",
      songName: "testSong1",
      artist: "testSongArtist1",
      album: "testSongAlbum1",
      popularity: 0.2,
      mp3_url: "testSong1PreviewUrl",
      image_urls: "testSong1Image_url",
      playlist_id: "testPlaylist1",
    },
    {
      id: "testSong2",
      songName: "testSong2",
      artist: "testSongArtist2",
      album: "testSongAlbum2",
      popularity: 0.8,
      mp3_url: "testSong2PreviewUrl",
      image_urls: "testSong2Image_url",
      playlist_id: "testPlaylist2",
    },
  ];
  test("works", async function () {
    await songs.insertSongsToUsers(songArr, "testUser1");

    const res = await db.query(
      `SELECT song_id FROM songs_to_users WHERE song_id = 'testSong1';`
    );
    expect(res.rows[0]).toEqual({
      song_id: "testSong1",
    });
  });
  test("updates on dup", async function () {
    await songs.insertSongsToUsers(songArr, "testUser1");
    await songs.insertSongsToUsers(songArr, "testUser1");

    const res = await db.query(
      `SELECT song_id FROM songs_to_users WHERE song_id = 'testSong1';`
    );
    expect(res.rows.length).toEqual(1);
  });
});

/************************************** search with user id */

describe("search with user id", function () {
  test("works", async function () {
    const res = await songs.searchSongsUserId("testsong1", "testUser1", 5);
    expect(res[0]).toEqual({
      album: "testSongAlbum1",
      artist: "testSongArtist1",
      id: "testSong1",
      img_url: "undefined",
      mp3_url: "testSong1PreviewUrl",
      title: "testSong1",
    });
  });
});

describe("search with playlist id", function () {
  test("works", async function () {
    const res = await songs.searchSongsWithPlaylistId(
      "testsong1",
      "testPlaylist1",
      5
    );
    expect(res[0]).toEqual({
      album: "testSongAlbum1",
      artist: "testSongArtist1",
      id: "testSong1",
      img_url: "undefined",
      mp3_url: "testSong1PreviewUrl",
      title: "testSong1",
    });
  });
});
