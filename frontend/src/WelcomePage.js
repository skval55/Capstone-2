import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SpotifyApi from "./Api";
import BackendApi from "./backendApi";
import Playlists from "./Playlists";
import { name } from "mustache";

const WelcomePage = () => {
  const [searchParams] = useSearchParams();
  const [currUser, setCurrUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const spotifyApi = new SpotifyApi();
  const backendApi = new BackendApi();

  useEffect(() => {
    async function fetchData() {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        try {
          const res = await spotifyApi.accessToken(searchParams.get("code"));

          if (res) {
            // Set a flag in local storage to indicate that the request has been made
            localStorage.setItem("access_token_requested", "true");
          }
        } catch (error) {
          console.error(error);
        }

        const getCurrUser = async () => {
          const res = await backendApi.getCurruser(
            localStorage.getItem("access_token")
          );
          const username = res.data.response.display_name;
          localStorage.setItem("username", username);
          setCurrUser(username);
        };

        getCurrUser();
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("second use effect");
    const checkForUserInDb = async () => {
      const res = await backendApi.checkDbForCurrUser(
        localStorage.getItem("username")
      );
      console.log(res.data.userExists);
      return res.data.userExists;
    };
    const updateDatabase = async () => {
      console.log("updating");
      const res = await backendApi.updateDb(
        localStorage.getItem("access_token")
      );
      console.log(res);
    };
    const updateUser = async () => {
      const res = await backendApi.updateUser(
        localStorage.getItem("access_token")
      );
      console.log(res);
    };
    const getPlaylists = async () => {
      const res = await backendApi.userPlaylists(
        localStorage.getItem("username")
      );
      console.log(res.data.response);
      setPlaylists(res.data.response);
    };
    const updateAll = async () => {
      const userExists = await checkForUserInDb();
      if (!userExists) {
        await updateUser();
        await updateDatabase();
      }
      await getPlaylists(localStorage.getItem("username"));
      setLoading(false);
    };
    updateAll();
  }, [currUser]);

  const addPlaylistToDb = async (id) => {
    setLoading(true);
    await backendApi.addPlaylistToDb(
      id,
      localStorage.getItem("access_token"),
      localStorage.getItem("username")
    );
    setLoading(false);
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

  const loadingPage = <h1>Loading</h1>;
  const form = () => (
    <div>
      <h1>welcome {localStorage.getItem("username")}</h1>
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

      {playlists.map((item) => (
        <Playlists
          key={item.id}
          id={item.id}
          name={item.name}
          addPlaylistToDb={addPlaylistToDb}
        />
      ))}
    </div>
  );

  return <div>{loading ? loadingPage : form()}</div>;
};

export default WelcomePage;
