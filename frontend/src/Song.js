// import React, { useState } from "react";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { library } from "@fortawesome/fontawesome-svg-core";
// // import { fab } from "@fortawesome/free-brands-svg-icons";

// // library.add(fab);

// const Songs = ({
//   id,
//   name,
//   artist,
//   album,
//   img_url,
//   mp3_url,
//   setSelectedSongs,
//   selectedSongs,
// }) => {
//   const [active, setActive] = useState(false);
//   const [playing, setPlaying] = useState(false);
//   const changeClass = () => {
//     setActive(!active);
//   };

//   const handleClick = () => {
//     changeClass();

//     let set;
//     if (selectedSongs.has(id)) {
//       selectedSongs.delete(id);
//       set = selectedSongs;
//     } else set = selectedSongs.add(id);
//     setSelectedSongs(set);
//     console.log("set", set);
//     console.log(selectedSongs);
//   };
//   return (
//     <div className="w-screen" onClick={() => handleClick()}>
//       <li>
//         <div className={active ? "active" : null}>
//           <img
//             width="64px"
//             height="64px"
//             src={img_url}
//             alt={`${name} - ${artist}`}
//           />
//           <audio className={playing ? "play" : null}>
//             <source src={mp3_url} type="audio/mpeg" />
//           </audio>
//           <button className="btn" onClick={() => setPlaying(true)}>
//             {/* <FontAwesomeIcon icon="fa-solid fa-play" /> */}
//             click
//           </button>
//           <p>{name}</p>
//           <p>{artist}</p>
//           <p>{album}</p>
//         </div>
//       </li>
//     </div>
//   );
// };
// export default Songs;

import React, { useState, useRef } from "react";

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
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const changeClass = () => {
    setActive(!active);
  };

  const handleClick = () => {
    changeClass();

    let set;
    if (selectedSongs.has(id)) {
      selectedSongs.delete(id);
      set = selectedSongs;
    } else {
      // Create a new Set with the currently selected song ID and clear the playback
      set = new Set([id]);
      if (audioRef.current) {
        audioRef.current.pause();
        setPlaying(false);
      }
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
    }
    setPlaying(!playing);
  };

  return (
    <div className="w-screen" onClick={() => handleClick()}>
      <li>
        <div className={active ? "active" : null}>
          <img
            width="64px"
            height="64px"
            src={img_url}
            alt={`${name} - ${artist}`}
          />
          <audio ref={audioRef} className={playing ? "play" : null}>
            <source src={mp3_url} type="audio/mpeg" />
          </audio>
          <button className="btn" onClick={() => togglePlay()}>
            {playing ? "Pause" : "Play"}{" "}
            {/* Toggle the label based on the playing state */}
          </button>
          <p>{name}</p>
          <p>{artist}</p>
          <p>{album}</p>
        </div>
      </li>
    </div>
  );
};

export default Songs;
