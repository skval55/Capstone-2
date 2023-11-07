import React from "react";
import Playlists from "./Playlists";

const Drawer = ({ playlists, addPlaylistToDb }) => {
  return (
    <div className="drawer  z-20">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-4 w-[60vw] min-h-full bg-base-200 text-base-content ">
          {/* Sidebar content here */}
          <h3 className="font-semibold text-xl capitalize">
            {localStorage.getItem("username")} Playlists
          </h3>
          <p className="pb-4 text-zinc-500">
            Add playlists to GrooveGuru by downloading them here.
          </p>

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
