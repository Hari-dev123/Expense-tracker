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

const mockIncomeData = [
    { source: 'Salary', amount: 60000 },
    { source: 'Freelance', amount: 12000 },
    { source: 'Investments', amount: 8000 },
    { source: 'Bonus', amount: 5000 },
    { source: 'Other', amount: 2500 },
];

const IncomeBarChart = ({ incomeData = mockIncomeData }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-lg w-full h-full flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Income Distribution by Source</h2>
            {incomeData && incomeData.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={incomeData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
                        <XAxis
                            dataKey="source"
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            axisLine={{ stroke: '#d1d5db' }}
                            tickLine={{ stroke: '#d1d5db' }}
                        />
                        <YAxis
                            tickFormatter={(value) => `₹${value}`}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            axisLine={{ stroke: '#d1d5db' }}
                            tickLine={{ stroke: '#d1d5db' }}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(34, 197, 94, 0.1)' }}
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                padding: '10px',
                                fontFamily: 'Inter, sans-serif'
                            }}
                            labelStyle={{ color: '#4b5563', fontWeight: 'bold' }}
                            itemStyle={{ color: '#22C55E' }}
                            formatter={(value) => [`₹${value}`, 'Amount']}
                        />
                        <Bar
                            dataKey="amount"
                            fill="#22C55E"
                            radius={[8, 8, 0, 0]}
                            barSize={30}
                        />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex flex-grow justify-center items-center">
                    <p className="text-gray-500">No income data available to display.</p>
                </div>
            )}
        </div>
    );
};

export default IncomeBarChart;
