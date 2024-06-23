import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "./AuthProvider";

const ProtectedRoute = () => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/signin" />;
    }
    console.log('returning outlet')
    return <Outlet />;
};

export default ProtectedRoute;