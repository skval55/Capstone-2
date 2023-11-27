function generateRandomString(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

class SpotifyApi {
  constructor() {
    this.BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
    this.clientId = process.env.REACT_APP_CLIENT_ID;
  }
  login() {
    console.log(this.clientId);
    // const redirectUri = `${this.BASE_URL}/welcome`;

    // let codeVerifier = generateRandomString(128);

    // generateCodeChallenge(codeVerifier).then((codeChallenge) => {
    //   let state = generateRandomString(16);
    //   let scope =
    //     " user-library-read playlist-modify-public playlist-modify-private";

    //   localStorage.setItem("code_verifier", codeVerifier);

    //   let args = new URLSearchParams({
    //     response_type: "code",
    //     client_id: this.clientId,
    //     scope: scope,
    //     redirect_uri: redirectUri,
    //     state: state,
    //     code_challenge_method: "S256",
    //     code_challenge: codeChallenge,
    //   });

    //   window.location = "https://accounts.spotify.com/authorize?" + args;
    // });
  }

  async accessToken(code) {
    // const clientId = "";
    let codeVerifier = localStorage.getItem("code_verifier");
    const redirectUri = `${this.BASE_URL}/welcome`;
    let body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: this.clientId,
      code_verifier: codeVerifier,
    });

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("access_token_time", Date.now());
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

export default SpotifyApi;
