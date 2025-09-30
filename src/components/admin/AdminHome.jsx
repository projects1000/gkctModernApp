import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Users, Package, AlertCircle, DollarSign, Check, X } from 'lucide-react';
import StatsCard from '@/components/shared/StatsCard';
import DataTable from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';

const AdminHome = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('tms_users')) || [];
    const allBookings = JSON.parse(localStorage.getItem('tms_customer_bookings')) || [];
    setUsers(allUsers);
    setBookings(allBookings);
  }, []);

  const pendingApprovals = users.filter(u => u.verified === false);

  const stats = [
    { title: 'Total Users', value: users.length, change: '+2', icon: Users, color: 'from-blue-500 to-blue-600' },
    { title: 'Total Bookings', value: bookings.length, change: '+5', icon: Package, color: 'from-purple-500 to-purple-600' },
    { title: 'Pending Approvals', value: pendingApprovals.length, change: '', icon: AlertCircle, color: 'from-yellow-500 to-yellow-600' },
    { title: 'Revenue', value: `₹${bookings.reduce((acc, b) => acc + parseFloat(b.amount.replace(/[^0-9.-]+/g,"")), 0).toLocaleString()}`, change: '+15%', icon: DollarSign, color: 'from-green-500 to-green-600' }
  ];

  const handleApproval = (userId, approve) => {
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        return { ...u, verified: approve };
      }
      return u;
    });

    setUsers(updatedUsers);
    localStorage.setItem('tms_users', JSON.stringify(updatedUsers));
    
    toast({
      title: `User ${approve ? 'Approved' : 'Rejected'}`,
      description: `The user account has been ${approve ? 'verified' : 'marked as rejected'}.`,
    });
  };

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: `The "${feature}" feature is not yet implemented.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div key={stat.title} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
            <Button variant="outline" size="sm" onClick={() => handleFeatureClick('View All Bookings')}>View All</Button>
          </div>
          <DataTable
            data={bookings.slice(0, 5)}
            columns={[
              { key: 'id', label: 'Booking ID' },
              { key: 'pickup', label: 'From' },
              { key: 'dropoff', label: 'To' },
              { key: 'status', label: 'Status' },
              { key: 'amount', label: 'Amount' }
            ]}
            onRowClick={(booking) => handleFeatureClick(`Booking ${booking.id}`)}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pending Approvals</h2>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">{pendingApprovals.length}</span>
          </div>
          <div className="space-y-4">
            {pendingApprovals.length > 0 ? pendingApprovals.slice(0, 3).map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{item.role}</p>
                    <p className="text-xs text-gray-500">{item.email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproval(item.id, true)}><Check className="w-4 h-4 mr-1" />Approve</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleApproval(item.id, false)}><X className="w-4 h-4 mr-1" />Reject</Button>
                </div>
              </div>
            )) : <p className="text-center text-gray-500 py-4">No pending approvals.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;