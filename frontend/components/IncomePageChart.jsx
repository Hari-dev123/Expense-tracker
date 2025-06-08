import React, { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

// Helper function to format date to YYYY-MM-DD
const formatDate = (dateStr) => {
    if (!dateStr) return ''; // handle null/undefined
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return ''; // invalid date guard
    return d.toISOString().slice(0, 10);
};


const IncomeChart = ({ incomes }) => {
    const incomeArray = Array.isArray(incomes) ? incomes : [];
    const data = useMemo(() => {
        const grouped = incomeArray.reduce((acc, curr) => {
            const rawDate = curr.date || curr.createdAt;
            if (!rawDate) return acc; // skip if no date

            const date = formatDate(rawDate);
            if (!date) return acc; // skip if invalid date

            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += curr.amount;
            return acc;
        }, {});

        return Object.entries(grouped).map(([date, amount]) => ({ date, amount }));
    }, [incomeArray]);


    if (data.length === 0) return <p>No income data available for chart.</p>;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                    tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                <Bar
                    dataKey="amount"
                    fill="green"
                    radius={[6, 6, 0, 0]}
                    barSize={24}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default IncomeChart;
