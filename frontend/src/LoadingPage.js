import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import "./LoadingPage.css";
const FADE_INTERVAL_MS = 1750;
const WORD_CHANGE_INTERVAL_MS = FADE_INTERVAL_MS * 2;
const WORDS_TO_ANIMATE = [
  "Downloading your music right now",
  "Gathering artists and albums",
  "Soon you'll be able to create playlists in seconds",
];

const LoadingPage = () => {
  const [fadeProp, setFadeProp] = useState({ fade: "fade-in" });
  const [wordOrder, setWordOrder] = useState(0);

  useEffect(() => {
    const fadeTimeout = setInterval(() => {
      fadeProp.fade === "fade-in"
        ? setFadeProp({ fade: "fade-out" })
        : setFadeProp({ fade: "fade-in" });
    }, FADE_INTERVAL_MS);

    return () => clearInterval(fadeTimeout);
  }, [fadeProp]);

  useEffect(() => {
    const wordTimeout = setInterval(() => {
      setWordOrder(
        (prevWordOrder) => (prevWordOrder + 1) % WORDS_TO_ANIMATE.length
      );
    }, WORD_CHANGE_INTERVAL_MS);

    return () => clearInterval(wordTimeout);
  }, []);

  return (
    <div className="h-screen w-screen bg-cover bg-top bg-[url('./images/grooveGuruBackgroundImg2.jpg')]">
      <div className="absolute h-screen w-screen  bg-zinc-900/50 flex flex-col justify-start ">
        <img className=" w-16 m-auto  mt-8 mb-0" src={logo} alt="logo" />

        <h1 className="font-bold text-2xl mb-16 text-black ">GrooveGuru</h1>

        <h1 className="font-bold text-2xl ">
          <span className={fadeProp.fade}>{WORDS_TO_ANIMATE[wordOrder]}</span>
        </h1>
      </div>
    </div>
  );
};

export default LoadingPage;
