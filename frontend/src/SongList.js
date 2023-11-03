import React, { useEffect, useState } from "react";
import Songs from "./Song";
import CreatePlaylistForm from "./CreatePlaylistForm";
import BackendApi from "./backendApi";

const SongList = ({ currSongs }) => {
  const backendApi = new BackendApi();
  const [selectedSongs, setSelectedSongs] = useState(new Set());
  console.log(selectedSongs);
  useEffect(() => {
    console.log("selectedSongs from songlist", selectedSongs);
  }, [selectedSongs]);
  const createPlaylist = (formData) => {
    console.log("name", formData.name, "description", formData.description);
    console.log("songs", selectedSongs);
    backendApi.createPlaylist(formData.name, formData.description, [
      ...selectedSongs,
    ]);
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
      <ul className="menu bg-base-200 w-screen [&_li>*]:rounded-none">
        {currSongs.length > 0 ? (
          <div>
            <p className="text-3xl text-zinc-500 font-[500] sm:text-4xl">
              Choose Songs
            </p>
            {songs()}
          </div>
        ) : (
          <div>
            <p className="text-3xl text-zinc-500 font-[500] sm:text-4xl">
              Search Songs
            </p>
            <p className="h-64 text-zinc-500">
              songs will appear here after Search
            </p>
          </div>
        )}
      </ul>
      {/* 
      <CreatePlaylistForm
        selectedSongs={selectedSongs}
        createPlaylist={createPlaylist}
      /> */}
    </div>
  );
};

export default SongList;
