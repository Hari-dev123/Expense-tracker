// components/IncomeList.jsx
import React from 'react';

const IncomeList = ({ incomes, onEdit, onDelete }) => {
   
 console.log(incomes)
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Transactions</h3>
            <div className="">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Source</th>
                            <th className="px-4 py-2 border-b">Amount (₹)</th>
                            <th className="px-4 py-2 border-b">Date</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomes.map((income,index) => (
                            <tr key={index} className="text-center">
                                <td className="px-4 py-2 border-b">{income.source}</td>
                                <td className="px-4 py-2 border-b">{income.amount}</td>
                                <td className="px-4 py-2 border-b">
                                    {income.date ? new Date(income.date).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="px-4 py-2 border-b space-x-2 space-y-1">
                                    <button
                                        onClick={() => onEdit(income)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(income)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IncomeList;
