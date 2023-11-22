const { User } = require("../models/users");
const { Song } = require("../models/songs");
const { Playlist } = require("../models/playlists");
const db = require("../db");

const users = new User();
const songs = new Song();
const playlists = new Playlist();

async function commonBeforeAll() {
  await db.query("DELETE FROM songs_to_playlists");
  await db.query("DELETE FROM songs_to_users");
  await db.query("DELETE FROM playlists");
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM songs");

  await users.insertIntoUsers({
    display_name: "testUser1",
    images: [{ url: "testurl" }],
  });

  await songs.insertManyIntoSongs([
    [
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
    ],
    [
      `Describe a song with the following characteristics:
      - Genres: test1
      - Acousticness: test1
      - Danceability: test1
      - Energy: test1
      - Instrumentalness: test1
      - Popularity: test1
      - Tempo: test1
      - Valence: test1
    `,
      `Describe a song with the following characteristics:
      - Genres: test2
      - Acousticness: test2
      - Danceability: test2
      - Energy: test2
      - Instrumentalness: test2
      - Popularity: test2
      - Tempo: test2
      - Valence: test2
    `,
    ],
  ]);

  await songs.insertSongsToUsers(
    [
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
    ],
    "testUser1"
  );

  await playlists.insertPlaylists(
    [
      { id: "testPlaylist1", name: "testPlaylist1" },
      { id: "testPlaylist2", name: "testPlaylist2" },
    ],
    "testUser1"
  );

  await playlists.insertSongsToPlaylists(
    [
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
    ],
    "testUser1"
  );
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
