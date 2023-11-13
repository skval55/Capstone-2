import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SpotifyApi from "./Api";
import BackendApi from "./backendApi";
import Playlists from "./Playlists";
import { name } from "mustache";
import PromptForm from "./PromptForm";
import Songs from "./Song";
import SongList from "./SongList";
import LoadingPage from "./LoadingPage";
import NavBar from "./NavBar";
import Drawer from "./Drawer";
import Directions from "./Directions";

const WelcomePage = () => {
  const [searchParams] = useSearchParams();
  const [currUser, setCurrUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [playlistsInDb, setPlaylistsInDb] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSongs, setLoadingSongs] = useState(false);
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
          const user_id = res.data.response.id;
          const user_img = res.data.response.images[0].url;
          localStorage.setItem("username", username);
          localStorage.setItem("user_id", user_id);
          localStorage.setItem("user_img", user_img);
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

      return res.data.response;
    };
    const updateAll = async () => {
      if (currUser) {
        const userExists = await checkForUserInDb(currUser);
        if (!userExists) {
          await updateUser();
          await updateDatabase();
        }
        const playlistsResponse = await getPlaylists(currUser);
        setPlaylists(playlistsResponse); // Set playlists after the response is received
        setPlaylistsInDb(
          playlistsResponse.filter((playlist) => playlist.in_db === true)
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

  const form = () => (
    <div className="bg-gradient-to-tr from-cyan-950 via-emerald-950 to-cyan-950">
      <div className="bg-zinc-900/50 ">
        <NavBar />

        <Directions />
        <Drawer playlists={playlists} addPlaylistToDb={addPlaylistToDb} />
        <PromptForm
          setCurrSongs={setCurrSongs}
          currSongs={currSongs}
          playlistsInDb={playlistsInDb}
          setLoadingSongs={setLoadingSongs}
        />
        <SongList
          currSongs={currSongs}
          loadingSongs={loadingSongs}
          setLoadingSongs={setLoadingSongs}
        />
      </div>
    </div>
  );

  return <div>{loading ? <LoadingPage /> : form()}</div>;
  // return (
  //   <div>
  //     <LoadingPage />
  //   </div>
  // );
};

export default WelcomePage;
