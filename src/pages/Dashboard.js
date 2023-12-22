import { useContext, useState } from "react";
import React from "react";
import Habitica from "../components/API/Habitica";

import { LoginContext } from "../components/Base/Login";
import Movies from "./Movies";
import NeedToWatch from "../components/API/Trakt/NeedToWatch";
import MyShows from "../components/API/Trakt/MyShows";

function Dashboard() {
  let myLinks = [
    {
      name: "G-Mail",
      key: "1",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png",
      link: "https://www.gmail.com/",
    },
    {
      name: "ChatGPT",
      key: "2",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png",
      link: "https://chat.openai.com/",
    },
    {
      name: "YbMusic",
      key: "3",
      src: "https://play-lh.googleusercontent.com/76AjYITcB0dI0sFqdQjNgXQxRMlDIswbp0BAU_O5Oob-73b6cqKggVlAiNXQAW5Bl1g",
      link: "https://music.youtube.com/",
    },
  ];

  let webtifyLinks = [
    {
      name: "Netlify",
      key: "3",
      src: "https://iconape.com/wp-content/png_logo_vector/netlify.png",
      link: "https://www.netlify.com/",
    },
    {
      name: "GitHub",
      key: "4",
      src: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
      link: "https://github.com/",
    },
  ];

  const [searchGooTerm, setSearchGooTerm] = useState("");
  const [searchYBTerm, setSearchYBTerm] = useState("");

  const [traktAuth, setTraktAuth] = useState(false);

  const { loginStatus } = useContext(LoginContext);

  const handleGooSubmit = (e) => {
    //Stopper almindelig opførelse
    e.preventDefault();
    window.open(
      `https://www.google.dk/search?q=${encodeURIComponent(searchGooTerm)}`,
      "_blank"
    );
  };

  const handleYBSubmit = (f) => {
    f.preventDefault();
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        searchYBTerm
      )}`,
      "_blank"
    );
  };

  return (
    <main>
      {traktAuth ? <Movies /> : null}
      
<iframe title="test" src='https://lifesync.us' />

      <div className=" bg-gray-900 p-4 mx-4 rounded-2xl grid grid-cols-2 gap-4">
        <div>
          <div className="flex justify-end h-fit mb-6 gap-8">
            {myLinks.map((hyperlink, index) => (
              <div
                key={hyperlink.key}
                className=" w-16 bg-gray-100 rounded-xl p-2 grid place-content-center"
              >
                <a href={hyperlink.link} target="_blank">
                  <img src={hyperlink.src} className="m-auto" alt="" />
                </a>
              </div>
            ))}
          </div>
          <form
            className="rounded-lg bg-gray-100 p-8 max-h-[12em] shadow-lg"
            onSubmit={handleGooSubmit}
          >
            <img
              className="m-auto w-56 mb-2"
              alt="Google"
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            />
            <div className="mb-4 relative flex items-center">
              <input
                type="text"
                className="w-full relative border text-xl border-gray-400 p-4 rounded-full"
                value={searchGooTerm}
                onChange={(e) => setSearchGooTerm(e.target.value)}
              />
            </div>
          </form>
        </div>

        <div>
          <div className="flex justify-start ml-4 h-fit mb-6 gap-8">
            {webtifyLinks.map((hyperlink, index) => (
              <div
                key={hyperlink.key}
                className=" w-16 bg-gray-100 rounded-xl p-2 grid place-content-center"
              >
                <a href={hyperlink.link} target="_blank">
                  <img src={hyperlink.src} className="m-auto" alt="" />
                </a>
              </div>
            ))}
          </div>
          <form
            className="rounded-lg bg-gray-100 p-8 max-h-[12em] shadow-lg"
            onSubmit={handleYBSubmit}
          >
            <img
              className="m-auto w-72 mb-5"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1024px-YouTube_Logo_2017.svg.png"
            />
            <div className="mb-4 flex items-center">
              <input
                type="text"
                className="w-full border text-xl border-gray-400 p-4 rounded-full"
                value={searchYBTerm}
                onChange={(f) => setSearchYBTerm(f.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="grid ">
        <Habitica />
      </div>
      <div className="bg-gray-900 mx-4 px-4 mb-12 pt-2 pb-6 rounded-xl">
        <MyShows />
      </div>
    </main>
  );
}

export default Dashboard;
