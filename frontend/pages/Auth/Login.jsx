import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector(state => state.auth);
  {token ? toast.success('Logined') : ''}
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
 
  const validateInputs = () => {
    const { email, password } = credentials;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return  toast.error("Please enter a valid email");
      
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
      
    }

     
     return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      dispatch(login(credentials));
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
      toast.success('Login successfully');
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-700 via-purple-900 to-indigo-900">
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-sm w-full border border-purple-300">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 rounded transition duration-300"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className='mt-3 flex gap-3'>
          <p className=''>Don't have an account?</p>
          <span className='text-purple-900 underline cursor-pointer' onClick={() => navigate('/signup')}>Create account</span>
        </div>

        {error && <p className="mt-4 text-center text-red-400 font-semibold">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
