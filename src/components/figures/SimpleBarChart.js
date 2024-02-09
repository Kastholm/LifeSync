import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function SimpleBarChart(props) {
  const { chartData, year } = props;

  function getIncomeChartData(chartYear, data) {
    const thisYear = data[chartYear];

    if (!thisYear) return [];

    const incomes = thisYear.incomes;

    const categories = Object.keys(thisYear.incomes);

    return categories.map((category) => {
      console.log(
        "total",
        thisYear.incomes[category].items.ename,
        thisYear.incomes[category].total
      );
      console.log("cat gory ", category);

      const total = thisYear.incomes[category].total;

      return {
        name: category,
        Amount: total, // To decimaler for præcision
        amt: 10000,
      };
    });
  }
  const dataForChartIncome = getIncomeChartData(year, chartData);

  function getExpenseChartData(chartYear, data) {
    const thisYear = data[chartYear];

    if (!thisYear) return [];
    const categories = Object.keys(thisYear.expenses);

    return categories.map((category) => {
      const total = thisYear.expenses[category].total;

      return {
        name: category,
        Amount: total, // To decimaler for præcision
        amt: 10000,
      };
    });
  }
  const dataForChartExpense = getExpenseChartData(year, chartData);

  const CustomTick = (props) => {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  // Returnér JSX-koden for BarChart ved at bruge dataForChart
  return (
    //Income chart
    <div className="grid grid-cols-2 h-[35em] py-5">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={dataForChartIncome}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" height={120} angle={-45} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Amount"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={dataForChartExpense}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" height={120} angle={-45} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Amount"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SimpleBarChart;
