import React from "react";

const CreatePlaylistForm = () => {
  return (
    <form className="btm-nav">
      <label>
        Playlist name
        <input
          id="name"
          type="text"
          //   value={formData.name}
          //   onChange={handleChange}
        />
      </label>
      <label>
        Playlist description
        <input
          id="description"
          type="text"
          //   value={formData.name}
          //   onChange={handleChange}
        />
      </label>
      <button className="text-success">Create Playlist</button>
    </form>
  );
};

export default CreatePlaylistForm;
