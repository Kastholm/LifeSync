import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

function Header() {
  // Oprettelse af state variabel 'test' med en startværdi på 12
  let navItems = [
    {
      key: "1",
      name: "Dashboard",
      icon: "https://cdn-icons-png.flaticon.com/512/873/873147.png",
      link: "/",
    },
    {
      key: "2",
      name: "Webtify",
      icon: "https://iconape.com/wp-content/png_logo_vector/netlify.png",
      link: "/webtify",
    },
    {
      key: "3",
      name: "Movies",
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-trakt-3629115-3030255.png",
      link: "/Movies",
    },
    {
      key: "4",
      name: "Economy",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Square_Cash_app_logo.svg/1200px-Square_Cash_app_logo.svg.png",
      link: "/economy",
    },
    {
      key: "5",
      name: "Notebook",
      icon: "https://play-lh.googleusercontent.com/NW7BrJSmuTBWKQvHH6sDi1u2R04cWChs-2APl50c2J3FmPimuT35Y306ZmoPdAjsabg",
      link: "/notebook",
    },
    {
      key: "6",
      name: "HA",
      icon: "https://community-assets.home-assistant.io/original/4X/1/3/8/13882a481a57f91f670def0fc33cf99d09dec293.png",
      link: "/homeassistant",
    },
  ];
  return (
    <aside className=" w-[5vw] bg-gray-800 text-gray-200">
      <ul className="text-center flex flex-row sm:flex-col w-full">
        {/* <li className="h-14 border-b  border-gray-900 hidden sm:block">
          <a https://play-lh.googleusercontent.com/NW7BrJSmuTBWKQvHH6sDi1u2R04cWChs-2APl50c2J3FmPimuT35Y306ZmoPdAjsabg
            id="page-icon"
            href="/"
            className="h-full w-full hover:bg-gray-700 block p-3"
          >
            <img
              className="object-contain h-full w-full"
              src="https://avatars1.githubusercontent.com/u/6157842?v=4"
              alt="open-source"
            />
          </a>
        </li> */}
        <div>
          {navItems.map((navItem, index) => (
            <Link
              key={navItem.key}
              className="sm:border-b grid place-content-center border-gray-900"
              to={navItem.link}
            >
              <img className="w-10 my-3" src={navItem.icon} />
            </Link>
          ))}
        </div>
      </ul>
    </aside>
  );
}

export default Header;
