// pages/Expense.jsx
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchExpenses,addExpense, updateExpense, deleteExpense,} from '../../features/expense/expenseSlice';
import ExpenseChart from '../../components/ExpensePageChart';
import ExpenseList from '../../components/ExpenseList';
import AddExpenseModal from '../../components/AddExpenseModal';
import EditExpenseModal from '../../components/EditExpenseModal';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Expense = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expense);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editError, setEditError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [adding, setAdding] = useState(false);
  const [formError, setFormError] = useState(null);

  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: '',
  });

  useLayoutEffect(() => {
    console.log("dispatching fetchexpense")
    dispatch(fetchExpenses());
  }, [dispatch]);

  const openModal = () => {
    setFormError(null);
    setFormData({ category: '', amount: '', date: '' });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormError(null);
  };

  const openEditModal = (expense) => {
    setEditError(null);
    setEditingExpense(expense);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingExpense(null);
    setEditError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const { category, amount } = formData;

    if (!category.trim() || amount === '' || isNaN(amount) || Number(amount) <= 0) {
      setFormError('Please fill all fields with valid values.');
      return;
    }

    setAdding(true);
    try {
      await dispatch(
        addExpense({
          category: category.trim(),
          amount: Number(amount),
          date: '',
        })
      ).unwrap();
      closeModal();
      dispatch(fetchExpenses());
    } catch (err) {
      setFormError(typeof err === 'string' ? err : err?.message || 'Failed to add expense');
    } finally {
      setAdding(false);
    }
  };

  const handleUpdateExpense = async (updatedData) => {
    if (!editingExpense?._id) return;

    setUpdating(true);
    try {
      await dispatch(updateExpense({ id: editingExpense._id, data: updatedData })).unwrap();
      dispatch(fetchExpenses());
      closeEditModal();
    } catch (err) {
      setEditError(typeof err === 'string' ? err : err?.message || 'Failed to update expense');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteExpense = async (expense) => {
    try {
      await dispatch(deleteExpense(expense._id)).unwrap();
      dispatch(fetchExpenses());
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };
  return (
    <div className="bg-white rounded-xl px-6 lg:mt-10 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col justify-between w-full sm:flex-row">
          <div>
            <h2 className="text-xl font-semibold">Expense Overview</h2>
            <p className="text-gray-500 text-sm">Track your expenses here</p>
          </div>
          <div>
            <button
              onClick={openModal}
              className="bg-red-100 text-red-600 mt-4 sm:mt-0 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition"
            >
              + Add Expense
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading chart...</p>
      ) : error ? (
        <p className="text-black">No expense found</p>
      ) : <ExpenseChart expenses={expenses} />}

      {modalOpen && (
        <AddExpenseModal
          formData={formData}
          onChange={handleChange}
          onClose={closeModal}
          onSubmit={handleAddExpense}
          adding={adding}
          formError={formError}
        />
      )}

 
      {loading ? (
        <div className="px-6 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="flex-1 bg-white shadow-md rounded-md p-4">
                <Skeleton height={30} width="60%" />
                <Skeleton height={20} width="40%" />
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col gap-4 lg:flex-row">
            <div className="bg-white shadow-md rounded-md p-5 lg:w-1/2">
              <Skeleton height={25} width="40%" className="mb-4" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="mb-3">
                  <Skeleton height={15} width="70%" />
                  <Skeleton height={10} width="30%" />
                </div>
              ))}
            </div>

            <div className="bg-white shadow-md rounded-md p-5 lg:w-1/2">
              <Skeleton height={200} />
            </div>
          </div>
        </div>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : ''}
      {Array.isArray(expenses) && expenses.length > 0 ? (
        <ExpenseList expenses={expenses} onEdit={openEditModal} onDelete={handleDeleteExpense} />
      ) : (
        <p>No expense data available.</p>
      )}

      {editModalOpen && (
        <EditExpenseModal
          isOpen={editModalOpen}
          onClose={closeEditModal}
          onSubmit={handleUpdateExpense}
          initialData={editingExpense}
          loading={updating}
          error={editError}
        />
      )}
    </div>
  );
};

export default Expense;
