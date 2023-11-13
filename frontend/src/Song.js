import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faPause, faPlay);

const Songs = ({
  id,
  name,
  artist,
  album,
  img_url,
  mp3_url,
  setSelectedSongs,
  selectedSongs,
  setPlayingSong,
  playingSong,
}) => {
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const changeClass = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (playingSong !== id) setPlaying(false);
  }, [playingSong]);

  const handleClick = () => {
    changeClass();

    let set;
    if (selectedSongs.has(id)) {
      selectedSongs.delete(id);
      set = new Set([...selectedSongs]);
    } else {
      // Create a new Set with the currently selected song ID and clear the playback
      set = new Set([...selectedSongs, id]);
    }
    setSelectedSongs(set);
  };

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      // Pause any currently playing song
      const audioElements = document.getElementsByTagName("audio");
      for (let i = 0; i < audioElements.length; i++) {
        if (audioElements[i] !== audioRef.current) {
          audioElements[i].pause();
        }
      }
      audioRef.current.play();
      setPlayingSong(id);
    }
    setPlaying(!playing);
  };

  let iconClass = playing ? "fa-solid fa-pause" : "fa-solid fa-play";

  return (
    <div className="flex w-screen truncate">
      <button className="btn w-10 ml-3 self-center ">
        <FontAwesomeIcon icon={iconClass} onClick={() => togglePlay()} />
      </button>
      <div className="" onClick={() => handleClick()}>
        <li>
          <div className={selectedSongs.has(id) ? "active" : null}>
            <div className="w-14">
              <img src={img_url} alt={`${name} - ${artist}`} />
            </div>
            <audio ref={audioRef} className={playing ? "play" : null}>
              <source src={mp3_url} type="audio/mpeg" />
            </audio>

            <div className="flex flex-col ">
              <p className="truncate text-lg w-[60vw] font-semibold max-w-full md:w-[80vw] lg:w-[85vw]">
                {name}
              </p>
              <p>{artist}</p>
            </div>
          </div>
        </li>
      </div>
    </div>
  );
};

export default Songs;
