import React, { useEffect } from 'react';
import { LuCreditCard } from 'react-icons/lu';
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../features/dashboard/dashboardSlice';
import AmountBar from '../../components/AmountBar';
import FinancialOverviewChart from '../../components/FinancialOverviewChart';
import ExpenseBarChart from '../../components/ExpenseBarChart';
import IncomeBarChart from '../../components/IncomeBarChart';
import AmountColor from '../../components/AmountColor';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    totalBalance,
    totalIncome,
    totalExpense,
    recentTransactions,
    loading,
    error
  } = useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  console.log(error)
  const expensesData = recentTransactions
    .filter((txn) => txn.type === 'expense')
  const incomeData = recentTransactions.filter(txn => txn.type === 'income');
  const stats = [
    { label: 'Total Balance', amount: `$${totalBalance}`, color: 'bg-purple-600', icon: LuCreditCard },
    { label: 'Total Income', amount: `$${totalIncome}`, color: 'bg-green-600', icon: MdOutlineAccountBalanceWallet },
    { label: 'Total Expense', amount: `$${totalExpense}`, color: 'bg-red-600', icon: GiPayMoney },
  ];

  return (
    
    loading   ? (
  
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
    ) : (
      <div className = "px-6 lg:py-20">
      <div className = "flex flex-col lg:flex-row gap-4 mb-6">
        {stats.map((stat, idx) => (
        <AmountBar
          key={idx}
          label={stat.label}
          amount={stat.amount}
          color={stat.color}
          icon={stat.icon}
        />
      ))
}
      </div >

      <div className='w-full flex flex-col gap-4 lg:flex-row'>
        <div className="bg-white shadow-md rounded-md p-5 lg:w-1/2">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="flex flex-col gap-4">
            {recentTransactions.length === 0 ? (
              <p className="text-gray-500">No recent transactions</p>
            ) : (
                   [...recentTransactions]
  .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort descending by date
                .slice(0, 5) // Only take the last 5 transactions
  .map((txn, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                  <div>
                    <p className="text-gray-800">
                      {txn.type === 'income' ? txn.source : txn.category}
                    </p>
                    <p className="text-sm text-gray-500">{new Date(txn.date).toISOString().split('T')[0]}</p>
                  </div>
                  <p>
                    <AmountColor amount={txn.amount} category={txn.type} />
                  </p>
                </div>
))

            )}
          </div>
        </div>

        <div className='lg:w-1/2'>
          <FinancialOverviewChart
            totalBalance={totalBalance}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
          />
        </div>
      </div>

      <div className='w-full flex flex-col gap-4 lg:flex-row'>
        <div className="bg-white shadow-md rounded-md p-5 lg:w-1/2">
          <h2 className="text-lg font-semibold mb-4">Recent 5 Expenses</h2>
          <div className="flex flex-col gap-4">
            {recentTransactions.filter(txn => txn.type === 'expense').length === 0 ? (
              <p className="text-gray-500">No Expenses</p>
            ) : (
              recentTransactions
                .filter(txn => txn.type === 'expense')
                .map((txn, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                    <div>
                      <p className="text-gray-800">{txn.category || 'Miscellaneous'}</p>
                      <p className="text-sm text-gray-500">{new Date(txn.date).toISOString().split('T')[0]}</p>
                    </div>
                    <AmountColor amount={txn.amount} category={'expense'} />
                  </div>
                ))
            )}
          </div>
        </div>

        <div className='lg:w-1/2'>
          <ExpenseBarChart expensesData={expensesData} />
        </div>
      </div>

      <div className='w-full flex flex-col gap-4 lg:flex-row'>
        <div className="bg-white shadow-md rounded-md p-5 lg:w-1/2">
          <h2 className="text-lg font-semibold mb-4">Recent 5 Incomes</h2>
          <div className="flex flex-col gap-4">
            {recentTransactions.filter(txn => txn.type === 'income').length === 0 ? (
              <p className="text-gray-500">No Income</p>
            ) : (
              recentTransactions
                .filter(txn => txn.type === 'income')
                .map((txn, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                    <div>
                      <p className="text-gray-800">{txn.source || 'Other'}</p>
                      <p className="text-sm text-gray-500">{new Date(txn.date).toISOString().split('T')[0]}</p>
                    </div>
                    <AmountColor category={'income'} amount={txn.amount} />
                  </div>
                ))
            )}
          </div>
        </div>

        <div className='lg:w-1/2'>
          <IncomeBarChart incomeData={incomeData} />
        </div>
      </div>
    </div >
    )
  );
};

export default Dashboard;
