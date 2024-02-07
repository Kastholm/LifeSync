import React, { useState } from "react";
import { SidebarCloseIcon, X } from "lucide-react";

function WelcomePage() {
  const user = localStorage.getItem("userName");
  const [menu, setMenu] = useState(true);

  const serverurl = process.env.REACT_APP_SERVER_URL;

  const closeMenu = () => {
    localStorage.setItem("newUser", "0");
    setMenu(false);
  };

  return (
    <>
      {menu === true ? (
        <div className="bg-gray-800 bg-opacity-80 overflow-hidden h-screen w-screen z-50 isolate fixed top-0 grid place-content-center">
          <div className="bg-gray-900 text-gray-100 relative w-[85vw] min-h-[80vh] rounded-2xl grid p-6">
            <X
              size={44}
              onClick={() => closeMenu()}
              className="p-2 absolute cursor-pointer rounded-full top-4 right-4 bg-red-800"
            />
            <div>
              <h1 className="text-4xl mt-12">
                Welcome <b>{user}!</b>
              </h1>
              <h2 className="mb-12 mt-4 text-xl">
                This is LifeSync, syncronizing all your life data in one place.
              </h2>
              <ul className="bg-gray-700 rounded-2xl h-fit w-fit m-auto p-10 grid gap-10">
                <h1 className="text-3xl">Get started guide</h1>
                <li className="max-w-[70ch]">
                  <b className="text-3xl">1. </b>{" "}
                  <b className="text-green-400 text-2xl"> Choose your pages </b>{" "}
                  <br></br>- Bottom left you find the Settings Panel, here you
                  can choose which pages you would like to use, more pages will
                  come with time.
                </li>
                <li className="max-w-[70ch]">
                  <b className="text-3xl">2. </b>{" "}
                  <b className="text-green-400 text-2xl">
                    {" "}
                    Set your Keys and Tokens
                  </b>{" "}
                  <br></br>- Bottom left you find the Settings Panel, here you
                  can insert your api keys and tokens for the pages that
                  requires this.
                </li>
                <li className="max-w-[70ch]">
                  <b className="text-3xl">3. </b>{" "}
                  <b className="text-green-400 text-2xl"> Ready to go</b>{" "}
                  <br></br>- After updating your settings, you are ready to go,
                  you can now use the pages you have chosen.
                </li>
                <li className="max-w-[70ch]">
                  <b className="text-3xl">4. </b>{" "}
                  <b className="text-green-400 text-2xl"> Suggestions</b>{" "}
                  <br></br>- Suggestions are gladly received - if you have
                  recomendations for new pages contact He who must not be named
                </li>
              </ul>
            </div>
            <img
              className="absolute bottom-4 left-0"
              src="img/wave.gif"
              alt=""
            />
            <button onClick={() => closeMenu()} className="bg-green-700">
              Let's go
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default WelcomePage;
