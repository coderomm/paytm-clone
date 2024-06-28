import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthProvider";

const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UpdateAccount = lazy(() => import('./pages/UpdateAccount'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const RedirectIfAuthenticated = lazy(() => import('./components/RedirectIfAuthenticated'));


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* <Route exact path="/" element={<Navigate to="/dashboard" />} /> */}
            <Route path="/signin" element={<RedirectIfAuthenticated><Signin /></RedirectIfAuthenticated>} />
            <Route path="/signup" element={<RedirectIfAuthenticated><Signup /></RedirectIfAuthenticated>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/update-account" element={<ProtectedRoute><UpdateAccount /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;