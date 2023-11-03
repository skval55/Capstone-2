import React from "react";
import Playlists from "./Playlists";

const Drawer = ({ playlists, addPlaylistToDb }) => {
  return (
    <div className="drawer z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}

          {playlists.map((item) => (
            <Playlists
              key={item.id}
              id={item.id}
              name={item.name}
              inDb={item.in_db}
              addPlaylistToDb={addPlaylistToDb}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
