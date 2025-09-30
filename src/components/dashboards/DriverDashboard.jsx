
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Package, DollarSign, Camera, Phone, Navigation, LogOut, CheckCircle, AlertCircle, Fuel, Settings } from 'lucide-react';
import StatsCard from '@/components/shared/StatsCard';

const DriverDashboard = ({ user, onLogout }) => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState(() => JSON.parse(localStorage.getItem('tms_customer_bookings')) || []);
  
  const driverTrips = bookings.filter(b => b.driverId === user.id);
  const currentTrip = driverTrips.find(t => t.status === 'In Transit');
  const upcomingTrips = driverTrips.filter(t => t.status === 'Pending');

  const stats = [
    { title: 'Trips Completed', value: driverTrips.filter(t => t.status === 'Delivered').length, change: '', icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { title: 'Total Earnings', value: `₹${driverTrips.reduce((acc, b) => acc + (parseFloat(b.amount.replace(/[^0-9.-]+/g,"")) * 0.1), 0).toLocaleString()}`, change: '', icon: DollarSign, color: 'from-blue-500 to-blue-600' },
    { title: 'Upcoming Trips', value: upcomingTrips.length, change: '', icon: Package, color: 'from-purple-500 to-purple-600' },
    { title: 'Fuel Level', value: '75%', change: '', icon: Fuel, color: 'from-orange-500 to-orange-600' }
  ];

  const handleTripAction = (tripId, newStatus) => {
    const updatedBookings = bookings.map(b => {
      if (b.id === tripId) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    setBookings(updatedBookings);
    localStorage.setItem('tms_customer_bookings', JSON.stringify(updatedBookings));
    toast({
      title: "Trip Updated!",
      description: `Trip ${tripId} status changed to ${newStatus}.`,
    });
  };

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
              <h1 className="text-2xl font-bold gradient-text">Driver Dashboard</h1>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">{user.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => handleFeatureClick('emergency')}><Phone className="w-4 h-4 mr-2" />Emergency</Button>
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
            {currentTrip ? (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Current Trip</h2>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{currentTrip.status}</span>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div><h3 className="font-semibold text-gray-900">{currentTrip.id}</h3><p className="text-gray-600">{currentTrip.customerName || 'N/A'}</p></div>
                    <div className="text-right"><p className="font-semibold text-green-600">{currentTrip.amount}</p></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg"><MapPin className="w-5 h-5 text-green-500" /><div><p className="text-sm font-medium text-gray-900">Pickup</p><p className="text-sm text-gray-600">{currentTrip.pickup}</p></div></div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg"><MapPin className="w-5 h-5 text-red-500" /><div><p className="text-sm font-medium text-gray-900">Drop-off</p><p className="text-sm text-gray-600">{currentTrip.dropoff}</p></div></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleFeatureClick('navigate')}><Navigation className="w-4 h-4 mr-2" />Navigate</Button>
                    <Button onClick={() => handleTripAction(currentTrip.id, 'Delivered')}><CheckCircle className="w-4 h-4 mr-2" />Mark Delivered</Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm"><Package className="w-16 h-16 text-gray-300 mx-auto mb-4" /><h3 className="text-lg font-medium text-gray-900">No Active Trip</h3><p className="text-gray-600">Waiting for your next assignment.</p></div>
            )}
          </div>

          <div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Trips</h2>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">{upcomingTrips.length}</span>
              </div>
              <div className="space-y-4">
                {upcomingTrips.length > 0 ? upcomingTrips.map((trip) => (
                  <div key={trip.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{trip.id}</h3>
                      <Button size="sm" onClick={() => handleTripAction(trip.id, 'In Transit')}>Start Trip</Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{trip.pickup} → {trip.dropoff}</p>
                  </div>
                )) : <p className="text-center text-gray-500 py-4">No upcoming trips.</p>}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DriverDashboard;
