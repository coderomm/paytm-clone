import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { NotificationProvider } from './notify/context/NotificationContext';
import SkeletonLoader from './components/SkeletonLoader';
import './notify/Notification.css';

const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Balance = lazy(() => import('./components/Balance'));
const SendMoney = lazy(() => import('./pages/SendMoney'));
const UpdateAccount = lazy(() => import('./pages/UpdateAccount'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const RedirectIfAuthenticated = lazy(() => import('./components/RedirectIfAuthenticated'));


const App = () => {
  console.log('API URL:', import.meta.env.VITE_APP_API_URL);
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Suspense fallback={<SkeletonLoader count={1} height={40} width="100%" />}>
            <Routes>
              <Route exact path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/signin" element={<RedirectIfAuthenticated><Signin /></RedirectIfAuthenticated>} />
              <Route path="/signup" element={<RedirectIfAuthenticated><Signup /></RedirectIfAuthenticated>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/update-account" element={<ProtectedRoute><UpdateAccount /></ProtectedRoute>} />
              <Route path="/balance" element={<ProtectedRoute><Balance /></ProtectedRoute>} />
              <Route path="/send" element={<ProtectedRoute><SendMoney /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;