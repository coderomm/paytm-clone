// // src/components/AuthProvider.jsx
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (isAuthenticated && (location.pathname === '/signin' || location.pathname === '/signup')) {
//       navigate('/dashboard');
//     }
//   }, [isAuthenticated, location.pathname, navigate]);

//   const login = (token) => {
//     Cookies.set('token', token, { expires: 1 }); // Token expires in 1 day
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     Cookies.remove('token');
//     setIsAuthenticated(false);
//     navigate('/signin');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "../components/AxiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("/user/me");
                setUser(response.data);
            } catch (error) {
                setUser(null);
            }
        };
        checkAuth();
    }, []);

    const login = async (credentials) => {
        const response = await axios.post("/user/signin", credentials);
        setUser(response.data.user);
        return response.data;
    };

    const logout = () => {
        setUser(null);
        // Optionally, clear cookies here
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

