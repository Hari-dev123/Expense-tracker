import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        dispatch(logout());
        navigate('/login');
        toast.success('Logout successfully')
    }, [dispatch, navigate]);

    return null;
};

export default Logout;
