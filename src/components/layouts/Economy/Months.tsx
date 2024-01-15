import React, { useContext, useEffect, useState } from "react";
import { EconomyContext, MonthData, IncomeData } from "./EconomyContext.tsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
  faMoneyBillWave,
  faShoppingCart,
  faChartLine,
  faTags,
  faGift,
  faHandHoldingUsd,
  faEllipsisH,
  faShoppingBag,
  faBus,
  faUtensils,
  faDumbbell,
  faShieldAlt,
  faHome,
  faFilm,
  faGifts,
  faLaptopCode,
  faPiggyBank,
  faMobileAlt,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
function Months() {
  /* MONTH LOGIC */

  /* -------------------------------------------------------------------------- */
  /*           Definerer typen for den data, vi forventer i contexten           */
  /* -------------------------------------------------------------------------- */
  interface EconomyInterface {
    monthData: MonthData[];
    getMonths: () => Promise<MonthData[]>;

    incomeData: IncomeData[];
    getMonthIncome: () => Promise<IncomeData[]>;
    incomeYearData: IncomeData[];
    getYearIncome: () => Promise<IncomeData[]>;
    incomeCategories: any;

    expenseData: IncomeData[];
    getMonthExpense: () => Promise<IncomeData[]>;
    expenseYearData: IncomeData[];
    getYearExpense: () => Promise<IncomeData[]>;

    expenseCategories: any;

    selectedMonth: string;
    selectedYear: string;
  }

  /* -------------------------------------------------------------------------- */
  /*             Indhenter data fra context filen EconomyContext.tsx            */
  /* -------------------------------------------------------------------------- */
  const {
    monthData,
    getMonths,

    incomeData,
    getMonthIncome,
    getYearIncome,
    incomeYearData,

    incomeCategories,

    expenseData,
    getMonthExpense,
    getYearExpense,
    expenseYearData,

    expenseCategories,

    selectedYear,
  } = useContext(EconomyContext) as EconomyInterface;

  const iconMapping = {
    "money-bill-1-wave": faMoneyBillWave,
    "shopping-cart": faShoppingCart,
    "chart-line": faChartLine,
    tags: faTags,
    gift: faGift,
    "hand-holding-usd": faHandHoldingUsd,
    "ellipsis-h": faEllipsisH,
    "shopping-bag": faShoppingBag,
    bus: faBus,
    utensils: faUtensils,
    dumbbell: faDumbbell,
    "shield-alt": faShieldAlt,
    home: faHome,
    film: faFilm,
    gifts: faGifts,
    "laptop-code": faLaptopCode,
    "piggy-bank": faPiggyBank,
    "mobile-alt": faMobileAlt,
    handshake: faHandshake,
    // Tilføj flere ikoner efter behov...
  };

  // Hent måneder
  useEffect(() => {
    getMonths();
  }, []);

  // Interface til at dele måneder op i år
  interface dividedMonthsData {
    year?: string;
    months: MonthData[];
  }
  // Funktion der deler måneder op i år
  const divideMonths = monthData.reduce((total, month) => {
    const year = month.monthYear;

    if (!total[year]) {
      total[year] = [];
    }

    total[year].push(month);
    return total;
  }, {} as dividedMonthsData);
  const monthsArray = Object.entries(divideMonths);

  const [selectedMonths, setSelectedMonths] = useState({});

  /* -------------------------------------------------------------------------- */
  /*                                INCOME LOGIC                                */
  /* -------------------------------------------------------------------------- */

  const [monthIncomeData, setMonthIncomeData] = useState({} as any);
  const [incomeSummary, setIncomeSummary] = useState({});

  // Denne funktion opdaterer den samlede sum for hver kategori
  const updateIncomeCategorySummary = (monthData, isAdding) => {
    const newSummary = { ...incomeSummary };

    monthData.forEach(({ ecategory, eamount, eyear }) => {
      const amount = parseFloat(eamount);
      const categoryInfo =
        incomeCategories.find((cat) => cat.category === ecategory) || {};

      if (!newSummary[ecategory]) {
        newSummary[ecategory] = {
          amount: 0,
          icon: categoryInfo.fonticon || "default-icon",
          bgColor: categoryInfo.bgColor || "default-bg",
          eyear: eyear, // Tilføjer eyear her
        };
      }

      newSummary[ecategory].amount += isAdding ? amount : -amount;
      newSummary[ecategory].eyear = eyear; // Opdaterer eyear hver gang
    });

    return newSummary;
  };

  const toggleMonthIncomeData = async (monthId, monthYear) => {
    const isSelected = selectedMonths[monthId];

    // Opdaterer den valgte måneds state
    setSelectedMonths((prev) => ({ ...prev, [monthId]: !isSelected }));

    // Henter månedsdata og opdaterer den samlede sum
    try {
      const monthData = await getMonthIncome(monthId, monthYear); // Antagelse om at denne funktion er asynkron
      setIncomeSummary((prev) =>
        updateIncomeCategorySummary(monthData, !isSelected)
      );
    } catch (error) {
      console.error("Fejl under hentning af data for måneden:", error);
    }
  };

  const [yearIncomeData, setYearIncomeData] = useState({} as any);
  const [incomeSummaryByCategory, setIncomeSummaryByCategory] = useState({});
  // Hent indkomstdata for et givent år
  const getYearIncomeData = (year) => {
    getYearIncome(year).then((data: any) => {
      setYearIncomeData((prevData) => ({
        ...prevData,
        [year]: data,
      }));
      // Kategoriser og summer indkomstdata efter kategori for det pågældende år
      const categorySum = data.reduce((total, income) => {
        const categoryObj = incomeCategories.find(
          (cat) => cat.category === income.ecategory
        );

        if (categoryObj) {
          const amount = parseFloat(income.eamount); // Konverterer eamount til et tal

          if (total[categoryObj.category]) {
            total[categoryObj.category].amount += amount;
          } else {
            total[categoryObj.category] = {
              amount: amount,
              icon: categoryObj.fonticon,
              bgColor: categoryObj.bgColor,
            };
          }
        }

        return total;
      }, {});

      setIncomeSummaryByCategory((prevSummary) => ({
        ...prevSummary,
        [year]: categorySum,
      }));
    });
  };

  useEffect(() => {
    monthsArray.forEach(([year]) => {
      getYearIncomeData(year);
    });
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                EXPENSE LOGIC                               */
  /* -------------------------------------------------------------------------- */
  const [monthExpenseData, setMonthExpenseData] = useState({} as any);
  const [expenseSummary, setExpenseSummary] = useState({});

  // Denne funktion opdaterer den samlede sum for hver kategori
  const updateCategorySummary = (monthData, isAdding) => {
    const newSummary = { ...expenseSummary };

    monthData.forEach(({ ecategory, eamount, eyear }) => {
      const amount = parseFloat(eamount);
      const categoryInfo =
        expenseCategories.find((cat) => cat.category === ecategory) || {};

      if (!newSummary[ecategory]) {
        newSummary[ecategory] = {
          amount: 0,
          icon: categoryInfo.fonticon || "default-icon", // Standardikon hvis ikke defineret
          bgColor: categoryInfo.bgColor || "default-bg", // Standard baggrundsfarve hvis ikke defineret
          eyear: eyear, // Tilføjer eyear her
        };
      }

      // Tilføj eller fratræk beløb baseret på om måneden er valgt eller ej
      newSummary[ecategory].amount += isAdding ? amount : -amount;
      newSummary[ecategory].eyear = eyear; // Opdaterer eyear hver gang
      // Her antager vi at icon og bgColor ikke ændrer sig. Hvis de gør, skal du opdatere dem her.
    });

    return newSummary;
  };

  const toggleMonthExpenseData = async (monthId, monthYear) => {
    const isSelected = selectedMonths[monthId];

    // Opdaterer den valgte måneds state
    setSelectedMonths((prev) => ({ ...prev, [monthId]: !isSelected }));

    // Henter månedsdata og opdaterer den samlede sum
    try {
      const monthData = await getMonthExpense(monthId, monthYear); // Antagelse om at denne funktion er asynkron
      setExpenseSummary((prev) =>
        updateCategorySummary(monthData, !isSelected)
      );
    } catch (error) {
      console.error("Fejl under hentning af data for måneden:", error);
    }
  };

  const [yearExpenseData, setYearExpenseData] = useState({} as any);
  const [expenseSummaryByCategory, setExpenseSummaryByCategory] = useState({});
  // Hent indkomstdata for et givent år
  const getYearExpenseData = (year) => {
    getYearExpense(year).then((data: any) => {
      setYearExpenseData((prevData) => ({
        ...prevData,
        [year]: data,
      }));
      // Kategoriser og summer indkomstdata efter kategori for det pågældende år
      const categorySum = data.reduce((total, expense) => {
        const categoryObj = expenseCategories.find(
          (cat) => cat.category === expense.ecategory
        );

        if (categoryObj) {
          const amount = parseFloat(expense.eamount); // Konverterer eamount til et tal

          if (total[categoryObj.category]) {
            total[categoryObj.category].amount += amount;
          } else {
            total[categoryObj.category] = {
              amount: amount,
              icon: categoryObj.fonticon,
              bgColor: categoryObj.bgColor,
            };
          }
        }

        return total;
      }, {});

      setExpenseSummaryByCategory((prevSummary) => ({
        ...prevSummary,
        [year]: categorySum,
      }));
    });
  };

  useEffect(() => {
    monthsArray.forEach(([year]) => {
      getYearExpenseData(year);
    });
  }, []);


  
  


  /* -------------------------------------------------------------------------- */
  /*                                     DOM                                    */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="  grid grid-cols-1 ">

      <div className="">
        {monthsArray
          .sort((a, b) => {
            return Number(b[0]) - Number(a[0]);
          })
          .map(([year, months]) => (
            <div className="bg-gray-900 m-4 p-6 rounded-xl text-gray-100" key={year}>
              <h1 className=" text-6xl">{year}</h1>
              <button
                className="block m-auto mt-6 select-none rounded-lg bg-gray-700 py-3.5 px-7 text-center align-middle  text-sm font-bold uppercase text-gray-100 shadow-md shadow-gray-600/20 transition-all hover:shadow-lg hover:shadow-gray-600/40 focus:opacity-[0.85] focus:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => {
                  getYearIncomeData(year);
                  getYearExpenseData(year);
                }}
              >
                Se hele året
              </button>

              <div>

                {
                  incomeSummaryByCategory[year] ? (
                    <h1 className="mt-6 mb-10 text-lg text-left font-bold uppercase">Indtægter</h1>
                  ) : null
                }

                <div className="grid grid-cols-6 gap-6">
                  {incomeSummaryByCategory[year] &&
                    Object.entries(incomeSummaryByCategory[year]).map(
                      ([category, data], index) => (
                        <div key={index}>
                          <div className="relative flex flex-col bg-clip-border rounded-xl shadow-md shadow-gray-500/20 bg-gray-800 border border-gray-700 ">
                            <div
                              className={`bg-gradient-to-tr ${data.bgColor} bg-clip-border mx-4 rounded-xl overflow-hidden text-gray-100  absolute -mt-4 grid h-16 w-16 place-items-center`}
                            >
                              {data.icon && (
                                <FontAwesomeIcon
                                  className="text-3xl text-gray-100"
                                  icon={iconMapping[data.icon]}
                                />
                              )}
                            </div>
                            <div className="p-4 text-right">
                              <p className="block antialiased  text-sm leading-normal font-normal text-gray-100">
                                {category}
                              </p>
                              <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-gray-100">
                                {Number(data.amount).toFixed(0)} KR.
                              </h4>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>

             
                                
              
              {
                  incomeSummaryByCategory[year] ? (
                    <h1 className="mt-8 mb-10 text-lg text-left font-bold uppercase">Udgifter</h1>
                  ) : null
                }
              <div className="grid grid-cols-6 gap-6 mt-4">
                {expenseSummaryByCategory[year] &&
                  Object.entries(expenseSummaryByCategory[year]).map(
                    ([category, data], index) => (
                      <div key={index}>
                        <div className="relative flex flex-col bg-clip-border rounded-xl shadow-md shadow-gray-500/20 bg-gray-800 border border-gray-700">
                          <div
                            className={`bg-gradient-to-tr ${data.bgColor} bg-clip-border mx-4 rounded-xl overflow-hidden   shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center`}
                          >
                            {data.icon && (
                              <FontAwesomeIcon
                                className="text-3xl"
                                icon={iconMapping[data.icon]}
                              />
                            )}
                          </div>
                          <div className="p-4 text-right">
                            <p className="block antialiased  text-sm leading-normal font-normal text-blue-gray-600">
                              {category}
                            </p>
                            <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                              {Number(data.amount).toFixed(0)} KR.
                            </h4>
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </div>

              {/* Indkomst tabel */}
              
              {
                  incomeSummaryByCategory[year] ? (
                    <h1 className="mt-8 mb-10 text-lg text-left font-bold uppercase">Liste over {year}</h1>
                  ) : null
                }
              <div className="grid grid-cols-2 gap-4 mb-4 mt-12">
                <div className="max-h-[50em] overflow-y-scroll">
                  {yearIncomeData[year] && (
                    <table className="min-w-full bg-white max-h-[10em] overflow-hidden ">
                      <thead className="bg-gray-800 ">
                        <tr>
                          <th className="py-3 px-4 text-left">Navn</th>
                          <th className="py-3 px-4 text-left">Note</th>
                          <th className="py-3 px-4 text-left">Kategori</th>
                          <th className="py-3 px-4 text-left">Beløb</th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-700">
                        {yearIncomeData[year]
                          .sort((a, b) => {
                            const primarySort =
                              a.monthEconomyId - b.monthEconomyId;
                            if (primarySort !== 0) {
                              return primarySort;
                            }
                            return a.etype - b.etype;
                          })
                          .map((income, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-4 px-4 font-bold">
                                {income.ename}
                              </td>
                              <td className="py-4 px-4">{income.enote}</td>
                              <td className="py-4 px-4">{income.ecategory}</td>
                              <td className="py-4 px-4">{income.eamount}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* expense tabel */}
                <div className="max-h-[50em] overflow-y-scroll">
                  {yearExpenseData[year] && (
                    <table className="min-w-full bg-white  ">
                      <thead className="bg-gray-800 ">
                        <tr>
                          <th className="py-3 px-4 text-left">Navn</th>
                          <th className="py-3 px-4 text-left">Note</th>
                          <th className="py-3 px-4 text-left">Kategori</th>
                          <th className="py-3 px-4 text-left">Beløb</th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-700">
                        {yearExpenseData[year]
                          .sort((a, b) => {
                            const primarySort =
                              a.monthEconomyId - b.monthEconomyId;
                            if (primarySort !== 0) {
                              return primarySort;
                            }
                            // Tilføj dit sekundære sort-kriterium her. For eksempel, hvis 'etype' er en string:
                            return a.etype - b.etype;
                          })
                          .map((expense, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-4 px-4">
                                {expense.ename} 
                              </td>
                              <td className="py-4 px-4">{expense.enote}</td>
                              <td className="py-4 px-4">{expense.ecategory}</td>
                              <td className="py-4 px-4">{expense.eamount}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>


             {/*  <h1 className="mt-8 mb-10 text-3xl text-left font-bold uppercase">Se individuel måned</h1> */}
              <div>
                <div className="grid grid-cols-5 place-content-center gap-2">
                  {months.map((month) => (
                    <div key={month.id}>
                      <label className="flex items-center justify-center space-x-3 m-auto mt-6 select-none rounded-lg bg-gray-700 py-3.5 px-7 text-center align-middle  text-lg font-bold uppercase text-gray-100 shadow-md shadow-gray-600/20 transition-all hover:shadow-lg hover:shadow-gray-600/40 focus:opacity-[0.85] focus:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          onChange={() => {
                            toggleMonthIncomeData(month.id, month.monthYear);
                            toggleMonthExpenseData(month.id, month.monthYear);
                          }}
                          checked={!!selectedMonths[month.id]}
                        />
                        <span className="text-gray-100">
                          {month.monthName} 
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <div>
                  {/* Expense Month Summary */}
                  
                      <h1 className="mt-8 mb-10 text-lg text-left font-bold uppercase">Indtægter</h1>
                   
                  <div className="grid grid-cols-6 gap-2">
                    {Object.entries(incomeSummary).map(([category, data]) => (
                      <>
                        {data.eyear === Number(year) ? (
                          <div
                            key={category}
                            className="relative flex flex-col bg-clip-border rounded-xl  text-gray-100 shadow-md shadow-gray-500/20 bg-gray-800 border border-gray-700 mb-2"
                          >
                            <div
                              className={`bg-gradient-to-tr ${data.bgColor} bg-clip-border mx-4 rounded-xl overflow-hidden  shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center`}
                            >
                              {data.icon && (
                                <FontAwesomeIcon
                                  className="text-3xl"
                                  icon={iconMapping[data.icon]}
                                />
                              )}
                            </div>
                            <div className="p-4 text-right">
                              <p className="block antialiased  text-sm leading-normal font-normal text-blue-gray-600">
                                {category}
                              </p>
                              <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                                {data.amount.toFixed(2)} KR.
                              </h4>
                            </div>
                          </div>
                        ) : null}
                      </>
                    ))}
                  </div>

                  <h1 className="mt-8 mb-10 text-lg text-left font-bold uppercase">Udgifter</h1>
                  <div className="grid grid-cols-6 gap-2">
                    {/* Expense Month Summary */}
                    {Object.entries(expenseSummary).map(([category, data]) => (
                      <>
                      {
                        data.eyear === Number(year) ? (
                          <div
                          key={category}
                          className="relative flex flex-col bg-clip-border rounded-xl text-gray-100 shadow-md shadow-gray-500/20 bg-gray-800 border border-gray-700 mb-2"
                        >
                          <div
                            className={`bg-gradient-to-tr ${data.bgColor} bg-clip-border mx-4 rounded-xl overflow-hidden  shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center`}
                          >
                            {data.icon && (
                              <FontAwesomeIcon
                                className="text-3xl"
                                icon={iconMapping[data.icon]}
                              />
                            )}
                          </div>
                          <div className="p-4 text-right">
                            <p className="block antialiased  text-sm leading-normal font-normal text-blue-gray-600">
                              {category}
                            </p>
                            <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                              {data.amount.toFixed(2)} KR.
                            </h4>
                          </div>
                        </div>
                        ) : null
                      }
                    </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
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
         className="w-full bg-indigo-500  text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
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
