import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Income from '../pages/Income/Income';
import Expense from '../pages/Expense/Expense';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Logout from '../pages/Logout/Logout';
import { useSelector } from 'react-redux';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <BrowserRouter>
      <ToastContainer position="top-center"  autoClose={2500} />
      {!token ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <div>
          <div className="lg:hidden bg-white fixed top-0 left-0 w-full z-50">
            <Navbar />
          </div>

          <div className="flex min-h-screen">
          
            <div className="hidden lg:block w-60 fixed h-full z-40">
              <Sidebar />
            </div>

            
            <div className="flex-1 lg:ml-60  mt-16 lg:mt-0">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/income" element={<Income />} />
                <Route path="/expense" element={<Expense />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
