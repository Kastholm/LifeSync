import { useEffect, useState, useContext } from "react";
import NeedToWatch from "../components/API/Trakt/NeedToWatch";
import MyShows from "../components/API/Trakt/MyShows";
import WatchedMovies from "../components/API/Trakt/WatchedMovies";

import { LoginContext } from "../components/Base/Login";

import LoginForm from "../components/API/LoginForm";
import { KeyRound, KeyRoundIcon, LogIn } from "lucide-react";

function Movies() {
  const REACT_APP_CLIENT_ID = process.env.REACT_APP_TRAKT_CLIENT_ID;
  const REACT_APP_CLIENT_SECRET = process.env.REACT_APP_TRAKT_CLIENT_SECRET;
  const REDIRECT_URI = "http://localhost:3000/";

  const {loginStatus } = useContext(LoginContext);

  const [dataCollected, setDataCollected] = useState(false);

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
        setDataCollected(true);
        console.log("snallo");
      })
      .catch((error) => {
        console.error("Error fetching auth token:", error);
        setDataCollected(false);
      });
  };


  return (
    <div className="bg-black mt-2 px-4 rounded-3xl">
      {loginStatus ? (
        <div className="rounded-t-3xl mt-4 flex py-4 bg-gray-900 justify-end ">
          <button className=" bg-gray-200 p-2 rounded-full my-auto ml-auto " onClick={() => authenticateWithTrakt()}>
            <LogIn />
          </button>
          <button
            onClick={() => getAccessToken()}
            className=" mx-4 bg-gray-200 p-2 rounded-full"
          >
           <KeyRoundIcon />
          </button>
        </div>
      ) : null}
       <div>
        <div className="bg-gray-900 rounded-b-3xl mb-12 p-12">
          <NeedToWatch />

          <MyShows />
        </div>

        <WatchedMovies />
      </div>
      
    </div>
  );
}

export default Movies;
