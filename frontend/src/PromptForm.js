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
  const [incompleteForm, setIncompleteForm] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // await login(formData);
    console.log(formData);
    if (formData.prompt === "") {
      setIncompleteForm(true);
      return;
    } else setIncompleteForm(false);

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

  const alert = (
    <div className="alert alert-info">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>Cannot leave prompt input empty</span>
    </div>
  );

  return (
    <form className="w-screen" onSubmit={handleSubmit}>
      {alert}
      <div className="form-control  mx-20 ">
        <select
          className="select bg-black m-auto  max-w-xs"
          onChange={handleChange}
          id="playlist_id"
          name="playlist_id"
        >
          <option disabled selected>
            Choose a playlist to search
          </option>
          <option value="all-songs">all songs in GrooveGuru</option>
          {playlistsInDb.map((playlist) => (
            <option value={playlist.id}>{playlist.name}</option>
          ))}
        </select>
        {/* <button className="btn">Go</button> */}
      </div>

      <div className="form-control mx-10 my-5 md:w-4/5 md:mx-auto lg:w-2/3">
        <div className="input-group ">
          <input
            type="text"
            placeholder="Enter genre, mood, or feeling"
            className="input input-bordered w-full bg-black"
            id="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
          <button className="btn btn-square">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* <label>
        count
        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>count</span>
            <input
              id="count"
              type="number"
              value={formData.count}
              onChange={handleChange}
              className="input input-bordered"
            />
          </label>
        </div>
      </label> */}

      {/* <input
        name="filterOrCreate"
        type="radio"
        aria-label="Filter"
        className="btn"
      />
      <input
        name="filterOrCreate"
        type="radio"
        aria-label="Create"
        className="btn"
      /> */}
    </form>
  );
};

export default PromptForm;
