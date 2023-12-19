import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

function Header() {
  // Oprettelse af state variabel 'test' med en startværdi på 12
  let navItems = [
    { key: "1", name: "Dashboard", icon: "Home", link: "/" },
    { key: "2", name: "Webtify", icon: "Home", link: "/webtify" },
    { key: "3", name: "Movies", icon: "Home", link: "/Movies" },
  ];
  return (
    <aside className="h-screen w-20 h-12 bg-gray-800 text-gray-200">
      <ul className="text-center flex flex-row sm:flex-col w-full">
        <li className="h-14 border-b border-gray-900 hidden sm:block">
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
        </li>
        <div>
          {navItems.map((navItem, index) => (
            <Link
              key={navItem.key}
              className="sm:border-b grid place-content-center  border-gray-900"
              to={navItem.link}
            >
              <Home className="m-auto" color="blue" size={28} />
              <p>{navItem.name}</p>
            </Link>
          ))}
        </div>
      </ul>
    </aside>
  );
}

export default Header;
