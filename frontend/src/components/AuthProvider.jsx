// src/components/Authprovider.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "../components/AxiosInstance";
import Cookies from 'js-cookie';

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
                console.error("Auth check failed: ", error);
            }
        };
        checkAuth();
    }, []);

    const login = async (username, password) => {
        const response = await axios.post("/user/signin", { username, password });
        setUser(response.data.user);
        Cookies.set('token', response.data.token, { expires: 1 });
        return response.data;
    };

    const logout = async () => {
        try {
            await axios.post("/user/logout");
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

