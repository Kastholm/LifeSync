import React, { useEffect, useState } from "react";
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
import Construction from "../../tools/Construction.js";

function EconomyNew() {
  const serverurl = process.env.REACT_APP_SERVER_URL;

  const incomeCategories = [
    {
      category: "Løn",
      fonticon: "money-bill-1-wave",
      bgColor: "from-green-500 to-green-300",
    },
    {
      category: "Investering",
      fonticon: "chart-line",
      bgColor: "from-purple-500 to-purple-300",
    },
    {
      category: "Salg",
      fonticon: "tags",
      bgColor: "from-pink-500 to-pink-300",
    },
    {
      category: "Gaver & Arv",
      fonticon: "gift",
      bgColor: "from-yellow-500 to-yellow-300",
    },
    {
      category: "Skatte refussioner",
      fonticon: "hand-holding-usd",
      bgColor: "from-indigo-500 to-indigo-300",
    },
    {
      category: "Andet",
      fonticon: "ellipsis-h",
      bgColor: "from-teal-500 to-teal-300",
    },
  ];
  const expenseCategories = [
    {
      category: "Køb",
      fonticon: "shopping-bag",
      bgColor: "from-red-500 to-red-300",
    },
    {
      category: "Transport",
      fonticon: "bus",
      bgColor: "from-orange-500 to-orange-300",
    },
    {
      category: "Mad & Takeaway",
      fonticon: "utensils",
      bgColor: "from-lime-500 to-lime-300",
    },
    {
      category: "Fitness & Sundhed",
      fonticon: "dumbbell",
      bgColor: "from-emerald-500 to-emerald-300",
    },
    {
      category: "Forsikringer",
      fonticon: "shield-alt",
      bgColor: "from-cyan-500 to-cyan-300",
    },
    {
      category: "Bolig",
      fonticon: "home",
      bgColor: "from-blue-500 to-blue-300",
    },
    {
      category: "Underholdning",
      fonticon: "film",
      bgColor: "from-violet-500 to-violet-300",
    },
    {
      category: "Gaver",
      fonticon: "gifts",
      bgColor: "from-fuchsia-500 to-fuchsia-300",
    },
    {
      category: "Software & Apps",
      fonticon: "laptop-code",
      bgColor: "from-gray-500 to-gray-300",
    },
    {
      category: "Opsparing",
      fonticon: "piggy-bank",
      bgColor: "from-amber-500 to-amber-300",
    },
    {
      category: "Mobil & internet",
      fonticon: "mobile-alt",
      bgColor: "from-lime-500 to-lime-300",
    },
    {
      category: "Lån & Afdrag",
      fonticon: "handshake",
      bgColor: "from-orange-500 to-orange-300",
    },
  ];
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

  const [monthData, setMonthData] = useState([]);
  const [monthByYear, setMonthByYear] = useState({});

  const [yearlyIncome, setYearlyIncome] = useState([]);

  const [dataLoaded, setDataLoaded] = useState(false);

  const [incomeLoaded, setIncomeLoaded] = useState(false);
  const [expensesLoaded, setExpensesLoaded] = useState(false);

  const [yearlyExpenses, setYearlyExpenses] = useState(0);
  const [yearlyIncomes, setYearlyIncomes] = useState(0);

  useEffect(() => {
    const yearObejects = async () => {
      try {
        //Get Months
        const response = await fetch(`${serverurl}/get/months`);
        const data = await response.json();
        setMonthData(data);

        // Group by year with months and income
        const monthYears = await data.reduce((acc, month) => {
          const year = month.monthYear;
          if (!acc[year]) {
            acc[year] = {
              months: [],
              yearlyExpenses,
              yearlyIncomes,
              expenses: {
                Køb: { items: [], total: 0 },
                Transport: { items: [], total: 0 },
                "Mad & Takeaway": { items: [], total: 0 },
                "Fitness & Sundhed": { items: [], total: 0 },
                Forsikringer: { items: [], total: 0 },
                Bolig: { items: [], total: 0 },
                Underholdning: { items: [], total: 0 },
                Gaver: { items: [], total: 0 },
                "Software & Apps": { items: [], total: 0 },
                Opsparing: { items: [], total: 0 },
                "Mobil & Internet": { items: [], total: 0 },
                "Lån & Afdrag": { items: [], total: 0 },
              },
              incomes: {
                Løn: { items: [], total: 0 },
                Investering: { items: [], total: 0 },
                Salg: { items: [], total: 0 },
                "Gaver & Arv": { items: [], total: 0 },
                "Skatte reduktioner": { items: [], total: 0 },
                Andet: { items: [], total: 0 },
              },
            };
          }
          acc[year].months.push(month);
          return acc;
        }, {});
        setMonthByYear(monthYears);

        await Promise.all([
          getYearlyIncome(() => {}),
          getYearlyExpenses(() => {}),
        ]);
      } catch (error) {
        console.error("Error fetching m onths:", error);
      }
    };

    if (incomeLoaded && expensesLoaded) {
      setDataLoaded(true);
      console.log("Data loaded", monthByYear);
      console.log("frontend", Object.entries(monthByYear));
    }

    yearObejects();
  }, [incomeLoaded, expensesLoaded]);

  const getYearlyIncome = async () => {
    try {
      const yearlyIncome = await fetch(`${serverurl}/get/allmonths/income`);
      const incomeData = await yearlyIncome.json();

      setMonthByYear((prev) => {
        const newMonthByYear = { ...prev };

        incomeData.forEach((income) => {
          const { eyear: year, ecategory: category, eamount } = income;

          // Opret år og kategori, hvis de ikke eksisterer.
          if (!newMonthByYear[year]) {
            newMonthByYear[year] = {
              months: [],
              expenses: {}, // Dette skal være et objekt, ikke et array.
              incomes: {},
              yearlyIncomes: 0,
              yearlyExpenses: 0,
            };
          }

          if (!newMonthByYear[year].incomes[category]) {
            newMonthByYear[year].incomes[category] = { items: [], total: 0 };
          }

          // Tilføj indkomst til items og opdater total for kategorien.
          newMonthByYear[year].incomes[category].items.push(income);
          newMonthByYear[year].incomes[category].total += parseFloat(eamount);

          // Opdater det samlede indkomstbeløb for året.
          newMonthByYear[year].yearlyIncomes += parseFloat(eamount);
        });

        console.log("Updated monthByYear with incomes:", newMonthByYear);
        return newMonthByYear; // Returnerer den opdaterede tilstand.
      });

      setIncomeLoaded(true);
    } catch (error) {
      console.error("Error fetching income data:", error);
    }
  };

  const getYearlyExpenses = async () => {
    try {
      const yearlyExpense = await fetch(`${serverurl}/get/allmonths/expense`);
      const expenseData = await yearlyExpense.json();

      setMonthByYear((prev) => {
        const newMonthByYear = { ...prev };

        expenseData.forEach((expense) => {
          const { eyear: year, ecategory: category, eamount } = expense;

          if (!newMonthByYear[year]) {
            newMonthByYear[year] = {
              months: [],
              expenses: {},
              incomes: {},
              yearlyIncomes: 0,
              yearlyExpenses: 0,
            };
          }
          if (!newMonthByYear[year].expenses[category]) {
            newMonthByYear[year].expenses[category] = { items: [], total: 0 };
          }

          // Tilføj udgiften til items-arrayet for den pågældende kategori og opdater total.
          newMonthByYear[year].expenses[category].items.push(expense);
          newMonthByYear[year].expenses[category].total += parseFloat(eamount);

          // Opdater det samlede udgiftsbeløb for året.
          newMonthByYear[year].yearlyExpenses += parseFloat(eamount);
        });

        console.log("Updated monthByYear with expenses:", newMonthByYear);
        return newMonthByYear; // Returnerer den opdaterede tilstand.
      });

      setExpensesLoaded(true);
    } catch (error) {
      console.error("Error fetching expense data:", error);
    }
  };

  return (
    <div>
      <Construction />
      {dataLoaded === false ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {Object.entries(monthByYear).map(([year, yearData]) => {
            return (
              <div key={year} className="text-white">
                <h2 className="text-4xl my-12">{year} </h2>

                <div className="grid grid-cols-6 gap-6">
                  {Object.entries(yearData.incomes).map(
                    ([category, { items, total }], index) => {
                      const matchedCategory = incomeCategories.find(
                        (incomeCategory) => incomeCategory.category === category
                      );

                      if (!matchedCategory) {
                        return null;
                      }

                      const { bgColor, fonticon } = matchedCategory;

                      // Hent ikonkomponenten fra iconMapping-objektet baseret på fonticon-værdien
                      const IconComponent = iconMapping[fonticon];

                      // Opret klasser for baggrundsfarve
                      const bgColorClass = `bg-gradient-to-tr ${bgColor} bg-clip-border`;

                      return (
                        <div key={index}>
                          <div className="relative flex flex-col bg-clip-border rounded-xl shadow-md shadow-gray-500/20 bg-gray-800 border border-gray-700">
                            <div
                              className={`${bgColorClass} mx-4 rounded-xl overflow-hidden text-gray-100 absolute -mt-4 grid h-16 w-16 place-items-center`}
                            >
                              {/* Brug IconComponent som en komponent */}
                              <FontAwesomeIcon
                                icon={IconComponent}
                                className="text-3xl text-gray-100"
                              />
                            </div>
                            <div className="p-4 text-right">
                              <p className="block antialiased text-sm leading-normal font-normal text-gray-100">
                                {category}
                              </p>
                              <h4 className="block antialiased tracking-normal text-2xl font-semibold leading-snug text-gray-100">
                                {total.toFixed(0)} KR.
                              </h4>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>

                <div className="grid grid-cols-6 gap-6 my-12">
                  {Object.entries(yearData.expenses).map(
                    ([category, { items, total }], index) => {
                      const matchedCategory = expenseCategories.find(
                        (expenseCategory) =>
                          expenseCategory.category === category
                      );

                      if (!matchedCategory) {
                        return null;
                      }

                      const { bgColor, fonticon } = matchedCategory;

                      // Hent ikonkomponenten fra iconMapping-objektet baseret på fonticon-værdien
                      const IconComponent = iconMapping[fonticon];

                      // Opret klasser for baggrundsfarve
                      const bgColorClass = `bg-gradient-to-tr ${bgColor} bg-clip-border`;

                      return (
                        <div key={index}>
                          <div className="relative flex flex-col bg-clip-border rounded-xl shadow-md shadow-gray-500/20 bg-gray-800 border border-gray-700">
                            <div
                              className={`${bgColorClass} mx-4 rounded-xl overflow-hidden text-gray-100 absolute -mt-4 grid h-16 w-16 place-items-center`}
                            >
                              {/* Brug IconComponent som en komponent */}
                              <FontAwesomeIcon
                                icon={IconComponent}
                                className="text-3xl text-gray-100"
                              />
                            </div>
                            <div className="p-4 text-right">
                              <p className="block antialiased text-sm leading-normal font-normal text-gray-100">
                                {category}
                              </p>
                              <h4 className="block antialiased tracking-normal text-2xl font-semibold leading-snug text-gray-100">
                                {total.toFixed(0)} KR.
                              </h4>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className=" max-h-[32em] overflow-scroll">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Category
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(yearData.incomes).map(
                          ([category, { items, total }], index) => (
                            <React.Fragment key={index}>
                              {items.map((income, index) => (
                                <tr
                                  key={`${category}-${index}`}
                                  className={
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                  }
                                >
                                  {index === 0 && (
                                    <td
                                      rowSpan={items.length}
                                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                    >
                                      {category} (Total: {total})
                                    </td>
                                  )}
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {income.ename}
                                    {income.id}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {income.eamount}
                                  </td>
                                </tr>
                              ))}
                            </React.Fragment>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className=" max-h-[32em] overflow-scroll">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 ">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Category
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(yearData.expenses).map(
                          ([category, { items, total }], index) => (
                            <React.Fragment key={index}>
                              {items.map((expense, index) => (
                                <tr
                                  key={`${category}-${index}`}
                                  className={
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                  }
                                >
                                  {index === 0 && (
                                    <td
                                      rowSpan={items.length}
                                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 "
                                    >
                                      {category} (Total: {total})
                                    </td>
                                  )}
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {expense.ename}
                                    {expense.id}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {expense.eamount}
                                  </td>
                                </tr>
                              ))}
                            </React.Fragment>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* <ul>
                  {months.months.map((month) => {
                    return <li>{month.monthName}</li>;
                  })}
                </ul> */}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default EconomyNew;
