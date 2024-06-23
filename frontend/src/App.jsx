import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UpdateAccount from "./pages/UpdateAccount";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<RedirectIfAuthenticated><Signin /></RedirectIfAuthenticated>} />
          <Route path="/signup" element={<RedirectIfAuthenticated><Signup /></RedirectIfAuthenticated>} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
          <Route path="/update-account" element={<ProtectedRoute><UpdateAccount /></ProtectedRoute>} />
          {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const RedirectIfAuthenticated = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

export default App;