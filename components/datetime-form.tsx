"use client"

import { useState } from "react"
import { toast } from "sonner"

import { generateDateString } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import DateTimePicker from "@/components/datetime-picker"

export default function DateTimeForm() {
  const [dateTime, setDateTime] = useState<Date | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (dateTime) {
      toast.success(`Selected time is ${generateDateString(dateTime)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <DateTimePicker setDateTime={setDateTime} />

      <Button type="submit" size="sm" className="mt-4">
        Submit
      </Button>
    </form>
  )
}
