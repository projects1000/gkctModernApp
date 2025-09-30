import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  Store, 
  Wrench, 
  Fuel, 
  DollarSign, 
  LogOut,
  Settings,
  List,
  CheckCircle
} from 'lucide-react';
import StatsCard from '@/components/shared/StatsCard';

const VendorDashboard = ({ user, onLogout }) => {
  const { toast } = useToast();

  const stats = [
    { title: 'Total Services', value: '12', change: '+2', icon: List, color: 'from-blue-500 to-blue-600' },
    { title: 'Completed Jobs', value: '156', change: '+12', icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { title: 'Monthly Revenue', value: '₹85,000', change: '+8%', icon: DollarSign, color: 'from-purple-500 to-purple-600' },
    { title: 'Pending Requests', value: '3', change: '+1', icon: Wrench, color: 'from-orange-500 to-orange-600' }
  ];

  const serviceRequests = [
    { id: 'REQ001', service: 'Tyre Replacement', vehicle: 'MH12AB1234', status: 'Pending', amount: '₹8,000' },
    { id: 'REQ002', service: 'Engine Oil Change', vehicle: 'KA05CD5678', status: 'Completed', amount: '₹2,500' },
    { id: 'REQ003', service: 'Fuel Top-up', vehicle: 'TN09GH3456', status: 'In Progress', amount: '₹5,000' },
  ];

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold gradient-text">Vendor Portal</h1>
              <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">{user.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => handleFeatureClick('settings')}><Settings className="w-4 h-4" /></Button>
              <Button variant="outline" size="sm" onClick={onLogout}><LogOut className="w-4 h-4 mr-2" /> Logout</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div key={stat.title} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Service Requests</h2>
          <div className="space-y-4">
            {serviceRequests.map((req) => (
              <div key={req.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      {req.service.includes('Fuel') ? <Fuel className="w-5 h-5 text-teal-600" /> : <Wrench className="w-5 h-5 text-teal-600" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{req.service}</h3>
                      <p className="text-sm text-gray-600">Vehicle: {req.vehicle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>{req.status}</span>
                    <p className="font-semibold text-gray-800 mt-1">{req.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VendorDashboard;