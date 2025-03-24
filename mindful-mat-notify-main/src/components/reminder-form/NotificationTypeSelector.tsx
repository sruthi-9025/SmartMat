
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bell, BellRing, Volume2 } from 'lucide-react';

interface NotificationTypeSelectorProps {
  notificationType: 'voice' | 'notification' | 'both';
  setNotificationType: (type: 'voice' | 'notification' | 'both') => void;
}

const NotificationTypeSelector: React.FC<NotificationTypeSelectorProps> = ({ 
  notificationType, 
  setNotificationType 
}) => {
  return (
    <div className="space-y-2">
      <Label>Notification Type</Label>
      <div className="flex gap-3">
        <Button
          type="button"
          variant={notificationType === 'notification' ? "default" : "outline"}
          className="flex-1 justify-start"
          onClick={() => setNotificationType('notification')}
        >
          <Bell className="mr-2 h-4 w-4" />
          Notification
        </Button>
        <Button
          type="button"
          variant={notificationType === 'voice' ? "default" : "outline"}
          className="flex-1 justify-start"
          onClick={() => setNotificationType('voice')}
        >
          <Volume2 className="mr-2 h-4 w-4" />
          Voice
        </Button>
        <Button
          type="button"
          variant={notificationType === 'both' ? "default" : "outline"}
          className="flex-1 justify-start"
          onClick={() => setNotificationType('both')}
        >
          <BellRing className="mr-2 h-4 w-4" />
          Both
        </Button>
      </div>
    </div>
  );
};

export default NotificationTypeSelector;
