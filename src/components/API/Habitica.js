import { useState, useEffect } from "react";

function Habitica() {
  const [dailies, setDailies] = useState();
  const [todo, setTodos] = useState();

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
        console.log(dailyData.data);
        console.log(todoData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1 className="text-6xl">Habitica</h1>
      <div>
        {dailies && todo ? (
          <div>
            <ul>
              {dailies.map((daily) => (
                <li>
                  {daily.text} -{" "}
                  {daily.completed ? "Fuldført" : "Ikke fuldført"} - Streak:
                  {daily.streak}
                </li>
              ))}
            </ul>
            <ul>
              {todo.map((todo) => (
                <li>
                  {todo.text} - {todo.completed ? "Fuldført" : "Ikke fuldført"}{" "}
                  - Streak:
                  {todo.streak}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Henter data...</p>
        )}
        {/*   */}
      </div>
    </div>
  );
}

export default Habitica;
