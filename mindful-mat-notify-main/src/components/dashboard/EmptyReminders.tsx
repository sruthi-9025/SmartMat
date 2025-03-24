
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import ReminderForm from '@/components/ReminderForm';
import { ReminderItem } from '@/components/ReminderCard';

interface EmptyRemindersProps {
  searchQuery: string;
  selectedDate: Date | undefined;
  onAddReminder: (reminder: Omit<ReminderItem, 'id'>) => void;
}

const EmptyReminders: React.FC<EmptyRemindersProps> = ({ 
  searchQuery, 
  selectedDate, 
  onAddReminder 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-4 border border-dashed rounded-lg"
    >
      <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-1">No reminders found</h3>
      <p className="text-muted-foreground text-center max-w-md mb-4">
        {searchQuery || selectedDate
          ? "No reminders match your current filters. Try adjusting your search or date filter."
          : "You don't have any reminders yet. Click the button below to add your first reminder."}
      </p>
      <ReminderForm
        onAddReminder={onAddReminder}
        className="mt-2"
      />
    </motion.div>
  );
};

export default EmptyReminders;
