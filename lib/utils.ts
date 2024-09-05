import * as chrono from "chrono-node"
import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateDateString(suggestion: Date) {
  return format(suggestion, "MMM do yyyy, hh:mm a")
}

export function generateDate(suggestion: string) {
  return chrono.parseDate(suggestion)
}
