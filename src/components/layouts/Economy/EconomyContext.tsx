import React, { createContext, useEffect, useState } from "react";

// Definerer typen for den data, vi forventer i contexten
interface EconomyContextType {
  monthData: MonthData[];
  getMonths: () => void;
  incomeData: IncomeData[];
  getIncome: () => void;
  expenseData: IncomeData[];
  getExpense: () => void;
  selectedMonth: string;
  getFullIncome: () => void;
}
// Definerer en standardværdi
const defaultEconomyContextValue: EconomyContextType = {
  monthData: [],
  getMonths: () => {},
  incomeData: [],
  getIncome: () => {},
  expenseData: [],
  getExpense: () => {},
  selectedMonth: "",
  getFullIncome: () => {},
};
export type MonthData = {
  id: number;
  monthName: string;
  monthYear: number;
};

export type IncomeData = [
  id: number,
  RefId: number,
  ename: string,
  enote?: string,
  ecategory?: number,
  etype?: number,
  eyear?: number,
  eamount?: number
];

export const EconomyContext = createContext<EconomyContextType>(
  defaultEconomyContextValue
);

export function EconomyProvider({ children }) {
  const [monthData, setMonthData] = useState<MonthData[]>([]);
  const [incomeData, setIncomeData] = useState<IncomeData[]>([]);
  const [expenseData, setExpenseData] = useState<IncomeData[]>([]);

  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const [incomeFullData, setFullIncomeData] = useState<IncomeData[]>([]);

  // GET MONTHS
  const getMonths = (): Promise<MonthData[]> => {
    return fetch("http://localhost:3001/get/months")
      .then((res) => res.json() as Promise<MonthData[]>)
      .then((data: MonthData[]) => {
        setMonthData(data);
        return data;
      })
      .catch((err: any) => {
        console.log(err);
        return [];
      });
  };

  // GET Income from a specific Month
  // Types Klarer vi i frontenden
  const getIncome = (monthEconomyId, year): Promise<IncomeData[]> => {
    setSelectedMonth(year);
    return fetch(`http://localhost:3001/get/months/${monthEconomyId}/income`)
      .then((res) => res.json())
      .then((data: IncomeData[]) => {
        setIncomeData(data);
        console.log("income data hentet", data);
        console.log(incomeData);
        return data;
      })
      .catch((err: any) => {
        console.log(err);
        return [];
      });
  };

  const getFullIncome = (eyear): Promise<IncomeData[]> => {
    //setSelectedYear(eyear);
    return fetch(`http://localhost:3001/get/allmonths/${eyear}/income`)
      .then((res) => res.json())
      .then((data: IncomeData[]) => {
        setFullIncomeData(data);
        console.log("year cho", eyear);
        console.log("Full income data hentet", data);
        return data;
      })
      .catch((err: any) => {
        console.log(err);
        return [];
      });
  };

  // GET Income from a specific Month
  // Types Klarer vi i frontenden
  const getExpense = (): Promise<IncomeData[]> => {
    return fetch(`http://localhost:3001/get/months/expense`)
      .then((res) => res.json())
      .then((data: IncomeData[]) => {
        setExpenseData(data);
        //console.log('income data hentet', data)
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
    getIncome,
    expenseData,
    getExpense,
    selectedMonth,
    getFullIncome,
    incomeFullData,
  };
  return (
    <EconomyContext.Provider value={economyExport}>
      {children}
    </EconomyContext.Provider>
  );
}
