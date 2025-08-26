"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options...",
  className = "",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleToggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue]
    onChange(newValue)
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[40px] px-3 py-2 text-sm rounded-lg border flex items-center justify-between transition-colors ${
          theme === "light"
            ? "bg-white border-gray-300 text-gray-900 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            : "bg-gray-800 border-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        }`}
      >
        <span className={theme === "light" ? "text-gray-500" : "text-gray-400"}>{placeholder}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""} ${
            theme === "light" ? "text-gray-500" : "text-gray-400"
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 w-full mt-1 rounded-lg border shadow-lg max-h-60 overflow-auto ${
            theme === "light" ? "bg-white border-gray-300 shadow-sm" : "bg-gray-800 border-gray-600"
          }`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleToggleOption(option.value)}
              className={`w-full px-3 py-2 text-sm text-left flex items-center gap-2 hover:bg-gray-50 transition-colors ${
                theme === "light" ? "text-gray-900 hover:bg-gray-50" : "text-white hover:bg-gray-700"
              }`}
            >
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center ${
                  value.includes(option.value)
                    ? theme === "light"
                      ? "bg-gray-900 border-gray-900"
                      : "bg-blue-600 border-blue-600"
                    : theme === "light"
                      ? "border-gray-300"
                      : "border-gray-600"
                }`}
              >
                {value.includes(option.value) && <Check className="h-3 w-3 text-white" />}
              </div>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
