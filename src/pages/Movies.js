import { useEffect, useState, useContext } from "react";
import NeedToWatch from "../components/API/Trakt/NeedToWatch";
import MyShows from "../components/API/Trakt/MyShows";
import WatchedMovies from "../components/API/Trakt/WatchedMovies";

import { UserVariablesContext } from "../components/context/VariableProvider";

import { KeyRound, KeyRoundIcon, LogIn } from "lucide-react";

function Movies() {
  const { traktClientId, traktClientSecret, tmdbApiKey, server } =
    useContext(UserVariablesContext);

  const [dataCollected, setDataCollected] = useState(false);

  function authenticateWithTrakt() {
    window.location.href = `https://trakt.tv/oauth/authorize?response_type=code&client_id=${traktClientId}&redirect_uri=${server}`;
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
        client_id: traktClientId,
        client_secret: traktClientSecret,
        redirect_uri: server,
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
    <div className="bg-black mt-2 px-4 rounded-3xl ">
      <div className="rounded-t-3xl mt-4 flex py-4 bg-gray-900 justify-end ">
        <div className="flex gap-4 mr-4">
          <button
            className=" bg-gray-200 text-gray-700 p-2 rounded-full  "
            onClick={() => authenticateWithTrakt()}
          > 
          <div className="flex gap-2">
            <p>1.</p> 
              <LogIn />
          </div>
          </button>
          <button
            onClick={() => getAccessToken()}
            className=" bg-gray-200 text-gray-700 p-2 rounded-full"
          >
            <div className="flex gap-2">
              <p>2.</p>
              <KeyRoundIcon /></div>
          </button>
        </div>
      </div>

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
