import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../Base/Login";
import LoginForm from "../../Base/LoginForm";
import { ArrowDownToLine } from "lucide-react";
function WatchedMovies() {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});

  const duplicateMovie = new Set();
  const [page, setPage] = useState(1);

  const REACT_APP_TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const REACT_APP_CLIENT_ID = process.env.REACT_APP_TRAKT_CLIENT_ID;

  const { loginStatus } = useContext(LoginContext);

  const fetchWatchList = (pageNumber) => {
    const traktAccessToken = localStorage.getItem("traktAccessToken");
    console.log(traktAccessToken);
    fetch(`https://api.trakt.tv/sync/history/movies?page=${pageNumber}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${traktAccessToken}`,
        "trakt-api-version": 2,
        "trakt-api-key": `${REACT_APP_CLIENT_ID}`,
      },
    })
      .then(async (response) => response.json())
      .then((newMovies) => {
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMoviePoster = (tmdbID) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${tmdbID}?api_key=${REACT_APP_TMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.poster_path) {
          //console.log(data);
          setMovieDetails((prevDetails) => ({
            ...prevDetails,
            [tmdbID]: {
              posterUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
              desc: data.overview,
              rating: data.vote_average,
              budget: data.budget,
              revenue: data.revenue,
              country: data.production_countries[0].name,
            },
          }));
        }
      });
  };

  useEffect(() => {
    movies.forEach((movie) => {
      getMoviePoster(movie.movie.ids.tmdb);
    });
  }, [movies]);

  useEffect(() => {
    fetchWatchList(page);
  }, [page]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <div className="bg-gray-900 rounded-t-3xl p-12 mb-12 rounded-b-xl">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-100">
        Currently Watched
      </h1>
      {movies && loginStatus ? (
        <div>
          <div className=" grid grid-cols-4 gap-4">
            {movies.map((movie) => {
              if (!duplicateMovie.has(movie.movie.title)) {
                duplicateMovie.add(movie.movie.title);
                const details = movieDetails[movie.movie.ids.tmdb];
                return (
                  <div
                    key={movie.id}
                    className=" mx-auto bg-gray-800 rounded-3xl shadow-xl "
                  >
                    <div className="grid text-gray-100 rounded-3xl bg-gray-800 shadow-gray-700 shadow-xl hover:scale-[102%] transition-all ">
                      <img
                        src={details?.posterUrl}
                        alt={`Plakat for ${movie.movie.title}`}
                        width="390"
                        height="200"
                        className="rounded-t-3xl justify-center grid object-cover h-80 transition-all"
                      />

                      <div className="group p-6 grid z-10 min-h-[19em] ">
                        <a className=" font-bold sm:text-2xl line-clamp-2">
                        {movie.movie.year}- {movie.movie.title}
                        </a>
                        <div>
                          <span className="line-clamp-4 py-2 text-base font-light leading-relaxed">
                            <p>
                              Budget:{" "}
                              <b className="font-bold">
                                {details?.budget
                                  ? `$${(details.budget / 1000000).toFixed(
                                      1
                                    )} million`
                                  : "N/A"}
                              </b>
                            </p>
                            <p>
                              Revenue:{" "}
                              <b className="font-bold">
                                {details?.revenue
                                  ? `$${(details.revenue / 1000000).toFixed(
                                      1
                                    )} million`
                                  : "N/A"}
                              </b>
                            </p>

                            <p className="font-bold text-xl">
                              Outcome: <br></br>
                              <b>
                                {details?.revenue && details?.budget
                                  ? `$${(
                                      (details.revenue - details.budget) /
                                      1000000
                                    ).toFixed(1)} M`
                                  : "N/A"}
                              </b>
                            </p>
                            <p className="my-2">
                              <b className="font-bold text-xl">
                                {details?.country}
                              </b>
                            </p>
                          </span>
                        </div>
                        <div className=" grid-cols-2 flex group justify-between">
                          <div className="font-black flex flex-col">
                            <span className="text-yellow-500 text-xl">
                              IMDB SCORE
                            </span>
                            <span className="text-3xl flex gap-x-1 items-center ">
                              {details?.rating.toFixed(1)}
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
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      ) : (
        <LoginForm />
      )}

      {loginStatus ? (
        <div className=" bg-gray-900 rounded-b-3xl  ">
          <button
            className="mx-auto text-center bg-green-400 px-4 rounded-xl py-4 mt-8"
            onClick={handleShowMore}
          >
          <ArrowDownToLine />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default WatchedMovies;
