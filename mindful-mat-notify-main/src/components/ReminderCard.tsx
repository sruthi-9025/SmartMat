
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  Bell,
  Calendar,
  Clock,
  Edit,
  MoreVertical, 
  Trash,
  Volume2
} from 'lucide-react';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

export interface ReminderItem {
  id: string;
  title: string;
  description?: string;
  date: Date;
  notificationType: 'voice' | 'notification' | 'both';
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
}

interface ReminderCardProps {
  reminder: ReminderItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

const ReminderCard: React.FC<ReminderCardProps> = ({
  reminder,
  onEdit,
  onDelete,
  onToggleComplete
}) => {
  const isToday = new Date().toDateString() === reminder.date.toDateString();
  const isPast = reminder.date < new Date() && !isToday;

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className={cn(
        "h-full overflow-hidden transition-all duration-300 hover:shadow-md",
        reminder.completed && "opacity-75",
        isPast && !reminder.completed && "border-red-200 bg-red-50"
      )}>
        <CardHeader className="p-4 pb-0 flex items-start justify-between space-y-0">
          <div className="flex space-x-2">
            {reminder.priority && (
              <Badge className={priorityColors[reminder.priority]}>
                {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)}
              </Badge>
            )}
            {isToday && (
              <Badge className="bg-green-100 text-green-800">
                Today
              </Badge>
            )}
            {isPast && !reminder.completed && (
              <Badge className="bg-red-100 text-red-800">
                Overdue
              </Badge>
            )}
            {reminder.completed && (
              <Badge className="bg-gray-100 text-gray-800">
                Completed
              </Badge>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem onClick={() => onEdit(reminder.id)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onToggleComplete(reminder.id, !reminder.completed)}
              >
                <span>{reminder.completed ? 'Mark as incomplete' : 'Mark as complete'}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete(reminder.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className={cn(
            "text-lg font-semibold mb-1 transition-colors",
            reminder.completed && "line-through text-muted-foreground"
          )}>
            {reminder.title}
          </h3>
          {reminder.description && (
            <p className={cn(
              "text-sm text-muted-foreground mb-3",
              reminder.completed && "line-through"
            )}>
              {reminder.description}
            </p>
          )}
          <div className="flex items-center text-xs text-muted-foreground space-x-3">
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              <span>{format(reminder.date, 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              <span>{format(reminder.date, 'h:mm a')}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="flex items-center">
              {reminder.notificationType === 'voice' && (
                <Volume2 className="h-3 w-3 mr-1" />
              )}
              {reminder.notificationType === 'notification' && (
                <Bell className="h-3 w-3 mr-1" />
              )}
              {reminder.notificationType === 'both' && (
                <>
                  <Volume2 className="h-3 w-3 mr-1" />
                  <Bell className="h-3 w-3 mr-1" />
                </>
              )}
              {reminder.notificationType === 'voice' 
                ? 'Voice reminder' 
                : reminder.notificationType === 'notification'
                ? 'Notification'
                : 'Voice & Notification'}
            </span>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onToggleComplete(reminder.id, !reminder.completed)}
          >
            {reminder.completed ? 'Undo' : 'Complete'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ReminderCard;
