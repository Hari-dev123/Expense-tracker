import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const FinancialOverviewChart = ({ totalBalance, totalIncome, totalExpense }) => {
    const data = [
        { name: "Total Balance", value: totalBalance },
        { name: "Total Expenses", value: totalExpense },
        { name: "Total Income", value: totalIncome },
    ];

    const COLORS = ["#7C3AED", "red", "green"]; // purple, red, green

    return (
        <div className="bg-white rounded-lg p-6 shadow-md relative">
            <h2 className="text-lg font-semibold mb-4">Financial Overview</h2>
            <div className="relative h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value, name) => [`$${value}`, name]}
                            contentStyle={{ borderRadius: "10px" , gap : '10px' }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-sm text-gray-500">Total Balance</p>
                    <p className="text-2xl font-bold text-gray-800">${totalBalance}</p>
                </div>
            </div>
        </div>
    );
};

export default FinancialOverviewChart;
