import React, { useEffect, useState } from "react";
import SpotifyApi from "./Api";
import BackendApi from "./backendApi";

const Playlists = ({ id, name, addPlaylistToDb }) => {
  return (
    <li>
      <button onClick={() => addPlaylistToDb(id)}>{name}</button>
    </li>
  );
};

export default Playlists;
