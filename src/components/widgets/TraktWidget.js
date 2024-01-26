import { MonitorPlay } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

function TraktWidget() {

  const [watchMovies, getWatchMovies] = useState([]);
  const REACT_APP_TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const REACT_APP_CLIENT_ID = process.env.REACT_APP_TRAKT_CLIENT_ID;

 

  const fetchNeedToWatch = () => {
    const traktAccessToken = localStorage.getItem("traktAccessToken");
    fetch(`https://api.trakt.tv/sync/watchlist/movies/added`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${traktAccessToken}`,
        "trakt-api-version": 2,
        "trakt-api-key": `${REACT_APP_CLIENT_ID}`,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log("n data", data);
        const allMovieDetails = await data.map((movie) => {
          return fetch(
            `https://api.themoviedb.org/3/movie/${movie.movie.ids.tmdb}?api_key=${REACT_APP_TMDB_API_KEY}`
          )
            .then((response) => response.json())
            .then((tmdbData) => {
              return { ...movie, tmdbData };
            });
        });
        return Promise.all(allMovieDetails);
      })
      .then((fullMovieDetail) => {
        getWatchMovies(fullMovieDetail);
        // console.log(watchMovies);
      });
  };

  useEffect(() => {
    fetchNeedToWatch();
  }, []);
  return (
    <div className="bg-gray-900 p-4 mx-2 mt-3 rounded-xl relative z-0 overflow-x-scroll">
      
      <h1 className="text-xl font-bold text-center mb-4  text-gray-100 ">
        Need to watch
      </h1>
      {watchMovies ? (
        <div className=" flex gap-4 rounded-3xl">
          {watchMovies.map((movie) => {
            return (
              <div
                key={movie.id}
                className=" mx-auto bg-gray-300 rounded-3xl max-w-[18em] min-w-[10em] shadow-xl "
              >
                <div className="grid  rounded-3xl  shadow-sm bg-gray-800 shadow-slate-700 shadow-xl hover:scale-105 transition-all ">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.tmdbData.poster_path}`}
                    alt={`Plakat for ${movie.movie.title}`}
                    
                    className="rounded-lg justify-center grid object-cover w-40 transition-all"
                  />

                 {/*  <div className="group p-2 grid z-10">
                    <a className=" font-bold text-lg text-gray-100 line-clamp-2">
                    {movie.movie.year} 
                    </a>
                    <div className="grid">
                      
                    </div>
                    <div className=" flex justify-center">
                      <div className="font-black flex flex-col">
                        <span className="text-xl text-gray-100 flex gap-2 justify-center items-center block ">
                          {movie.tmdbData.vote_average.toFixed(1)}
                          <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" />

                            <g id="SVGRepo_tracerCarrier" />

                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                                fill="#eab308"
                              />{" "}
                            </g>
                          </svg>
                      <a className="m-auto bg-gray-200 p-2  rounded-full"
                        href={`https://www.youtube.com/results?search_query=${movie.movie.title} trailer`}
                      >
                        <MonitorPlay color="#111827" size={20} />
                      </a>
                        </span>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        null
      )}
    </div>
  );
}


export default TraktWidget;
