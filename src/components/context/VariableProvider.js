import React, { useEffect, useState, createContext } from "react";

export const UserVariablesContext = createContext({});

export function VariableProvider({ children }) {
  const [userEnv, setUserEnv] = useState({});
  const [variablesLoaded, setVariablesLoaded] = useState(false);

  const server = process.env.REACT_APP_SERVER_URL;
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getVariables = () => {
      fetch(`${server}/get/userenv/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserEnv(data);
          //Set Keys
          setHabiticaID(data[0].habiticaID);
          setHabiticaToken(data[0].habiticaToken);
          setTraktClientId(data[0].traktClientId);
          setTraktClientSecret(data[0].traktClientSecret);
          setTmdbApiKey(data[0].TMDBApiKey);
          setYoutubeApiKey(data[0].YouTubeApiKey);
          setYoutubePlaylistId(data[0].YouTubePlaylistId);
          // Loaded
          setVariablesLoaded(true);
        })
        .catch((err) => console.log(err));
    };

    getVariables();
  }, []);

  /* HABITICA */
  const [habiticaID, setHabiticaID] = useState("");
  const [habiticaToken, setHabiticaToken] = useState("");

  /* TRAKT.TV */
  const [traktClientId, setTraktClientId] = useState("");
  const [traktClientSecret, setTraktClientSecret] = useState("");
  const [tmdbApiKey, setTmdbApiKey] = useState("");

  /* Youtube */
  const [youtubeApiKey, setYoutubeApiKey] = useState("");
  const [youtubePlaylistId, setYoutubePlaylistId] = useState("");

  const VariableContextData = {
    userEnv,
    variablesLoaded,
    server,
    userId,
    habiticaID,
    setHabiticaID,
    habiticaToken,
    setHabiticaToken,
    traktClientId,
    setTraktClientId,
    traktClientSecret,
    setTraktClientSecret,
    tmdbApiKey,
    setTmdbApiKey,
    youtubeApiKey,
    setYoutubeApiKey,
    youtubePlaylistId,
    setYoutubePlaylistId,
  };

  return (
    <UserVariablesContext.Provider value={VariableContextData}>
      {children}
    </UserVariablesContext.Provider>
  );
}

export default VariableProvider;
