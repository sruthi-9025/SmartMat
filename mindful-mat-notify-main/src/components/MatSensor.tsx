
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FootprintsIcon, ServerIcon, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  checkConnection, 
  getCurrentWeight, 
  getESP32Address, 
  setESP32Address 
} from '@/services/iotService';

interface MatSensorProps {
  onMatActivated: () => void;
}

const MatSensor: React.FC<MatSensorProps> = ({ onMatActivated }) => {
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [esp32Address, setEsp32Address] = useState(getESP32Address());
  const [isConnected, setIsConnected] = useState(false);
  const [currentWeight, setCurrentWeight] = useState<number | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(true);
  const weightCheckInterval = useRef<NodeJS.Timeout | null>(null);

  // Effect for timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      setIsActive(false);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, timeRemaining]);

  // Effect for ESP32 connection check
  useEffect(() => {
    const checkESP32Connection = async () => {
      const connected = await checkConnection();
      setIsConnected(connected);
      setIsSimulating(!connected);
      
      if (connected) {
        // Start weight monitoring if connected
        startWeightMonitoring();
        toast.success('Connected to ESP32 Smart Mat');
      }
    };
    
    checkESP32Connection();
    
    // Cleanup on unmount
    return () => {
      if (weightCheckInterval.current) {
        clearInterval(weightCheckInterval.current);
      }
    };
  }, [esp32Address]);

  // Function to start weight monitoring
  const startWeightMonitoring = () => {
    if (weightCheckInterval.current) {
      clearInterval(weightCheckInterval.current);
    }
    
    weightCheckInterval.current = setInterval(async () => {
      try {
        const weight = await getCurrentWeight();
        setCurrentWeight(weight);
        
        // Automatically trigger mat activation if weight exceeds threshold (5kg)
        if (weight > 5 && !isActive) {
          triggerMatSensor();
        }
      } catch (error) {
        console.error('Error checking weight:', error);
      }
    }, 2000); // Check every 2 seconds
  };

  // Function to handle ESP32 address update
  const handleUpdateAddress = () => {
    const newAddress = setESP32Address(esp32Address);
    setEsp32Address(newAddress);
    setIsConfigOpen(false);
    
    // Check connection with new address
    checkConnection().then(connected => {
      setIsConnected(connected);
      setIsSimulating(!connected);
      
      if (connected) {
        toast.success(`Connected to ESP32 at ${newAddress}`);
        startWeightMonitoring();
      } else {
        toast.error(`Failed to connect to ESP32 at ${newAddress}`);
      }
    });
  };

  const formatTimeRemaining = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const triggerMatSensor = () => {
    // Set active state and timer for 5 minutes (300 seconds)
    setIsActive(true);
    setTimeRemaining(300);
    
    // Call the parent handler to process all reminders immediately
    onMatActivated();
    
    toast.success('Mat sensor activated for 5 minutes!');
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Smart Mat Sensor</h2>
        <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Configure ESP32 Connection</DialogTitle>
              <DialogDescription>
                Enter the IP address of your ESP32 device on the local network
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="esp32-address">ESP32 IP Address</Label>
                <Input
                  id="esp32-address"
                  placeholder="192.168.1.1"
                  value={esp32Address}
                  onChange={(e) => setEsp32Address(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-muted-foreground">
                  {isConnected ? 'Connected' : 'Not connected'}
                </span>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateAddress}>
                Save & Connect
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center space-x-2 mb-2">
        <ServerIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">
          {isConnected 
            ? `Connected to ESP32 (${currentWeight !== null ? `${currentWeight.toFixed(1)} kg` : 'Reading weight...'})`
            : 'Not connected to ESP32 - using simulation mode'}
        </span>
      </div>
      
      <motion.div
        className="relative"
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={triggerMatSensor}
          variant="outline" 
          className={`
            relative border-2 p-6 flex items-center justify-center w-full 
            ${isActive ? 'border-green-500 bg-green-50' : 'border-dashed'}
          `}
          disabled={isActive}
        >
          <motion.div
            animate={isActive ? { 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 2 }}
          >
            <FootprintsIcon className={`h-8 w-8 ${isActive ? 'text-green-500' : 'text-gray-500'}`} />
          </motion.div>
          <span className="ml-2 font-medium">
            {isActive 
              ? `Sensor active! (${formatTimeRemaining()} remaining)` 
              : isSimulating
                ? 'Simulate Mat Sensor (Click Me)' 
                : 'Mat Active - Stand on mat to activate'}
          </span>
        </Button>
        {isActive && (
          <p className="text-sm text-green-600 mt-2">
            All reminders are being announced. Sensor will deactivate automatically.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default MatSensor;
