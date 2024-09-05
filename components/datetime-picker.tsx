"use client"

import { useEffect, useRef, useState } from "react"
import * as chrono from "chrono-node"
import { CalendarDays } from "lucide-react"

import { cn, generateDate, generateDateString } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const defaultSuggestions = [
  "Tomorrow",
  "Tomorrow morning",
  "Tomorrow night",
  "Next Monday",
  "Next Sunday",
]

function generateSuggestions(
  inputValue: string,
  suggestion: Suggestion | null
): Suggestion[] {
  if (!inputValue.length) {
    return defaultSuggestions.map((suggestion) => ({
      date: generateDate(suggestion),
      inputString: suggestion,
    }))
  }

  const filteredDefaultSuggestions = defaultSuggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(inputValue.toLowerCase())
  )
  if (filteredDefaultSuggestions.length) {
    return filteredDefaultSuggestions.map((suggestion) => ({
      date: generateDate(suggestion),
      inputString: suggestion,
    }))
  }

  return [suggestion].filter((suggestion) => suggestion !== null)
}

interface Suggestion {
  date: Date
  inputString: string
}

export default function DatetimePicker() {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setClosing] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const suggestions = generateSuggestions(inputValue, suggestion)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
    setIsOpen(true)
    setSelectedIndex(-1)
    const result = chrono.parseDate(e.target.value)
    if (result) {
      setSuggestion({ date: result, inputString: e.target.value })
    } else {
      setSuggestion(null)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      const dateStr = generateDateString(suggestions[selectedIndex].date)
      setInputValue(dateStr)
      closeDropdown()
    } else if (e.key === "Escape") {
      closeDropdown()
    }
  }

  function closeDropdown() {
    setClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setClosing(false)
    }, 200)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        closeDropdown()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full sm:w-96">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Tomorrow morning"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
        />
        <CalendarDays className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          role="dialog"
          className={cn(
            "absolute z-10 mt-2 w-full rounded-md border bg-popover p-0 shadow-md transition-all animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
            isClosing && "duration-300 animate-out fade-out-0 zoom-out-95"
          )}
        >
          <ul role="listbox" className="max-h-56 overflow-auto p-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion.inputString}
                role="option"
                aria-selected={selectedIndex === index}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-1 rounded px-2.5 py-2 text-sm",
                  index === selectedIndex && "bg-accent text-accent-foreground"
                )}
                onClick={() => {
                  const dateStr = generateDateString(suggestion.date)
                  setInputValue(dateStr)
                  closeDropdown()
                  inputRef.current?.focus()
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className="w-[110px] truncate xs:w-auto">
                  {suggestion.inputString}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {generateDateString(suggestion.date)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
