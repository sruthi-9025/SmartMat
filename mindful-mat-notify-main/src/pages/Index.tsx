
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bell, Calendar, CheckCircle, Clock, MousePointerClick, Shield, Sparkles, Volume2 } from 'lucide-react';

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const FeatureCard = ({ icon, title, description, className }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  className?: string
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={cn(
      "rounded-2xl p-6 backdrop-blur-sm border hover:shadow-lg transition-all duration-300",
      className
    )}
  >
    <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col justify-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-primary/5 rounded-full"></div>
          <div className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-blue-100/50 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] translate-x-1/3 translate-y-1/3 bg-primary/5 blur-2xl rounded-full"></div>
        </div>
        
        <div className="container max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex-1"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Smart Organization for Busy Lives
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight"
              >
                Never Forget <br className="hidden md:block" />
                <span className="text-primary">Important Things</span> Again
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-4 text-lg text-muted-foreground max-w-lg"
              >
                Smart Reminder Mat helps you organize your day with elegantly designed reminders that speak to you. Set priorities, get timely alerts, and stay on top of your commitments.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <MousePointerClick className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Sign In
                    <Shield className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 relative"
            >
              <div className="relative glassmorphism rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-md border border-white/20 rounded-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80" 
                  alt="Smart Reminder Dashboard" 
                  className="w-full h-auto object-cover mix-blend-overlay rounded-2xl"
                />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-white/50 shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-primary text-white mr-3">
                        <Bell className="h-4 w-4" />
                      </div>
                      <h3 className="font-semibold">Team Meeting</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Weekly progress discussion with the design team</p>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-primary" />
                        <span>Today</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1 text-primary" />
                        <span>10:00 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 p-3 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center">
                <Volume2 className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">Voice Alert</span>
              </div>
              
              <div className="absolute -top-4 -left-4 p-3 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm font-medium">Task Complete</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Designed for Efficiency</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Smart Reminder Mat combines elegant design with powerful functionality to help you stay organized and focused.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Bell className="h-6 w-6 text-primary" />}
              title="Smart Notifications"
              description="Get timely alerts through notifications, ensuring you never miss an important appointment or deadline."
              className="bg-white/70 border-gray-200/60"
            />
            
            <FeatureCard 
              icon={<Volume2 className="h-6 w-6 text-primary" />}
              title="Voice Reminders"
              description="Receive voice alerts that speak your reminders, perfect for when you're busy or on the go."
              className="bg-white/70 border-gray-200/60"
            />
            
            <FeatureCard 
              icon={<Calendar className="h-6 w-6 text-primary" />}
              title="Calendar Integration"
              description="Seamlessly integrate with your calendar to keep all your events and reminders in perfect sync."
              className="bg-white/70 border-gray-200/60"
            />
            
            <FeatureCard 
              icon={<CheckCircle className="h-6 w-6 text-primary" />}
              title="Priority Setting"
              description="Mark tasks by priority level to focus on what matters most and organize your workflow efficiently."
              className="bg-white/70 border-gray-200/60"
            />
            
            <FeatureCard 
              icon={<Clock className="h-6 w-6 text-primary" />}
              title="Time Management"
              description="Schedule reminders with precision timing to optimize your day and increase productivity."
              className="bg-white/70 border-gray-200/60"
            />
            
            <FeatureCard 
              icon={<Shield className="h-6 w-6 text-primary" />}
              title="Secure Access"
              description="Your reminders are protected with secure authentication, accessible only to you across all devices."
              className="bg-white/70 border-gray-200/60"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/5 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] translate-x-1/2 -translate-y-1/2 bg-primary/10 blur-3xl rounded-full"></div>
        </div>
        
        <div className="container max-w-6xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100/80 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Stay Organized?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of users who have transformed their productivity with Smart Reminder Mat. Start your journey to better organization today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="rounded-full bg-primary p-1.5 mr-2">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-lg">Smart Reminder Mat</span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Smart Reminder Mat. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
