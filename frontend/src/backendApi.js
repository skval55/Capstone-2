import axios from "axios";

class BackendApi {
  updateDb = async (token) => {
    try {
      await axios.put("http://localhost:3001/spotify/update-db", {
        token,
        username: localStorage.getItem("username"),
      });
      console.log("gottem");
    } catch (error) {
      console.error(error);
    }
  };
  updateUser = async (token) => {
    try {
      const res = await axios.put("http://localhost:3001/spotify/update-user", {
        token,
      });
      console.log("username", res.data.responseFromDb);
      localStorage.setItem("username", res.data.responseFromDb);
    } catch (error) {
      console.error(error);
    }
  };

  searchSongs = async (prompt) => {
    const res = await axios.post("http://localhost:3001/music/search", {
      prompt,
    });
    console.log(res);
    return res;
  };

  userPlaylists = async (username) => {
    const res = await axios.get(
      `http://localhost:3001/music/playlists/${username}`
    );
    return res;
  };

  getPlaylists = async (token) => {
    console.log(token);
    const res = await axios.put(
      "http://localhost:3001/spotify/update-playlists",
      { token, username: localStorage.getItem("username") }
    );
    // console.log(res);
    return res;
  };
  getCurruser = async (token) => {
    const res = await axios.get("http://localhost:3001/spotify/curr-user", {
      headers: { token },
    });

    return res;
  };
  getMusicDeets = async (token) => {
    console.log(token);
    const res = await axios.get("http://localhost:3001/spotify/music-deets", {
      headers: { token },
    });
    console.log("res");
    console.log(res);
    return res;
  };
  checkDbForCurrUser = async (username) => {
    const res = await axios.get(
      `http://localhost:3001/music/check-curr-user/${username}`
    );

    return res;
  };
  addPlaylistToDb = async (id, token, username) => {
    const res = await axios.post("http://localhost:3001/spotify/add-playlist", {
      id,
      token,
      username,
    });
    console.log(res);
  };
}
export default BackendApi;
