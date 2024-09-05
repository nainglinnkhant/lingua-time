// This file uses code from the time-picker component by OpenStatus
// Copyright (c) 2024 OpenStatus
// Licensed under the MIT License
// Source: https://github.com/openstatusHQ/time-picker

"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"

import { TimePeriodSelect } from "./period-select"
import { TimePickerInput } from "./time-picker-input"
import type { Period } from "./time-picker-utils"

interface TimePickerDemoProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

function calcCurrentPeriod(date: Date | undefined) {
  if (!date) return "AM"
  return new Date(date).getHours() >= 12 ? "PM" : "AM"
}

export function TimePicker({ date, setDate }: TimePickerDemoProps) {
  const currentPeriod = calcCurrentPeriod(date)
  const [period, setPeriod] = React.useState<Period>(currentPeriod)

  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)
  const periodRef = React.useRef<HTMLButtonElement>(null)

  // Update period when date is changed
  React.useEffect(() => {
    if (date) {
      setPeriod(calcCurrentPeriod(date))
    }
  }, [date])

  return (
    <div className="flex justify-center gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <TimePickerInput
          id="hours"
          picker="12hours"
          period={period}
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <TimePickerInput
          picker="minutes"
          id="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => periodRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="period" className="text-xs">
          Period
        </Label>
        <TimePeriodSelect
          period={period}
          setPeriod={setPeriod}
          date={date}
          setDate={setDate}
          ref={periodRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>
    </div>
  )
}
