// src/contexts/    .jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "../components/AxiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("/user/me");
                console.log('res', response)
                setUser(response.data);
            } catch (error) {
                setUser(null);
            }
        };
        checkAuth();
    }, []);

    const login = async (username, password) => {
        const response = await axios.post("http://localhost:3000/api/v1/user/signin", { username, password });
        setUser(response.data.user);
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

