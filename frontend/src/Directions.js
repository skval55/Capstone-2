import React from "react";

const Directions = () => {
  return (
    <div className="flex flex-wrap place-content-around pt-16 pb-12 max-w-7xl w-full m-auto text-left">
      <div className="w-64 sm:w-96 mx-4 my-8 mt-10">
        <h2 className="text-3xl text-zinc-50 font-[500] sm:text-4xl">
          <span className="text-action">1.</span>
          Search
        </h2>
        <p className="text-lg text-zinc-300 py-4">
          Use Ai enhanced search bar to find songs you want, by searching mood,
          genre, or feel.
        </p>
      </div>
      <div className="w-64 sm:w-96 mx-4 my-8">
        <h2 className="text-3xl text-zinc-50 font-[500] sm:text-4xl">
          <span className="text-action">2.</span>
          Choose
        </h2>
        <p className="text-lg text-zinc-300 py-4">
          Easily select the songs you want to put in your next playlist by
          simply clicking on the songs you want.
        </p>
      </div>
      <div className="w-64 sm:w-96 mx-4 my-8">
        <h2 className="text-3xl text-zinc-50 font-[500] sm:text-4xl">
          <span className="text-action">3.</span>
          Create
        </h2>
        <p className="text-lg text-zinc-300 py-4">
          Enter a playlist name and description and add that playlist to your
          spotify.
        </p>
      </div>
    </div>
  );
};

export default Directions;
