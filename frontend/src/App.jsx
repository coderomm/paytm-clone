import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { NotificationProvider } from './notify/context/NotificationContext';
import './notify/Notification.css';
import HeaderSkeleton from './skeletons/HeaderSkeleton';
import MainSectionSkeleton from './skeletons/MainSectionSkeleton';

const Index = lazy(() => import('./pages/Index'));
const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Balance = lazy(() => import('./components/Balance'));
const SendMoney = lazy(() => import('./pages/SendMoney'));
const UpdateAccount = lazy(() => import('./pages/UpdateAccount'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const RedirectIfAuthenticated = lazy(() => import('./components/RedirectIfAuthenticated'));

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// const delayedImport = (importFunc) => {
//   return lazy(() =>
//     delay(2000).then(() => importFunc())
//   );
// };

// const Index = delayedImport(() => import('./pages/Index'));
// const Signin = delayedImport(() => import('./pages/Signin'));
// const Signup = delayedImport(() => import('./pages/Signup'));
// const Dashboard = delayedImport(() => import('./pages/Dashboard'));
// const Balance = delayedImport(() => import('./components/Balance'));
// const SendMoney = delayedImport(() => import('./pages/SendMoney'));
// const UpdateAccount = delayedImport(() => import('./pages/UpdateAccount'));
// const ProtectedRoute = delayedImport(() => import('./components/ProtectedRoute'));
// const RedirectIfAuthenticated = delayedImport(() => import('./components/RedirectIfAuthenticated'));

const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Suspense fallback={
            <>
              <HeaderSkeleton />
              <MainSectionSkeleton />
            </>
          }>
            <Routes>
              <Route exact path="/" element={<Index />} />
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