import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  
  const isStrongPassword = (password) => {
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateInputs = ()=>{
    const { fullName, email, password } = formData;

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (!isStrongPassword(password)) {
      toast.error('Password must be at least 8 characters and include uppercase, lowercase, number, and special character');
      return false;
    }
    toast.success('Signup successfully')
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
   if(validateInputs()){
     dispatch(register(formData));
   }
  };

  useEffect(() => {
    if (token) {
        navigate('/');
    }
  }, [token, navigate]);


  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-700 via-purple-900 to-indigo-900">
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-sm w-full border border-purple-300">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Sign Up</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 rounded transition duration-300"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <div className="mt-3 flex gap-3 justify-center ">
          <p>Already have an account?</p>
          <span
            className="text-purple-800 underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </div>
      </form>

      
    </div>
  );
};

export default Signup;
