import axios from "axios";

const searchSongs = async (prompt) => {
  const res = await axios.post("http://localhost:3001/music/search", {
    prompt,
  });
  console.log(res);
  return res;
};
export default searchSongs;
