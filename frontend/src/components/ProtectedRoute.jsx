import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
    const token = Cookies.get('token');
    console.log('token cookie: ',token)
    return token ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;