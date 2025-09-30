import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { LogOut, Settings, Bell, LayoutDashboard, Users, Truck, Package, DollarSign, MessageSquare, BarChart2, Menu, X } from 'lucide-react';
import AdminHome from '@/components/admin/AdminHome';
import UserManagement from '@/components/admin/UserManagement';

const AdminDashboard = ({ user, onLogout }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: `The "${feature}" feature is not yet implemented.`,
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminHome />;
      case 'users':
        return <UserManagement />;
      case 'vehicles':
      case 'bookings':
      case 'payments':
      case 'complaints':
      case 'reports':
      case 'settings':
        handleFeatureClick(activeTab.charAt(0).toUpperCase() + activeTab.slice(1));
        return <AdminHome />; // Fallback to dashboard
      default:
        return <AdminHome />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'vehicles', label: 'Vehicles', icon: Truck },
    { id: 'bookings', label: 'Bookings', icon: Package },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare },
    { id: 'reports', label: 'Reports', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 text-center border-b border-gray-700">
        <h2 className="text-2xl font-bold gradient-text">JR Transport</h2>
        <p className="text-sm text-gray-400">Admin Panel</p>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              if (isSidebarOpen) setSidebarOpen(false);
            }}
            className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              activeTab === item.id
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white" onClick={onLogout}>
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white flex flex-col z-50 lg:hidden"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-col hidden lg:flex">
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden mr-4 text-gray-600">
                  {isSidebarOpen ? <X /> : <Menu />}
                </button>
                <h1 className="text-xl font-semibold text-gray-800 capitalize">{activeTab}</h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="hidden sm:inline text-sm font-medium text-gray-600">Welcome, {user.name}</span>
                <Button variant="ghost" size="icon" onClick={() => handleFeatureClick('Notifications')}>
                  <Bell className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;