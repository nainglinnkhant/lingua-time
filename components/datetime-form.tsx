"use client"

import { useState } from "react"
import { toast } from "sonner"

import { generateDateString } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import DateTimePicker from "@/components/datetime-picker"

export default function DateTimeForm() {
  const [dateTime, setDateTime] = useState<Date | undefined>(undefined)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (dateTime) {
      toast.success(`Selected time is ${generateDateString(dateTime)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-96">
      <DateTimePicker dateTime={dateTime} setDateTime={setDateTime} />

      <Button type="submit" size="sm" className="mt-3">
        Submit
      </Button>
    </form>
  )
}
