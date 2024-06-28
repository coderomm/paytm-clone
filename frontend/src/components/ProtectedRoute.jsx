import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    const location = useLocation();

    if (!currentUser) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    return children;
};

export default ProtectedRoute;