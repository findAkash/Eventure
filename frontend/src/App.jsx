import React from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { useAuth } from './utils/AuthContext';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserHomePage from './pages/user/Home';
import MyEventPage from './pages/user/MyEvent';
import Task from './pages/user/Task';
import ChangePasswordPage from './pages/Profile/ChangePasswordPage';
import ProfilePage from './pages/Profile/ProfilePage';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import PublicHomePage from './pages/Public/PublicHomePage';
import PrivateRoute from './routes/PrivateRoute';
import AdminSidebar from './components/Admin/Nav/AdminSidebar';
import Navbar from './components/Nav/Navbar';
import NavbarLoggedOut from './components/Nav/NavbarLoggeOut'; // Import this if not already

import { AuthProvider } from './utils/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserPage from './pages/Admin/UserPage';
import EventPage from './pages/Admin/EventPage';
import { TaskPage } from './pages/Admin/TaskPage';

// Separate routes for Admin
const AdminRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="users" element={<UserPage />} />
    <Route path="events" element={<EventPage />} />
    <Route path="tasks" element={<TaskPage />} />
    {/* Add other admin routes here */}
  </Routes>
);

// Separate routes for User
const UserRoutes = () => (
  <Routes>
    <Route path="home" element={<UserHomePage />} />
    <Route path="my-events" element={<MyEventPage />} />
    <Route path="task" element={<Task />} />
    <Route path="change-password" element={<ChangePasswordPage />} />
    <Route path="profile" element={<ProfilePage />} />
  </Routes>
);

function AppContent() {
  const { isLoading, isAuthenticated, user } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(isAuthenticated, user);
  return (
    <>
      <ToastContainer />
      {isAuthenticated ? (
        <>
          {/* Conditionally render Navbar based on user role */}
          {user?.role === 'Admin' ? <AdminSidebar /> : <Navbar />}
          <Routes>
            {user?.role === 'Admin' ? (
              <Route
                path="/admin/*"
                element={<PrivateRoute requiredRole={'Admin'} />}
              >
                {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
                <Route path="*" element={<AdminRoutes />} />
              </Route>
            ) : (
              <Route path="/*" element={<PrivateRoute />}>
                <Route path="*" element={<UserRoutes />} />
              </Route>
            )}
          </Routes>
        </>
      ) : (
        <>
          <NavbarLoggedOut />
          <Routes>
            <Route path="/public/home" element={<PublicHomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* Redirect to login for other public routes */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GoogleOAuthProvider clientId="406153480348-r5p15eoim5h7gf0sccre7a8h5qlgmkkl.apps.googleusercontent.com">
          <AppContent />
        </GoogleOAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
