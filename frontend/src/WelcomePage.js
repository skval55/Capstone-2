import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SpotifyApi from "./Api";
import BackendApi from "./backendApi";
// import axios from "axios";
// const WelcomePage = () => {
//   new SpotifyApi.accessToken();

//   return (
//     <div>
//       <h1>done my bro</h1>
//     </div>
//   );
// };

// export default WelcomePage;
const WelcomePage = () => {
  const [searchParams] = useSearchParams();
  const spotifyApi = new SpotifyApi();
  const backendApi = new BackendApi();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.log("i run once");

      async function fetchData() {
        try {
          const res = await spotifyApi.accessToken(searchParams.get("code"));
          console.log(res);
          if (res) {
            // Set a flag in local storage to indicate that the request has been made
            localStorage.setItem("access_token_requested", "true");
          }
        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
    }
  }, []);

  const updateDatabase = async () => {
    const res = await backendApi.updateDb(localStorage.getItem("access_token"));
    console.log(res);
  };
  const updateUser = async () => {
    const res = await backendApi.updateUser(
      localStorage.getItem("access_token")
    );
    console.log(res);
  };

  const INITIAL_STATE = {
    prompt: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // await login(formData);
    const res = await backendApi.searchSongs(formData.prompt);
    console.log("frontend");
    console.log(res);
    setFormData(INITIAL_STATE);
  };

  const getPlaylists = async () => {
    const res = await backendApi.getPlaylists(
      localStorage.getItem("access_token")
    );
    console.log(res);
  };
  const getCurrUser = async () => {
    const res = await backendApi.getCurruser(
      localStorage.getItem("access_token")
    );
    console.log(res);
  };
  const getMusicDeets = async () => {
    const res = await backendApi.getMusicDeets(
      localStorage.getItem("access_token")
    );
    console.log(res);
  };

  return (
    <div>
      <h1>done my bro</h1>
      <button onClick={() => getCurrUser()}>get CurrUser</button>
      <button onClick={() => getPlaylists()}>get playlists</button>
      <button onClick={() => getMusicDeets()}>get music deets</button>
      <button onClick={() => updateDatabase()}>update DB</button>
      <button onClick={() => updateUser()}>update user</button>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt
          <input
            id="prompt"
            type="text"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default WelcomePage;
