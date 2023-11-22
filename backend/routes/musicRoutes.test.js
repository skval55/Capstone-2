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
    try {
      await request(app).post("/music/search").send({
        prompt: "cool songs",
        username: "none",
        count: 5,
        playlist_id: "all-songs",
      });
      expect(response.status).toBe(404);
      fail();
    } catch (err) {
      fail(`Unexpected error: ${err}`);
    }
  });
});
