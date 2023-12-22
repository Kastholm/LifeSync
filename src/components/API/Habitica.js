import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../Base/Login";
import LoginForm from "./LoginForm.js";
import { CheckSquare, ScanLine } from "lucide-react";

function Habitica() {
  const [dailies, setDailies] = useState();
  const [todo, setTodos] = useState();

  const [taskName, setTaskName] = useState();
  const [taskType, setTaskType] = useState();

  useEffect(() => {
    checkPassword();
  }, []);

  const {
    loginStatus,
    checkPassword,
  } = useContext(LoginContext);

  useEffect(() => {
    const userId = process.env.REACT_APP_HABITICA_USERID;
    const apiToken = process.env.REACT_APP_HABITICA_TOKEN;

    const fetchDailies = fetch(
      "https://habitica.com/api/v3/tasks/user?type=dailys",
      {
        headers: {
          "x-api-user": userId,
          "x-api-key": apiToken,
        },
      }
    );

    const fetchTodos = fetch(
      "https://habitica.com/api/v3/tasks/user?type=todos",
      {
        headers: {
          "x-api-user": userId,
          "x-api-key": apiToken,
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
        //console.log(todoData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const completeTask = (taskId) => {
    const userId = process.env.REACT_APP_HABITICA_USERID;
    const apiToken = process.env.REACT_APP_HABITICA_TOKEN;
    fetch(`https://habitica.com/api/v3/tasks/${taskId}/score/up`, {
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

  const createTask = (name, type) => {
    const userId = process.env.REACT_APP_HABITICA_USERID;
    const apiToken = process.env.REACT_APP_HABITICA_TOKEN;
    fetch(`https://habitica.com/api/v3/tasks/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-user": userId,
        "x-api-key": apiToken,
      },
      body: JSON.stringify({
        text: `${name}`,
        type: `${type}`,
        alias: `alias-${name}`,
        notes: "",
        tags: ["ed427623-9a69-4aac-9852-13deb9c190c3"],
        checklist: [],
        priority: 2,
      }),
    }).catch((err) => {
      console.log(err);
    });
    console.log(name, type);
    /*  setTimeout(() => {
      window.location.reload();
    }, 1000); */
  };
  {
    /* <LoginForm /> */
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-4 m-3">
      {loginStatus ? (
        <div>
          <div className="bg-gray-700 w-full rounded-2xl grid p-4 mb-4">
            <div>
              <div className="-mx-3 grid grid-cols-3 place-content-center ">
                <div className="w-full px-3 m-auto ">
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-gray-200">
                      Task Name
                    </label>
                    <input
                      onChange={(e) => setTaskName(e.target.value)}
                      type="text"
                      placeholder="Navn"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 ">
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-gray-200">
                      Task Type
                    </label>
                    <select
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={(e) => setTaskType(e.target.value)}
                    >
                      <option value="daily">Daily</option>
                      <option value="todo">ToDo</option>
                    </select>
                  </div>
                </div>
              <div className="grid w-fit mt-4 ml-4" >
                <button
                  onClick={() => createTask(taskName, taskType)}
                  className="hover:shadow-form rounded-md m-auto bg-[#481847] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Send
                </button>
              </div>
              </div>
            </div>
          </div>
          <div>
            {dailies && todo ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ul className="bg-gray-700 p-4 rounded-2xl">
                    <h2 className="text-4xl mb-6 text-gray-200 font-semibold">
                      Daily
                    </h2>
                    {dailies.map((daily) => (
                      <div key={daily.id}>
                        <div className="shadow-xl bg-gray-900 text-gray-200 mt-4 mr-0 mb-0 ml-0 p-4 flow-root rounded-lg sm:py-2">
                          <div className=" py-4">
                            <div>
                              <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                <div className="flex items-center flex-1 min-w-0">
                                  <img
                                    src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/SlackLogo_CompanyNews_SecondaryAubergine_Hero.jpg?d=500x500&amp;f=fill"
                                    className="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"
                                  />

                                  <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                                    <p className="text-lg font-bold truncate">
                                      {daily.text}
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                                  {daily.completed ? (
                                    <a
                                      onClick={() => unCompleteTask(daily.id)}
                                      className="buttonCompleted bg-green-500 cursor-pointer pt-2 pr-2 pb-2 pl-2 text-lg font-medium text-gray-100 transition-all
                    duration-200 hover:bg-gray-700 rounded-lg"
                                    >
                                      <CheckSquare />
                                    </a>
                                  ) : (
                                    <a
                                      onClick={() => completeTask(daily.id)}
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
                      </div>
                    ))}
                  </ul>
                </div>
                <div>
                  <ul className="bg-gray-700 p-4 rounded-2xl">
                    <h2 className="text-4xl mb-6 text-gray-200 font-semibold">
                      ToDo
                    </h2>
                    {todo.map((todo) => (
                      <div key={todo.id}>
                        <div className="shadow-xl bg-gray-900 text-gray-200 mt-4 mr-0 mb-0 ml-0 p-4 flow-root rounded-lg sm:py-2">
                          <div className=" py-4">
                            <div >
                              <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                <div className="flex items-center flex-1 min-w-0">
                                  <img
                                    src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/SlackLogo_CompanyNews_SecondaryAubergine_Hero.jpg?d=500x500&amp;f=fill"
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
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default Habitica;
