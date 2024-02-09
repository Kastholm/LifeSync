import React, { useContext, useEffect, useState } from "react";
import { UserVariablesContext } from "../context/VariableProvider";

function UserEnv() {
  const {
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
  } = useContext(UserVariablesContext) as any;

  const editVariables = () => {
    fetch(`${server}/put/userenv/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        habiticaID: habiticaID,
        habiticaToken: habiticaToken,
        traktClientId: traktClientId,
        traktClientSecret: traktClientSecret,
        TMDBApiKey: tmdbApiKey,
        YouTubeApiKey: youtubeApiKey,
        YouTubePlaylistId: youtubePlaylistId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold text-center my-6">
        Here you can insert the necessary widget keys
      </h2>
      {variablesLoaded && userEnv ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Habitica</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Habitica ID
                </label>
                <input
                  type="text"
                  className="w-full text-gray-800"
                  value={habiticaID}
                  onChange={(e) => setHabiticaID(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Habitica Token
                </label>
                <input
                  type="text"
                  className="w-full text-gray-800"
                  value={habiticaToken}
                  onChange={(e) => setHabiticaToken(e.target.value)}
                />
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Trakt.tv</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Trakt Client ID
                </label>
                <input
                  type="text"
                  className="w-full text-gray-800"
                  value={traktClientId}
                  onChange={(e) => setTraktClientId(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Trakt Client Secret
                </label>
                <input
                  type="text"
                  className="w-full text-gray-800"
                  value={traktClientSecret}
                  onChange={(e) => setTraktClientSecret(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  TMDB API Key
                </label>
                <input
                  type="text"
                  className="w-full text-gray-800"
                  value={tmdbApiKey}
                  onChange={(e) => setTmdbApiKey(e.target.value)}
                />
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">YouTube</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  YouTube API Key
                </label>
                <input
                  type="text"
                  className="w-full text-gray-800"
                  value={youtubeApiKey}
                  onChange={(e) => setYoutubeApiKey(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  YouTube Playlist ID
                </label>
                <input
                  type="text"
                  className="w-full text-gray-800"
                  value={youtubePlaylistId}
                  onChange={(e) => setYoutubePlaylistId(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button onClick={() => editVariables()} className="bg-blue-700 mb-10">
            Set Variables
          </button>
          <hr  />
        </div>
      ) : (
        <h3 className="text-xl text-center font-semibold my-6">No data</h3>
      )}
    </div>
  );
}

export default UserEnv;
