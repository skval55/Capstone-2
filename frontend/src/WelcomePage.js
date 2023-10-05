import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SpotifyApi from "./Api";

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

  return (
    <div>
      <h1>done my bro</h1>
      <button onClick={() => spotifyApi.getPlaylists()}>get playlists</button>
      <button onClick={() => spotifyApi.getMusic()}>get music</button>
      <button onClick={() => spotifyApi.getTracksFeatures()}>
        get music deets
      </button>
    </div>
  );
};

export default WelcomePage;
