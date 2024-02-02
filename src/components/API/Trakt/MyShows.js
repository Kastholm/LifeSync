import { useContext, useEffect, useState } from "react";

import { BadgeInfo } from "lucide-react";
function MyShows() {


  const [watchShows, getWatchShows] = useState([]);
  const REACT_APP_CLIENT_ID = process.env.REACT_APP_TRAKT_CLIENT_ID;
  const REACT_APP_TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  useEffect(() => {
    fetchShowsToWatch();
  }, []);
  const fetchShowsToWatch = () => {
    const traktAccessToken = localStorage.getItem("traktAccessToken");
    fetch(`https://api.trakt.tv/sync/watchlist/shows/added`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${traktAccessToken}`,
        "trakt-api-version": 2,
        "trakt-api-key": `${REACT_APP_CLIENT_ID}`,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        const allShowDetails = data.map((show) => {
          return fetch(
            `https://api.themoviedb.org/3/tv/${show.show.ids.tmdb}?api_key=${REACT_APP_TMDB_API_KEY}`
          )
            .then((response) => response.json())
            .then((tmdbsData) => {
              // Kombiner data fra begge API'er

              return { ...show, tmdbsData };
            });
        });
        return Promise.all(allShowDetails);
      })
      .then((fullShowDetail) => {
        getWatchShows(fullShowDetail);
        console.log(fullShowDetail);
      })
      .catch((error) => {
        console.error("Error fetching show details:", error);
      });
  };
  return (
    <div>
      <h2 className="text-4xl font-bold text-gray-100 my-12">Current Shows</h2>
      {watchShows ? (
        <div className=" grid grid-cols-4 gap-4 rounded-3xl">
          {watchShows.map((show) => {
            return (
              <div
                key={show.id}
                className=" mx-auto bg-white max-w-[18em] rounded-3xl shadow-xl "
              >
                <div className="grid  rounded-3xl max-w-sm text-gray-100 bg-gray-800 shadow-gray-700 shadow-xl hover:scale-105 transition-all ">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.tmdbsData.poster_path}`}
                    alt={`Plakat for ${show.show.title}`}
                    width="390"
                    height="200"
                    className="rounded-t-3xl justify-center grid object-cover h-60 transition-all"
                  />

                  <div className="group p-6 grid z-10 min-h-[16em] ">
                    <a className=" font-bold sm:text-xl line-clamp-2">
                      {show.show.title}
                    </a>

                    <div className="grid my-2">
                      <a
                        className="m-auto bg-gray-200 p-2 rounded-full"
                        href={show.tmdbsData.homepage}
                      >
                        <BadgeInfo color="#111827" size={32} />
                      </a>
                    </div>
                    <div>
                      <p className="mt-4 text-1xl">
                        {
                          show.tmdbsData.seasons[
                            show.tmdbsData.seasons.length - 1
                          ].name
                        }
                      </p>

                      <div className="text-2xl font-bold">
                        {show.tmdbsData.seasons[
                          show.tmdbsData.seasons.length - 1
                        ].air_date == null ? (
                          <p>No date yet</p>
                        ) : (
                          <p>
                            {
                              show.tmdbsData.seasons[
                                show.tmdbsData.seasons.length - 1
                              ].air_date
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div> afsdasdf </div>
      )}
    </div>
  );
}

export default MyShows;
