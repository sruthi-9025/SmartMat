
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ReminderItem } from '@/components/ReminderCard';

export const useReminders = () => {
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [filteredReminders, setFilteredReminders] = useState<ReminderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [sortOption, setSortOption] = useState<string>('date-asc');
  const [activeTab, setActiveTab] = useState('all');

  // Add reminder
  const handleAddReminder = (reminder: Omit<ReminderItem, 'id'>) => {
    const newReminder: ReminderItem = {
      ...reminder,
      id: Date.now().toString(),
    };
    
    setReminders((prevReminders) => [...prevReminders, newReminder]);
  };

  // Edit reminder (mock implementation)
  const handleEditReminder = (id: string) => {
    toast.info('Edit functionality will be implemented in the next update');
  };

  // Delete reminder
  const handleDeleteReminder = (id: string) => {
    setReminders((prevReminders) => prevReminders.filter(reminder => reminder.id !== id));
    toast.success('Reminder deleted');
  };

  // Toggle reminder completion status
  const handleToggleComplete = (id: string, completed: boolean) => {
    setReminders((prevReminders) =>
      prevReminders.map(reminder =>
        reminder.id === id ? { ...reminder, completed } : reminder
      )
    );
    
    if (completed) {
      toast.success('Reminder marked as complete');
    } else {
      toast.info('Reminder marked as incomplete');
    }
  };

  // Format time until reminder
  const formatTimeUntil = (date: Date): string => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `in ${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `in ${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `in ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  };

  // Filter and sort reminders
  useEffect(() => {
    let result = [...reminders];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(reminder => 
        reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (reminder.description && reminder.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by selected date
    if (selectedDate) {
      result = result.filter(reminder => 
        reminder.date.toDateString() === selectedDate.toDateString()
      );
    }
    
    // Filter by active tab
    if (activeTab === 'upcoming') {
      result = result.filter(reminder => 
        !reminder.completed && reminder.date >= new Date()
      );
    } else if (activeTab === 'completed') {
      result = result.filter(reminder => reminder.completed);
    } else if (activeTab === 'overdue') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      result = result.filter(reminder => 
        !reminder.completed && reminder.date < today
      );
    }
    
    // Sort reminders
    result.sort((a, b) => {
      switch (sortOption) {
        case 'date-asc':
          return a.date.getTime() - b.date.getTime();
        case 'date-desc':
          return b.date.getTime() - a.date.getTime();
        case 'priority-high':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return (priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium']);
        case 'priority-low':
          const priorityOrderReverse = { low: 0, medium: 1, high: 2 };
          return (priorityOrderReverse[a.priority || 'medium'] - priorityOrderReverse[b.priority || 'medium']);
        default:
          return 0;
      }
    });
    
    setFilteredReminders(result);
  }, [reminders, searchQuery, selectedDate, sortOption, activeTab]);

  // Add some sample data when the component mounts
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    // Sample data
    const sampleReminders: ReminderItem[] = [
      {
        id: '1',
        title: 'Team Meeting',
        description: 'Weekly team standup to discuss project progress',
        date: new Date(today.setHours(10, 0, 0, 0)),
        notificationType: 'both',
        priority: 'high',
      },
      {
        id: '2',
        title: 'Grocery Shopping',
        description: 'Buy milk, eggs, bread, and vegetables',
        date: new Date(tomorrow.setHours(17, 30, 0, 0)),
        notificationType: 'notification',
        priority: 'medium',
      },
      {
        id: '3',
        title: 'Workout Session',
        description: '30-minute cardio and 15-minute strength training',
        date: new Date(today.setHours(18, 0, 0, 0)),
        notificationType: 'voice',
        priority: 'low',
        completed: true,
      },
      {
        id: '4',
        title: 'Pay Bills',
        description: 'Electricity, water, and internet bills',
        date: new Date(nextWeek.setHours(9, 0, 0, 0)),
        notificationType: 'notification',
        priority: 'high',
      },
    ];
    
    setReminders(sampleReminders);
  }, []);

  return {
    reminders,
    filteredReminders,
    searchQuery,
    setSearchQuery,
    selectedDate,
    setSelectedDate,
    sortOption,
    setSortOption,
    activeTab,
    setActiveTab,
    handleAddReminder,
    handleEditReminder,
    handleDeleteReminder,
    handleToggleComplete,
    formatTimeUntil
  };
};
