import { useState } from "react";
import React from "react";
import Habitica from "../components/API/Habitica";
import { Columns } from "lucide-react";
import Movies from "./Movies";

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
  ];

  let webtifyLinks = [
    {
      name: "G-Mail",
      key: "3",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png",
      link: "https://www.gmail.com/",
    },
    {
      name: "ChatGPT",
      key: "4",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png",
      link: "https://chat.openai.com/",
    },
  ];

  const [searchGooTerm, setSearchGooTerm] = useState("");
  const [searchYBTerm, setSearchYBTerm] = useState("");

  const handleGooSubmit = (e) => {
    //Stopper almindelig opførelse
    e.preventDefault();
    window.location.href = `https://www.google.dk/search?q=${encodeURIComponent(
      searchGooTerm
    )}`;
  };

  const handleYBSubmit = (f) => {
    f.preventDefault();
    window.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      searchYBTerm
    )}`;
  };

  return (
    <main >
      <div className=" bg-gray-900 p-4 rounded-2xl mt-12 m-3 grid grid-cols-2 gap-4">
        <form
          className="rounded-lg bg-white p-8 shadow-lg"
          onSubmit={handleGooSubmit}
        >
          <h1 className="text-3xl mb-2 text-red-700">Google </h1>
          <div className="mb-4 flex items-center">
            <input
              type="text"
              className="w-full rounded-lg border text-4xl border-gray-400 p-4"
              value={searchGooTerm}
              onChange={(e) => setSearchGooTerm(e.target.value)}
              placeholder="Søg på Google"
            />
            <button className="ml-2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600">
              Søg
            </button>
          </div>
        </form>

        <form
          className="rounded-lg bg-red-800 p-8 shadow-lg"
          onSubmit={handleYBSubmit}
        >
          <h1 className="text-3xl mb-2 text-white">YouTube </h1>
          <div className="mb-4 flex items-center">
            <input
              type="text"
              className="w-full rounded-lg border text-4xl border-gray-400 p-4"
              value={searchYBTerm}
              onChange={(f) => setSearchYBTerm(f.target.value)}
              placeholder="Søg på Youtube"
            />
            <button className="ml-2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600">
              Søg
            </button>
          </div>
        </form>
      </div>

      <div className="grid " style={{gridTemplateColumns: 'repeat(3, auto)' }} >
      <Habitica />
        <div className="bg-gray-700 rounded-2xl h-fit p-4 m-3">
        <h2 className="text-4xl text-gray-200 font-semibold">Hyperlinks</h2>
          <div className="p-4 bg-gray-900 mt-8 rounded-2xl">
            <div className="container m-auto space-y-6 px-12">
              <div className="m-auto text-center ">
              </div>
                <h2 className="text-2xl text-gray-200  font-bold">
                  Personal
                </h2>
              <div className="flex justify-center gap-6">
                {myLinks.map((hyperlink, index) => (
                  <div
                    key={hyperlink.key}
                    className=" w-16 bg-gray-200 rounded-xl p-2 grid place-content-center"
                  >
                    <a href={hyperlink.link}>
                      <img src={hyperlink.src} className="m-auto" alt="" />
                    </a>
                  </div>
                ))}
              </div>
              <h2 className="text-2xl text-gray-200 font-bold">
                Webtify
              </h2>
              <div className="flex justify-center gap-6">
                {webtifyLinks.map((hyperlink, index) => (
                  <div
                    key={hyperlink.key}
                    className=" w-16 bg-gray-200 rounded-xl p-2 grid place-content-center"
                  >
                    <a href={hyperlink.link}>
                      <img src={hyperlink.src} className="m-auto" alt="" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
