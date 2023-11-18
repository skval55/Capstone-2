import axios from "axios";
import createPrompt from "./Helpers";

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
  }
  login() {
    const clientId = "2c63e202adfe49f5b8127478e0289baa";
    const redirectUri = `${this.BASE_URL}/welcome`;
    console.log("redirectUri", redirectUri);

    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      let state = generateRandomString(16);
      let scope =
        "user-read-private user-read-email user-library-read playlist-modify-public playlist-modify-private";

      localStorage.setItem("code_verifier", codeVerifier);

      let args = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
      });

      window.location = "https://accounts.spotify.com/authorize?" + args;
    });
  }

  async accessToken(code) {
    const clientId = "2c63e202adfe49f5b8127478e0289baa";
    let codeVerifier = localStorage.getItem("code_verifier");
    const redirectUri = `${this.BASE_URL}/welcome`;
    let body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
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

  // async getRefreshToken() {
  //   if (Date.now() - localStorage.getItem("access_token_time") > 3540) {
  //     const clientId = "2c63e202adfe49f5b8127478e0289baa";
  //     // refresh token that has been previously stored
  //     const refreshToken = localStorage.getItem("refresh_token");
  //     const url = "https://accounts.spotify.com/api/token";

  //     const payload = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: new URLSearchParams({
  //         grant_type: "refresh_token",
  //         refresh_token: refreshToken,
  //         client_id: clientId,
  //       }),
  //     };
  //     const body = await fetch(url, payload);
  //     const response = await body.json();

  //     localStorage.setItem("access_token", response.accessToken);
  //     localStorage.setItem("refresh_token", response.refreshToken);
  //   }
  // }
}

export default SpotifyApi;
