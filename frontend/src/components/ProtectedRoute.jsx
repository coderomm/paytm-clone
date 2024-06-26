import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({children}) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    console.log('user found in Protected Route: ', user)
    return children;
};

export default ProtectedRoute;