
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define type for notification permission status
type NotificationPermission = 'default' | 'granted' | 'denied';

export const useNotifications = () => {
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  // Request notification permission on hook initialization
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          setNotificationPermission(permission);
        });
      }
    }
  }, []);

  const sendNotification = (title: string, body: string) => {
    if (!('Notification' in window)) {
      toast.error('This browser does not support notifications');
      return;
    }

    if (notificationPermission !== 'granted') {
      toast.error('Notification permission not granted');
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
      return;
    }

    // Send notification
    const notification = new Notification(title, {
      body: body,
      icon: '/favicon.ico',
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  };

  // Text-to-speech function
  const speakMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(speech);
    } else {
      toast.error('Text-to-speech not supported in this browser');
    }
  };

  return {
    notificationPermission,
    sendNotification,
    speakMessage
  };
};
