
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import Navbar from '@/components/Navbar';
import MatSensor from '@/components/MatSensor';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ReminderFilters from '@/components/dashboard/ReminderFilters';
import ReminderTabs from '@/components/dashboard/ReminderTabs';
import EmptyReminders from '@/components/dashboard/EmptyReminders';
import ReminderList from '@/components/dashboard/ReminderList';
import { useReminders } from '@/hooks/useReminders';
import { useNotifications } from '@/hooks/useNotifications';
import { setUserItems } from '@/services/iotService';

// Fix TypeScript issue for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock user data
  const user = {
    name: 'Jane Smith',
    email: 'jane@example.com',
  };

  // Use custom hooks
  const { 
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
    formatTimeUntil,
    reminders
  } = useReminders();

  const {
    sendNotification,
    speakMessage
  } = useNotifications();

  // Handle mat activation
  const handleMatActivation = async () => {
    // Find nearest upcoming reminder
    const now = new Date();
    const upcomingReminders = reminders
      .filter(reminder => !reminder.completed && reminder.date > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    
    // Sync reminder titles with ESP32
    if (upcomingReminders.length > 0) {
      const reminderItems = upcomingReminders.slice(0, 5).map(rem => rem.title);
      try {
        await setUserItems(reminderItems);
      } catch (error) {
        console.error('Failed to sync items with ESP32:', error);
      }
    }
    
    if (upcomingReminders.length > 0) {
      const nextReminder = upcomingReminders[0];
      const timeUntil = formatTimeUntil(nextReminder.date);
      
      const message = `Upcoming reminder: ${nextReminder.title} (${timeUntil})`;
      
      // Send notification
      sendNotification('Smart Reminder Mat', message);
      
      // Speak the reminder if voice notification is enabled
      if (nextReminder.notificationType === 'voice' || nextReminder.notificationType === 'both') {
        speakMessage(message);
      }
      
      // Announce additional reminders if they exist
      if (upcomingReminders.length > 1) {
        setTimeout(() => {
          const additionalMessage = `You have ${upcomingReminders.length - 1} more upcoming reminders.`;
          sendNotification('Smart Reminder Mat', additionalMessage);
          speakMessage(additionalMessage);
        }, 3000);
      }
    } else {
      const message = 'You have no upcoming reminders';
      sendNotification('Smart Reminder Mat', message);
      speakMessage(message);
    }
  };

  // Handle logout (mock)
  const handleLogout = () => {
    toast.success('Logged out successfully');
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} user={user} onLogout={handleLogout} />
      
      <div className="pt-24 pb-16 container max-w-6xl">
        <DashboardHeader 
          title="Your Reminders" 
          description="Manage and organize your upcoming reminders" 
        />
        
        <div className="mb-8">
          <MatSensor onMatActivated={handleMatActivation} />
          <p className="text-sm text-muted-foreground mt-2">
            When someone steps on the mat, a notification will be sent with your upcoming reminders.
          </p>
        </div>
        
        <ReminderFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          sortOption={sortOption}
          setSortOption={setSortOption}
          handleAddReminder={handleAddReminder}
        />
        
        <ReminderTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        {filteredReminders.length === 0 ? (
          <EmptyReminders 
            searchQuery={searchQuery}
            selectedDate={selectedDate}
            onAddReminder={handleAddReminder}
          />
        ) : (
          <ReminderList 
            reminders={filteredReminders}
            onEdit={handleEditReminder}
            onDelete={handleDeleteReminder}
            onToggleComplete={handleToggleComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
