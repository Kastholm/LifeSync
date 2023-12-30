import React, { useContext, useEffect, useState } from "react";
import { EconomyContext, MonthData, IncomeData } from "./EconomyContext.tsx";
import Expenses from "./Expenses.tsx";
function Months() {
  /* MONTH LOGIC */

  interface EconomyInterface {
    monthData: MonthData[];
    getMonths: () => Promise<MonthData[]>;
    incomeData: IncomeData[];
    getIncome: () => Promise<IncomeData[]>;
    selectedMonth: string;
    getFullIncome: () => Promise<IncomeData[]>;
    selectedYear: string;
    incomeFullData: string;
  }

  const {
    monthData,
    getMonths,
    incomeData,
    getIncome,
    selectedMonth,
    getFullIncome,
    selectedYear,
    incomeFullData,
  } = useContext(EconomyContext) as EconomyInterface;

  useEffect(() => {
    getMonths();
  }, []);
  //console.log("md", monthData);

  const divideMonths = monthData.reduce((total, month) => {
    const year = month.monthYear;
    if (!total[year]) {
      total[year] = [];
    }
    total[year].push(month);
    return total;
  }, {});

  /*  const annualTotal = selectedYear 
  ? incomeData
      .filter(income => income.year === selectedYear) // Antager at income har et 'year' felt
      .reduce((total, income) => total + parseFloat(income.eamount), 0)
  : 0; */

  return (
    <div className="  grid grid-cols-1 ">
      {Object.keys(divideMonths).map((year, id) => {
        return (
          <div className="bg-red-200 p-12 m-2 " key={year}>
            {}
            <h1>
              {year} {id}
            </h1>
            <button onClick={() => getFullIncome(year)}> hhjaasdfasdf</button>
            {incomeFullData ? (
              <div>
                <h1>id ad</h1>
                {incomeFullData.reduce((alle, individuel) => {
                  return alle + parseFloat(individuel.eamount);
                }, 0)}

                <div className="mt-12 grid grid-cols-4">
                  {Object.entries(
                    incomeFullData.reduce((acc, item) => {
                      const ecategory = item.ecategory; // Antager at hver 'item' har en 'category' property
                      if (!acc[ecategory]) {
                        acc[ecategory] = 0;
                      }
                      acc[ecategory] += parseFloat(item.eamount);
                      return acc;
                    }, {})
                  ).map(([ecategory, total]) => (
                    <div  key={ecategory}>
                      {/* <h3>{ecategory}</h3>
                      <p>Total: {total}</p> */}
                      <div className="relative w-2/3 mb-8 m-auto flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="w-6 h-6 text-white"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div className="p-4 text-right">
                          <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                            {ecategory}
                          </p>
                          <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                            {total} Kr.
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            <div className=" grid grid-cols-8">
              {divideMonths[year].map((month) => {
                return (
                  <div>
                    <br />
                    <div
                      onClick={() => getIncome(month.id, year)}
                      className=" p-12 m-2 bg-blue-200"
                      key={month.id}
                    >
                      <h2>{month.monthName}</h2> <h2>{month.id}</h2>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              {selectedMonth === year && incomeData && (
                <div className="grid grid-cols-2">
                  <div>
                    <h1>Indkomst</h1>
                    {incomeData
                      .filter((income) => income.etype === 1)
                      .map((incomeType) => (
                        // LIIST DIV INC. HIDE
                        <div
                          className="bg-green-200 p-4 m-2"
                          key={incomeType.id}
                        >
                          <p>ID: {incomeType.id}</p>
                          <p>Navn: {incomeType.ename}</p>
                          <p>Kategori: {incomeType.ecategory}</p>
                          <p>Type: {incomeType.etype}</p>
                          <p>Beløb: {incomeType.eamount}</p>
                        </div>
                      ))}
                  </div>
                  <div>
                    <h1>Andet</h1>
                    {incomeData
                      .filter((income) => income.etype === 2)
                      .map((incomeType) => (
                        <div
                          className="bg-green-200 p-4 m-2"
                          key={incomeType.id}
                        >
                          <p>ID: {incomeType.id}</p>
                          <p>Navn: {incomeType.ename}</p>
                          <p>Kategori: {incomeType.ecategory}</p>
                          <p>Type: {incomeType.etype}</p>
                          <p>Beløb: {incomeType.eamount}</p>
                        </div>
                      ))}
                  </div>
                  <h2 className="font-bold text-4xl">
                    Samlet beløb:{" "}
                    {incomeData.reduce(
                      (total, income) => total + parseFloat(income.eamount),
                      0
                    )}
                  </h2>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <Expenses></Expenses>
    </div>
  );
}

{
  /* {incomeData.map((income) => (
  
  <div className="bg-green-200 p-4 m-2" key={income.id}>
    <p>ID: {income.id}</p>
    <p>Navn: {income.ename}</p>
    <p>Kategori: {income.ecategory}</p>
    <p>Type: {income.etype}</p>
    <p>Beløb: {income.eamount}</p>
  </div>
))} */
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
