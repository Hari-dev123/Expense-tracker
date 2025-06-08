import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncomes, addIncome ,updateIncome ,deleteIncome} from '../../features/income/incomeSlice';
import IncomeChart from '../../components/IncomePageChart';
import AddIncomeModal from '../../components/AddIncomeModal';
import IncomeList from '../../components/IncomeList';
import EditIncomeModal from '../../components/EditIncomeModal'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Income = () => {
  const dispatch = useDispatch();
  const { incomes, loading, error } = useSelector((state) => state.income);


  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const [editError, setEditError] = useState(null);
  const [updating, setUpdating] = useState(false);

 


  const handleDeleteIncome = async (income) => {
    try {
      console.log(await dispatch(deleteIncome(income._id)).unwrap())
      dispatch(fetchIncomes());
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };





  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    date: '',
  });
  const [formError, setFormError] = useState(null);
  const [adding, setAdding] = useState(false);
  console.log(incomes)
  useEffect(() => {
    dispatch(fetchIncomes());
  }, [dispatch]);


  const openEditModal = (income) => {
    setEditError(null);
    setEditingIncome(income);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingIncome(null);
    setEditError(null);
  };

  const handleUpdateIncome = async (updatedData) => {
    if (!editingIncome?._id) return;

    setUpdating(true);
    try {
      await dispatch(updateIncome({ id: editingIncome._id, data: updatedData })).unwrap();

      dispatch(fetchIncomes());
      closeEditModal();
    } catch (err) {
      setEditError(typeof err === 'string' ? err : err?.message || 'Failed to update income');
    } finally {
      setUpdating(false);
    }
  };


  const openModal = () => {
    setFormError(null);
    setFormData({ source: '', description: '', amount: '', date: '' });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();
    setFormError(null);
    const { source, amount, date } = formData;

    if (
      !source.trim() ||
      amount === '' ||
      isNaN(amount) ||
      Number(amount) <= 0
    ) {
      setFormError('Please fill all fields with valid values.');
      return;
    }

    setAdding(true);
    try {
      await dispatch(
        addIncome({
          source: source.trim(),
          amount: Number(amount),
          date: date.trim() !== '' ? date.trim() : null,
        })
      ).unwrap();
      closeModal();
      dispatch(fetchIncomes());
    } catch (err) {
      setFormError(
        typeof err === 'string' ? err : err?.message || 'Failed to add income'
      );
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-xl px-6 lg:mt-10 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col justify-between w-full sm:flex-row">
          <div>
            <h2 className="text-xl font-semibold">Income Overview</h2>
            <p className="text-gray-500 text-sm">Track your incomes over here</p>
          </div>
          <div>
            <button
              onClick={openModal}
              className="bg-green-100 text-green-600 mt-4 sm:mt-0 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition"
            >
              + Add Income
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="px-6 lg:py-20">
          {/* Skeleton for Amount Bars */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="flex-1 bg-white shadow-md rounded-md p-4">
                <Skeleton height={30} width="60%" />
                <Skeleton height={20} width="40%" />
              </div>
            ))}
          </div>

          {/* Skeleton for Transactions and Charts */}
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
      ) : (
        <IncomeChart incomes={incomes} />
      )}

      {modalOpen && (
        <AddIncomeModal
          formData={formData}
          onChange={handleChange}
          onClose={closeModal}
          onSubmit={handleAddIncome}
          adding={adding}
          formError={formError}
        />
      )}
     

     
      {loading ? (
        <p>Loading incomes...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : !incomes.length ? (
        <p>No income data available.</p>
      ) : (
        <IncomeList incomes={incomes} onEdit={openEditModal} onDelete={handleDeleteIncome} />
      )}

      {editModalOpen && (
        <EditIncomeModal
          isOpen={editModalOpen}
          onClose={closeEditModal}
          onSubmit={handleUpdateIncome}
          initialData={editingIncome}
          loading={updating}
          error={editError}
        />
      )}
    </div>
  );
};

export default Income;
