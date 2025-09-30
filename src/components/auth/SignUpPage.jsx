
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const SignUpPage = ({ onSignUp }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      toast({ title: "Missing Information", description: "Please fill out all fields.", variant: "destructive" });
      return;
    }
    
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      verified: formData.role === 'customer' // Auto-verify customers for simplicity
    };

    onSignUp(newUser);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-effect rounded-2xl p-8 max-w-md mx-auto w-full"
      >
        <div className="text-center mb-8">
          <UserPlus className="mx-auto h-12 w-12 text-white" />
          <h1 className="text-3xl font-bold text-white mt-4">Create an Account</h1>
          <p className="text-white/80">Join our logistics network today!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-white">Full Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
          </div>
          <div>
            <Label className="text-white">Email</Label>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
          </div>
          <div>
            <Label className="text-white">Password</Label>
            <Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
          </div>
          <div>
            <Label className="text-white">I am a...</Label>
            <Select onValueChange={handleRoleChange} value={formData.role}>
              <SelectTrigger><SelectValue placeholder="Select your role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="owner">Vehicle Owner</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-white text-purple-600 hover:bg-white/90 font-semibold py-3">Sign Up</Button>
        </form>
        <p className="text-center text-white/80 mt-6">
          Already have an account? <Link to="/login" className="font-semibold hover:underline">Log In</Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignUpPage;
