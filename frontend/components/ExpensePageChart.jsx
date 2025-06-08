
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


const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 10);
};

const ExpenseChart = ({ expenses }) => {
  

    const expenseArray = Array.isArray(expenses) ? expenses : [];
    

    const data = useMemo(() => {
        const grouped = expenseArray.reduce((acc, curr) => {
            const rawDate = curr.date || curr.createdAt;
            if (!rawDate) {
                console.log('No raw date found for:', curr);
                return acc;
            }

            const date = formatDate(rawDate);
            if (!date) {
                console.log('Invalid formatted date for:', rawDate);
                return acc;
            }

            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += curr.amount;
            return acc;
        }, {});

        const finalData = Object.entries(grouped).map(([date, amount]) => ({ date, amount }));
    
        return finalData;
    }, [expenseArray]);


    if (data.length === 0) return <p>No expense data available.</p>;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `₹${value}`} />
                <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                <Bar
                    dataKey="amount"
                    fill="#ef4444"
                    radius={[6, 6, 0, 0]}
                    barSize={24}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ExpenseChart;
