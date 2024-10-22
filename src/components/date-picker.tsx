"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
  className?: string;
  placeholder?: string;
  clearDate: () => void;
}

export const DatePicker = ({
  value,
  onChange,
  className,
  placeholder = "Select date",
  clearDate,
}: DatePickerProps) => {
  return (
    <div className="flex items-center w-fit">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            size={"lg"}
            className={cn(
              "w-full justify-start text-left font-normal px-3",
              !value && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span>{placeholder}</span>}
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearDate();
              }}
              className="right-2 p-1 hover:bg-gray-200 rounded"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => onChange(date as Date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
