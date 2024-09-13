import * as chrono from "chrono-node"
import { format } from "date-fns"

export function generateDateString(date: Date) {
  return format(date, "MMM do yyyy, hh:mm a")
}

export function generateDate(date: string) {
  return chrono.parseDate(date)
}

const dateFormatRegex =
  /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([1-9]|[12]\d|3[01])(st|nd|rd|th)\s\d{4},\s(0\d|1[0-2]):([0-5]\d)\s(AM|PM)$/

export function isValidDateFormat(dateString: string) {
  return dateFormatRegex.test(dateString)
}
