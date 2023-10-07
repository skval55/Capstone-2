import axios from "axios";

class BackendApi {
  updateDb = async (userInfo, musicInfo, prompts) => {
    try {
      await axios.post("http://localhost:3001/music/insert-db", {
        userinfo: userInfo,
        musicInfo: musicInfo,
        prompts: prompts,
      });
      console.log("gottem");
    } catch (error) {
      console.error(error);
    }
  };

  searchSongs = async (prompt) => {
    const res = await axios.post("http://localhost:3001/music/search", {
      prompt,
    });
    console.log(res);
    return res;
  };
}
export default BackendApi;
