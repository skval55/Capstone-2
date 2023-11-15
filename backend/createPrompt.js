function createPrompt(song) {
  const promptObj = {};
  if (song.details.acousticness > 0.8) promptObj.acoustic = "very acoustic";
  else if (song.details.acousticness > 0.6)
    promptObj.acoustic = "pretty acoustic";
  else if (song.details.acousticness > 0.4)
    promptObj.acoustic = "kinda acoustic";
  else if (song.details.acousticness > 0.2)
    promptObj.acoustic = "not very acoustic";
  else promptObj.acoustic = "not acoustic";

  if (song.details.danceability > 0.8) promptObj.danceable = "very danceable";
  else if (song.details.danceability > 0.6)
    promptObj.danceable = "pretty danceable";
  else if (song.details.danceability > 0.4)
    promptObj.danceable = "kinda danceable";
  else if (song.details.danceability > 0.2)
    promptObj.danceable = "not very danceable";
  else promptObj.danceable = "not danceable";

  if (song.details.energy > 0.8) promptObj.energy = "very high energy";
  else if (song.details.energy > 0.6) promptObj.energy = "high energy";
  else if (song.details.energy > 0.4) promptObj.energy = "kinda high energy";
  else if (song.details.energy > 0.2) promptObj.energy = "kinda low energy";
  else promptObj.energy = "low energy";

  if (song.details.instrumentalness > 0.75)
    promptObj.instrumental = "only instrumental";
  else if (song.details.instrumentalness > 0.5)
    promptObj.instrumental = "very instrumental";
  else if (song.details.instrumentalness > 0.25)
    promptObj.instrumental = "kinda instrumental";
  else promptObj.instrumental = "not instrumental";

  const pitchClass = {
    0: "C",
    1: "C#",
    2: "D",
    3: "D#",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "G#",
    9: "A",
    10: "A#",
    11: "B",
  };
  promptObj.key = pitchClass[song.details.key];

  if ((song.details.mode = 1)) promptObj.majorOrMinor = "major";
  else promptObj.majorOrMinor = "minor";

  if (song.details.popularity > 80) promptObj.popular = "very popular";
  else if (song.details.popularity > 60) promptObj.popular = "pretty popular";
  else if (song.details.popularity > 40) promptObj.popular = "kinda popular";
  else if (song.details.popularity > 20) promptObj.popular = "not very popular";
  else promptObj.popular = "not popular";

  if (song.details.tempo > 200) promptObj.tempo = " very fast";
  else if (song.details.tempo > 160) promptObj.tempo = "fast";
  else if (song.details.tempo > 120) promptObj.tempo = "kinda fast";
  else if (song.details.tempo > 100) promptObj.tempo = "moderate";
  else if (song.details.tempo > 80) promptObj.tempo = "not very fast";
  else if (song.details.tempo > 60) promptObj.tempo = "slow";
  else if (song.details.tempo > 40) promptObj.tempo = "very slow";
  else promptObj.tempo = "very very slow";

  if (song.details.valence > 0.8) promptObj.valence = "very happy";
  else if (song.details.valence > 0.6) promptObj.valence = "happy";
  else if (song.details.valence > 0.4) promptObj.valence = "kinda happy";
  else if (song.details.valence > 0.2) promptObj.valence = "sad";
  else promptObj.valence = "very sad";

  // return `A ${song.details.genres.join(" ")} song. it is ${
  //   promptObj.acoustic
  // } acoustic, ${promptObj.danceable} danceable, ${promptObj.energy} energy, ${
  //   promptObj.instrumental
  // } instramental, ${promptObj.popular} popular, ${
  //   promptObj.tempo
  // } song with a ${promptObj.valence} feel.`;

  return `Describe a song with the following characteristics:
  - Genres: ${song.details.genres.join(", ")}
  - Acousticness: ${promptObj.acoustic}
  - Danceability: ${promptObj.danceable}
  - Energy: ${promptObj.energy}
  - Instrumentalness: ${promptObj.instrumental}
  - Popularity: ${promptObj.popular}
  - Tempo: ${promptObj.tempo}
  - Valence: ${promptObj.valence}
`;

  // return `A ${song.details.genres.join(" ")} song. it is ${
  //   promptObj.acoustic
  // } acoustic, ${promptObj.danceable} danceable, ${promptObj.energy} energy, ${
  //   promptObj.instrumental
  // } instramental, ${promptObj.popular} popular, ${
  //   promptObj.tempo
  // } song with a ${promptObj.valence} feel in the key of ${promptObj.key} ${
  //   promptObj.majorOrMinor
  // }`;
  // return `"${song.songName}" by ${song.artist} is a ${song.details.genres.join(
  //   " "
  // )} song. it is ${promptObj.acoustic} acoustic, ${
  //   promptObj.danceable
  // } danceable, ${promptObj.energy} energy, ${
  //   promptObj.instrumental
  // } instramental, ${promptObj.popular} popular, ${
  //   promptObj.tempo
  // } song with a ${promptObj.valence} feel in the key of ${promptObj.key} ${
  //   promptObj.majorOrMinor
  // }`;
}

// const songObject = {
//   id: "6Rp79bGrzD8cWUGE1eiL8s",
//   songName: "warm blood",
//   artist: "flor",
//   album: "come out. you're hiding (deluxe)",
//   details: {
//     danceability: 0.561,
//     energy: 0.786,
//     key: 3,
//     loudness: -4.791,
//     mode: 1,
//     speechiness: 0.0292,
//     acousticness: 0.0119,
//     instrumentalness: 0.00217,
//     liveness: 0.0798,
//     valence: 0.465,
//     tempo: 142.088,
//     type: "audio_features",
//     id: "6Rp79bGrzD8cWUGE1eiL8s",
//     uri: "spotify:track:6Rp79bGrzD8cWUGE1eiL8s",
//     track_href: "https://api.spotify.com/v1/tracks/6Rp79bGrzD8cWUGE1eiL8s",
//     analysis_url:
//       "https://api.spotify.com/v1/audio-analysis/6Rp79bGrzD8cWUGE1eiL8s",
//     duration_ms: 247414,
//     time_signature: 4,
//     popularity: 43,
//     genres: ["hopebeat", "indie poptimism", "metropopolis"],
//   },
// };

// const songObject2 = {
//   id: "3A9Sdh095UmxHUJO4rXwvB",
//   songName: "Fire Escape",
//   artist: "Half Moon Run",
//   album: "Dark Eyes",
//   details: {
//     danceability: 0.248,
//     energy: 0.216,
//     key: 0,
//     loudness: -11.449,
//     mode: 1,
//     speechiness: 0.0325,
//     acousticness: 0.993,
//     instrumentalness: 0.0315,
//     liveness: 0.0901,
//     valence: 0.252,
//     tempo: 180.051,
//     type: "audio_features",
//     id: "3A9Sdh095UmxHUJO4rXwvB",
//     uri: "spotify:track:3A9Sdh095UmxHUJO4rXwvB",
//     track_href: "https://api.spotify.com/v1/tracks/3A9Sdh095UmxHUJO4rXwvB",
//     analysis_url:
//       "https://api.spotify.com/v1/audio-analysis/3A9Sdh095UmxHUJO4rXwvB",
//     duration_ms: 174461,
//     time_signature: 1,
//     popularity: 39,
//     genres: ["canadian indie", "indie folk", "quebec indie"],
//   },
// };

// console.log(createPrompt(songObject));
// console.log(createPrompt(songObject2));
module.exports = createPrompt;
