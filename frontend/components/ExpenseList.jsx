const ExpenseList = ({ expenses, onEdit, onDelete }) => {
    console.log('from chart',expenses)
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Expenses</h3>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Category</th>
                        <th className="px-4 py-2 border-b">Amount (₹)</th>
                        <th className="px-4 py-2 border-b">Date</th>
                        <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={index} className="text-center">
                            <td className="px-4 py-2 border-b">{expense.category}</td>
                            <td className="px-4 py-2 border-b">{expense.amount}</td>
                            <td className="px-4 py-2 border-b">
                                {expense.date ? new Date(expense.date).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="px-4 py-2 border-b space-x-2 space-y-1">
                                <button
                                    onClick={() => onEdit(expense)}
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(expense)}
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
    );
};

export default ExpenseList;
