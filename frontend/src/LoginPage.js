import React, { useEffect } from "react";
import SpotifyApi from "./Api";
import axios from "axios";

// const LoginPage = () => {
//   useEffect(() => {
//     new SpotifyApi.login();
//   }, []);
//   return (
//     <div>
//       <h1>login my bro</h1>
//     </div>
//   );
// };
const LoginPage = () => {
  const spotifyApi = new SpotifyApi();
  // const login = async () => {
  //   const res = await axios.get("http://localhost:3001/spotify/login");
  //   console.log(res);
  // };
  useEffect(() => {
    console.log("sup brp");
    localStorage.clear();
  }, []);

  return (
    <div>
      <h1>login my bro</h1>
      <button onClick={() => spotifyApi.login()}>login</button>
    </div>
  );
};

export default LoginPage;
