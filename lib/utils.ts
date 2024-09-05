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

const dateFormatRegex =
  /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([1-9]|[12]\d|3[01])(st|nd|rd|th)\s\d{4},\s(0\d|1[0-2]):([0-5]\d)\s(AM|PM)$/

export function isValidDateFormat(dateString: string) {
  return dateFormatRegex.test(dateString)
}
