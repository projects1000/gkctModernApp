import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, History, Download, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const BookingHistoryModal = ({ onClose, bookings, onTrack }) => {
  const { toast } = useToast();

  const handleAction = (action) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: `The "${action}" feature is not yet implemented.`,
    });
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative h-[90vh] flex flex-col"
      >
        <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-10" onClick={onClose}><X /></Button>
        <div className="p-8 flex-shrink-0">
          <div className="text-center mb-6">
            <History className="mx-auto h-12 w-12 text-purple-600" />
            <h2 className="text-2xl font-bold mt-4">Booking History</h2>
            <p className="text-gray-500">Your past shipments and their details.</p>
          </div>
        </div>
        <div className="overflow-y-auto px-8 pb-8 flex-grow">
          <div className="space-y-4">
            {bookings.length > 0 ? bookings.map(booking => (
              <div key={booking.id} className="border rounded-lg p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{booking.id}</h3>
                    <p className="text-sm text-gray-600">{booking.pickup} to {booking.dropoff}</p>
                    <p className="text-xs text-gray-500">Date: {booking.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>{booking.status}</span>
                    <p className="font-bold mt-1">{booking.amount}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 mt-3 pt-3 border-t">
                  <Button size="sm" variant="outline" onClick={() => handleAction('Download Invoice')}><Download className="w-3 h-3 mr-1.5" /> Invoice</Button>
                  <Button size="sm" variant="outline" onClick={() => handleAction('Rate & Review')}><Star className="w-3 h-3 mr-1.5" /> Review</Button>
                </div>
              </div>
            )) : (
              <p className="text-center text-gray-500 py-10">No booking history found.</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingHistoryModal;