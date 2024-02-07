import React, { useContext, useEffect, useState } from "react";
import { UserVariablesContext } from "../context/VariableProvider";

function YouTube() {
  const { youtubeApiKey, youtubePlaylistId, variablesLoaded } = useContext(
    UserVariablesContext
  ) as any;

  const [videos, setVideos] = useState([]);

  const [Registred, setRegistred] = useState(false);

  useEffect(() => {
    if (youtubeApiKey === "" || youtubePlaylistId === "") {
      return;
    }
    setRegistred(true);

    const getWatchList = async () => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${youtubePlaylistId}&maxResults=50&key=${youtubeApiKey}`
      );
      const data = await res.json();
      setVideos(data.items);
    };

    getWatchList();
  }, []);

  console.log(videos);

  return (
    <div className="bg-gray-900 p-4 mx-4 mr-2 mt-3 rounded-xl relative z-0 overflow-x-scroll">
      <h1 className="text-gray-100 text-xl mb-4">YouTube WatchLater</h1>

      {Registred ? (
        <div className="flex gap-4">
          {videos.map((video: any) => (
            <div
              key={video.snippet.resourceId.videoId}
              className="bg-gray-700  rounded-lg shadow-md w-48  overflow-hidden"
            >
              <div className="w-full relative z-0">
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="h-32 w-48"
                />
                <a
                  href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 rounded-full p-2"
                >
                  <svg
                    className="w-10 h-10 text-gray-100"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M14.752 11.168l-6.504 3.75A1 1 0 0 1 7 13.75v-7.5a1 1 0 0 1 1.248-.92l6.504 3.75a1 1 0 0 1 0 1.788z" />
                  </svg>
                </a>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold  text-gray-100 h-12  ">
                  {video.snippet.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-red-300">
          You need to insert you Keys in Settings
        </p>
      )}
    </div>
  );
}

export default YouTube;
