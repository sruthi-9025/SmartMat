
import React from 'react';
import { motion } from 'framer-motion';
import ReminderCard, { ReminderItem } from '@/components/ReminderCard';

interface ReminderListProps {
  reminders: ReminderItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

const ReminderList: React.FC<ReminderListProps> = ({ 
  reminders, 
  onEdit, 
  onDelete, 
  onToggleComplete 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reminders.map((reminder, index) => (
        <motion.div
          key={reminder.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
        >
          <ReminderCard
            reminder={reminder}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ReminderList;
