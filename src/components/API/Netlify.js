import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
function Netlify() {
  const [sites, setSites] = useState(null);
  const [buildStatus, setBuildStatus] = useState(null);
  const [bandwidthStatus, setBandwidthStatus] = useState(null);
  /* useEffect(() => {
    const token = process.env.REACT_APP_NETLIFY_TOKEN;
    fetch(`https://api.netlify.com/api/v1/kastholm/builds/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Netværksrespons var ikke ok");
        }
        return response.json(); // Parse responsen som JSON
      })
      .then((data) => {
        console.log(data); // Tilføj denne linje for at se dataen
        setBuildStatus(data);
      })
      .catch((error) => {
        console.error("Fejl ved hentning af byggestatus:", error);
      });
  }, []); */

  useEffect(() => {
    const token = process.env.REACT_APP_NETLIFY_TOKEN;
    const fetchBuildStatus = fetch(
      `https://api.netlify.com/api/v1/kastholm/builds/status`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const fetchBandwidthUsage = fetch(
      `https://api.netlify.com/api/v1/accounts/kastholm/bandwidth`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    Promise.all([fetchBuildStatus, fetchBandwidthUsage])
      .then(async ([buildResponse, bandwidthResponse]) => {
        if (!buildResponse.ok) {
          throw new Error("Fejl ved hentning af byggestatus");
        }
        if (!bandwidthResponse.ok) {
          throw new Error("Fejl ved hentning af båndbreddebrug");
        }

        const buildData = await buildResponse.json();
        const bandwidthData = await bandwidthResponse.json();
        console.log(bandwidthData);
        setBuildStatus(buildData);
        setBandwidthStatus(bandwidthData);
      })
      .catch((error) => {
        console.error("Fejl ved hentning af data:", error);
      });
  }, []);

  useEffect(() => {
    const token = process.env.REACT_APP_NETLIFY_TOKEN;
    fetch("https://api.netlify.com/api/v1/sites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Tilføj denne linje for at se dataen
        setSites(data);
      })
      .catch((error) => console.error("Fejl ved hentning af sider:", error));
  }, []);
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("da-DK", options);
  }

  const deleteSite = async (siteId) => {
    const token = process.env.REACT_APP_NETLIFY_TOKEN;

    try {
      const response = await fetch(
        `https://api.netlify.com/api/v1/sites/${siteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Noget gik galt med at slette siden");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-5xl mb-12 ">Mine Netlify Sider</h2>

        {buildStatus && bandwidthStatus ? (
          <div className="bg-gray-800 p-4 rounded-lg max-w-4xl mx-auto text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Kastholm</h2>
              <span className="text-lg">
                I Perioden ({formatDate(buildStatus.minutes.period_start_date)}{" "}
                til {formatDate(buildStatus.minutes.period_end_date)}
                {""})
              </span>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-2xl mb-8">Bandwidth</span>
                  <div className="w-full bg-gray-700 rounded-full h-8 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-8 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                  <span className="text-sm">
                    {bandwidthStatus.used / (1024 * 1024 )} /{" "}
                    {bandwidthStatus.included / (1024 * 1024 * 1024)}
                  </span>
                </div>
                <div>
                  <span className="text-2xl mb-4">Build minutes</span>
                  <div className="w-full bg-gray-700 rounded-full h-8">
                    <div
                      className="bg-green-600 h-8 rounded-full"
                      style={{ width: "8.3%" }}
                    ></div>
                  </div>
                  <span className="text-2xl">
                    {buildStatus.minutes.current}/
                    {buildStatus.minutes.included_minutes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Henter data...</p>
        )}

        {sites && sites.length > 0 ? (
          <ul className="grid grid-cols-4">
            {sites.map((site) => (
              <div key={site.id}>
                <section className="flex w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                  <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                    <img src={site.screenshot_url} />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center text-center">
                      <h5 className="text-center font-sans text-2xl font-bold leading-snug tracking-normal uppercase text-blue-gray-900 m-auto ">
                        {site.name}
                      </h5>
                    </div>
                    <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
                      <b className=" font-semibold">
                        {" "}
                        <br /> Branch: {
                          site.published_deploy?.branch
                        } <br /> Sidste Build : {formatDate(site.updated_at)}{" "}
                      </b>
                    </p>
                    <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                      <span /* onClick={() => deleteSite(site.id)} */
                        data-tooltip-target="money"
                        className="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
                      >
                        <Trash2 />
                      </span>
                    </div>
                  </div>
                  <div className="p-6 pt-3">
                    <button
                      className="block w-full select-none rounded-lg bg-pink-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      data-ripple-light="true"
                    >
                      Go to page
                    </button>
                  </div>
                </section>
              </div>
            ))}
          </ul>
        ) : (
          <p>Henter siderne...</p>
        )}
      </div>
    </div>
  );
}

export default Netlify;