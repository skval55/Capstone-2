import React, { useEffect, useState } from "react";
// import SpotifyApi from "./Api";
// import BackendApi from "./backendApi";

const Playlists = ({ id, name, inDb, addPlaylistToDb }) => {
  let btnClass = inDb
    ? "btn btn-outline btn-primary btn-disabled"
    : "btn btn-outline btn-primary ";

  return (
    <li>
      <button
        className={btnClass}
        onClick={() => {
          addPlaylistToDb(id);
        }}
      >
        {name}
      </button>
      {inDb ? (
        <div>
          Added
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-primary "
          />
        </div>
      ) : null}
    </li>
  );
};

export default Playlists;
