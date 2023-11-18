import React from "react";
import logo from "./images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import BackendApi from "./backendApi";
const NavBar = () => {
  const navigate = useNavigate();
  const backendApi = new BackendApi();
  const modal = () => {
    const handleClick = async () => {
      const res = await backendApi.deleteUser(localStorage.getItem("username"));
      if (res) {
        console.log("user deleted");
        navigate("/");
      }
    };

    return (
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            Are you sure you want to delete your GrooveGuru account?
          </h3>
          <p>All your music will be deleted from GrooveGuru</p>
          <button onClick={() => handleClick()} className="btn btn-error">
            Confrim Delete
          </button>
        </div>
      </dialog>
    );
  };

  return (
    <div className="navbar bg-black z-20 fixed">
      <div className="flex justify-between w-screen">
        <div className="dropdown dropdown-start">
          <label tabIndex={0} className="btn btn-ghost flex ">
            <img
              className=" rounded-full h-10 w-10"
              alt="Tailwind CSS Navbar component"
              src={localStorage.getItem("user_img")}
            />
            <p className="hidden md:block">
              {localStorage.getItem("username")}
            </p>
          </label>
          {modal()}
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-black rounded-box w-52"
          >
            <li>
              <Link className="" to={`/`}>
                Logout
              </Link>
            </li>

            <li>
              <a
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
              >
                Delete Account
              </a>
            </li>
          </ul>
        </div>

        <a className="btn btn-ghost justify-self-center hidden md:inline-flex bg-zinc-900">
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
