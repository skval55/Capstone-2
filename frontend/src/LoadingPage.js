import React, { useState, useEffect } from "react";

import { useTransition, animated } from "@react-spring/web";

const LoadingPage = () => {
  const texts = [
    "Downloading your music right now",
    "Gathering artists and albums",
    "Soon you'll be able to create playlists in seconds",
  ];
  //   const [transitions, api] = useTransition(texts, () => ({
  //     from: { opacity: 0 },
  //     enter: { opacity: 1 },
  //     leave: { opacity: 1 },
  //   }));

  //   return (
  //     <div className="h-screen w-screen bg-cover bg-top bg-[url('./images/grooveGuruBackgroundImg2.jpg')]">
  //       <div className="absolute h-screen w-screen  bg-zinc-900/50 flex flex-col justify-center ">
  //         <h1 className="font-bold text-2xl animate-fade">
  //           {transitions((style, item) => (
  //             <animated.div style={style}>{item}</animated.div>
  //           ))}
  //         </h1>
  //       </div>
  //     </div>
  //   );
  // };
  const [currentText, setCurrentText] = useState(texts[0]);

  function setRandomText() {
    const index = Math.floor(Math.random() * texts.length);
    let newText = texts[index];
    if (newText == currentText) {
      setRandomText();
    } else {
      setCurrentText(newText);
    }
    return;
  }

  useEffect(() => {
    setTimeout(() => {
      setRandomText();
    }, 2000);
  }, [currentText]);

  return (
    <div className="h-screen w-screen bg-cover bg-top bg-[url('./images/grooveGuruBackgroundImg2.jpg')]">
      <div className="absolute h-screen w-screen  bg-zinc-900/50 flex flex-col justify-center ">
        <h1 className="font-bold text-2xl animate-fade">{currentText}</h1>
      </div>
    </div>
  );
};

export default LoadingPage;
