import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { Truck, Users, Car, Package, Store } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { toast } = useToast();

  const roles = [
    { id: 'admin', name: 'Admin', icon: Users, color: 'from-purple-500 to-purple-700', description: 'System Administrator' },
    { id: 'owner', name: 'Vehicle Owner', icon: Truck, color: 'from-blue-500 to-blue-700', description: 'Fleet Management' },
    { id: 'driver', name: 'Driver', icon: Car, color: 'from-green-500 to-green-700', description: 'Vehicle Operator' },
    { id: 'customer', name: 'Customer', icon: Package, color: 'from-orange-500 to-orange-700', description: 'Book Transport' },
    { id: 'vendor', name: 'Vendor', icon: Store, color: 'from-teal-500 to-teal-700', description: 'Service Provider' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (!selectedRole) {
      toast({ title: "Role Required", description: "Please select your role to continue", variant: "destructive" });
      return;
    }

    if (!credentials.email || !credentials.password) {
      toast({ title: "Credentials Required", description: "Please enter your email and password", variant: "destructive" });
      return;
    }

    // Super admin credentials
    if (credentials.email === 'admin@tms.com' && credentials.password === 'password123' && selectedRole === 'admin') {
      onLogin({ id: 'superadmin', email: 'admin@tms.com', role: 'admin', name: 'Super Admin' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('tms_users')) || [];
    const foundUser = users.find(u => u.email === credentials.email && u.password === credentials.password && u.role === selectedRole);

    if (foundUser) {
      onLogin(foundUser);
    } else {
      toast({ title: "Login Failed", description: "Invalid credentials or role. Please try again.", variant: "destructive" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Transport Management System</h1>
          <p className="text-base sm:text-xl text-white/80 max-w-2xl mx-auto">Complete logistics solution connecting all stakeholders with real-time tracking, secure payments, and digital document management</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`glass-effect rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 ${selectedRole === role.id ? 'ring-4 ring-white/50 scale-105' : 'hover:scale-105'}`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center mb-4 mx-auto`}><Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" /></div>
                <h3 className="text-base sm:text-xl font-semibold text-white text-center mb-2">{role.name}</h3>
                <p className="text-white/70 text-center text-xs sm:text-sm hidden sm:block">{role.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-effect rounded-2xl p-6 sm:p-8 max-w-md mx-auto"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Email</label>
              <input type="email" value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Password</label>
              <input type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" placeholder="Enter your password" />
            </div>
            <Button type="submit" className="w-full bg-white text-purple-600 hover:bg-white/90 font-semibold py-3 rounded-lg transition-all duration-300">Login as {selectedRole ? roles.find(r => r.id === selectedRole)?.name : 'User'}</Button>
          </form>
          <p className="text-center text-white/80 mt-6">
            Don't have an account? <Link to="/signup" className="font-semibold hover:underline">Sign Up</Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginPage;