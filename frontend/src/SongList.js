import React, { useEffect, useState } from "react";
import Songs from "./Song";
import CreatePlaylistForm from "./CreatePlaylistForm";
import BackendApi from "./backendApi";

const SongList = ({ currSongs }) => {
  const backendApi = new BackendApi();
  const [selectedSongs, setSelectedSongs] = useState(new Set());

  const createPlaylist = (formData) => {
    console.log("name", formData.name, "description", formData.description);
    console.log("songs", selectedSongs);
    backendApi.createPlaylist(
      formData.name,
      formData.description,
      selectedSongs
    );
  };

  const songs = () => {
    return currSongs.map((song) => {
      return (
        <Songs
          key={song.id}
          id={song.id}
          name={song.title}
          artist={song.artist}
          album={song.album}
          mp3_url={song.mp3_url}
          img_url={song.img_url}
          setSelectedSongs={setSelectedSongs}
          selectedSongs={selectedSongs}
        />
      );
    });
  };
  return (
    <div>
      <ul className="menu bg-base-200 w-56 [&_li>*]:rounded-none">
        {currSongs.length > 0 ? songs() : <p>Search Songs</p>}
      </ul>

      <CreatePlaylistForm
        selectedSongs={selectedSongs}
        createPlaylist={createPlaylist}
      />
    </div>
  );
};

export default SongList;
