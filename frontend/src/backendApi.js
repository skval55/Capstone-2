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

  getPlaylists = async (token) => {
    console.log(token);
    const res = await axios.get("http://localhost:3001/spotify/playlists", {
      headers: { token },
    });
    // console.log(res);
    return res;
  };
  getCurruser = async (token) => {
    console.log(token);
    const res = await axios.get("http://localhost:3001/spotify/curr-user", {
      headers: { token },
    });
    console.log("res");
    console.log(res);
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
}
export default BackendApi;
