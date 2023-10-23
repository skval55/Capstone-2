import React, { useEffect, useState } from "react";
import BackendApi from "./backendApi";

const PromptForm = ({ setCurrSongs, currSongs, playlistsInDb }) => {
  const backendApi = new BackendApi();
  const INITIAL_STATE = {
    prompt: "",
    count: 5,
    playlist_id: "all-songs",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // await login(formData);
    console.log(formData);
    const res = await backendApi.searchSongs(
      formData.prompt,
      formData.count,
      formData.playlist_id
    );
    console.log("frontend");
    console.log(res.data.response);
    const songs = res.data.response;
    // changeCurrSongs(songs);
    setCurrSongs(songs);
    console.log(currSongs);

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
    <form onSubmit={handleSubmit}>
      <label>
        Prompt
        <input
          id="prompt"
          type="text"
          value={formData.prompt}
          onChange={handleChange}
        />
      </label>
      <label>
        count
        <input
          id="count"
          type="number"
          value={formData.count}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="playlist">Choose a playlist:</label>
      <select onChange={handleChange} id="playlist_id" name="playlist_id">
        <option value="all-songs">all songs in GrooveGuru</option>
        {playlistsInDb.map((playlist) => (
          <option value={playlist.id}>{playlist.name}</option>
        ))}
      </select>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default PromptForm;
