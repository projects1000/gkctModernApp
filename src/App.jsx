import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import HomePage from '@/components/HomePage';
import LoginPage from '@/components/auth/LoginPage';
import SignUpPage from '@/components/auth/SignUpPage';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import OwnerDashboard from '@/components/dashboards/OwnerDashboard';
import DriverDashboard from '@/components/dashboards/DriverDashboard';
import CustomerDashboard from '@/components/dashboards/CustomerDashboard';
import VendorDashboard from '@/components/dashboards/VendorDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('tms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Seed initial admin user if none exists
      const users = JSON.parse(localStorage.getItem('tms_users')) || [];
      if (!users.find(u => u.email === 'admin@tms.com')) {
        users.push({
          id: 'admin-001',
          name: 'Super Admin',
          email: 'admin@tms.com',
          password: 'password123', // In a real app, this would be hashed
          role: 'admin',
          verified: true,
        });
        localStorage.setItem('tms_users', JSON.stringify(users));
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('tms_user', JSON.stringify(userData));
    toast({
      title: "Welcome back!",
      description: `Logged in as ${userData.role}.`,
    });
    navigate('/dashboard');
  };

  const handleSignUp = (userData) => {
    const users = JSON.parse(localStorage.getItem('tms_users')) || [];
    users.push({ ...userData, id: `user-${Date.now()}`, verified: userData.role !== 'customer' ? false : true });
    localStorage.setItem('tms_users', JSON.stringify(users));
    
    toast({
      title: "Account Created!",
      description: "Please log in with your new credentials.",
    });
    navigate('/login');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('tms_user');
    toast({
      title: "Logged out",
      description: "See you soon!",
    });
    navigate('/login');
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const renderDashboard = () => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    switch (user.role) {
      case 'admin':
        return <AdminDashboard user={user} onLogout={handleLogout} />;
      case 'owner':
        return <OwnerDashboard user={user} onLogout={handleLogout} />;
      case 'driver':
        return <DriverDashboard user={user} onLogout={handleLogout} />;
      case 'customer':
        return <CustomerDashboard user={user} onLogout={handleLogout} />;
      case 'vendor':
        return <VendorDashboard user={user} onLogout={handleLogout} />;
      default:
        return <Navigate to="/login" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>JR Transport Management - Return Journey Trucks Across India</title>
        <meta name="description" content="JR Transport Management offers reliable and cost-effective return journey truck booking services across India. Get instant quotes and track your shipment in real-time." />
      </Helmet>
      
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUpPage onSignUp={handleSignUp} />} />
            <Route path="/dashboard" element={<ProtectedRoute>{renderDashboard()}</ProtectedRoute>} />
          </Routes>
        </AnimatePresence>
        <Toaster />
      </div>
    </>
  );
}

export default App;