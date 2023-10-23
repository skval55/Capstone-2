import React, { useState } from "react";
import Songs from "./Song";
import CreatePlaylistForm from "./CreatePlaylistForm";

const SongList = ({ currSongs }) => {
  const [selectedSongs, setSelectedSongs] = useState(new Set());

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
        <Songs
          key="1"
          name="demo"
          artist="demo"
          album="demo"
          img_url="https://i.scdn.co/image/ab67616d00001e0268598a82291b2953017d9f09"
          mp3_url="https://p.scdn.co/mp3-preview/b428f5e0e7f6a11f7058bfedd113d8a5d9305469?cid=2c63e202adfe49f5b8127478e0289baa"
        />
        {currSongs.length > 0 ? songs() : <p>Search Songs</p>}
      </ul>
      {selectedSongs.size > 0 ? <CreatePlaylistForm /> : null}
    </div>
  );
};

export default SongList;
