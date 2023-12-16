import axios from "axios";

class BackendApi {
  constructor() {
    this.BASE_URL =
      process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
    this.clientId = process.env.REACT_APP_CLIENT_ID;
  }
  async getRefreshToken() {
    if (Date.now() - localStorage.getItem("access_token_time") > 3540000) {
      // refresh token that has been previously stored
      const refreshToken = localStorage.getItem("refresh_token");
      const url = "https://accounts.spotify.com/api/token";

      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: this.clientId,
        }),
      };
      const body = await fetch(url, payload);
      const response = await body.json();

      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      localStorage.setItem("access_token_time", Date.now());
    }
  }

  updateDb = async (token) => {
    await this.getRefreshToken();
    try {
      await axios.put(`${this.BASE_URL}/spotify/update-db`, {
        token,
        username: localStorage.getItem("user_id"),
      });
      console.log("gottem");
    } catch (error) {
      console.error(error);
    }
  };
  updateUser = async (token) => {
    console.log("before ", token);
    await this.getRefreshToken();
    console.log("after", token);
    try {
      const res = await axios.put(`${this.BASE_URL}/spotify/update-user`, {
        token,
      });
      console.log("updateUser username", res.data.responseFromDb);
      // localStorage.setItem("username", res.data.responseFromDb);
    } catch (error) {
      console.error(error);
    }
  };

  searchSongs = async (prompt, count, playlist_id) => {
    const res = await axios.post(`${this.BASE_URL}/music/search`, {
      prompt,
      username: localStorage.getItem("username"),
      count,
      playlist_id,
    });
    console.log(count);
    console.log("count from backend API");
    console.log(res);
    return res;
  };

  userPlaylists = async (username) => {
    const res = await axios.get(`${this.BASE_URL}/music/playlists/${username}`);
    return res;
  };

  getPlaylists = async (token) => {
    await this.getRefreshToken();
    console.log(token);
    const res = await axios.put(`${this.BASE_URL}/spotify/update-playlists`, {
      token,
      username: localStorage.getItem("user_id"),
    });
    // console.log(res);
    return res;
  };
  getCurruser = async (token) => {
    await this.getRefreshToken();
    const res = await axios.get(`${this.BASE_URL}/spotify/curr-user`, {
      headers: { token },
    });

    return res;
  };
  getMusicDeets = async (token) => {
    await this.getRefreshToken();
    console.log(token);
    const res = await axios.get(`${this.BASE_URL}/spotify/music-deets`, {
      headers: { token },
    });
    console.log("res");
    console.log(res);
    return res;
  };
  checkDbForCurrUser = async (username) => {
    const res = await axios.get(
      `${this.BASE_URL}/music/check-curr-user/${username}`
    );

    return res;
  };
  addPlaylistToDb = async (id, token, username) => {
    await this.getRefreshToken();
    const res = await axios.post(`${this.BASE_URL}/spotify/add-playlist`, {
      id,
      token,
      username,
    });
    console.log(res);
  };
  createPlaylist = async (name, description, songs) => {
    await this.getRefreshToken();
    await axios.post(`${this.BASE_URL}/spotify/create-playlist`, {
      name,
      description,
      username: localStorage.getItem("user_id"),
      songs,
      token: localStorage.getItem("access_token"),
    });
    console.log("res from backendApi");
    return true;
  };

  deleteUser = async (username) => {
    try {
      await axios.delete(
        `${this.BASE_URL}/music/delete-user/${localStorage.getItem(
          "username"
        )}`,
        {
          username,
        }
      );
      return true;
    } catch (error) {
      console.error(error);
    }
  };
}
export default BackendApi;
