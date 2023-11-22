"use strict";

const request = require("supertest");
const { BadRequestError, NotFoundError } = require("../expressError");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("POST /music/search", function () {
  test("works", async function () {
    const resp = await request(app).post("/music/search").send({
      prompt: "cool songs",
      username: "testUser1",
      count: 5,
      playlist_id: "testPlaylist1",
    });
    expect(resp.body.response).toEqual([
      {
        album: "testSongAlbum1",
        artist: "testSongArtist1",
        id: "testSong1",
        img_url: "undefined",
        mp3_url: "testSong1PreviewUrl",
        title: "testSong1",
      },
    ]);
  });
  test("works without playlist id", async function () {
    const resp = await request(app).post("/music/search").send({
      prompt: "cool songs",
      username: "testUser1",
      count: 5,
      playlist_id: "all-songs",
    });
    expect(resp.body.response[0]).toEqual({
      album: "testSongAlbum1",
      artist: "testSongArtist1",
      id: "testSong1",
      img_url: "undefined",
      mp3_url: "testSong1PreviewUrl",
      title: "testSong1",
    });
  });
  test("not found error without playlist id or username", async function () {
    const response = await request(app).post("/music/search").send({
      prompt: "cool songs",
      username: "none",
      count: 5,
      playlist_id: "all-songs",
    });
    console.log(response);
    expect(response.status).toBe(404);
  });
  test("not found error without correct playlist id ", async function () {
    const response = await request(app).post("/music/search").send({
      prompt: "cool songs",
      username: "testUser1",
      count: 5,
      playlist_id: "none",
    });
    console.log(response);
    expect(response.status).toBe(404);
  });
});

describe("get /music/playlists/:username", function () {
  test("works", async function () {
    const resp = await request(app).get("/music/playlists/testUser1");

    expect(resp.body).toEqual({
      response: [
        { id: "testPlaylist1", in_db: false, name: "testPlaylist1" },
        { id: "testPlaylist2", in_db: false, name: "testPlaylist2" },
      ],
    });
  });
  test("404 if user doesnt exist", async function () {
    const resp = await request(app).get("/music/playlists/noUser");

    expect(resp.status).toEqual(404);
  });
});

describe("get /music/check-curr-user/:username", function () {
  test("works when user exists", async function () {
    const resp = await request(app).get("/music/check-curr-user/testUser1");

    expect(resp.body).toEqual({
      userExists: true,
    });
  });
  test("works when user doesn't exist", async function () {
    const resp = await request(app).get("/music/check-curr-user/nonexistant");

    expect(resp.body).toEqual({
      userExists: false,
    });
  });
});

// describe("POST /music/insert-db", function () {
//   const songs = [
//     {
//       id: "testSong3",
//       songName: "testSong3",
//       artist: "testSongArtist1",
//       album: "testSongAlbum1",
//       popularity: 0.2,
//       mp3_url: "testSong1PreviewUrl",
//       image_urls: "testSong1Image_url",
//       playlist_id: "testPlaylist1",
//     },
//     {
//       id: "testSong4",
//       songName: "testSong4",
//       artist: "testSongArtist2",
//       album: "testSongAlbum2",
//       popularity: 0.8,
//       mp3_url: "testSong2PreviewUrl",
//       image_urls: "testSong2Image_url",
//       playlist_id: "testPlaylist2",
//     },
//   ];

//   const prompts = [
//     `Describe a song with the following characteristics:
//         - Genres: test1
//         - Acousticness: test1
//         - Danceability: test1
//         - Energy: test1
//         - Instrumentalness: test1
//         - Popularity: test1
//         - Tempo: test1
//         - Valence: test1
//       `,
//     `Describe a song with the following characteristics:
//         - Genres: test2
//         - Acousticness: test2
//         - Danceability: test2
//         - Energy: test2
//         - Instrumentalness: test2
//         - Popularity: test2
//         - Tempo: test2
//         - Valence: test2
//       `,
//   ];

//   const userInfo = { username: "testUser1" };
//   test("works", async function () {
//     const resp = await request(app).post("/music/insert-db").send({
//       userInfo,
//       musicInfo,
//       prompts,
//     });
//     expect(resp).toEqual({ message: "data inserted" });
//   });
// });

describe("DELETE /music/delete-user/:username", function () {
  test("works", async function () {
    const resp = await request(app).delete(`/music/delete-user/testUser1`);
    expect(resp.body).toEqual({ message: "user deleted" });
  });
  test("404 when user doesn't exist", async function () {
    const resp = await request(app).delete(`/music/delete-user/nonexistant`);
    expect(resp.status).toEqual(404);
  });
});
