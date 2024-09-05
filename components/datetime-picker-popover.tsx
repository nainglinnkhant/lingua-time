"use client"

import { useEffect } from "react"

import { generateDateString } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TimePicker } from "@/components/time-picker/time-picker"

interface DateTimePickerPopoverProps {
  children: React.ReactNode
  dateTime: Date | undefined
  setDateTime: React.Dispatch<React.SetStateAction<Date | undefined>>
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

export default function DateTimePickerPopover({
  children,
  dateTime,
  setDateTime,
  setInputValue,
}: DateTimePickerPopoverProps) {
  useEffect(() => {
    if (dateTime) {
      setInputValue(generateDateString(dateTime))
    }
  }, [dateTime, setInputValue])

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="center" side="right" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={dateTime}
          onSelect={setDateTime}
          initialFocus
        />
        <div className="border-t border-border p-3">
          <TimePicker date={dateTime} setDate={setDateTime} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
