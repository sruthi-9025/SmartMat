
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, KeyRound, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success('Password reset instructions sent');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center justify-center mb-8">
          <Link to="/" className="flex items-center">
            <div className="rounded-full bg-primary p-1.5 mr-2">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-lg">Smart Reminder Mat</span>
          </Link>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm border border-gray-200/60 shadow-sm rounded-xl p-8">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 rounded-full p-3">
                  <KeyRound className="h-6 w-6 text-primary" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-2">
                Forgot your password?
              </h2>
              <p className="text-center text-muted-foreground mb-6">
                No worries! Enter your email address and we'll send you instructions to reset your password.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 rounded-full loading-dot bg-white"></div>
                      <div className="w-2 h-2 rounded-full loading-dot bg-white"></div>
                      <div className="w-2 h-2 rounded-full loading-dot bg-white"></div>
                    </div>
                  ) : 'Send reset instructions'}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <Link to="/login" className="text-sm font-medium text-primary hover:text-primary/90 transition-colors">
                  Back to login
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 rounded-full p-3">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">
                Check your inbox
              </h2>
              <p className="text-muted-foreground mb-6">
                We've sent password reset instructions to <span className="font-medium text-foreground">{email}</span>. Please check your email.
              </p>
              
              <div className="space-y-4">
                <Button
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsSubmitted(false)}
                >
                  Try another email
                </Button>
                
                <Link to="/login">
                  <Button className="w-full">
                    Back to login
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
