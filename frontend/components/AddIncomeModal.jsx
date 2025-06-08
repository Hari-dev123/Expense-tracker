import React from 'react';

const AddIncomeModal = ({
    formData,
    onChange,
    onClose,
    onSubmit,
    adding,
    formError,
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg relative">
                <h3 className="text-lg font-semibold mb-4">Add Income</h3>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="source" className="block text-sm font-medium mb-1">
                            Source
                        </label>
                        <input
                            id="source"
                            name="source"
                            type="text"
                            value={formData.source}
                            onChange={onChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                            autoComplete="off"
                        />
                    </div>

                    

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium mb-1">
                            Amount (₹)
                        </label>
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={formData.amount}
                            onChange={onChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>
                    {formError && <p className="text-red-500 text-sm">{formError}</p>}

          <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                            disabled={adding}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={adding}
                            className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
                        >
                            {adding ? 'Adding...' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddIncomeModal;
