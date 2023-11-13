import React, { useEffect, useState } from "react";
import Songs from "./Song";
import CreatePlaylistForm from "./CreatePlaylistForm";
import BackendApi from "./backendApi";

const SongList = ({ currSongs, loadingSongs, setLoadingSongs }) => {
  const backendApi = new BackendApi();
  const [selectedSongs, setSelectedSongs] = useState(new Set());
  const [playinSong, setPlayingSong] = useState(null);
  const [playlistCreated, setPlaylistCreated] = useState(false);
  console.log(selectedSongs);
  useEffect(() => {
    setLoadingSongs(false);
    setSelectedSongs(new Set());
  }, [currSongs]);
  const createPlaylist = async (formData) => {
    console.log("name", formData.name, "description", formData.description);
    console.log("songs", selectedSongs);
    const res = await backendApi.createPlaylist(
      formData.name,
      formData.description,
      [...selectedSongs]
    );
    // console.log(res);
    // return res;
    if (res) setPlaylistCreated(true);
  };

  const songs = () => {
    return currSongs.map((song) => {
      return (
        <Songs
          key={song.id}
          id={song.id}
          name={song.title}
          artist={song.artist}
          album={song.album}
          mp3_url={song.mp3_url}
          img_url={song.img_url}
          setSelectedSongs={setSelectedSongs}
          selectedSongs={selectedSongs}
          setPlayingSong={setPlayingSong}
          playingSong={playinSong}
        />
      );
    });
  };

  const loading = (
    <div>
      <p className="text-3xl text-zinc-500 font-[500] sm:text-4xl">
        Loading Songs
      </p>
      <span className="loading loading-spinner loading-lg"></span>
      <div className="h-64"></div>
    </div>
  );

  const search = (
    <div>
      <p className="text-3xl text-zinc-500 font-[500] sm:text-4xl">
        Search Songs
      </p>
      <p className="h-64 text-zinc-500">songs will appear here after Search</p>
    </div>
  );

  return (
    <div>
      <ul className="menu bg-base-200 w-screen pb-20 [&_li>*]:rounded-none px-0 ">
        {loadingSongs ? (
          loading
        ) : currSongs.length > 0 ? (
          <div>
            <p className="text-3xl text-zinc-500 font-[500] sm:text-4xl">
              Choose Songs
            </p>
            {songs()}
          </div>
        ) : (
          <div>
            <p className="text-3xl text-zinc-500 font-[500] sm:text-4xl">
              Search Songs
            </p>
            <p className="h-64 text-zinc-500">
              songs will appear here after Search
            </p>
          </div>
        )}
      </ul>

      <CreatePlaylistForm
        selectedSongs={selectedSongs}
        createPlaylist={createPlaylist}
        currSongs={currSongs}
        setSelectedSongs={setSelectedSongs}
        playlistCreated={playlistCreated}
        setPlaylistCreated={setPlaylistCreated}
      />
    </div>
  );
};

export default SongList;
