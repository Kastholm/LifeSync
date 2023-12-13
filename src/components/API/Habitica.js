import { useState, useEffect } from "react";

function Habitica() {

     const [dailies, setDailies] = useState([]);

     const fetchDailies = async () => {
       const userId = process.env.REACT_APP_HABITICA_USERID;
       const apiToken = process.env.REACT_APP_HABITICA_TOKEN;
   
       try {
         const response = await fetch(
           "https://habitica.com/api/v3/tasks/user?type=dailys",
           {
             headers: {
               "x-api-user": userId,
               "x-api-key": apiToken,
             },
           }
         );
   
         if (!response.ok) {
           throw new Error("Fejl ved hentning af daglige opgaver");
         }
   
         const data = await response.json();
         return data.data; // Dine daglige opgaver
       } catch (error) {
         console.error("Der opstod en fejl:", error);
       }
     };

     useEffect(() => {
          fetchDailies().then(fetchedDailies => {
            setDailies(fetchedDailies);
          });
        }, []);


  return (
    <div>
      <h1 className="text-6xl">Habitica</h1>
      <ul>
      {dailies.map(daily => (
        <li key={daily.id}>
          {daily.text} - {daily.completed ? 'Fuldført' : 'Ikke fuldført'}
          {/* Flere detaljer eller interaktioner her */}
        </li>
      ))}
    </ul>
    </div>
  );
}

export default Habitica;
