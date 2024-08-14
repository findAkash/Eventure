import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import { AuthProvider, useAuth } from './utils/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/user/Home';
import MyEventPage from './pages/user/MyEvent';
import NavbarLoggedOut from './components/Nav/NavbarLoggeOut';
import Navbar from './components/Nav/Navbar';
import PublicHomePage from './pages/Public/PublicHomePage';
import { ToastContainer } from 'react-toastify';

function AppContent() {
  const { isLoading, isAuthenticated } = useAuth();
  console.log('isAuthenticated:', isAuthenticated);
  console.log('isLoading:', isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      {isAuthenticated ? <Navbar /> : <NavbarLoggedOut />}
      <Routes>
        <Route path="/public/home" element={<PublicHomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/my-events" element={<MyEventPage />} />
          {/* Other protected routes */}
        </Route>
      </Routes>
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
