import React from "react";
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

function SimpleBarChartMonth(props) {
  const { monthIncome, monthExpense } = props;

  function getChartData(data) {
    const categoryTotals = data.reduce((acc, curr) => {
      const { ecategory, eamount } = curr;
      if (!acc[ecategory]) {
        acc[ecategory] = { total: 0 };
      }
      acc[ecategory].total += parseFloat(eamount); // Antager eamount er et tal
      return acc;
    }, {});

    return Object.entries(categoryTotals).map(([category, { total }]) => ({
      name: category,
      Amount: total,
      amt: 10000, // Static value, adjust if needed
    }));
  }

  const dataForChartIncome = getChartData(monthIncome);
  const dataForChartExpense = getChartData(monthExpense);

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

  // Return JSX-koden for BarChart ved at bruge dataForChart
  return (
    <div className="grid grid-cols-2 h-[35em] py-5">
      {/* Income Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            fill="#82ca9d"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Expense Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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

export default SimpleBarChartMonth;
