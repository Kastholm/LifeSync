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
  faHandshake 
} from '@fortawesome/free-solid-svg-icons';
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
    "tags": faTags,
    "gift": faGift,
    "hand-holding-usd": faHandHoldingUsd,
    "ellipsis-h": faEllipsisH,
    "shopping-bag": faShoppingBag,
    "bus": faBus,
    "utensils": faUtensils,
    "dumbbell": faDumbbell,
    "shield-alt": faShieldAlt,
    "home": faHome,
    "film": faFilm,
    "gifts": faGifts,
    "laptop-code": faLaptopCode,
    "piggy-bank": faPiggyBank,
    "mobile-alt": faMobileAlt,
    "handshake": faHandshake
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

  const toggleMonthIncomeData = (monthId, monthYear) => {
    const isSelected = !!selectedMonths[monthId];
    setSelectedMonths((prev) => ({
      ...prev,
      [monthId]: !isSelected,
    }));

    if (!isSelected) {
      // Tilføj data logik (som før)
      getMonthIncome(monthId, monthYear).then((data) => {
        setMonthIncomeData((prevData) => ({
          ...prevData,
          [monthId]: data,
        }));
      });
    } else {
      // Fjern data logik
      setMonthIncomeData((prevData) => {
        const newData = { ...prevData };
        delete newData[monthId];
        return newData;
      });
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

  const toggleMonthExpenseData = (monthId, monthYear) => {
    const isSelected = !!selectedMonths[monthId];
    setSelectedMonths((prev) => ({
      ...prev,
      [monthId]: !isSelected,
    }));

    if (!isSelected) {
      // Tilføj data logik (som før)
      getMonthExpense(monthId, monthYear).then((data) => {
        setMonthExpenseData((prevData) => ({
          ...prevData,
          [monthId]: data,
        }));
      });
    } else {
      // Fjern data logik
      setMonthExpenseData((prevData) => {
        const newData = { ...prevData };
        delete newData[monthId];
        return newData;
      });
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
      <h1 className="text-white text-6xl">Hej</h1>

      <div className="">
        {monthsArray
          .sort((a, b) => {
            return Number(b[0]) - Number(a[0]);
          })
          .map(([year, months]) => (
            <div className="bg-gray-700 m-4 p-6 rounded-xl" key={year}>
              <h1 className="text-white text-6xl">{year}</h1>
              <button
                className="bg-green-800 p-4"
                onClick={() => {
                  getYearIncomeData(year);
                  getYearExpenseData(year);
                }}
              >
                Get year
              </button>

              <h1 className="text-white text-6xl mb-8">Indkomst</h1>
              <div className="grid grid-cols-6 gap-2">
                {incomeSummaryByCategory[year] &&
                  Object.entries(incomeSummaryByCategory[year]).map(
                    ([category, data], index) => (
                      <div key={index}>
                        {/* Resten af din kode */}
                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                          <div className={`bg-gradient-to-tr ${data.bgColor} bg-clip-border mx-4 rounded-xl overflow-hidden text-white  shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center`}>
                            {data.icon && (
                              <FontAwesomeIcon
                                className="text-3xl"
                                icon={iconMapping[data.icon]}
                              />
                            )}
                          </div>
                          <div className="p-4 text-right">
                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                              {category}
                            </p>
                            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                            {Number(data.amount).toFixed(0)} DKK
                            </h4>
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </div>

              {/* <div class="border-t border-blue-gray-50 p-4">
                      <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        <strong class="text-green-500">+55%</strong>&nbsp;than last week
                      </p>
                    </div> */}
              <h1 className="text-white text-6xl mb-8">Udgifter</h1>
              <div className="grid grid-cols-6 gap-2">
                {expenseSummaryByCategory[year] &&
                  Object.entries(expenseSummaryByCategory[year]).map(
                    ([category, data], index) => (
                      <div key={index}>
                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                        <div className={`bg-gradient-to-tr ${data.bgColor} bg-clip-border mx-4 rounded-xl overflow-hidden text-white  shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center`}>
                            {data.icon && (
                              <FontAwesomeIcon
                                className="text-3xl"
                                icon={iconMapping[data.icon]}
                              />
                            )}
                          </div>
                          <div className="p-4 text-right">
                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                              {category}
                            </p>
                            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                            {Number(data.amount).toFixed(0)} DKK
                            </h4>
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </div>

              {/* Indkomst tabel */}
              <div className="grid grid-cols-2 gap-4 mb-4 mt-8">
                <div className="overflow-x-auto">
                  {yearIncomeData[year] && (
                    <table className="min-w-full bg-white">
                      <thead className="bg-gray-800 text-white">
                        <tr>
                          <th className="py-3 px-4 text-left">Navn</th>
                          <th className="py-3 px-4 text-left">Note</th>
                          <th className="py-3 px-4 text-left">Kategori</th>
                          <th className="py-3 px-4 text-left">Beløb</th>
                        </tr>
                      </thead>
                      <tbody>
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
                              <td className="py-2 px-4">
                                {income.ename} : ID {income.monthEconomyId}
                              </td>
                              <td className="py-2 px-4">{income.enote}</td>
                              <td className="py-2 px-4">{income.ecategory}</td>
                              <td className="py-2 px-4">{income.eamount}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* expense tabel */}
                <div className="overflow-x-auto">
                  {yearExpenseData[year] && (
                    <table className="min-w-full bg-white">
                      <thead className="bg-gray-800 text-white">
                        <tr>
                          <th className="py-3 px-4 text-left">Navn</th>
                          <th className="py-3 px-4 text-left">Note</th>
                          <th className="py-3 px-4 text-left">Kategori</th>
                          <th className="py-3 px-4 text-left">Beløb</th>
                        </tr>
                      </thead>
                      <tbody>
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
                              <td className="py-2 px-4">
                                {expense.ename} : ID {expense.monthEconomyId}
                              </td>
                              <td className="py-2 px-4">{expense.enote}</td>
                              <td className="py-2 px-4">{expense.ecategory}</td>
                              <td className="py-2 px-4">{expense.eamount}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              <h1 className="text-white text-4xl mb-4">
                Se for individuel måned
              </h1>
              <div>
                <div className="grid grid-cols-5 place-content-center gap-2">
                  {months.map((month) => (
                    <div key={month.id}>
                      <label className="flex items-center justify-center py-4 space-x-3 rounded-xl bg-orange-200">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          onChange={() => {
                            toggleMonthIncomeData(month.id, month.monthYear);
                            toggleMonthExpenseData(month.id, month.monthYear);
                          }}
                          checked={!!selectedMonths[month.id]}
                        />
                        <span className="text-gray-700">
                          {month.monthName} ID: {month.id}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <table className="min-w-full h-fit bg-white">
                    <thead className="bg-gray-800 text-white">
                      <tr>
                        <th className="py-3 px-4 text-left">Navn</th>
                        <th className="py-3 px-4 text-left">Note</th>
                        <th className="py-3 px-4 text-left">Kategori</th>
                        <th className="py-3 px-4 text-left">Beløb</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(monthIncomeData).map(
                        ([monthId, incomes]) =>
                          incomes.map(
                            (income) =>
                              income.eyear === Number(year) && (
                                <tr key={income.id} className="border-b">
                                  <td className="py-2 px-4">
                                    {income.ename} : ID {income.monthEconomyId}
                                  </td>
                                  <td className="py-2 px-4">{income.enote}</td>
                                  <td className="py-2 px-4">
                                    {income.ecategory}
                                  </td>
                                  <td className="py-2 px-4">
                                    {income.eamount}
                                  </td>
                                </tr>
                              )
                          )
                      )}
                    </tbody>
                  </table>

                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                      <tr>
                        <th className="py-3 px-4 text-left">Navn</th>
                        <th className="py-3 px-4 text-left">Note</th>
                        <th className="py-3 px-4 text-left">Kategori</th>
                        <th className="py-3 px-4 text-left">Beløb</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(monthExpenseData).map(
                        ([monthId, expenses]) =>
                          expenses.map(
                            (expense) =>
                              expense.eyear === Number(year) && (
                                <tr key={expense.id} className="border-b">
                                  <td className="py-2 px-4">
                                    {expense.ename} : ID{" "}
                                    {expense.monthEconomyId}
                                  </td>
                                  <td className="py-2 px-4">{expense.enote}</td>
                                  <td className="py-2 px-4">
                                    {expense.ecategory}
                                  </td>
                                  <td className="py-2 px-4">
                                    {expense.eamount}
                                  </td>
                                </tr>
                              )
                          )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
      </div>

      <h1>sdf</h1>
      {/* <Expenses></Expenses> */}
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
