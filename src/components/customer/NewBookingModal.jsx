import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { X, Package, MapPin, DollarSign } from 'lucide-react';

const NewBookingModal = ({ onClose, onBook }) => {
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    pickup: '',
    dropoff: '',
    cargo: '',
    weight: '',
  });
  const [fare, setFare] = useState(0);
  const { toast } = useToast();

  const handleNext = () => {
    if (step === 1) {
      if (!bookingDetails.pickup || !bookingDetails.dropoff) {
        toast({ title: "Error", description: "Please fill in pickup and drop-off locations.", variant: "destructive" });
        return;
      }
    }
    if (step === 2) {
      if (!bookingDetails.cargo || !bookingDetails.weight) {
        toast({ title: "Error", description: "Please provide cargo details and weight.", variant: "destructive" });
        return;
      }
      const calculatedFare = Math.floor(Math.random() * (25000 - 5000 + 1)) + 5000;
      setFare(calculatedFare);
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleConfirmBooking = () => {
    onBook({ ...bookingDetails, amount: `₹${fare.toLocaleString()}` });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative"
      >
        <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}><X /></Button>
        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <MapPin className="mx-auto h-12 w-12 text-purple-600" />
                  <h2 className="text-2xl font-bold mt-4">Set Route</h2>
                  <p className="text-gray-500">Where are we going?</p>
                </div>
                <div className="space-y-4">
                  <div><Label htmlFor="pickup">Pickup Location</Label><Input id="pickup" name="pickup" value={bookingDetails.pickup} onChange={handleChange} placeholder="e.g., Mumbai, Maharashtra" /></div>
                  <div><Label htmlFor="dropoff">Drop-off Location</Label><Input id="dropoff" name="dropoff" value={bookingDetails.dropoff} onChange={handleChange} placeholder="e.g., Delhi, NCR" /></div>
                </div>
                <Button className="w-full mt-6" onClick={handleNext}>Next</Button>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <Package className="mx-auto h-12 w-12 text-purple-600" />
                  <h2 className="text-2xl font-bold mt-4">Cargo Details</h2>
                  <p className="text-gray-500">What are we transporting?</p>
                </div>
                <div className="space-y-4">
                  <div><Label htmlFor="cargo">Cargo Type</Label><Input id="cargo" name="cargo" value={bookingDetails.cargo} onChange={handleChange} placeholder="e.g., Electronics, Textiles" /></div>
                  <div><Label htmlFor="weight">Approx. Weight (kg)</Label><Input id="weight" name="weight" type="number" value={bookingDetails.weight} onChange={handleChange} placeholder="e.g., 500" /></div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" className="w-full" onClick={handleBack}>Back</Button>
                  <Button className="w-full" onClick={handleNext}>Calculate Fare</Button>
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <DollarSign className="mx-auto h-12 w-12 text-purple-600" />
                  <h2 className="text-2xl font-bold mt-4">Confirm Booking</h2>
                  <p className="text-gray-500">Review and confirm your shipment.</p>
                </div>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <p><strong>From:</strong> {bookingDetails.pickup}</p>
                  <p><strong>To:</strong> {bookingDetails.dropoff}</p>
                  <p><strong>Cargo:</strong> {bookingDetails.cargo} ({bookingDetails.weight} kg)</p>
                  <p className="text-xl font-bold mt-2">Estimated Fare: <span className="text-green-600">₹{fare.toLocaleString()}</span></p>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" className="w-full" onClick={handleBack}>Back</Button>
                  <Button className="w-full" onClick={handleConfirmBooking}>Confirm & Book</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default NewBookingModal;