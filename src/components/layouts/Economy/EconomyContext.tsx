import React, { createContext, useEffect, useState } from "react";

// Definerer typen for den data, vi forventer i contexten
interface EconomyContextType {
  monthData: MonthData[];
  getMonths: () => void;

  incomeData: IncomeData[];
  getMonthIncome: () => void;
  incomeYearData: IncomeData[];
  getYearIncome: () => void;

  incomeCategories: any;

  expenseData: IncomeData[];
  getMonthExpense: () => void;
  expenseYearData: IncomeData[];
  getYearExpense: () => void;

  expenseCategories: any;

  selectedMonth: string;
}
// Definerer en standardværdi
const defaultEconomyContextValue: EconomyContextType = {
  monthData: [],
  getMonths: () => {},

  incomeData: [],
  getMonthIncome: () => {},
  incomeYearData: [],
  getYearIncome: () => {},

  incomeCategories: [],

  expenseData: [],
  getMonthExpense: () => {},
  expenseYearData: [],
  getYearExpense: () => {},

  expenseCategories: [],

  selectedMonth: "",
};

export type MonthData = {
  id: number;
  monthName: string;
  monthYear: number;
};

export type IncomeData = {
  id: number;
  monthEconomyId: number;
  ename: string;
  enote?: string;
  ecategory?: number;
  etype?: number;
  eyear?: number;
  eamount?: number;
};

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
  { category: "Salg", fonticon: "tags", bgColor: "from-pink-500 to-pink-300" },
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
  { category: "Bolig", fonticon: "home", bgColor: "from-blue-500 to-blue-300" },
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

export const EconomyContext = createContext<EconomyContextType>(
  defaultEconomyContextValue
);

export function EconomyProvider({ children }) {
  const [monthData, setMonthData] = useState<MonthData[]>([]);

  const [incomeData, setIncomeData] = useState<IncomeData[]>([]);
  const [incomeYearData, setYearIncomeData] = useState<IncomeData[]>([]);

  const [expenseData, setExpenseData] = useState<IncomeData[]>([]);
  const [expenseYearData, setYearExpenseData] = useState<IncomeData[]>([]);

  const [selectedMonth, setSelectedMonth] = useState<string>("");

  // Api GET der indhenter et helt års inkomst data

  // GET MONTHS

  const localUser = localStorage.getItem("user");

  console.log("user is", localUser);

  const getMonths = (): Promise<MonthData[]> => {
    const localUser = localStorage.getItem("user");

    let url = "";
    if (localUser === "Kastholm95") {
      url = "http://localhost:3001/get/months";
    } else if (localUser === "fredWard") {
      url = "http://localhost:3001/get/months/fred";
    } else {
      // Hvis brugeren ikke er en af de forventede, returneres et tomt array
      return Promise.resolve([]);
    }

    return fetch(url)
      .then((res) => res.json() as Promise<MonthData[]>)
      .then((data: MonthData[]) => {
        setMonthData(data);
        return data;
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
  };

  // GET Income from a specific Month
  // Types Klarer vi i frontenden
  const getMonthIncome = (monthEconomyId, year): Promise<IncomeData[]> => {
    setSelectedMonth(year);
    const localUser = localStorage.getItem("user");

    let url = "";
    if (localUser === "Kastholm95") {
      url = `http://localhost:3001/get/months/${monthEconomyId}/income`;
    } else if (localUser === "fredWard") {
      url = `http://localhost:3001/get/months/${monthEconomyId}/income/fred`;
    } else {
      // Hvis brugeren ikke er en af de forventede, returneres et tomt array
      return Promise.resolve([]);
    }

    return fetch(url)
      .then((res) => res.json())
      .then((data: IncomeData[]) => {
        setIncomeData(data);
        return data;
      })
      .catch((err: any) => {
        console.log(err);
        return [];
      });
  };

  const getYearIncome = (eyear): Promise<IncomeData[]> => {
    //setSelectedYear(eyear);
    const localUser = localStorage.getItem("user");

    let url = "";
    if (localUser === "Kastholm95") {
      url = `http://localhost:3001/get/allmonths/${eyear}/income`;
    } else if (localUser === "fredWard") {
      url = `http://localhost:3001/get/allmonths/${eyear}/income/fred`;
    } else {
      // Hvis brugeren ikke er en af de forventede, returneres et tomt array
      return Promise.resolve([]);
    }

    return fetch(url)
      .then((res) => res.json())
      .then((data: IncomeData[]) => {
        setYearIncomeData(data);
        return data;
      })
      .catch((err: any) => {
        console.log(err);
        return [];
      });
  };

  // GET Income from a specific Month
  const getMonthExpense = (monthEconomyId, year): Promise<IncomeData[]> => {
    setSelectedMonth(year);

    const localUser = localStorage.getItem("user");

    let url = "";
    if (localUser === "Kastholm95") {
      url = `http://localhost:3001/get/months/${monthEconomyId}/expense`;
    } else if (localUser === "fredWard") {
      url = `http://localhost:3001/get/months/${monthEconomyId}/expense/fred`;
    } else {
      // Hvis brugeren ikke er en af de forventede, returneres et tomt array
      return Promise.resolve([]);
    }

    return fetch(url)
      .then((res) => res.json())
      .then((data: IncomeData[]) => {
        setIncomeData(data);
        return data;
      })
      .catch((err: any) => {
        console.log(err);
        return [];
      });
  };

  const getYearExpense = (eyear): Promise<IncomeData[]> => {
    const localUser = localStorage.getItem("user");

    let url = "";
    if (localUser === "Kastholm95") {
      url = `http://localhost:3001/get/allmonths/${eyear}/expense`;
    } else if (localUser === "fredWard") {
      url = `http://localhost:3001/get/allmonths/${eyear}/expense/fred`;
    } else {
      // Hvis brugeren ikke er en af de forventede, returneres et tomt array
      return Promise.resolve([]);
    }

    return fetch(url)
      .then((res) => res.json())
      .then((data: IncomeData[]) => {
        setYearExpenseData(data);
        return data;
      })
      .catch((err: any) => {
        console.log(err);
        return [];
      });
  };

  //EXPORT Context
  const economyExport = {
    monthData,
    getMonths,

    incomeData,
    getMonthIncome,
    incomeYearData,
    getYearIncome,
    incomeCategories,

    expenseData,
    getMonthExpense,
    expenseYearData,
    getYearExpense,
    expenseCategories,

    selectedMonth,
  };
  return (
    <EconomyContext.Provider value={economyExport}>
      {children}
    </EconomyContext.Provider>
  );
}
