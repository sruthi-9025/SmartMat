
import * as React from "react";
import { addDays, format, startOfToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerWithPresetsProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  includeTime?: boolean;
}

export function DatePickerWithPresets({
  date,
  setDate,
  includeTime = false,
}: DatePickerWithPresetsProps) {
  const [selectedTime, setSelectedTime] = React.useState("12:00");

  // When time changes, update the date with the new time
  React.useEffect(() => {
    if (date && includeTime) {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      setDate(newDate);
    }
  }, [selectedTime, date, setDate, includeTime]);

  // Generate time options in 30 minute increments
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            includeTime ? (
              format(date, "PPP 'at' p")
            ) : (
              format(date, "PPP")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <div className="flex flex-col gap-2 px-1.5 py-1">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full text-xs"
              onClick={() => setDate(startOfToday())}
            >
              Today
            </Button>
            <Button
              variant="outline"
              className="w-full text-xs"
              onClick={() => setDate(addDays(startOfToday(), 1))}
            >
              Tomorrow
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full text-xs"
              onClick={() => setDate(addDays(startOfToday(), 2))}
            >
              In 2 days
            </Button>
            <Button
              variant="outline"
              className="w-full text-xs"
              onClick={() => setDate(addDays(startOfToday(), 7))}
            >
              In a week
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </div>
        {includeTime && (
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent position="popper">
              {timeOptions.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </PopoverContent>
    </Popover>
  );
}
