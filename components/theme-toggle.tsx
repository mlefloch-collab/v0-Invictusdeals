"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-white hover:bg-gray-800"
    >
      {theme === "light" ? <Moon className="h-4 w-4 text-black" /> : <Sun className="h-4 w-4" />}
    </Button>
  )
}
