import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  Package, 
  MapPin, 
  DollarSign, 
  Plus,
  Truck,
  Star,
  LogOut,
  Settings,
  CreditCard,
  FileText,
  Phone,
  History
} from 'lucide-react';
import StatsCard from '@/components/shared/StatsCard';
import NewBookingModal from '@/components/customer/NewBookingModal';
import TrackShipmentModal from '@/components/customer/TrackShipmentModal';
import WalletModal from '@/components/customer/WalletModal';
import BookingHistoryModal from '@/components/customer/BookingHistoryModal';

const CustomerDashboard = ({ user, onLogout }) => {
  const { toast } = useToast();

  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('tms_customer_bookings');
    return savedBookings ? JSON.parse(savedBookings) : [
      { id: 'TMS001', pickup: 'Mumbai, Maharashtra', dropoff: 'Delhi, NCR', status: 'In Transit', driver: 'Rajesh Kumar', vehicle: 'MH12AB1234', estimatedDelivery: '2025-10-05', amount: '₹15,000', cargo: 'Electronics' },
      { id: 'TMS002', route: 'Pune → Bangalore', status: 'Delivered', date: '2025-09-15', amount: '₹12,500', pickup: 'Pune', dropoff: 'Bangalore', cargo: 'Textiles' },
      { id: 'TMS003', route: 'Chennai → Kolkata', status: 'Delivered', date: '2025-09-10', amount: '₹18,000', pickup: 'Chennai', dropoff: 'Kolkata', cargo: 'Machinery' },
    ];
  });

  const [walletBalance, setWalletBalance] = useState(() => {
    const savedBalance = localStorage.getItem('tms_wallet_balance');
    return savedBalance ? parseFloat(savedBalance) : 5000;
  });

  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [isTrackModalOpen, setTrackModalOpen] = useState(false);
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    localStorage.setItem('tms_customer_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('tms_wallet_balance', walletBalance);
  }, [walletBalance]);

  const activeBookings = bookings.filter(b => b.status === 'In Transit' || b.status === 'Pending');
  const bookingHistory = bookings.filter(b => b.status === 'Delivered' || b.status === 'Cancelled');

  const stats = [
    { title: 'Total Bookings', value: bookings.length, change: '+1', icon: Package, color: 'from-blue-500 to-blue-600' },
    { title: 'Active Shipments', value: activeBookings.length, change: '+1', icon: Truck, color: 'from-green-500 to-green-600' },
    { title: 'Total Spent', value: `₹${bookings.reduce((acc, b) => acc + parseFloat(b.amount.replace(/[^0-9.-]+/g,"")), 0).toLocaleString()}`, change: '+15%', icon: DollarSign, color: 'from-purple-500 to-purple-600' },
    { title: 'Wallet Balance', value: `₹${walletBalance.toLocaleString()}`, change: '', icon: CreditCard, color: 'from-orange-500 to-orange-600' }
  ];

  const handleNewBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: `TMS${(Math.random() * 1000).toFixed(0).padStart(3, '0')}`,
      status: 'Pending',
      driver: 'Assigning...',
      vehicle: 'Assigning...',
      estimatedDelivery: 'TBD'
    };
    setBookings(prev => [newBooking, ...prev]);
    toast({
      title: "Booking Created!",
      description: `Your new booking ${newBooking.id} is pending assignment.`,
    });
  };

  const handleTrackShipment = (booking) => {
    setSelectedBooking(booking);
    setTrackModalOpen(true);
  };
  
  const handleAddMoney = (amount) => {
    setWalletBalance(prev => prev + amount);
    toast({
      title: "Success!",
      description: `₹${amount} added to your wallet.`,
    });
  };

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <AnimatePresence>
        {isBookingModalOpen && <NewBookingModal onClose={() => setBookingModalOpen(false)} onBook={handleNewBooking} />}
        {isTrackModalOpen && <TrackShipmentModal onClose={() => setTrackModalOpen(false)} booking={selectedBooking} />}
        {isWalletModalOpen && <WalletModal onClose={() => setWalletModalOpen(false)} onAddMoney={handleAddMoney} currentBalance={walletBalance} />}
        {isHistoryModalOpen && <BookingHistoryModal onClose={() => setHistoryModalOpen(false)} bookings={bookingHistory} onTrack={handleTrackShipment} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-50"
      >
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl sm:text-2xl font-bold gradient-text">My Shipments</h1>
                <span className="hidden sm:block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">{user.name}</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button onClick={() => setBookingModalOpen(true)} size="sm" className="sm:size-auto">
                  <Plus className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">New Booking</span>
                </Button>
                <Button variant="outline" size="icon" className="hidden sm:inline-flex" onClick={() => handleFeatureClick('settings')}><Settings className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon" className="sm:size-auto sm:px-3" onClick={onLogout}><LogOut className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Logout</span></Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div key={stat.title} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <StatsCard {...stat} />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Active Shipments</h2>
                  <Button variant="outline" size="sm" onClick={() => activeBookings.length > 0 && handleTrackShipment(activeBookings[0])} disabled={activeBookings.length === 0}>
                    <MapPin className="w-4 h-4 mr-2" /> Track All
                  </Button>
                </div>
                
                {activeBookings.length > 0 ? (
                  <div className="space-y-4">
                    {activeBookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">{booking.id}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>{booking.status}</span>
                          </div>
                          <div className="text-left sm:text-right mt-2 sm:mt-0">
                            <p className="font-semibold text-green-600">{booking.amount}</p>
                            <p className="text-sm text-gray-500">Est: {booking.estimatedDelivery}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-3"><MapPin className="w-5 h-5 text-green-500 flex-shrink-0" /><div><p className="text-sm font-medium text-gray-900">From</p><p className="text-sm text-gray-600">{booking.pickup}</p></div></div>
                          <div className="flex items-center space-x-3"><MapPin className="w-5 h-5 text-red-500 flex-shrink-0" /><div><p className="text-sm font-medium text-gray-900">To</p><p className="text-sm text-gray-600">{booking.dropoff}</p></div></div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t">
                          <div className="flex items-center space-x-4 mb-4 sm:mb-0"><div><p className="text-sm font-medium text-gray-900">Driver: {booking.driver}</p><p className="text-sm text-gray-600">Vehicle: {booking.vehicle}</p></div></div>
                          <div className="flex space-x-2 w-full sm:w-auto">
                            <Button size="sm" variant="outline" className="flex-1" onClick={() => handleTrackShipment(booking)}><MapPin className="w-4 h-4 mr-1" />Track</Button>
                            <Button size="sm" variant="outline" className="flex-1" onClick={() => handleFeatureClick(`call driver ${booking.id}`)}><Phone className="w-4 h-4 mr-1" />Call</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12"><Package className="w-16 h-16 text-gray-300 mx-auto mb-4" /><h3 className="text-lg font-medium text-gray-900 mb-2">No Active Shipments</h3><p className="text-gray-600 mb-4">Start by creating your first booking</p><Button onClick={() => setBookingModalOpen(true)}><Plus className="w-4 h-4 mr-2" />Create Booking</Button></div>
                )}
              </motion.div>
            </div>

            <div>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start hover:bg-gray-50" onClick={() => setBookingModalOpen(true)}><Plus className="w-4 h-4 mr-3" />New Booking</Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-gray-50" onClick={() => setHistoryModalOpen(true)}><History className="w-4 h-4 mr-3" />Booking History</Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-gray-50" onClick={() => handleFeatureClick('download invoice')}><FileText className="w-4 h-4 mr-3" />Download Invoice</Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-gray-50" onClick={() => handleFeatureClick('rate & review')}><Star className="w-4 h-4 mr-3" />Rate & Review</Button>
                </div>
              </motion.div>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }} className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
                <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-semibold">Wallet</h2><CreditCard className="w-6 h-6" /></div>
                <div className="mb-4"><p className="text-purple-100">Available Balance</p><p className="text-3xl font-bold">₹{walletBalance.toLocaleString()}</p></div>
                <Button variant="outline" className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30" onClick={() => setWalletModalOpen(true)}>Add Money</Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CustomerDashboard;