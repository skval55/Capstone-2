import React from "react";
import logo from "./images/logo.png";
const NavBar = () => {
  return (
    <div className="navbar bg-zinc-800 z-20 fixed">
      <div className="flex justify-between w-screen">
        <div className="flex btn btn-ghost md:ml-5">
          <img
            className=" rounded-full h-10 w-10 "
            src={localStorage.getItem("user_img")}
            alt="profile picture"
          />
          <p className="hidden md:block">{localStorage.getItem("username")}</p>
        </div>
        <a className="btn btn-ghost justify-self-center hidden md:inline-flex">
          <img className=" h-10" src={logo} alt="logo" />
          GrooveGuru
        </a>

        <ul className="menu menu-horizontal px-1">
          <li>
            <label htmlFor="my-drawer" className="btn  btn-ghost drawer-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
              Playlists
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
