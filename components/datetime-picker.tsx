"use client"

import { useEffect, useRef, useState } from "react"
import * as chrono from "chrono-node"
import { format } from "date-fns"
import { CalendarDays } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const defaultSuggestions = [
  "Tomorrow",
  "Tomorrow morning",
  "Tomorrow afternoon",
  "Tomorrow night",
  "Next Monday",
  "Next Sunday",
]

function generateDateString(suggestion: string) {
  const result = chrono.parseDate(suggestion)
  return format(result, "MMM do yyyy, hh:mm a")
}

function generateSuggestions(inputValue: string, suggestion: string) {
  if (!inputValue.length) {
    return defaultSuggestions
  }

  const filteredDefaultSuggestions = defaultSuggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(inputValue.toLowerCase())
  )
  if (filteredDefaultSuggestions.length) {
    return filteredDefaultSuggestions
  }

  return [suggestion].filter(Boolean)
}

export default function DatetimePicker() {
  const [suggestion, setSuggestion] = useState("")
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
      setSuggestion(e.target.value)
    } else {
      setSuggestion("")
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
      const dateStr = generateDateString(suggestions[selectedIndex])
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
    <div className="relative">
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
          className="w-96"
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
          <ul className="max-h-52 overflow-auto p-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                role="option"
                aria-selected={selectedIndex === index}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded px-2 py-1.5 text-sm",
                  index === selectedIndex && "bg-accent text-accent-foreground"
                )}
                onClick={() => {
                  const dateStr = generateDateString(suggestion)
                  setInputValue(dateStr)
                  closeDropdown()
                  inputRef.current?.focus()
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className="text-foreground">{suggestion}</span>
                <span className="text-xs text-muted-foreground">
                  {generateDateString(suggestion)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
