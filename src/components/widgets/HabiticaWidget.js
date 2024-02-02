import { useState, useEffect, useContext } from "react";

import { CheckSquare, ScanLine } from "lucide-react";

import { UserVariablesContext } from "../context/VariableProvider";

function Habitica() {
  const [dailies, setDailies] = useState();
  const [todo, setTodos] = useState();

  const [taskName, setTaskName] = useState();
  const [taskType, setTaskType] = useState("codetask");

 const { habiticaID, habiticaToken } = useContext(UserVariablesContext);

  useEffect(() => {

    const fetchDailies = fetch(
      "https://habitica.com/api/v3/tasks/user?type=dailys",
      {
        headers: {
          "x-api-user": habiticaID,
          "x-api-key": habiticaToken,
        },
      }
    );

    const fetchTodos = fetch(
      "https://habitica.com/api/v3/tasks/user?type=todos",
      {
        headers: {
          "x-api-user": habiticaID,
          "x-api-key": habiticaToken,
        },
      }
    );

    Promise.all([fetchDailies, fetchTodos])
      .then(async ([fetchedDailies, fetchedTodos]) => {
        const dailyData = await fetchedDailies.json();
        const todoData = await fetchedTodos.json();

        setDailies(dailyData.data);
        setTodos(todoData.data);
        //console.log(dailyData.data);
        console.log(todoData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const completeTask = (taskId) => {
    fetch(`https://habitica.com/api/v3/tasks/${taskId}/score/up`, {
      method: "POST",
      headers: {
        "x-api-user": habiticaID,
        "x-api-key": habiticaToken,
      },
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const unCompleteTask = (taskId) => {
    const userId = process.env.REACT_APP_HABITICA_USERID;
    const apiToken = process.env.REACT_APP_HABITICA_TOKEN;
    fetch(`https://habitica.com/api/v3/tasks/${taskId}/score/down`, {
      method: "POST",
      headers: {
        "x-api-user": userId,
        "x-api-key": apiToken,
      },
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const createTask = (name, note) => {
    const userId = process.env.REACT_APP_HABITICA_USERID;
    const apiToken = process.env.REACT_APP_HABITICA_TOKEN;
    const ranAlias = Math.floor(Math.random() * 100000000000);
    console.log(ranAlias);
    fetch(`https://habitica.com/api/v3/tasks/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-user": userId,
        "x-api-key": apiToken,
      },
      body: JSON.stringify({
        text: `${name}`,
        type: `todo`,
        alias: `alias-${ranAlias}`,
        notes: `${note}`,
        tags: ["ed427623-9a69-4aac-9852-13deb9c190c3"],
        checklist: [],
        priority: 2,
      }),
    }).catch((err) => {
      console.log(err);
    });
    console.log(name, note);
    /*  setTimeout(() => {
      window.location.reload();
    }, 1000); */
  };
  {
    /* <LoginForm /> */
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-4 m-3">
     
        <div>
          <div className="bg-gray-700 w-full rounded-2xl grid p-4 mb-4">
            <div>
              <div className=" flex align-middle justify-center items-center w-2/3 mx-auto ">
                <div className="w-full px-3 m-auto ">
                  <div className="">
                   {/*  <label className="mb-3 block text-base font-medium text-gray-200">
                      Task Name
                    </label> */}
                    <input
                      onChange={(e) => setTaskName(e.target.value)}
                      type="text"
                      placeholder="Navn"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 ">
                  <div className="">
                    {/* <label className="mb-3 block text-base font-medium text-gray-200">
                      Task Type
                    </label> */}
                    <select
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={(e) => setTaskType(e.target.value)}
                    >
                      <option value="codetask">Web Dev</option>
                      <option value="todo">Gøremål</option>
                      <option value="appointment">Aftale</option>
                    </select>
                  </div>
                </div>
                <div className="grid place-content-center w-fit mt-4 ml-4">
                  <button
                    onClick={() => createTask(taskName, taskType)}
                    className="hover:shadow-form rounded-md m-auto -mt-4 bg-[#481847] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            {dailies && todo ? (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <ul className="bg-gray-700 p-4 rounded-2xl">
                    <h2 className="text-4xl mb-6 text-gray-200 font-semibold">
                      Web Dev
                    </h2>
                    {todo.map((todo) => (
                      <div key={todo.id}>
                        {todo.notes === "codetask" ? (
                          <div className="shadow-xl bg-gray-900 text-gray-200 mt-4 mr-0 mb-0 ml-0 p-4 flow-root rounded-lg sm:py-2">
                            <div className=" py-2">
                              <div>
                                <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                  <div className="flex items-center flex-1 min-w-0">
                                    <img
                                      src="https://pm1.aminoapps.com/6564/ee09ccac2da477f00735db9aa49a11579fdea271_00.jpg"
                                      className="flex-shrink-0 bg-black object-cover rounded-full btn- w-10 h-10"
                                    />
                                    <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                                      <p className="text-lg font-bold  truncate">
                                        {todo.text}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                                    {todo.completed ? (
                                      <a
                                        onClick={() => unCompleteTask(todo.id)}
                                        className="bg-green-500 cursor-pointer pt-2 pr-2 pb-2 pl-2 text-lg font-medium text-gray-100 transition-all
                                      duration-200 hover:bg-gray-700 rounded-lg"
                                      >
                                        <CheckSquare />
                                      </a>
                                    ) : (
                                      <a
                                        onClick={() => completeTask(todo.id)}
                                        className="bg-red-500 cursor-pointer pt-2 pr-2 pb-2 pl-2 text-lg font-medium text-gray-100 transition-all
                                        duration-200 hover:bg-gray-700 rounded-lg"
                                      >
                                        <ScanLine />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </ul>
                </div>

                <div>
                  <ul className="bg-gray-700 p-4 rounded-2xl">
                    <h2 className="text-4xl mb-6 text-gray-200 font-semibold">
                      Gøremål
                    </h2>
                    {todo.map((todo) => (
                      <div key={todo.id}>
                        {todo.notes === "todo" ? (
                          <div className="shadow-xl bg-gray-900 text-gray-200 mt-4 mr-0 mb-0 ml-0 p-4 flow-root rounded-lg sm:py-2">
                            <div className=" py-2">
                              <div>
                                <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                  <div className="flex items-center flex-1 min-w-0">
                                    <img
                                      src="https://pm1.aminoapps.com/6564/ee09ccac2da477f00735db9aa49a11579fdea271_00.jpg"
                                      className="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"
                                    />
                                    <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                                      <p className="text-lg font-bold  truncate">
                                        {todo.text}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                                    {todo.completed ? (
                                      <a
                                        onClick={() => unCompleteTask(todo.id)}
                                        className="bg-green-500 cursor-pointer pt-2 pr-2 pb-2 pl-2 text-lg font-medium text-gray-100 transition-all
                                      duration-200 hover:bg-gray-700 rounded-lg"
                                      >
                                        <CheckSquare />
                                      </a>
                                    ) : (
                                      <a
                                        onClick={() => completeTask(todo.id)}
                                        className="bg-red-500 cursor-pointer pt-2 pr-2 pb-2 pl-2 text-lg font-medium text-gray-100 transition-all
                                        duration-200 hover:bg-gray-700 rounded-lg"
                                      >
                                        <ScanLine />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </ul>
                </div>

                <div>
                  <ul className="bg-gray-700 p-4 rounded-2xl">
                    <h2 className="text-4xl mb-6 text-gray-200 font-semibold">
                      Aftaler
                    </h2>
                    {todo.map((todo) => (
                      <div key={todo.id}>
                        {todo.notes === "appointment" ? (
                          <div className="shadow-xl bg-gray-900 text-gray-200 mt-4 mr-0 mb-0 ml-0 p-4 flow-root rounded-lg sm:py-2">
                            <div className=" py-2">
                              <div>
                                <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                  <div className="flex items-center flex-1 min-w-0">
                                    <img
                                      src="https://pm1.aminoapps.com/6564/ee09ccac2da477f00735db9aa49a11579fdea271_00.jpg"
                                      className="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"
                                    />
                                    <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                                      <p className="text-lg font-bold  truncate">
                                        {todo.text}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                                    {todo.completed ? (
                                      <a
                                        onClick={() => unCompleteTask(todo.id)}
                                        className="bg-green-500 cursor-pointer pt-2 pr-2 pb-2 pl-2 text-lg font-medium text-gray-100 transition-all
                                      duration-200 hover:bg-gray-700 rounded-lg"
                                      >
                                        <CheckSquare />
                                      </a>
                                    ) : (
                                      <a
                                        onClick={() => completeTask(todo.id)}
                                        className="bg-red-500 cursor-pointer pt-2 pr-2 pb-2 pl-2 text-lg font-medium text-gray-100 transition-all
                                      duration-200 hover:bg-gray-700 rounded-lg"
                                      >
                                        <ScanLine />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p>Henter data...</p>
            )}
            {/*   */}
          </div>
        </div>
      
    </div>
  );
}

export default Habitica;
