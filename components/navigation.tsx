"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/components/theme-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BarChart3,
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
  Calendar,
  ChevronLeft,
  ChevronRight,
  Globe,
  ChevronDown,
  Check,
} from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: BarChart3,
    description: "Overview and analytics",
  },
  { type: "divider" },
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
    description: "Email communications",
  },
  {
    name: "Meetings",
    href: "/meetings",
    icon: Calendar,
    description: "Schedule and manage meetings",
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("EN")
  const [notificationOpen, setNotificationOpen] = useState(false)
  const { theme } = useTheme()

  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "FR", name: "Français", flag: "🇫🇷" },
    { code: "DE", name: "Deutsch", flag: "🇩🇪" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
    { code: "IT", name: "Italiano", flag: "🇮🇹" },
    { code: "PT", name: "Português", flag: "🇵🇹" },
  ]

  const notifications = [
    {
      id: 1,
      type: "mention",
      title: "You were mentioned in European Growth Fund III",
      description: "Sarah Chen mentioned you in a comment on the pre-screening report",
      time: "2 minutes ago",
      icon: MessageCircle,
      link: "/opportunities/1#report-canvas",
      unread: true,
    },
    {
      id: 2,
      type: "task",
      title: "Due diligence deadline approaching",
      description: "TechFlow Solutions due diligence review due tomorrow",
      time: "1 hour ago",
      icon: CheckSquare,
      link: "/todo",
      unread: true,
    },
    {
      id: 3,
      type: "activity",
      title: "New document uploaded",
      description: "Financial statements added to Nordic Healthcare Platform",
      time: "3 hours ago",
      icon: FileText,
      link: "/documents",
      unread: false,
    },
    {
      id: 4,
      type: "meeting",
      title: "Upcoming meeting reminder",
      description: "IC meeting for European Growth Fund III in 30 minutes",
      time: "4 hours ago",
      icon: Calendar,
      link: "/meetings",
      unread: false,
    },
    {
      id: 5,
      type: "mention",
      title: "Tagged in investment memo",
      description: "Michael Johnson tagged you in TechFlow Solutions investment memo",
      time: "1 day ago",
      icon: MessageCircle,
      link: "/opportunities/2",
      unread: false,
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved) {
      setSidebarCollapsed(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selected-language")
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    const sidebarWidth = sidebarCollapsed ? "64px" : "264px"
    document.documentElement.style.setProperty("--sidebar-width", sidebarWidth)
  }, [sidebarCollapsed])

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newState))
  }

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    localStorage.setItem("selected-language", languageCode)
    console.log(`[v0] Language changed to: ${languageCode}`)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 transition-all duration-300 ${
          sidebarCollapsed ? "lg:w-16" : "lg:w-64"
        } ${theme === "light" ? "bg-gray-50 border-r border-gray-200" : "bg-gray-900"}`}
      >
        <div className="flex flex-col flex-1">
          {/* Logo */}
          <div className="flex items-center h-14 px-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className={`text-sm font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    Pinnacle Capital
                  </h1>
                </div>
              )}
            </div>
          </div>

          <div className="px-3 leading-5 pb-2 pr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className={`w-full justify-center ${theme === "light" ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-3 space-y-1 py-0.5">
            {navigation.map((item, index) => {
              if (item.type === "divider") {
                return (
                  <div key={`divider-${index}`} className="my-3">
                    <div className={`border-t ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}></div>
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
                    sidebarCollapsed ? "justify-center" : "",
                    isActive
                      ? theme === "light"
                        ? "bg-gray-200 text-gray-900"
                        : "bg-gray-800 text-white"
                      : theme === "light"
                        ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                  )}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <item.icon className={`h-4 w-4 ${sidebarCollapsed ? "" : "mr-3"}`} />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </Link>
              )
            })}
          </div>

          {/* User Profile */}
          <div className="p-3">
            <div className={`flex items-center ${sidebarCollapsed ? "justify-center" : "space-x-2"}`}>
              {!sidebarCollapsed && <div className="flex-1 min-w-0"></div>}
            </div>
          </div>
        </div>
      </nav>

      {/* Top Header Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 h-14 transition-all duration-300 ${theme === "light" ? "bg-white border-b border-gray-200" : "bg-gray-900"}`}
      >
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`lg:hidden ${theme === "light" ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-gray-800"}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>

            <div className="hidden lg:flex items-center space-x-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/new-logo.png"
                  alt="Pinnacle Capital"
                  width={32}
                  height={32}
                  className={`${theme === "light" ? "brightness-100" : "brightness-0 invert"}`}
                />
              </div>
              <h1 className={`text-lg font-light ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Pinnacle Capital
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div
              className={`hidden md:flex items-center rounded px-3 py-1.5 ${theme === "light" ? "bg-gray-100" : "bg-gray-800"}`}
            >
              <Search className={`h-3 w-3 mr-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
              <input
                type="text"
                placeholder="Search"
                className={`bg-transparent text-xs border-none outline-none w-32 ${theme === "light" ? "text-gray-900 placeholder-gray-500" : "text-white placeholder-gray-400"}`}
              />
            </div>

            {/* Language Selector */}
            <div className="hidden lg:flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="text-black" asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center space-x-1 ${theme === "light" ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}
                  >
                    <Globe className="h-4 w-4 text-black" />
                    <span className="text-sm text-black text-black">{selectedLanguage}</span>
                    <ChevronDown className="h-3 w-3 text-black" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <span>{language.flag}</span>
                        <span>{language.name}</span>
                      </div>
                      {selectedLanguage === language.code && <Check className="h-4 w-4" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Bell Icon with Notification Dropdown */}
            <DropdownMenu open={notificationOpen} onOpenChange={setNotificationOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`relative ${theme === "light" ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-gray-800"}`}
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
                <div className="p-3 border-b">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                  {unreadCount > 0 && <p className="text-xs text-gray-500 mt-1">{unreadCount} unread</p>}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="p-0 cursor-pointer"
                      onClick={() => {
                        window.location.href = notification.link
                        setNotificationOpen(false)
                      }}
                    >
                      <div
                        className={`w-full p-3 flex items-start space-x-3 hover:bg-gray-50 ${notification.unread ? "bg-blue-50 border-l-2 border-l-blue-500" : ""}`}
                      >
                        <div
                          className={`p-1.5 rounded-full ${
                            notification.type === "mention"
                              ? "bg-blue-100 text-blue-600"
                              : notification.type === "task"
                                ? "bg-green-100 text-green-600"
                                : notification.type === "activity"
                                  ? "bg-purple-100 text-purple-600"
                                  : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          <notification.icon className="h-3 w-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium ${notification.unread ? "text-gray-900" : "text-gray-700"}`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{notification.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                        {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <div className="p-2 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setNotificationOpen(false)}
                  >
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
              <AvatarFallback
                className={`text-xs ${theme === "light" ? "bg-gray-200 text-gray-600" : "bg-gray-700 text-gray-300"}`}
              >
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className={`fixed top-0 left-0 w-64 h-full ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
            <div className="flex items-center justify-between h-14 px-4">
              <h2 className={`text-sm font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Pinnacle Capital
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className={`${theme === "light" ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-gray-800"}`}
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
                      <div className={`border-t ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}></div>
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
                      isActive
                        ? theme === "light"
                          ? "bg-gray-200 text-gray-900"
                          : "bg-gray-800 text-white"
                        : theme === "light"
                          ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          : "text-gray-400 hover:text-white hover:bg-gray-800",
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
