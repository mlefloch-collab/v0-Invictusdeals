"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Calendar, Plus, ChevronLeft, ChevronRight, Clock, Users, Video } from "lucide-react"

export default function MeetingsPage() {
  const { theme } = useTheme()
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 21)) // January 21, 2025
  const [viewMode, setViewMode] = useState<"week" | "month">("week")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock meetings data with time slots
  const meetings = [
    {
      id: 1,
      title: "Management Presentation",
      opportunity: "European Growth Fund III",
      date: "2025-01-22",
      startTime: "10:00",
      endTime: "11:00",
      type: "Video Call",
      location: "Zoom",
      attendees: ["Sarah Chen", "Mark Kim", "John Doe"],
      status: "Scheduled",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Due Diligence Review",
      opportunity: "Nordic Healthcare Platform",
      date: "2025-01-23",
      startTime: "14:00",
      endTime: "15:30",
      type: "In Person",
      location: "Conference Room A",
      attendees: ["Emma Rodriguez", "Lisa Wang"],
      status: "Scheduled",
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Investment Committee",
      opportunity: "TechFlow Solutions",
      date: "2025-01-21",
      startTime: "09:00",
      endTime: "11:00",
      type: "Hybrid",
      location: "Boardroom / Teams",
      attendees: ["All Partners"],
      status: "Completed",
      color: "bg-purple-500",
    },
  ]

  const getWeekDays = (date: Date) => {
    const week = []
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay())

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8 // Start from 8 AM
    return `${hour.toString().padStart(2, "0")}:00`
  })

  const weekDays = getWeekDays(currentDate)
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const getMeetingsForDay = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return meetings.filter((meeting) => meeting.date === dateStr)
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7))
    setCurrentDate(newDate)
  }

  return (
    <div className={`min-h-screen pt-14 ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              
              <h1 className={`text-lg font-medium ${theme === "light" ? "text-black" : "text-white"}`}>Calendar</h1>
            </div>
            <Button
              size="sm"
              variant="outline"
              className={`transition-colors ${theme === "light" ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-100" : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"}`}
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <div className="flex items-center space-x-1">
              <Button
                size="sm"
                variant="ghost"
                className={`p-2 transition-colors ${theme === "light" ? "text-gray-600 hover:text-black hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                onClick={() => navigateWeek("prev")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className={`p-2 transition-colors ${theme === "light" ? "text-gray-600 hover:text-black hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                onClick={() => navigateWeek("next")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <h2 className={`text-lg font-medium ${theme === "light" ? "text-black" : "text-white"}`}>
              {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`flex rounded-lg p-1 ${theme === "light" ? "bg-gray-200" : "bg-gray-800"}`}>
              
            </div>
            <Button
              size="sm"
              className={`px-4 py-2 ${theme === "light" ? "bg-gray-900 hover:bg-gray-800 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create
            </Button>
          </div>
        </div>

        <div
          className={`rounded-xl overflow-hidden ${theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800 shadow-lg"}`}
        >
          {/* Week header */}
          <div
            className={`grid grid-cols-8 border-b ${theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-750"}`}
          >
            <div className="p-4">
              <span className={`text-xs font-medium ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                GMT+04
              </span>
            </div>
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`p-4 text-center border-l ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}
              >
                <div
                  className={`text-xs font-medium uppercase tracking-wide ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                >
                  {dayNames[index]}
                </div>
                <div
                  className={`text-xl font-medium mt-2 transition-colors ${
                    day.toDateString() === new Date().toDateString()
                      ? "bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto"
                      : theme === "light"
                        ? "text-black hover:text-blue-600"
                        : "text-white hover:text-blue-400"
                  }`}
                >
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Time slots and meetings */}
          <div className="grid grid-cols-8">
            {/* Time column */}
            <div
              className={`border-r ${theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-800"}`}
            >
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className={`h-16 border-b p-3 ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}
                >
                  <span className={`text-xs font-medium ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                    {time}
                  </span>
                </div>
              ))}
            </div>

            {/* Day columns */}
            {weekDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`border-l transition-colors ${theme === "light" ? "border-gray-200 hover:bg-gray-50" : "border-gray-700 hover:bg-gray-750"}`}
              >
                {timeSlots.map((time, timeIndex) => {
                  const dayMeetings = getMeetingsForDay(day)
                  const meetingAtTime = dayMeetings.find((meeting) => meeting.startTime === time)

                  return (
                    <div
                      key={timeIndex}
                      className={`h-16 border-b p-1 relative ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}
                    >
                      {meetingAtTime && (
                        <div
                          className={`${meetingAtTime.color} text-white p-2 rounded-lg text-xs cursor-pointer hover:opacity-90 transition-all duration-200 hover:shadow-md text-justify bg-slate-500`}
                        >
                          <div className="font-medium truncate">{meetingAtTime.title}</div>
                          <div className="text-xs opacity-90 truncate flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {meetingAtTime.startTime} - {meetingAtTime.endTime}
                          </div>
                          <div className="text-xs opacity-75 truncate">{meetingAtTime.opportunity}</div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          
          
          
        </div>
      </div>
    </div>
  )
}
