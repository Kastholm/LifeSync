import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import Settings from "../tools/Settings.tsx";

function Header() {
  // Oprettelse af state variabel 'test' med en startværdi på 12
  let navItems = [
    {
      key: "1",
      name: "Dashboard",
      icon: "https://cdn-icons-png.flaticon.com/512/873/873147.png",
      link: "/",
      show: true,
      admin: false,
    },
    {
      key: "2",
      name: "Webtify",
      icon: "https://iconape.com/wp-content/png_logo_vector/netlify.png",
      link: "/webtify",
      show: true,
      admin: true,
    },
    {
      key: "3",
      name: "Movies",
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-trakt-3629115-3030255.png",
      link: "/Movies",
      show: true,
      admin: false,
    },
    {
      key: "4",
      name: "Economy",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Square_Cash_app_logo.svg/1200px-Square_Cash_app_logo.svg.png",
      link: "/economy",
      show: true,
      admin: false,
    },
    {
      key: "5",
      name: "Notebook",
      icon: "https://play-lh.googleusercontent.com/NW7BrJSmuTBWKQvHH6sDi1u2R04cWChs-2APl50c2J3FmPimuT35Y306ZmoPdAjsabg",
      link: "/notebook",
      show: true,
      admin: false,
    },
    {
      key: "6",
      name: "Bookshelf",
      icon: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png",
      link: "/bookshelf",
      show: true,
      admin: false,
    },
    {
      key: "7",
      name: "HA",
      icon: "https://community-assets.home-assistant.io/original/4X/1/3/8/13882a481a57f91f670def0fc33cf99d09dec293.png",
      link: "/homeassistant",
      show: true,
      admin: true,
    },
  ];

  // Hent array fra localstorage hvis det er oprettet
  let storageNav = JSON.parse(localStorage.getItem("navItems"));

  const [settings, setSettings] = useState(false);

  const userId = localStorage.getItem("userId");

  const seeSettings = () => {
    setSettings(!settings);
  };

  return (
    <div>
      <aside className=" w-[5vw] h-screen fixed bg-gray-800 text-gray-200">
        <ul className="text-center  flex flex-row sm:flex-col w-full">
          <div>
            {storageNav ? (
              storageNav.map((navItem, index) => (
                <div key={navItem.key}>
                  {navItem.show === true ? (
                    <Link
                      
                      className="sm:border-b grid place-content-center border-gray-900"
                      to={navItem.link}
                    >
                      <img className="w-10 my-3" src={navItem.icon} />
                    </Link>
                  ) : null}
                </div>
              ))
            ) : (
              <>
                {navItems.map((navItem, index) => (
                  <div key={navItem.key}>
                    {navItem.admin === false && userId < 1 ? (
                      <Link
                        key={navItem.key}
                        className="sm:border-b grid place-content-center border-gray-900"
                        to={navItem.link}
                      >
                        <img className="w-10 my-3" src={navItem.icon} />
                      </Link>
                    ) : null}

                    {navItem.admin === false || (true && userId == 1) ? (
                      <Link
                        key={navItem.key}
                        className="sm:border-b grid place-content-center border-gray-900"
                        to={navItem.link}
                      >
                        <img className="w-10 my-3" src={navItem.icon} />
                      </Link>
                    ) : null}
                  </div>
                ))}
              </>
            )}
          </div>
          <div
            onClick={() => seeSettings()}
            className="sm:border-b absolute cursor-pointer bottom-0 ml-[1.3vw] grid place-content-center border-gray-900"
          >
            <img
              className="w-10 my-3 "
              src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Windows_Settings_icon.svg"
            />
          </div>
        </ul>
      </aside>
      {settings ? (
        <Settings
          navItems={navItems}
          settings={settings}
          seeSettings={seeSettings}
        ></Settings>
      ) : null}
    </div>
  );
}

export default Header;
