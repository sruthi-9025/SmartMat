
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

interface ReminderDescriptionProps {
  description: string;
  setDescription: (description: string) => void;
  startVoiceInput: (field: 'title' | 'description') => void;
}

const ReminderDescription: React.FC<ReminderDescriptionProps> = ({ 
  description, 
  setDescription, 
  startVoiceInput 
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="description">Description</Label>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          onClick={() => startVoiceInput('description')}
          className="h-8 px-2"
        >
          <Bell className="h-3 w-3 mr-1" />
          Use Voice
        </Button>
      </div>
      <Textarea
        id="description"
        placeholder="Add more details (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="min-h-[80px] w-full"
      />
    </div>
  );
};

export default ReminderDescription;
