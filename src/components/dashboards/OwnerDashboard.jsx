
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Truck, Users, DollarSign, FileText, MapPin, Settings, Plus, LogOut, AlertTriangle } from 'lucide-react';
import StatsCard from '@/components/shared/StatsCard';
import DataTable from '@/components/shared/DataTable';

const OwnerDashboard = ({ user, onLogout }) => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState(() => JSON.parse(localStorage.getItem(`tms_vehicles_${user.id}`)) || []);
  const [drivers, setDrivers] = useState(() => JSON.parse(localStorage.getItem(`tms_drivers_${user.id}`)) || []);
  const [bookings, setBookings] = useState(() => JSON.parse(localStorage.getItem('tms_customer_bookings')) || []);

  useEffect(() => {
    localStorage.setItem(`tms_vehicles_${user.id}`, JSON.stringify(vehicles));
  }, [vehicles, user.id]);

  useEffect(() => {
    localStorage.setItem(`tms_drivers_${user.id}`, JSON.stringify(drivers));
  }, [drivers, user.id]);

  const ownerBookings = bookings.filter(b => b.ownerId === user.id);

  const stats = [
    { title: 'Total Vehicles', value: vehicles.length, change: '', icon: Truck, color: 'from-blue-500 to-blue-600' },
    { title: 'Active Drivers', value: drivers.length, change: '', icon: Users, color: 'from-green-500 to-green-600' },
    { title: 'Monthly Revenue', value: `₹${ownerBookings.reduce((acc, b) => acc + parseFloat(b.amount.replace(/[^0-9.-]+/g,"")), 0).toLocaleString()}`, change: '', icon: DollarSign, color: 'from-purple-500 to-purple-600' },
    { title: 'Active Trips', value: ownerBookings.filter(b => b.status === 'In Transit').length, change: '', icon: MapPin, color: 'from-orange-500 to-orange-600' }
  ];

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: `The "${feature}" feature is not yet implemented.`,
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold gradient-text">Fleet Management</h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{user.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => handleFeatureClick('add vehicle')}><Plus className="w-4 h-4 mr-2" />Add Vehicle</Button>
              <Button variant="outline" size="sm" onClick={() => handleFeatureClick('settings')}><Settings className="w-4 h-4" /></Button>
              <Button variant="outline" size="sm" onClick={onLogout}><LogOut className="w-4 h-4 mr-2" />Logout</Button>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Vehicles</h2>
                <Button variant="outline" size="sm" onClick={() => handleFeatureClick('track all vehicles')}><MapPin className="w-4 h-4 mr-2" />Track All</Button>
              </div>
              <DataTable
                data={vehicles}
                columns={[
                  { key: 'number', label: 'Vehicle No.' },
                  { key: 'type', label: 'Type' },
                  { key: 'driver', label: 'Assigned Driver' },
                  { key: 'status', label: 'Status' }
                ]}
                onRowClick={(vehicle) => handleFeatureClick(`vehicle ${vehicle.number}`)}
              />
            </motion.div>
          </div>

          <div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Drivers</h2>
                <Button variant="outline" size="sm" onClick={() => handleFeatureClick('add driver')}><Plus className="w-4 h-4 mr-2" />Add Driver</Button>
              </div>
              <div className="space-y-3">
                {drivers.length > 0 ? drivers.map(driver => (
                  <div key={driver.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <p className="font-medium">{driver.name}</p>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                )) : <p className="text-center text-gray-500 py-4">No drivers added yet.</p>}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OwnerDashboard;
