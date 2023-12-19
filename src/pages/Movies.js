import { useEffect, useState } from "react";
import NeedToWatch from "../components/API/Trakt/NeedToWatch";
import MyShows from "../components/API/Trakt/MyShows";
import WatchedMovies from "../components/API/Trakt/WatchedMovies";
function Movies() {
  let traktDataCollected = false;

  const REACT_APP_CLIENT_ID = process.env.REACT_APP_TRAKT_CLIENT_ID;
  const REACT_APP_CLIENT_SECRET = process.env.REACT_APP_TRAKT_CLIENT_SECRET;
  const REDIRECT_URI = "http://localhost:3000/";

  function authenticateWithTrakt() {
    window.location.href = `https://trakt.tv/oauth/authorize?response_type=code&client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  }

  const getAccessToken = () => {
    //Get Auth code after redirect
    const queryParameters = new URLSearchParams(window.location.search);
    const authCode = queryParameters.get("code");
    console.log("indhentede token AuthCode", authCode);
    //Get Access Token
    fetch("https://api.trakt.tv/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: `${authCode}`,
        client_id: REACT_APP_CLIENT_ID,
        client_secret: REACT_APP_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("traktAccessToken", data.access_token);
        console.log("indhentede token AccessCode", data.access_token);
        traktDataCollected = true;
      })
      .catch((error) => {
        console.error("Error fetching auth token:", error);
      });
  };

  const [mediaView, setMediaView] = useState("movies");

  return (
    <div className="bg-black mt-32 px-12 rounded-3xl">
      {
        (traktDataCollected = false ? (
          <div className="rounded-3xl ">
            <button onClick={() => authenticateWithTrakt()}>
              Log in with Trakt
            </button>
            <button
              onClick={() => getAccessToken()}
              className="bg-orange-200 p-12 m-32"
            >
              Hent
            </button>
          </div>
        ) : (
          <p></p>
        ))
      }
      <div className="bg-gray-900 rounded-3xl mb-12 p-12">
        <NeedToWatch />

        <MyShows />
      </div>

      <WatchedMovies />
    </div>
  );
}

export default Movies;
