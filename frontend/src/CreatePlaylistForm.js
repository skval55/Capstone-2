import React, { useEffect, useState } from "react";

const CreatePlaylistForm = ({ selectedSongs, createPlaylist }) => {
  const [showActive, setShowActive] = useState(false);
  const INITIAL_STATE = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  //   let activeClass = "disabled";
  useEffect(() => {
    console.log("useEffect launched");
    selectedSongs.size > 0 ? setShowActive(true) : setShowActive(false);
    // activeClass = showActive ? "text-success" : "disabled";
  }, [selectedSongs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    createPlaylist(formData);
    setFormData(INITIAL_STATE);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [id]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="btm-nav">
      <label>
        Playlist name
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Playlist description
        <input
          id="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <button className="text-success">Create Playlist</button>
    </form>
  );
};

export default CreatePlaylistForm;
