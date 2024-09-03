"use client"

import * as chrono from "chrono-node"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import { format } from "date-fns"
import { CalendarDays } from "lucide-react"

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

  const filteredDefaultSuggestions = defaultSuggestions.filter(suggestion =>
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
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const suggestions = generateSuggestions(inputValue, suggestion)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex(prevIndex =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0))
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      const dateStr = generateDateString(suggestions[selectedIndex])
      setInputValue(dateStr)
      setIsOpen(false)
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
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
        <CalendarDays className="absolute top-1/2 -translate-y-1/2 right-3 size-4 text-muted-foreground" />
      </div>
      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          role="dialog"
          className="absolute z-10 mt-2 w-full rounded-md border bg-popover p-0 shadow-md"
        >
          <ul className="max-h-52 overflow-auto p-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                role="option"
                aria-selected={selectedIndex === index}
                className={`flex justify-between items-center cursor-pointer px-2 py-1.5 rounded text-sm ${
                  index === selectedIndex ? "bg-accent text-accent-foreground" : ""
                }`}
                onClick={() => {
                  const dateStr = generateDateString(suggestion)
                  setInputValue(dateStr)
                  setIsOpen(false)
                  inputRef.current?.focus()
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span>{suggestion}</span>
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
