import { useEffect, useState } from "react";
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
        <div className=" grid grid-cols-6 gap-4 rounded-3xl">
          {watchShows.map((show) => {
            return (
              <div
                key={show.id}
                className=" mx-auto bg-white rounded-3xl shadow-xl "
              >
                <div className="grid  rounded-3xl max-w-sm shadow-sm bg-slate-100 ">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.tmdbsData.poster_path}`}
                    alt={`Plakat for ${show.show.title}`}
                    width="390"
                    height="200"
                    className="rounded-t-3xl justify-center grid object-cover h-60 transition-all"
                  />

                  <div className="group p-6 grid z-10 min-h-[14em] ">
                    <a className="group-hover:text-cyan-700 font-bold sm:text-2xl line-clamp-2">
                      {show.show.title}
                    </a>

                    <div>
                      <a href={show.tmdbsData.homepage}>
                        <button className="bg-orange-500 text-white px-6 py-2">
                          {" "}
                          See Information{" "}
                        </button>
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

                      <div className="text-2xl">
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
        <div>
          <p> No Data </p>
        </div>
      )}
    </div>
  );
}

export default MyShows;
