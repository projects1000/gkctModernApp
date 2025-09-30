import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, MapPin, Truck, CheckCircle } from 'lucide-react';

const TrackShipmentModal = ({ onClose, booking }) => {
  const trackingSteps = [
    { status: 'Booked', location: booking.pickup, completed: true },
    { status: 'In Transit', location: 'Nagpur', completed: true },
    { status: 'Reached Hub', location: 'Jaipur', completed: false },
    { status: 'Out for Delivery', location: booking.dropoff, completed: false },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative"
      >
        <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}><X /></Button>
        <div className="p-8">
          <div className="text-center mb-6">
            <Truck className="mx-auto h-12 w-12 text-purple-600" />
            <h2 className="text-2xl font-bold mt-4">Tracking Shipment</h2>
            <p className="text-gray-500 font-mono">{booking.id}</p>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-6">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="font-medium">{booking.pickup}</p>
            </div>
            <MapPin className="text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">To</p>
              <p className="font-medium">{booking.dropoff}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Live Status</h3>
            <div className="relative">
              <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex items-start mb-6 relative">
                  <div className={`z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                    {step.completed ? <CheckCircle className="text-white" /> : <div className="w-3 h-3 bg-white rounded-full"></div>}
                  </div>
                  <div className="ml-4">
                    <p className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>{step.status}</p>
                    <p className="text-sm text-gray-500">{step.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrackShipmentModal;