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
      icon: "https://pnghq.com/wp-content/uploads/14-cashapp-icons-free-in-svg-74161.png",
      link: "/Economy",
    },
  ];
  return (
    <aside className=" w-[5vw] bg-gray-800 text-gray-200">
      <ul className="text-center flex flex-row sm:flex-col w-full">
        {/* <li className="h-14 border-b  border-gray-900 hidden sm:block">
          <a
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
