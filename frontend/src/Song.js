import React, { useState } from "react";

const Songs = ({
  id,
  name,
  artist,
  album,
  img_url,
  mp3_url,
  setSelectedSongs,
  selectedSongs,
}) => {
  const [active, setActive] = useState(false);

  const changeClass = () => {
    setActive(!active);
  };
  const handleClick = () => {
    changeClass();

    let set;
    if (selectedSongs.has(id)) {
      selectedSongs.delete(id);
      set = selectedSongs;
    } else set = selectedSongs.add(id);
    setSelectedSongs(set);
    console.log("set", set);
    console.log(selectedSongs);
  };
  return (
    <div onClick={() => handleClick()}>
      <li>
        <div className={active ? "active" : null}>
          <img
            width="64px"
            height="64px"
            src={img_url}
            alt={`${name} - ${artist}`}
          />
          <audio controls>
            <source src={mp3_url} type="audio/mpeg" />
          </audio>
          <p>{name}</p>
          <p>{artist}</p>
          <p>{album}</p>
        </div>
      </li>
    </div>
  );
};
export default Songs;
