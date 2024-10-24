"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
  className?: string;
  placeholder?: string;
  children?: React.ReactNode;
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    { value, onChange, className, placeholder = "Select date", children },
    ref
  ) => {
    return (
      <div className="w-full">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant={"outline"}
              size={"lg"}
              className={cn(
                "w-full justify-between text-left font-normal px-3",
                !value && "text-muted-foreground",
                className
              )}
            >
              <div className="flex items-center">
                <CalendarIcon className="mr-2 size-4" />
                {value ? format(value, "PPP") : <span>{placeholder}</span>}
              </div>
              {children}
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
  }
);

DatePicker.displayName = "DatePicker";
