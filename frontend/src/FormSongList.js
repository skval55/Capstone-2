import React, { useState, useEffect } from "react";
import FormSong from "./FormSong";

const FormSongList = ({ currSongs, selectedSongs, setSelectedSongs }) => {
  const [currSelectedSongs, setCurrSelectedSongs] = useState([]);

  useEffect(() => {
    let songArr = [];
    for (let i = 0; i < currSongs.length; i++) {
      if (selectedSongs.has(currSongs[i].id)) songArr.push(currSongs[i]);
    }
    setCurrSelectedSongs([...songArr]);
  }, [selectedSongs]);

  const songs = () => {
    return currSelectedSongs.map((song) => {
      return (
        <FormSong
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
    <div className="max-h-[43vh] w-[50vw]">
      <ul className="menu bg-base-200 w-screen [&_li>*]:rounded-none px-0">
        <div>{songs()}</div>
      </ul>
    </div>
  );
};

export default FormSongList;
