import React, { useContext, useEffect, useState } from "react";
import { EconomyContext, MonthData, IncomeData } from "./EconomyContext.tsx";

function Income() {
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
    <div>
      {/* IF MONTH */}
      {monthData ? (
        <div>
          {/* MAP MONTH */}
          {monthData.map((month) => {
            // Beregn den samlede indkomst
            const totalIncome = incomeData
              .filter(
                (income) =>
                  income.monthEconomyId === month.id && income.etype === 2
              )
              .reduce((total, income) => total + Number(income.eamount), 0);

            // Beregn den samlede udgift
            const totalExpenses = incomeData
              .filter(
                (income) =>
                  income.monthEconomyId === month.id && income.etype === 1
              )
              .reduce((total, income) => total + Number(income.eamount), 0);

            // Beregn nettobeløbet ved at subtrahere udgifter fra indkomster
            const netAmount = totalIncome + totalExpenses;

            return (
              <div
                className="bg-gray-200 min-h-[52.45em] rounded-l-xl mb-12 p-3 w-fit"
                key={month.id}
              >
                <h1 className="text-4xl">
                  {month.monthName}- {month.monthYear} - Indgående
                </h1>
                <h2 className="">{month.id}</h2>
                <h4 class="  antialiased mb-8 tracking-normal font-sans text-3xl text-green-700 font-semibold leading-snug text-blue-gray-900">
                  {" "}
                  {netAmount} Kr.
                </h4>
                <div className="grid grid-cols-2">
                  {/* IF INCOMEDATA */}
                  {incomeData ? (
                    <>
                      <div>
                        <div>
                          <div className="relative w-2/3 mb-8 m-auto flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="w-6 h-6 text-white"
                              >
                                <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                              </svg>
                            </div>
                            <div className="p-4 text-right">
                              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                                Solgte ting
                              </p>
                              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                                {" "}
                                {incomeData
                                  .filter(
                                    (income) =>
                                      income.monthEconomyId === month.id &&
                                      income.etype === 2
                                  )
                                  .reduce(
                                    (total, income) =>
                                      total + Number(income.eamount),
                                    0
                                  )}{" "}
                                Kr.
                              </h4>
                            </div>
                          </div>

                          <div className="flex relative flex-col">
                            <div className="overflow-x-auto shadow-md ">
                              <div className="inline-block relative  align-middle">
                                <div className="overflow-hidden rounded-xl  ">
                                  <table className=" divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                      <tr>
                                        <th
                                          scope="col"
                                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                        >
                                          Produkt Navn
                                        </th>
                                        <th
                                          scope="col"
                                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                        >
                                          Note
                                        </th>
                                        <th
                                          scope="col"
                                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                        >
                                          Pris
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                      {/* MAP INCOME */}
                                      {incomeData.map((income) => {
                                        return (
                                          <tr
                                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                            key={income.id}
                                          >
                                            {income.monthEconomyId ===
                                              month.id && income.etype === 2 ? (
                                              <>
                                                <td className="py-4 px-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                  {income.ename}
                                                </td>
                                                <td className="py-4 px-2 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                                  {income.enote}
                                                </td>
                                                <td className="py-4 px-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                  {income.eamount} Kr.
                                                </td>
                                              </>
                                            ) : null}
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div>
                          <div class="relative w-2/3 mb-8 m-auto flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                            <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                class="w-6 h-6 text-white"
                              >
                                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                                <path
                                  fill-rule="evenodd"
                                  d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                                  clip-rule="evenodd"
                                ></path>
                                <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                              </svg>
                            </div>
                            <div class="p-4 text-right">
                              <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                                Fast Indkomst
                              </p>
                              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                                {" "}
                                {incomeData
                                  .filter(
                                    (income) =>
                                      income.monthEconomyId === month.id &&
                                      income.etype === 1
                                  )
                                  .reduce(
                                    (total, income) =>
                                      total + Number(income.eamount),
                                    0
                                  )}{" "}
                                Kr.
                              </h4>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="overflow-x-auto shadow-md ">
                              <div className="inline-block  align-middle">
                                <div className="overflow-hidden rounded-xl  ">
                                  <table className=" divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                      <tr>
                                        <th
                                          scope="col"
                                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                        >
                                          Produkt Navn
                                        </th>
                                        <th
                                          scope="col"
                                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                        >
                                          Note
                                        </th>
                                        <th
                                          scope="col"
                                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                        >
                                          Pris
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                      {/* MAP INCOME */}
                                      {incomeData.map((income) => {
                                        return (
                                          <tr
                                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                            key={income.id}
                                          >
                                            {income.monthEconomyId ===
                                              month.id && income.etype === 1 ? (
                                              <>
                                                <td className="py-4 px-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                  {income.ename}
                                                </td>
                                                <td className="py-4 px-2 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                                  {income.enote}
                                                </td>
                                                <td className="py-4 px-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                  {income.eamount} Kr.
                                                </td>
                                              </>
                                            ) : null}
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Income;
