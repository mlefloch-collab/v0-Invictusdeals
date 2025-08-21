"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Search, Plus, Mail, Phone, Video, Calendar, Send } from "lucide-react"

const communications = [
  {
    id: 1,
    type: "Email",
    subject: "Nordic Healthcare Platform - Due Diligence Update",
    participants: ["Sarah Chen", "Michael Johnson", "Emma Rodriguez"],
    lastMessage: "The financial analysis is complete. Please review the attached report before our meeting tomorrow.",
    timestamp: "2025-01-20 14:30",
    opportunity: "Nordic Healthcare Platform",
    status: "Active",
    unread: 2,
    attachments: 1,
  },
  {
    id: 2,
    type: "Meeting",
    subject: "European Growth Fund III - Investment Committee Review",
    participants: ["Emma Rodriguez", "John Doe", "David Kim"],
    lastMessage: "Meeting scheduled for January 25th at 2:00 PM to discuss investment proposal.",
    timestamp: "2025-01-19 16:45",
    opportunity: "European Growth Fund III",
    status: "Scheduled",
    unread: 0,
    attachments: 0,
  },
  {
    id: 3,
    type: "Call",
    subject: "TechFlow Solutions - Rejection Feedback Discussion",
    participants: ["Mark Kim", "Sarah Williams"],
    lastMessage: "Call completed. Discussed areas for improvement and potential future opportunities.",
    timestamp: "2025-01-18 11:15",
    opportunity: "TechFlow Solutions",
    status: "Completed",
    unread: 0,
    attachments: 0,
  },
  {
    id: 4,
    type: "Email",
    subject: "Q4 Portfolio Review - Action Items",
    participants: ["John Doe", "All Team"],
    lastMessage: "Please complete your portfolio assessments by end of week. Template attached.",
    timestamp: "2025-01-17 09:00",
    opportunity: null,
    status: "Active",
    unread: 1,
    attachments: 2,
  },
  {
    id: 5,
    type: "Video Call",
    subject: "Blackstone Partnership Discussion",
    participants: ["Sarah Chen", "Michael Chen", "Lisa Wang"],
    lastMessage: "Great discussion on co-investment opportunities. Follow-up meeting scheduled.",
    timestamp: "2025-01-16 15:30",
    opportunity: null,
    status: "Completed",
    unread: 0,
    attachments: 0,
  },
]

export default function CommunicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedOpportunity, setSelectedOpportunity] = useState("All")

  const filteredCommunications = communications.filter(
    (comm) =>
      comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType === "All" || comm.type === selectedType) &&
      (selectedStatus === "All" || comm.status === selectedStatus) &&
      (selectedOpportunity === "All" ||
        (selectedOpportunity === "Unassigned" && !comm.opportunity) ||
        comm.opportunity === selectedOpportunity),
  )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Email":
        return <Mail className="h-4 w-4" />
      case "Call":
        return <Phone className="h-4 w-4" />
      case "Video Call":
        return <Video className="h-4 w-4" />
      case "Meeting":
        return <Calendar className="h-4 w-4" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Email":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Call":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Video Call":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "Meeting":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const opportunities = [
    "All",
    "Unassigned",
    ...Array.from(new Set(communications.filter((comm) => comm.opportunity).map((comm) => comm.opportunity))),
  ]

  return (
    <div className="min-h-screen bg-gray-900 pt-14">
      <div className="p-4 space-y-4">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4 text-gray-400" />
              <h1 className="text-sm font-medium text-white">Communications</h1>
              <span className="text-xs text-gray-400">({communications.length})</span>
            </div>
            <Button size="sm" className="h-7 text-xs bg-slate-500 hover:bg-slate-600 text-white">
              <Plus className="h-3 w-3 mr-1" />
              New Message
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Total</p>
                  <p className="text-lg font-bold text-white">89</p>
                </div>
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Unread</p>
                  <p className="text-lg font-bold text-white">12</p>
                </div>
                <Mail className="h-4 w-4 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Scheduled</p>
                  <p className="text-lg font-bold text-white">7</p>
                </div>
                <Calendar className="h-4 w-4 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">This Week</p>
                  <p className="text-lg font-bold text-white">15</p>
                </div>
                <Video className="h-4 w-4 text-white" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" />
            <Input
              placeholder="Search communications..."
              className="pl-7 h-8 text-xs bg-gray-800 text-white placeholder-gray-500 border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={selectedOpportunity}
            onChange={(e) => setSelectedOpportunity(e.target.value)}
            className="w-32 h-8 text-xs bg-gray-800 text-white border border-gray-700 rounded px-2"
          >
            {opportunities.map((opportunity) => (
              <option key={opportunity} value={opportunity}>
                {opportunity}
              </option>
            ))}
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-20 h-8 text-xs bg-gray-800 text-white border border-gray-700 rounded px-2"
          >
            <option value="All">All</option>
            <option value="Email">Email</option>
            <option value="Call">Call</option>
            <option value="Video Call">Video</option>
            <option value="Meeting">Meeting</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-20 h-8 text-xs bg-gray-800 text-white border border-gray-700 rounded px-2"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="space-y-2">
          {filteredCommunications.map((comm) => (
            <Card key={comm.id} className="bg-gray-800 border border-gray-700">
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white">{comm.subject}</h3>
                      <Badge className={`${getTypeColor(comm.type)} text-xs border`}>
                        {getTypeIcon(comm.type)}
                        <span className="ml-1">{comm.type}</span>
                      </Badge>
                      {comm.unread > 0 && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs border">
                          {comm.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{comm.lastMessage}</p>
                    {comm.opportunity && <p className="text-xs text-blue-400 mb-1">Related to: {comm.opportunity}</p>}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 h-7 text-xs px-2"
                    >
                      View
                    </Button>
                    <Button size="sm" className="bg-slate-500 hover:bg-slate-600 text-white h-7 text-xs px-2">
                      <Send className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-400">{comm.participants.length} participants</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-400">{comm.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge
                      className={`text-xs border ${comm.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" : comm.status === "Scheduled" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}
                    >
                      {comm.status}
                    </Badge>
                  </div>
                  <div className="flex -space-x-1">
                    {comm.participants.slice(0, 3).map((participant, index) => (
                      <Avatar key={index} className="h-5 w-5 border-2 border-gray-800">
                        <AvatarFallback className="text-xs bg-gray-700 text-gray-300">
                          {participant
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {comm.participants.length > 3 && (
                      <div className="h-5 w-5 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center">
                        <span className="text-xs text-gray-300">+{comm.participants.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
