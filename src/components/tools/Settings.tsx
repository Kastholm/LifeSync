import React, { useState } from "react";

function Settings({ navItems, settings }) {
  const user = localStorage.getItem("user");
  let jsonNavItems = localStorage.getItem("navItems");

  const [checkedItems, setCheckedItems] = useState<{}>({});


  const setLocalNavItems = (item, e) => {
    console.log("test", item, 'check', e.target.checked);

    if (e.target.checked) {
      //Add item to array localstorage
      //checkedItems.push(item);
      //setCheckedItems(checkedItems => [...checkedItems, item]);
    } else {
      //Find index of specific object using findIndex method.
      // delete
      //setCheckedItems(checkedItems => checkedItems.filter(i => i.id !== item.id));
    }
    
  };

  return (
    <div className="bg-gray-800 bg-opacity-80 overflow-hidden h-screen w-screen z-50 isolate fixed top-0 grid place-content-center">
      <div className="bg-gray-900 text-gray-100 w-[65vw] h-[40vh] max-w-[65vh] rounded-2xl grid">
        <h1 className="text-xl mt-12">
          Hej <b>{user}</b>
        </h1>
        <div>
          <h2 className="text-xl mb-4">
            Hvilke navigationspunkter ønsker du at se:
          </h2>
          <div className="grid grid-cols-4 gap-4 mx-4">
              <>
                {navItems.map((item) => {
                  return (
                    <div key={item.id}>
                      <p>defaultNav</p>
                      <div className="p-4 bg-gray-700 rounded-xl">
                        <input
                          onClick={(e) => setLocalNavItems(item, e)}
                          type="checkbox"
                          id={item.key}
                        />
                        <label htmlFor={item.key} className="ml-4">
                          {item.name}
                        </label>
                      </div>
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
