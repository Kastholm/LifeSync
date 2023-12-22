import React, { useContext, useEffect, useState } from "react";
import { EconomyContext, MonthData, IncomeData } from "./EconomyContext.tsx";
import Income from "./Income.tsx";
import Expenses from "./Expenses.tsx";

function Months() {
  /* MONTH LOGIC */

  interface EconomyInterface {
    monthData: MonthData[];
    getMonths: () => Promise<MonthData[]>;
    incomeData: IncomeData[];
    getIncome: () => Promise<IncomeData[]>;
  }

  const { monthData, getMonths, incomeData, getIncome } = useContext(
    EconomyContext
  ) as EconomyInterface;

  useEffect(() => {
    getMonths();
  }, []);
  console.log("md", monthData);

  useEffect(() => {
    getIncome();
  }, []);
  console.log("in data", incomeData);

  return (
    <div className=" p-12 relative flex ">
        <Income />
        <Expenses />
    </div>
  );
}

//Create month
/*  const [monthName, setMonthName] = useState<string>("");
const [monthYear, setMonthYear] = useState<string>("");
const [monthButton, setMonthButton] = useState<boolean>(false); */

/*   // POST NEW MONTH
  const createMonth = (
    monthName: string,
    monthYear: number
  ): Promise<MonthData[]> => {
    return fetch("http://localhost:3001/new/month", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        monthName: monthName,
        monthYear: monthYear,
      }),
    })
      .then((response) => response.json() as Promise<MonthData>)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => {
        console.log(err);
        return [];
      });
  }; */
{
  /*  <button onClick={() => setMonthButton(true)} className="bg-green-200 p-4">
   Opret ny md
 </button>

 {monthButton ? (
   <div className="mx-auto py-8 absolute">
     <div className="w-full relative  max-w-sm m-auto bg-gray-900 p-8 rounded-md shadow-md">
       <div className="mb-4 ">
         <p
           className="font-bold w-fit absolute right-2 top-2 text-3xl text-red-600 bg-white px-2 rounded-full cursor-pointer"
           onClick={() => setMonthButton(false)}
         >
           X
         </p>
         <label className="block text-gray-700 text-sm font-bold mb-2">
           Måned
         </label>
         <input
           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
           value={monthName}
           onChange={(e) => setMonthName(e.target.value)}
           placeholder="Januar"
         />
       </div>
       <div className="mb-4">
         <label className="block text-gray-700 text-sm font-bold mb-2">
           År
         </label>
         <input
           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
           value={monthYear}
           type="number"
           onChange={(e) => setMonthYear(e.target.value)}
           placeholder="1978"
         />
       </div>
       <button
         onClick={() => createMonth(monthName, monthYear)}
         className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
         type="submit"
       >
         Ny Måned
       </button>
     </div>
   </div>
 ) : null} */
}
{
}
export default Months;
