import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, MapPin, Phone, ArrowRight, IndianRupee, Globe, Star, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const slides = [
  {
    image: "A large red truck driving on a highway at sunset",
    alt: "A large red truck driving on a highway at sunset",
    text: "Covering Every Corner of India",
    subtext: "From Kashmir to Kanyakumari, our network is your advantage."
  },
  {
    image: "A blue logistics truck parked in a warehouse loading bay",
    alt: "A blue logistics truck parked in a warehouse loading bay",
    text: "Safe & Secure Shipments",
    subtext: "Your cargo is our responsibility. We ensure it reaches safely."
  },
  {
    image: "A fleet of white trucks lined up in a depot",
    alt: "A fleet of white trucks lined up in a depot",
    text: "The Power of a Modern Fleet",
    subtext: "Reliable, well-maintained vehicles for every type of load."
  }
];

const HomePage = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBookingCheck = () => {
    if (!from || !to) {
      toast({
        title: "Missing Details",
        description: "Please enter both 'From' and 'To' locations.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Checking Availability...",
      description: `Searching for return trucks from ${from} to ${to}.`,
    });

    setTimeout(() => {
      const isAvailable = Math.random() > 0.3; // Simulate availability
      if (isAvailable) {
        const fare = Math.floor(Math.random() * (25000 - 8000 + 1)) + 8000;
        toast({
          title: "Truck Available!",
          description: `Estimated Fare: ₹${fare.toLocaleString()}. Please log in or sign up to complete payment and book.`,
          action: <Link to="/login"><Button>Login to Book</Button></Link>,
        });
      } else {
        toast({
          title: "No Trucks Available",
          description: "Sorry, no return trucks are available on this route right now. Please try again later.",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  return (
    <div className="bg-gray-900 text-white">
      <header className="absolute top-0 left-0 right-0 z-20 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <Truck className="w-8 h-8 text-purple-400" />
            <span className="text-xl sm:text-2xl font-bold">JR Transport</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <a href="tel:+919702160068" className="flex items-center space-x-2 hover:text-purple-300 transition-colors">
              <Phone className="w-4 h-4" />
              <span>+91-9702160068</span>
            </a>
            <Link to="/login"><Button variant="outline" className="bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900">Login</Button></Link>
            <Link to="/signup"><Button className="bg-purple-600 hover:bg-purple-700">Sign Up</Button></Link>
          </div>
          <div className="md:hidden">
             <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </Button>
          </div>
        </div>
        <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 p-4 glass-effect rounded-lg"
          >
            <div className="flex flex-col space-y-4">
              <Link to="/login" className="w-full"><Button variant="outline" className="w-full bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900">Login</Button></Link>
              <Link to="/signup" className="w-full"><Button className="w-full bg-purple-600 hover:bg-purple-700">Sign Up</Button></Link>
              <a href="tel:+919702160068" className="flex items-center justify-center space-x-2 hover:text-purple-300 transition-colors pt-2">
                <Phone className="w-4 h-4" />
                <span>+91-9702160068</span>
              </a>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </header>

      <main>
        <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden px-4">
          <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
          <img
            alt="A truck driving on a scenic mountain highway"
            className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1473445730015-841f29a9490b" />
          
          <div className="relative z-10">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-extrabold mb-4"
            >
              Your Return Journey Truck Partner
            </motion.h1>
            <motion.p 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-8"
            >
              Cost-effective, reliable, and fast return truck booking across India. Save money on every shipment.
            </motion.p>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="glass-effect rounded-2xl p-6 max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="From" className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400" />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="To" className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400" />
                </div>
                <Button onClick={handleBookingCheck} size="lg" className="bg-purple-600 hover:bg-purple-700 w-full">
                  Find Truck <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Why Choose JR Transport?</h2>
              <p className="text-gray-400 mt-2">The smart choice for logistics.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6"><IndianRupee className="w-12 h-12 mx-auto text-purple-400 mb-4" /> <h3 className="text-xl font-semibold mb-2">Unbeatable Prices</h3> <p className="text-gray-400">By utilizing return journeys, we offer the most competitive rates in the market.</p></div>
              <div className="p-6"><Globe className="w-12 h-12 mx-auto text-purple-400 mb-4" /> <h3 className="text-xl font-semibold mb-2">All India Network</h3> <p className="text-gray-400">Our extensive network ensures we can serve you anywhere, anytime.</p></div>
              <div className="p-6"><Star className="w-12 h-12 mx-auto text-purple-400 mb-4" /> <h3 className="text-xl font-semibold mb-2">Trusted & Reliable</h3> <p className="text-gray-400">With verified drivers and real-time tracking, your cargo is in safe hands.</p></div>
            </div>
          </div>
        </section>

        <section className="relative h-[60vh] bg-black">
          <AnimatePresence>
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
              <img
                alt={slides[currentSlide].alt}
                className="w-full h-full object-cover opacity-50" src="https://images.unsplash.com/photo-1691527385266-62295bbcabb1" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <motion.h2 
              key={`text-${currentSlide}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold"
            >
              {slides[currentSlide].text}
            </motion.h2>
            <motion.p 
              key={`subtext-${currentSlide}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-4 text-lg text-gray-300 max-w-md"
            >
              {slides[currentSlide].subtext}
            </motion.p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-purple-500' : 'bg-gray-500'}`}></button>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} JR Transport Management. All Rights Reserved.</p>
          <p className="mt-2">Contact us: <a href="tel:+919702160068" className="hover:text-purple-300">+91-9702160068</a></p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;