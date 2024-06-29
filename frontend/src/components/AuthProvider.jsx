// src/components/Authprovider.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "../components/AxiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("/user/me", { withCredentials: true });
                if (response.data.user) setCurrentUser(response.data.user);
            } catch (error) {
                setCurrentUser(null);
                console.error('Not logged in', error);
            }
        };
        checkAuth();
    }, []);

    const signup = async (username, firstName, lastName, password) => {
        try {
            const response = await axios.post('/user/signup', { username, firstName, lastName, password }, { withCredentials: true });
            console.log('signup response: ', response)
            if (response.data.user) setCurrentUser(response.data.user);
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            console.error('Signin failed: ', error)
            throw error;
        }
    }

    const login = async (username, password) => {
        try {
            const response = await axios.post("/user/signin", { username, password }, { withCredentials: true });
            console.log('login response: ', response)
            if (response.data.user) setCurrentUser(response.data.user);
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const logout = async () => {
        try {
            const response = await axios.post('/user/logout', {}, { withCredentials: true });
            setCurrentUser(null);
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

