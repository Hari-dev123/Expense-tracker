import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

const ExpenseBarChart = ({ expensesData }) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-4">Expense Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={expensesData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
                    barCategoryGap={20} // controls space between bars
                >
                    <CartesianGrid strokeDasharray="3" />
                    <XAxis dataKey="category" />
                    <YAxis
                        tickFormatter={(value) => `₹${value}`} // only prefix ₹
                    />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                    <Bar
                        dataKey="amount"
                        fill="#EF4444"
                        radius={[4, 4, 0, 0]}
                        barSize={30} // smaller bar width
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseBarChart;
