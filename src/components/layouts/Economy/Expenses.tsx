import React, { useContext, useEffect, useState } from "react";
import { EconomyContext, MonthData, IncomeData } from "./EconomyContext.tsx";

function Expenses() {
  /* MONTH LOGIC */

  interface EconomyInterface {
    monthData: MonthData[];
    getMonths: () => Promise<MonthData[]>;
    expenseData: IncomeData[];
    getExpense: () => Promise<IncomeData[]>;
  }

  const { monthData, getMonths, expenseData, getExpense } = useContext(
    EconomyContext
  ) as EconomyInterface;

  useEffect(() => {
    getMonths();
  }, []);
  console.log("md", monthData);

  useEffect(() => {
    getExpense();
  }, []);
  console.log("in data", expenseData);

  return (
    <div>
      {/* IF MONTH */}
      {monthData ? (
        <div>
          {/* MAP MONTH */}
          {monthData.map((month) => {
            // Beregn den samlede indkomst
            const totalSells = expenseData
              .filter(
                (expense) =>
                  expense.monthEconomyId === month.id && expense.etype === 2
              )
              .reduce((total, expense) => total + Number(expense.eamount), 0);

            // Beregn den samlede udgift
            const totalIncome = expenseData
              .filter(
                (expense) =>
                  expense.monthEconomyId === month.id && expense.etype === 1
              )
              .reduce((total, expense) => total + Number(expense.eamount), 0);

            // Beregn nettobeløbet ved at subtrahere udgifter fra indkomster
            const netAmount = totalSells + totalIncome;

            return (
              <div
                className=" w-fit bg-gray-200 min-h-[50em] mb-12 p-3 rounded-r-xl"
                key={month.id}
              >
                <h1 className="text-4xl">
                  {month.monthName}- {month.monthYear} - Udgående
                </h1>
                <h2>{month.id}</h2>
                <h4 class=" mb-8  antialiased tracking-normal font-sans text-3xl text-red-700 font-semibold leading-snug text-blue-gray-900">
                  {" "}
                  {netAmount.toFixed(2)} Kr.
                </h4>
                <div className="grid grid-cols-2">
                  {/* IF EXPE DATA */}
                  {expenseData ? (
                    <>
                      <div>
                        <div>
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
                                Købte Ting
                              </p>
                              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                                {" "}
                                {expenseData
                                  .filter(
                                    (expense) =>
                                      expense.monthEconomyId === month.id &&
                                      expense.etype === 2
                                  )
                                  .reduce(
                                    (total, expense) =>
                                      total + Number(expense.eamount),
                                    0
                                  )}{" "}
                                Kr.
                              </h4>
                            </div>
                          </div>
                          <div className="flex relative flex-col h-[35em] overflow-hidden">
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
                                      {expenseData.map((expense) => {
                                        return (
                                          <tr
                                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                            key={expense.id}
                                          >
                                            {expense.monthEconomyId ===
                                              month.id &&
                                            expense.etype === 2 ? (
                                              <>
                                                <td className="py-4 px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                  {expense.ename}
                                                </td>
                                                <td className="py-4 px-3 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                                  {expense.enote}
                                                </td>
                                                <td className="py-4 px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                  {expense.eamount} Kr.
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
                          <div className="relative w-2/3 mb-12 m-auto flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="w-6 h-6 text-white"
                              >
                                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                              </svg>
                            </div>
                            <div className="p-4 text-right">
                              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                                Sales
                              </p>
                              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                                {" "}
                                {expenseData
                                  .filter(
                                    (expense) =>
                                      expense.monthEconomyId === month.id &&
                                      expense.etype === 1
                                  )
                                  .reduce(
                                    (total, expense) =>
                                      total + Number(expense.eamount),
                                    0
                                  )}{" "}
                                Kr.
                              </h4>
                            </div>
                          </div>
                          <div className="flex relative flex-col">
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
                                      {expenseData.map((expense) => {
                                        return (
                                          <tr
                                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                            key={expense.id}
                                          >
                                            {expense.monthEconomyId ===
                                              month.id &&
                                            expense.etype === 1 ? (
                                              <>
                                                <td className="py-4 px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                  {expense.ename}
                                                </td>
                                                <td className="py-4 px-3 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                                  {expense.enote}
                                                </td>
                                                <td className="py-4 px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                  {expense.eamount} Kr.
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

export default Expenses;
