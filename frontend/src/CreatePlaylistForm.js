import React, { useEffect, useState } from "react";
import FormSongList from "./FormSongList";

const CreatePlaylistForm = ({
  selectedSongs,
  createPlaylist,
  currSongs,
  setSelectedSongs,
  playlistCreated,
  setPlaylistCreated,
  loadingModal,
  setLoadingModal,
}) => {
  const [showActive, setShowActive] = useState(false);
  const [playlistName, setPlaylistName] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState(new Set());
  const INITIAL_STATE = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [activeClass, setActiveClass] = useState("btn btn-disabled"); // Store the active class in state
  const [activeClick, setActiveClick] = useState(null); // Store the active class in state

  useEffect(() => {
    console.log("useEffect launched");
    selectedSongs.size > 0 ? setShowActive(true) : setShowActive(false);

    // Update the activeClass based on the showActive state
    setActiveClass(showActive ? "btn text-success" : " btn btn-disabled ");
    setActiveClick(showActive ? () => openModal : null);
  }, [selectedSongs, showActive]);

  const openModal = () => {
    document.getElementById("my_modal_3").showModal();
    setPlaylistSongs(new Set());
    setPlaylistCreated(false);
  };

  const [incompleteForm, setIncompleteForm] = useState(false);

  const handleClick = async () => {
    if (formData.name === "") {
      setIncompleteForm(true);
      return;
    }
    setIncompleteForm(false);
    setLoadingModal(true);

    createPlaylist(formData);
    setPlaylistName(formData.name);
    setPlaylistSongs(new Set(selectedSongs));
    setSelectedSongs(new Set());
    setFormData(INITIAL_STATE);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [id]: value,
    }));
  };

  const successDisplay = () => {
    return (
      <div>
        <h3 className="text-xl font-bold m-3">Playlist Created</h3>
        <h3 className="text-xl font-bold m-3 capitalize">{playlistName}</h3>
        <div className="collapse bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">Songs</div>
          <div className="collapse-content overflow-y-scroll overflow-x-hidden ">
            <FormSongList
              playlistSongs={playlistSongs}
              selectedSongs={selectedSongs}
              currSongs={currSongs}
              setSelectedSongs={setSelectedSongs}
            />
          </div>
        </div>
      </div>
    );
  };

  const alert2 = (
    <p className="font-semibold text-red-800">Cannot leave name input empty</p>
  );

  const createDisplay = () => {
    return (
      <div>
        <h3 className="text-xl font-bold m-3">Create Playlist</h3>
        <form
          className="form-control flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <label>
            {incompleteForm ? alert2 : null}
            <input
              className="input input-bordered w-full "
              placeholder="Playlist Name"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <textarea
            className="textarea w-full h-20 textarea-bordered"
            placeholder="Playlist Description"
            id="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">Songs</div>
            <div className="collapse-content overflow-y-scroll overflow-x-hidden ">
              <FormSongList
                playlistSongs={playlistSongs}
                selectedSongs={selectedSongs}
                currSongs={currSongs}
                setSelectedSongs={setSelectedSongs}
              />
            </div>
          </div>

          <button onClick={handleClick} className="btn">
            Create Playlist
          </button>
        </form>
      </div>
    );
  };

  const loadingDisplay = () => {
    return (
      <div>
        <h3 className="text-xl font-bold m-3">Creating Playlist</h3>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  };
  const noSongsDisplay = () => {
    return (
      <div>
        <h3 className="text-xl font-bold m-3 capitalize">No songs selected</h3>
        <p className="font-semibold ">
          Exit here and select more songs to create playlist
        </p>
      </div>
    );
  };

  return (
    <div className=" bg-gradient-to-t from-black btm-nav ">
      <button className={activeClass} onClick={activeClick}>
        Create Playlist
      </button>
      <dialog id="my_modal_3" className="modal ">
        <div className="modal-box w-[90vw] ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {loadingModal
            ? loadingDisplay()
            : playlistCreated
            ? successDisplay()
            : selectedSongs.size > 0
            ? createDisplay()
            : noSongsDisplay()}

          {/* <h3 className="text-xl font-bold m-3">Create Playlist</h3>
          <form
            className="form-control flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <label>
              <input
                className="input input-bordered w-full "
                placeholder="Playlist Name"
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <textarea
              className="textarea w-full h-20 textarea-bordered"
              placeholder="Playlist Description"
              id="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
            ></textarea>

            <div className="collapse bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">Songs</div>
              <div className="collapse-content overflow-y-scroll overflow-x-hidden ">
                <FormSongList
                  selectedSongs={selectedSongs}
                  currSongs={currSongs}
                  setSelectedSongs={setSelectedSongs}
                />
              </div>
            </div>

            <button className="btn">Create Playlist</button>
          </form> */}
        </div>
      </dialog>
    </div>
  );
};

export default CreatePlaylistForm;
