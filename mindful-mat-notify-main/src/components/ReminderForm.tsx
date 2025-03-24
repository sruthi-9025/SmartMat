
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

import { DatePickerWithPresets } from './DatePickerWithPresets';
import { ReminderItem } from './ReminderCard';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import LanguageSelector from './LanguageSelector';

// Import our new components
import ReminderTitle from './reminder-form/ReminderTitle';
import ReminderDescription from './reminder-form/ReminderDescription';
import PrioritySelector from './reminder-form/PrioritySelector';
import NotificationTypeSelector from './reminder-form/NotificationTypeSelector';
import VoiceInputPanel from './reminder-form/VoiceInputPanel';

interface ReminderFormProps {
  onAddReminder: (reminder: Omit<ReminderItem, 'id'>) => void;
  className?: string;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ onAddReminder, className }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [notificationType, setNotificationType] = useState<'voice' | 'notification' | 'both'>('notification');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [language, setLanguage] = useState<string>('en');
  const [isListening, setIsListening] = useState(false);
  const [inputTarget, setInputTarget] = useState<'title' | 'description' | null>(null);

  const handleVoiceInput = (transcript: string) => {
    if (inputTarget === 'title') {
      setTitle(transcript);
      toast.success('Title added via voice input');
    } else if (inputTarget === 'description') {
      setDescription(transcript);
      toast.success('Description added via voice input');
    }
    setInputTarget(null);
    setIsListening(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) {
      toast.error('Please enter a reminder title');
      return;
    }
    
    if (!date) {
      toast.error('Please select a date for your reminder');
      return;
    }
    
    const newReminder: Omit<ReminderItem, 'id'> = {
      title,
      description,
      date,
      notificationType,
      priority,
      completed: false
    };
    
    onAddReminder(newReminder);
    
    // Reset form
    setTitle('');
    setDescription('');
    setDate(undefined);
    setNotificationType('notification');
    setPriority('medium');
    setOpen(false);
    
    toast.success('Reminder added successfully');
  };

  const startVoiceInput = (field: 'title' | 'description') => {
    setInputTarget(field);
    setIsListening(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className={className}
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Reminder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="flex flex-row items-center justify-between">
            <div>
              <DialogTitle>Add New Reminder</DialogTitle>
              <DialogDescription>
                Create a new reminder with details and notification preferences.
              </DialogDescription>
            </div>
            <LanguageSelector 
              selectedLanguage={language}
              onLanguageChange={setLanguage}
            />
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <ReminderTitle 
              title={title}
              setTitle={setTitle}
              startVoiceInput={startVoiceInput}
            />
            
            <ReminderDescription 
              description={description}
              setDescription={setDescription}
              startVoiceInput={startVoiceInput}
            />

            {inputTarget && (
              <VoiceInputPanel 
                language={language}
                inputTarget={inputTarget}
                isListening={isListening}
                setIsListening={setIsListening}
                onTranscript={handleVoiceInput}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <DatePickerWithPresets 
                  date={date} 
                  setDate={setDate} 
                  includeTime={true}
                />
              </div>
              <PrioritySelector 
                priority={priority}
                setPriority={setPriority}
              />
            </div>
            
            <NotificationTypeSelector 
              notificationType={notificationType}
              setNotificationType={setNotificationType}
            />
            
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="mr-2"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="submit">
                <Check className="mr-2 h-4 w-4" />
                Add Reminder
              </Button>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderForm;
