import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SpotifyApi from "./Api";
import BackendApi from "./backendApi";
import Playlists from "./Playlists";
import { name } from "mustache";
import PromptForm from "./PromptForm";
import Songs from "./Song";
import SongList from "./SongList";

const WelcomePage = () => {
  const [searchParams] = useSearchParams();
  const [currUser, setCurrUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [playlistsInDb, setPlaylistsInDb] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currSongs, setCurrSongs] = useState([]);
  const spotifyApi = new SpotifyApi();
  const backendApi = new BackendApi();
  let useEffectBool = true;

  useEffect(() => {
    async function fetchData() {
      const accessToken = localStorage.getItem("access_token");

      if (!currUser && useEffectBool) {
        useEffectBool = false;
        console.log("first use effect");

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
    const checkForUserInDb = async (username) => {
      const res = await backendApi.checkDbForCurrUser(username);
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
      if (localStorage.getItem("username")) {
        const userExists = await checkForUserInDb(
          localStorage.getItem("username")
        );
        if (!userExists) {
          await updateUser();
          await updateDatabase();
        }
        await getPlaylists(localStorage.getItem("username"));
        setPlaylistsInDb(
          playlists.filter((playlist) => playlist.in_db === true)
        );
        setLoading(false);
      }
    };
    updateAll();
  }, [currUser]);

  const addPlaylistToDb = async (id) => {
    setLoading(true);
    const newPlaylists = playlists.map((playlist) => {
      if (playlist.id === id) {
        playlist.in_db = true;
        setPlaylistsInDb([...playlistsInDb, playlist]);
      }
      return playlist;
    });
    setPlaylists(newPlaylists);
    await backendApi.addPlaylistToDb(
      id,
      localStorage.getItem("access_token"),
      localStorage.getItem("username")
    );
    setLoading(false);
  };

  const loadingPage = <h1>Loading</h1>;
  const form = () => (
    <div>
      <h1>welcome {localStorage.getItem("username")}</h1>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}

            {playlists.map((item) => (
              <Playlists
                key={item.id}
                id={item.id}
                name={item.name}
                inDb={item.in_db}
                addPlaylistToDb={addPlaylistToDb}
              />
            ))}
          </ul>
        </div>
      </div>
      <PromptForm
        setCurrSongs={setCurrSongs}
        currSongs={currSongs}
        playlistsInDb={playlistsInDb}
      />
      <button onClick={() => console.log(playlistsInDb)}>click me</button>
      <SongList currSongs={currSongs} />
    </div>
  );

  return <div>{loading ? loadingPage : form()}</div>;
};

export default WelcomePage;
