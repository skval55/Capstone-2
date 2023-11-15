import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faXmark, faPause } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faPause, faXmark);

const FormSong = ({
  id,
  name,
  artist,
  album,
  img_url,
  mp3_url,
  setSelectedSongs,
  selectedSongs,
  canDelete,
}) => {
  const handleClick = () => {
    let set = selectedSongs;
    set.delete(id);
    setSelectedSongs(new Set(set));
  };

  return (
    <div className="flex w-screen truncate">
      <div className="">
        <li>
          <div>
            {canDelete ? (
              <button onClick={handleClick}>
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
              </button>
            ) : null}

            <div className="w-12">
              <img src={img_url} alt={`${name} - ${artist}`} />
            </div>

            <div className="flex flex-col ">
              <p className="truncate text-lg w-[50vw] font-semibold max-w-full ">
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

export default FormSong;
