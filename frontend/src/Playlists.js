import React, { useEffect, useState } from "react";
import albumCover from "./images/default_album_cover.jpg";
// import SpotifyApi from "./Api";
// import BackendApi from "./backendApi";

const Playlists = ({ id, name, inDb, addPlaylistToDb }) => {
  return (
    <li className="flex flex-row my-1">
      <img className="w-14 p-0 rounded-none" src={albumCover} />
      <button className="w-[47vw] p-1 my-auto">
        <p className="text-ellipsis">{name}</p>
      </button>
      {inDb ? (
        <div className="px-0 my-auto">
          <input
            type="checkbox"
            checked
            className="checkbox checkbox-primary  "
          />
        </div>
      ) : (
        <div className="px-0 my-auto">
          <button
            onClick={() => {
              addPlaylistToDb(id);
            }}
            className=" px-1.5   text-lg  text-primary "
          >
            +
          </button>
        </div>
      )}
    </li>
  );
};

export default Playlists;
