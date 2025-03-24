
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

interface ReminderTitleProps {
  title: string;
  setTitle: (title: string) => void;
  startVoiceInput: (field: 'title' | 'description') => void;
}

const ReminderTitle: React.FC<ReminderTitleProps> = ({ title, setTitle, startVoiceInput }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="title">Title</Label>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          onClick={() => startVoiceInput('title')}
          className="h-8 px-2"
        >
          <Bell className="h-3 w-3 mr-1" />
          Use Voice
        </Button>
      </div>
      <Input
        id="title"
        placeholder="Enter reminder title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default ReminderTitle;
