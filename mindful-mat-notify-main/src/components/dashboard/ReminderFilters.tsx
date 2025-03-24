
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DatePickerWithPresets } from '@/components/DatePickerWithPresets';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReminderForm from '@/components/ReminderForm';
import { ReminderItem } from '@/components/ReminderCard';

interface ReminderFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  handleAddReminder: (reminder: Omit<ReminderItem, 'id'>) => void;
}

const ReminderFilters: React.FC<ReminderFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedDate,
  setSelectedDate,
  sortOption,
  setSortOption,
  handleAddReminder
}) => {
  const staggerAnimationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
      <motion.div 
        {...staggerAnimationProps} 
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
      >
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reminders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="w-full sm:w-[230px]">
          <DatePickerWithPresets
            date={selectedDate}
            setDate={setSelectedDate}
          />
        </div>
      </motion.div>
      
      <motion.div
        {...staggerAnimationProps}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Select
          value={sortOption}
          onValueChange={setSortOption}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-asc">Date (Ascending)</SelectItem>
            <SelectItem value="date-desc">Date (Descending)</SelectItem>
            <SelectItem value="priority-high">Priority (High to Low)</SelectItem>
            <SelectItem value="priority-low">Priority (Low to High)</SelectItem>
          </SelectContent>
        </Select>
        
        <ReminderForm
          onAddReminder={handleAddReminder}
          className="w-full sm:w-auto"
        />
      </motion.div>
    </div>
  );
};

export default ReminderFilters;
