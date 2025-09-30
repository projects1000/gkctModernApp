import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { X, CreditCard } from 'lucide-react';

const WalletModal = ({ onClose, onAddMoney, currentBalance }) => {
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  const handleAdd = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast({ title: "Invalid Amount", description: "Please enter a valid positive number.", variant: "destructive" });
      return;
    }
    onAddMoney(numericAmount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative"
      >
        <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}><X /></Button>
        <div className="p-8">
          <div className="text-center mb-6">
            <CreditCard className="mx-auto h-12 w-12 text-purple-600" />
            <h2 className="text-2xl font-bold mt-4">My Wallet</h2>
            <p className="text-gray-500">Current Balance: <span className="font-bold text-gray-700">₹{currentBalance.toLocaleString()}</span></p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount to Add</Label>
              <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 1000" />
            </div>
            <div className="flex space-x-2">
              {[500, 1000, 2000].map(val => (
                <Button key={val} variant="outline" size="sm" onClick={() => setAmount(val.toString())}>₹{val}</Button>
              ))}
            </div>
          </div>
          <Button className="w-full mt-6" onClick={handleAdd}>Add to Wallet</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default WalletModal;