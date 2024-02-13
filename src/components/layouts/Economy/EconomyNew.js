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

import SimpleBarChart from "../../figures/SimpleBarChart.js";
import SimpleBarChartMonth from "../../figures/SimpleBarChartMonth.js";

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

  const [addYear, setAddYear] = useState();

  const user = localStorage.getItem("userName");

  const addNewYear = async () => {
    // Fjernet year parameter, da det ikke blev brugt korrekt
    try {
      const year = addYear; // Bruger addYear tilstand
      const userId = localStorage.getItem("userId");
      const newYear = await fetch(`${serverurl}/new/year/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ monthYear: year, userId: userId }), // Rettede key til 'monthYear' for at matche backend
      });
      const newYearData = await newYear.json();
      if (newYear.ok) {
        window.location.reload(); 
      } else {
        window.location.reload(); 
      }
    } catch (error) {
      console.error("Error adding new year:", error);
    }
  };

  useEffect(() => {
    const yearObejects = async () => {
      try {
        //Get Months
        const userId = localStorage.getItem("userId");
        const response = await fetch(`${serverurl}/get/months/${userId}`);
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
      //console.log("Data loaded", monthByYear);
      //console.log("frontend", Object.entries(monthByYear));
    }

    yearObejects();
  }, [incomeLoaded, expensesLoaded]);

  const getYearlyIncome = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const yearlyIncome = await fetch(
        `${serverurl}/get/allmonths/income/${userId}`
      );
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
          /* console.log(
            "newMonthByYear",
            newMonthByYear[year].incomes[category].items.id,
            income.id
          ); */
          // Tilføj indkomst til items og opdater total for kategorien.
          if (income.id) {
            // Tjek om indkomsten allerede findes baseret på id
            const exists = newMonthByYear[year].incomes[category].items.some(
              (item) => item.id === income.id
            );

            // Hvis den ikke findes, tilføj den til items
            if (!exists) {
              newMonthByYear[year].incomes[category].items.push(income);
              newMonthByYear[year].incomes[category].total +=
                parseFloat(eamount);

              // Opdater det samlede indkomstbeløb for året.
              newMonthByYear[year].yearlyIncomes += parseFloat(eamount);
            }
          }
        });

        //console.log("Updated monthByYear with incomes:", newMonthByYear);
        return newMonthByYear; // Returnerer den opdaterede tilstand.
      });

      setIncomeLoaded(true);
    } catch (error) {
      console.error("Error fetching income dat a:", error);
    }
  };

  const getYearlyExpenses = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const yearlyExpense = await fetch(
        `${serverurl}/get/allmonths/expense/${userId}`
      );
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

          if (expense.id) {
            // Tjek om indkomsten allerede findes baseret på id
            const exists = newMonthByYear[year].expenses[category].items.some(
              (item) => item.id === expense.id
            );

            // Hvis den ikke findes, tilføj den til items
            if (!exists) {
              newMonthByYear[year].expenses[category].items.push(expense);
              //newMonthByYear[year].expenses[category].items.push(expense);
              newMonthByYear[year].expenses[category].total +=
                parseFloat(eamount);

              // Opdater det samlede udgiftsbeløb for året.
              newMonthByYear[year].yearlyExpenses += parseFloat(eamount);
            }
          }
        });

        //console.log("Updated monthByYear with expenses:", newMonthByYear);
        return newMonthByYear; // Returnerer den opdaterede tilstand.
      });

      setExpensesLoaded(true);
    } catch (error) {
      console.error("Error fetching expense data:", error);
    }
  };

  const [checkedMonths, setCheckedMonths] = useState([]);
  const [monthIncome, setMonthIncome] = useState([]);
  const [monthExpense, setMonthExpense] = useState([]);

  const handleCheckboxChange = (month, isChecked) => {
    if (isChecked) {
      setCheckedMonths((prev) => [
        ...prev,
        { id: month.id, name: month.monthName, myear: month.monthYear },
      ]);

      const myear = month.monthYear;
      const mmonth = month.id;
      console.log(monthByYear);
      console.log(
        `helloo ${myear} , ${mmonth}`,
        monthByYear[myear].expenses,
        monthByYear[myear].expenses.items
      );
      //console.log("arr", Object.entries(monthByYear[myear].expenses));
      // For each expense - same month - tilføj til ul
      let matchingExpense = [];
      let matchingIncome = [];

      //Expense
      Object.entries(monthByYear[myear].expenses).forEach((expense) => {
        const expenses = expense[1].items;
        if (expenses) {
          expenses.forEach((item) => {
            if (item.monthEconomyId == mmonth) {
              matchingExpense.push(item); // Tilføj item til det midlertidige array, hvis det matcher
            }
          });
        }
      });

      Object.entries(monthByYear[myear].incomes).forEach((income) => {
        const incomes = income[1].items;
        if (incomes) {
          incomes.forEach((item) => {
            if (item.monthEconomyId == mmonth) {
              matchingIncome.push(item); // Tilføj item til det midlertidige array, hvis det matcher
            }
          });
        }
      });

      setMonthExpense((prev) => [...prev, ...matchingExpense]);
      setMonthIncome((prev) => [...prev, ...matchingIncome]);
    } else {
      // Fjern items der matcher den unchecked måned
      setMonthExpense((prev) =>
        prev.filter((item) => item.monthEconomyId !== month.id)
      );

      setMonthIncome((prev) =>
        prev.filter((item) => item.monthEconomyId !== month.id)
      );

      // Fjern måneden fra checkedMonths
      setCheckedMonths((prev) =>
        prev.filter((monthDetail) => monthDetail.id !== month.id)
      );
    }
  };

  // Log når checkedMonths ændres
  useEffect(() => {
    console.log(checkedMonths);
  }, [checkedMonths, monthExpense]);


    /* -------------------------------------------------------------------------- */
  /*                                 POST Expense                                */
  /* -------------------------------------------------------------------------- */

  const postExpense = async (year) => {
   
    try {
      const userId = localStorage.getItem("userId");
      const res = await fetch(`${serverurl}/post/expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          monthEconomyId: expenseMonth,
          eyear: year,
          ename: expenseName,
          enote: expenseNote,
          etype: 2,
          ecategory: expenseCategory,
          eamount: expenseAmount,
          userId: localStorage.getItem("userId"),
        }),
      });
      if (res.ok) {
        setExSuccess(true);
        setTimeout(() => {
          setExSuccess(false);
        }, 2000);
      }
      const response = await res.json();
      console.log(response);
    } catch (error) { 
      console.log(error);
    }
  };

  const [exSuccess, setExSuccess] = useState(false);
  const [expenseMonth, setExpenseMonth] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseNote, setExpenseNote] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");


/* -------------------------------------------------------------------------- */
/*                                 POST INCOME                                */
/* -------------------------------------------------------------------------- */

  const postIncome = async (year) => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await fetch(`${serverurl}/post/income`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          monthEconomyId: incomeMonth,
          eyear: year,
          ename: incomeName,
          enote: incomeNote,
          etype: 2,
          ecategory: incomeCategory,
          eamount: incomeAmount,
          userId: userId,
        }),
      });
      if (res.ok) {
        setIncSuccess(true);
        setTimeout(() => {
          setIncSuccess(false);
        }, 2000);
      }
      const response = await res.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  
  const [incomeMonth, setIncomeMonth] = useState("");
  const [incomeName, setIncomeName] = useState("");
  const [incomeNote, setIncomeNote] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incSuccess, setIncSuccess] = useState(false);

  return (
    <div className="bg-gray-900 min-h-screen">
      

      {dataLoaded === false ? (
        <h1>Loading...</h1>
      ) : (
        <>
        <div className="bg-green-900 p-4 bg-opacity-50 pt-6">
          <h1 className="text-gray-100 text-3xl mb-6">
            Hi <b className="text-green-400">{user}!</b> welcome to your
            Economydata <br /> Start by adding a year
          </h1>
          <div className="grid place-content-center">
            <div className="flex gap-8">
              <input
                  type="text"
                  value={addYear}
                  onChange={(e) => setAddYear(e.target.value)}
                  placeholder="Indtast år"
                />
              <button onClick={addNewYear} className="m-auto bg-green-700 ">
                Add Year
              </button>
            </div>
          </div>
        </div>
          {Object.entries(monthByYear).map(([year, yearData]) => {
            return (
              <div
                key={year}
                className="text-white bg-gray-700 p-4 m-4 rounded-2xl"
              >
                <h2 className="text-6xl my-12">{year} </h2>
<h2 className="bg-gray-800 p-4">Here you can add your expense/income fast. Refresh the page to see the changes when done</h2>
{/* -------------------------------------------------------------------------- */}
{/*                                 ADD EXPENSE                                */}
{/* -------------------------------------------------------------------------- */}
               <div className="bg-gray-800 pb-8">
                    {
                      exSuccess ? (<h2 className="bg-green-600 mx-4">Expense added</h2>) : null
                    }
                  <div className="text-gray-900 flex gap-4 bg-gray-700 p-4 mx-4">
                  <label className="flex flex-col text-gray-100">
                    Måned
                    <select
                      className="mt-1 p-2 border text-gray-900 border-gray-300 rounded"
                      value={expenseMonth}
                      onChange={(e) => setExpenseMonth(e.target.value)}
                    >
                      <option value="">Vælg Måned</option>
                      {yearData.months.map((month) => (
                        <option key={month.id} value={month.id}>
                          {month.monthName}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col text-gray-100">
                    Navn
                    <input
                      className="mt-1 p-2 border border-gray-300 text-gray-900 rounded"
                      type="text"
                      value={expenseName}
                      onChange={(e) => setExpenseName(e.target.value)}
                    />
                  </label>
                  <label className="flex flex-col text-gray-100">
                    Note
                    <input
                      className="mt-1 p-2 border text-gray-900 border-gray-300 rounded"
                      type="text"
                      value={expenseNote}
                      onChange={(e) => setExpenseNote(e.target.value)}
                    />
                  </label>
                  <label className="flex flex-col text-gray-100">
                    Kategori
                    <select
                      className="mt-1 p-2 border text-gray-900 border-gray-300 rounded"
                      onChange={(e) => setExpenseCategory(e.target.value)}
                    >
                      <option value="">Vælg Kategori</option>
                      {expenseCategories.map((category) => (
                        <option value={category.category}>
                          {category.category}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col text-gray-100">
                    Beløb
                    <input
                      className="mt-1 p-2 border border-gray-300 text-gray-900 rounded"
                      type="number"
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                    />
                  </label>
                  <button className="mt-4 bg-green-800" onClick={() => postExpense(year)}>
                    Tilføj Udgift
                  </button>
                 
                </div>
  
  {/* -------------------------------------------------------------------------- */}
  {/*                                  ADD INCOME                                */}
  {/* -------------------------------------------------------------------------- */}
  {
    incSuccess ? (<h2 className="bg-green-600 mx-4 mt-4">Income added</h2>) : null
  }
                  <div className="text-gray-900 flex gap-4 bg-gray-600 p-4 mx-4">
                  <label className="flex flex-col text-gray-100">
                    Måned
                    <select
                      className="mt-1 p-2 border text-gray-900 border-gray-300 rounded"
                      value={incomeMonth}
                      onChange={(e) => setIncomeMonth(e.target.value)}
                    >
                      <option value="">Vælg Måned</option>
                      {yearData.months.map((month) => (
                        <option key={month.id} value={month.id}>
                          {month.monthName}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col text-gray-100">
                    Navn
                    <input
                      className="mt-1 p-2 border border-gray-300 text-gray-900 rounded"
                      type="text"
                      value={incomeName}
                      onChange={(e) => setIncomeName(e.target.value)}
                    />
                  </label>
                  <label className="flex flex-col text-gray-100">
                    Note
                    <input
                      className="mt-1 p-2 border text-gray-900 border-gray-300 rounded"
                      type="text"
                      value={incomeNote}
                      onChange={(e) => setIncomeNote(e.target.value)}
                    />
                  </label>
                  <label className="flex flex-col text-gray-100">
                    Kategori
                    <select
                      className="mt-1 p-2 border text-gray-900 border-gray-300 rounded"
                      onChange={(e) => setIncomeCategory(e.target.value)}
                    >
                      <option value="">Vælg Kategori</option>
                      {incomeCategories.map((category) => (
                        <option value={category.category}>
                          {category.category}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col text-gray-100">
                    Beløb
                    <input
                      className="mt-1 p-2 border border-gray-300 text-gray-900 rounded"
                      type="number"
                      value={incomeAmount}
                      onChange={(e) => setIncomeAmount(e.target.value)}
                    />
                  </label>
                  <button className="mt-4 bg-green-800" onClick={() => postIncome(year)}>
                    Tilføj Intægt
                  </button>
                </div>
               </div>



                <div className="mb-8">
                    <SimpleBarChart chartData={monthByYear} year={year} /> 
                </div>
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
                                {total.toFixed(0)} 
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
                                {total.toFixed(0)} 
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
                    <h1 className="text-2xl bg-gray-200 text-gray-700 p-4">
                      INCOME
                    </h1>
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
                                      {category} {/* (Total: {total}) */}
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
                    <h1 className="text-2xl bg-gray-200 text-gray-700 p-4">
                      EXPENSE
                    </h1>
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
                                      {category}{/*  (Total: {total}) */}
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
                <h1 className="text-2xl my-6">
                  Se indkomst for individuelle mdr.
                </h1>
                {
                  <>
                    <ul className=" p-8 grid grid-cols-6 gap-4">
                      {yearData.months.map((month, index) => (
                        <li
                          key={index}
                          className="bg-gray-400 text-gray-700 p-4 flex items-center justify-between"
                        >
                          <span>{month.monthName}</span>
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            onChange={(e) =>
                              handleCheckboxChange(month, e.target.checked)
                            }
                          />
                        </li>
                      ))}
                    </ul>

                    {monthExpense.length > 0 || monthIncome.length > 0 ? (
                      <SimpleBarChartMonth
                        monthIncome={monthIncome}
                        monthExpense={monthExpense}
                      />
                    ) : null}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="max-h-[32em] overflow-scroll">
                        {monthExpense.length > 0 ? (
                          <>
                            <h1 className="text-2xl bg-gray-200 text-gray-700 p-4">
                              INCOME
                            </h1>
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
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
                                    Category
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Amount
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    ID
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {monthExpense.map((expense, index) => (
                                  <tr
                                    key={expense.id}
                                    className={
                                      index % 2 === 0
                                        ? "bg-white"
                                        : "bg-gray-50"
                                    }
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {expense.ename}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {expense.ecategory}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {expense.eamount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {expense.id}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </>
                        ) : null}
                      </div>

                      <div className="max-h-[32em] overflow-scroll">
                        {monthIncome.length > 0 ? (
                          <>
                            <h1 className="text-2xl bg-gray-200 text-gray-700 p-4">
                              EXPENSE
                            </h1>
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
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
                                    Category
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Amount
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    ID
                                  </th>
                                </tr>
                              </thead>

                              <tbody className="bg-white divide-y divide-gray-200">
                                {monthIncome.map((income, index) => (
                                  <tr
                                    key={income.id}
                                    className={
                                      index % 2 === 0
                                        ? "bg-white"
                                        : "bg-gray-50"
                                    }
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {income.ename}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {income.ecategory}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {income.eamount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {income.id}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </>
                }
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default EconomyNew;
