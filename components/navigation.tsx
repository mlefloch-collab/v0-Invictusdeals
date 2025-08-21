"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  Target,
  Briefcase,
  Settings,
  Bell,
  Menu,
  X,
  Search,
  Building2,
  FileText,
  CheckSquare,
  MessageCircle,
  StickyNote,
} from "lucide-react"
import { useState } from "react"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: BarChart3,
    description: "Overview and analytics",
  },
  { type: "divider" },
  {
    name: "Investment Targets",
    href: "/targets",
    icon: Target,
    description: "Track potential investments",
  },
  {
    name: "Opportunities",
    href: "/opportunities",
    icon: Briefcase,
    description: "Manage active deals",
  },
  {
    name: "Asset Manager",
    href: "/asset-manager",
    icon: Building2,
    description: "Manage asset managers",
  },
  { type: "divider" },
  {
    name: "Documents",
    href: "/documents",
    icon: FileText,
    description: "Document management",
  },
  {
    name: "To-Do",
    href: "/todo",
    icon: CheckSquare,
    description: "Task management",
  },
  {
    name: "Communications",
    href: "/communications",
    icon: MessageCircle,
    description: "Team communications",
  },
  {
    name: "Notes",
    href: "/notes",
    icon: StickyNote,
    description: "Personal notes",
  },
  { type: "divider" },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Configure preferences",
  },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-gray-900">
        <div className="flex flex-col flex-1">
          {/* Logo */}
          <div className="flex items-center h-14 px-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-slate-500 rounded flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-white">Pinnacle Capital</h1>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-3 py-4 space-y-1">
            {navigation.map((item, index) => {
              if (item.type === "divider") {
                return (
                  <div key={`divider-${index}`} className="my-3">
                    <div className="border-t border-gray-700"></div>
                  </div>
                )
              }

              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-xs font-medium rounded transition-colors",
                    isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50",
                  )}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* User Profile */}
          <div className="p-3">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                <AvatarFallback className="text-xs bg-gray-700 text-white">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-white truncate">John Doe</div>
                <div className="text-xs text-gray-400 truncate">Managing Partner</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Top Header Bar */}
      <div className="lg:ml-64 fixed top-0 left-0 right-0 z-40 h-14 bg-gray-900">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="hidden lg:flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Dashboards</span>
              <span className="text-sm text-gray-400">/</span>
              <span className="text-sm font-medium text-white">Default</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center bg-gray-800 rounded px-3 py-1.5">
              <Search className="h-3 w-3 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent text-xs text-white placeholder-gray-400 border-none outline-none w-32"
              />
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
              <AvatarFallback className="text-xs bg-gray-700 text-white">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-0 left-0 w-64 h-full bg-gray-900">
            <div className="flex items-center justify-between h-14 px-4">
              <h2 className="text-sm font-semibold text-white">Pinnacle Capital</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-3 space-y-1">
              {navigation.map((item, index) => {
                if (item.type === "divider") {
                  return (
                    <div key={`mobile-divider-${index}`} className="my-3">
                      <div className="border-t border-gray-700"></div>
                    </div>
                  )
                }

                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center px-3 py-2 text-xs font-medium rounded transition-colors",
                      isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50",
                    )}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
