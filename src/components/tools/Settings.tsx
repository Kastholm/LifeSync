import { SidebarCloseIcon, X } from "lucide-react";
import React, { useState } from "react";
import UserEnv from "./UserEnv.tsx";

function Settings({ navItems, settings, seeSettings }) {
  const user = localStorage.getItem("userName");
  let jsonNavItems = localStorage.getItem("navItems");
  jsonNavItems = JSON.parse(jsonNavItems);
  const userId = localStorage.getItem("userId");

  interface NavItems {
    key: number;
    name: string;
    icon: string;
    link: string;
    show: boolean;
    admin: boolean;
  }

  const [checkedItems, setCheckedItems] = useState<NavItems[]>([]);

  const updateNavItem = (item, e) => {
    //console.log("test", item, 'check', e.target.checked);
    if (e.target.checked) {
      setCheckedItems((checkedItems) => [...checkedItems, item]);
      console.log("checkedItems", checkedItems);
    } else {
      let dupItem = checkedItems.findIndex((i) => i.key === item.key);
      let newArray = [...checkedItems];
      newArray.splice(dupItem, 1);
      setCheckedItems(newArray);
    }
  };

  const setLocalNavItems = () => {
    localStorage.setItem("navItems", JSON.stringify(checkedItems));
    closeSettings();
  };

  const closeSettings = () => {
    seeSettings(false);
  };

  return (
    <div className="bg-gray-800 bg-opacity-80 overflow-hidden h-screen w-screen z-50 isolate fixed top-0 grid place-content-center">
      <div className="bg-gray-900 text-gray-100 relative w-[75vw] min-h-[40vh] rounded-2xl grid p-6">
        <X
          size={44}
          onClick={() => closeSettings()}
          className="p-2 absolute cursor-pointer rounded-full top-4 right-4 bg-red-800"
        />
        <h1 className="text-2xl my-12">
          Hej <b>{user}</b>
        </h1>
          <UserEnv />
        <div>
          {jsonNavItems ? (
            <div>
              <h2 className="text-xl mb-4">Din nuværende navigationsmenu:</h2>
              <div className="grid grid-cols-4 gap-4 mx-4">
                <>
                  {jsonNavItems.map((item) => {
                    return (
                      <div key={item.id}>
                        <div className="p-4 bg-gray-700 rounded-xl">
                          <label htmlFor={item.key} className="ml-4">
                            {item.name}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </>
              </div>
            </div>
          ) : null}

          <h2 className="text-xl mb-4 mt-8">Lav en ny navigationsmenu:</h2>
          <div className="grid grid-cols-4 gap-4 mx-4">
            <>
              {navItems.map((item) => {
                return (
                  <div>
                    <>
                      {item.admin === false && userId != 1 && (
                        <div key={item.id}>
                          <div className="p-4 bg-gray-700 rounded-xl">
                            <input
                              onClick={(e) => updateNavItem(item, e)}
                              type="checkbox"
                              id={item.key}
                            />
                            <label htmlFor={item.key} className="ml-4">
                              {item.name}
                            </label>
                          </div>
                        </div>
                      )}
                    </>

                    <>
                      {userId == 1 && (
                        <div key={item.id}>
                          <div className="p-4 bg-gray-700 rounded-xl">
                            <input
                              onClick={(e) => updateNavItem(item, e)}
                              type="checkbox"
                              id={item.key}
                            />
                            <label htmlFor={item.key} className="ml-4">
                              {item.name}
                            </label>
                          </div>
                        </div>
                      )}
                    </>
                  </div>
                );
              })}
            </>
          </div>
          <button onClick={() => setLocalNavItems()} className="bg-green-900">
            Opdater
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;

{
  /* <button onClick={() => settings(false)} >tesst</button> */
}
