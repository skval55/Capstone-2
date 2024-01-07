import React, { useEffect, useState } from "react";
import Songs from "./Song";
import CreatePlaylistForm from "./CreatePlaylistForm";
import BackendApi from "./backendApi";
import InfiniteScroll from "react-infinite-scroll-component";

const SongList = ({ currSongs, loadingSongs, setLoadingSongs }) => {
  const backendApi = new BackendApi();
  const [selectedSongs, setSelectedSongs] = useState(new Set());
  const [playinSong, setPlayingSong] = useState(null);
  const [playlistCreated, setPlaylistCreated] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  console.log(selectedSongs);

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
    if (res) {
      setLoadingModal(false);
      setPlaylistCreated(true);
    }
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
          spotify_url={song.spotify_url}
          setSelectedSongs={setSelectedSongs}
          selectedSongs={selectedSongs}
          setPlayingSong={setPlayingSong}
          playingSong={playinSong}
        />
      );
    });
  };

  const [items, setItems] = useState(songs().slice(0, 20));
  const [dataLength, setDataLength] = useState(20);
  useEffect(() => {
    console.log("running useEffect in SongList component");
    setLoadingSongs(false);
    setSelectedSongs(new Set());
    setItems(songs().slice(0, 20));
    setDataLength(20);
    if (songs().length > 20) setHasMore(true);
  }, [currSongs]);
  const fetchData = () => {
    if (dataLength >= songs().length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(songs().slice(0, dataLength + 20));
      console.log("datalength", dataLength);
      setDataLength(dataLength + 20);
      console.log("datalength", dataLength);
    }, 1000);
  };

  const loading = (
    <div>
      <p className="text-3xl text-zinc-500 font-[500] sm:text-4xl">
        Loading Songs
      </p>
      <span className="loading loading-spinner loading-lg"></span>
      <div className="h-80 bg-black"></div>
    </div>
  );

  const search = (
    <div>
      <p className="text-3xl text-zinc-500 font-[500] sm:text-4xl">
        Search Songs
      </p>
      <p className="h-80 text-zinc-500">songs will appear here after Search</p>
    </div>
  );

  return (
    <div>
      <ul className="menu bg-black min-h-[50vh] w-screen pb-20 [&_li>*]:rounded-none px-0 ">
        {loadingSongs ? (
          loading
        ) : currSongs.length > 0 ? (
          <div className="bg-black">
            <p className="text-3xl text-zinc-500 font-[500] sm:text-4xl">
              Choose Songs
            </p>
            {/* {songs()} */}
            <InfiniteScroll
              dataLength={dataLength} //This is important field to render the next data
              next={fetchData}
              hasMore={hasMore}
              loader={loading}
              endMessage={<p style={{ textAlign: "center" }}></p>}
            >
              {songs().slice(0, dataLength)}
            </InfiniteScroll>
          </div>
        ) : (
          search
        )}
      </ul>

      <CreatePlaylistForm
        selectedSongs={selectedSongs}
        createPlaylist={createPlaylist}
        currSongs={currSongs}
        setSelectedSongs={setSelectedSongs}
        playlistCreated={playlistCreated}
        setPlaylistCreated={setPlaylistCreated}
        loadingModal={loadingModal}
        setLoadingModal={setLoadingModal}
      />
    </div>
  );
};

export default SongList;
