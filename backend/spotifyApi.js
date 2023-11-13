const axios = require("axios");
const createPrompt = require("./createPrompt");

class SpotifyApi {
  async getPlaylists(token) {
    let playlistsLength = 50;
    let offset = 0;
    let playlists = [];
    while (playlistsLength > 0) {
      const res = await axios.get("https://api.spotify.com/v1/me/playlists", {
        params: {
          limit: 50,
          offset: offset,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      offset += 50;
      playlists = [...playlists, ...res.data.items];
      playlistsLength = res.data.items.length;
    }
    return playlists;
  }
  async getCurrUser(token) {
    const res = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("curr user", res.data);
    return res.data;
  }

  /**
   * this function calls the spotify api to get curr users saved tracks which will get
   * 50 tracks at a time and makes one large arr with all the users saved tracks
   *
   * then it makes different arrs to hit different functions
   * one with just track ids to get more details from api,
   *  one with just artist ids to hit getGenres,
   * and one with other details about the track
   *
   */
  async getMusic(token, id) {
    let trackLength = 50;
    let offset = 0;
    let tracks = [];
    const url =
      id === null
        ? "https://api.spotify.com/v1/me/tracks"
        : `https://api.spotify.com/v1/playlists/${id}/tracks`;
    while (trackLength > 0) {
      const res = await axios.get(url, {
        params: {
          market: "US",
          limit: 50,
          offset: offset,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      offset += 50;
      tracks = [...tracks, ...res.data.items];
      trackLength = res.data.items.length;
      // console.log(offset);
    }
    // console.log("before mutation", tracks);
    let ids = new Set([]);
    for (let i = 0; i < tracks.length; i++) {
      if (ids.has(tracks[i].track.id)) {
        tracks.splice(i, 1);
        i--;
      } else {
        ids.add(tracks[i].track.id);
      }
    }
    console.log(ids.size);
    console.log("ids.size");
    console.log("tracks length");
    console.log(tracks.length);
    const tracksId = [];
    const arrOfArtistIds = [];
    for (let i = 0; i < tracks.length; i++) {
      tracksId[i] = tracks[i].track.id;
      arrOfArtistIds[i] = tracks[i].track.artists[0].id;
    }
    for (let i = 0; i < tracks.length; i++) {
      tracks[i] = {
        id: tracks[i].track.id,
        songName: tracks[i].track.name,
        artist: tracks[i].track.artists[0].name,
        album: tracks[i].track.album.name,
        popularity: tracks[i].track.popularity,
        mp3_url: tracks[i].track.preview_url,
        image_urls: tracks[i].track.album.images,
        playlist_id: id,
      };
    }

    const genreObj = await this.getGenres([...new Set(arrOfArtistIds)], token);
    // console.log("obj of artists", genreObj);
    // console.log(tracks);
    // console.log("merged arr", this.mergeGenreData(tracks, genreObj));
    tracks = this.mergeGenreData(tracks, genreObj);
    return [tracksId, tracks];
  }
  /**
   * this function first calls the getMusic() which returns an arr of track id and an arr
   * of tracks with other details(album, artist, popularity...)
   *
   * this function will loop through the arr of trackid in groups of 100 to call the spotify api
   * and it will return more details on the tracks
   *
   */
  async getTracksFeatures(token, id = null) {
    const [tracksId, tracks] = await this.getMusic(token, id);
    let newArr = [];
    for (let i = 0; i < tracksId.length; i + 100) {
      let tracksToCheck = tracksId.splice(i, i + 100);
      const res = await axios.get("https://api.spotify.com/v1/audio-features", {
        params: {
          ids: tracksToCheck.toString(),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      newArr = [...newArr, ...res.data.audio_features];
    }
    const [finalArr, promptArr] = this.mergeTrackInfo(newArr, tracks);
    console.log("final arr", finalArr);
    console.log("prompt arr", promptArr);
    return [finalArr, promptArr];
  }
  /**
   * get genres takes a set of artist ids and hits the spotify api with
   * 50 different ids at a time and puts the the artistid and name in an arr
   * then converts it into an obj by calling this.makeGenreObj()
   *
   */
  async getGenres(arrOfArtistIds, token) {
    let newArr = [];
    for (let i = 0; i < arrOfArtistIds.length; i + 50) {
      let idsToCheck = arrOfArtistIds.splice(i, i + 50);
      const res = await axios.get("https://api.spotify.com/v1/artists", {
        params: {
          ids: idsToCheck.toString(),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      newArr = [...newArr, ...res.data.artists];
    }
    // console.log("genre obj", this.makeGenreObj(newArr));
    return this.makeGenreObj(newArr);
  }

  /**
   *
   * @param {*} arrOfArtistDetails
   * @returns obj with just artist names and genres
   */
  makeGenreObj(arrOfArtistDetails) {
    const obj = {};
    for (let i = 0; i < arrOfArtistDetails.length; i++) {
      obj[arrOfArtistDetails[i].name] = arrOfArtistDetails[i].genres;
    }

    return obj;
  }

  /**
   * function that merges info from genres obj and tracks info obj
   * returning one list of track objs
   */
  mergeGenreData(tracks, genreObj) {
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].genres = genreObj[tracks[i].artist];
    }
    return tracks;
  }

  /**
   * function to merge track features and track info
   * taking the popularity k,v and adding it to features and deleting it from track info
   * taking the genres k,v and adding it to features and deleting it from track info
   * then adding key of description to info with val of features
   */
  mergeTrackInfo(trackFeatures, trackInfo) {
    const promptArr = [];
    for (let i = 0; i < trackInfo.length; i++) {
      trackFeatures[i].popularity = trackInfo[i].popularity;
      delete trackInfo[i].popularity;
      trackFeatures[i].genres = trackInfo[i].genres;
      delete trackInfo[i].genres;
      trackInfo[i].details = trackFeatures[i];
    }
    for (let i = 0; i < trackInfo.length; i++) {
      const prompt = createPrompt(trackInfo[i]);
      trackInfo[i].prompt = prompt;
      promptArr.push(prompt);
    }
    return [trackInfo, promptArr];
  }

  async createPlaylist(name, description, username, token) {
    console.log("spotify api hit!");
    console.log(username);
    try {
      const res = await axios.post(
        `https://api.spotify.com/v1/users/${username}/playlists`,
        {
          name: name,
          description: description,
          public: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set the Content-Type header
          },
        }
      );

      console.log("**8888888*88******88**88*8888888*8*88**8z");

      return res.data.id;
    } catch (e) {
      console.error(e);
    }
  }

  async addSongsToPlaylist(playlist_id, songs, token) {
    console.log(songs);
    const uris = songs.map((song) => `spotify:track:${song}`);
    console.log(uris);
    try {
      const res = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
        {
          uris: uris,
          position: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set the Content-Type header
          },
        }
      );

      console.log("**8888888*88******88**88*8888888*8*88**8z");

      return res;
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = SpotifyApi;
