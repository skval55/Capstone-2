import React, { useEffect } from "react";
import SpotifyApi from "./Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import logo from "./images/logo.png";
import Footer from "./Footer";
import Modal from "./Modal";
import ModalTwo from "./ModalTwo.js";

library.add(fab);

const LoginPage = () => {
  const spotifyApi = new SpotifyApi();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div>
      <div className="h-screen w-screen bg-cover -z-20 bg-top bg-[url('./images/grooveGuruBackgroundImg2low.jpg')]">
      <div className="h-screen w-screen bg-cover bg-top -z-10 bg-[url('./images/grooveGuruBackgroundImg2.jpg')]">
        <div className="absolute h-screen w-screen  bg-zinc-900/50  flex flex-col md:flex-row md:flex-wrap md:content-between md:justify-around">
          <Modal />
          <ModalTwo />
          <div className="flex md:w-screen md:h-20 justify-between m-4 ">
            <button
              className="btn btn-ghost"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
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
              source code
            </button>
            <img className=" h-16" src={logo} alt="logo" />
          </div>
          <div className="my-auto mx-10 text-left text-2xl  md:m-0 md:pt-16 md:px-8 md:h-2/3">
            <h1 className="font-bold">GROOVEGURU</h1>
            <h1 className="font-bold">Spotify has deprecated API end points </h1>
            <h1 className="font-bold">that help this application run as of JAN 2nd, 2025</h1>
            <p>Ai enhanced playlist gererator</p>
          </div>
          <div className=" modal-box bg-black mb-auto mx-auto py-8 md:mx-0 md:px-8 md:w-1/3 lg:w-1/2 ">
            <h3 className="font-bold text-4xl">Login to GrooveGuru</h3>

            <div className="modal-action"></div>
            <button
              className="btn btn-primary m-4 md:m-0 md:h-auto md:py-2 lg:m-4"
              onClick={() => spotifyApi.login()}
            >
              <FontAwesomeIcon
                className="text-xl"
                icon="fa-brands fa-spotify"
              />
              Continue with spotify
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => document.getElementById("my_modal_4").showModal()}
            >Learn more about GrooveGuru.</button>
            
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
