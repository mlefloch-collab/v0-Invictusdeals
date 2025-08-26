"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { MultiSelect } from "@/components/ui/multi-select"
import { useTheme } from "@/components/theme-provider"
import { Mail, Search, Plus, Paperclip, Eye, Reply, Forward, AlertCircle, TrendingUp } from "lucide-react"

const emails = [
  {
    id: 1,
    subject: "Nordic Healthcare Platform - Investment Opportunity",
    sender: "Michael Johnson",
    senderEmail: "m.johnson@nordichealthcare.com",
    recipients: ["sarah.chen@pinnacle.com"],
    body: "Dear Sarah, I hope this email finds you well. I'm reaching out to discuss a potential investment opportunity in Nordic Healthcare Platform. We are a digital healthcare solutions company serving 2M+ patients across Scandinavia. We're currently raising €85M in Series B funding and would love to explore a partnership with Pinnacle Capital. Our revenue has grown 120% YoY and we have strong market traction. I've attached our pitch deck and financial statements for your review. Would you be available for a call next week to discuss further?",
    timestamp: "2025-01-20 14:30",
    opportunity: null, // Not yet in opportunities list
    status: "Unread",
    attachments: ["Nordic_Healthcare_Pitch_Deck.pdf", "Financial_Statements_Q4_2024.xlsx"],
    thread: 1,
    isNewOpportunity: true,
  },
  {
    id: 2,
    subject: "Re: European Growth Fund III - Due Diligence Update",
    sender: "Emma Rodriguez",
    senderEmail: "e.rodriguez@pinnacle.com",
    recipients: ["team@pinnacle.com"],
    body: "Team, I've completed the initial due diligence review for European Growth Fund III. The fund has an excellent track record with average IRR of 22% across their previous funds. I recommend we proceed to the next stage. Please find the detailed analysis attached.",
    timestamp: "2025-01-19 16:45",
    opportunity: "European Growth Fund III",
    status: "Read",
    attachments: ["DD_Analysis_European_Growth_Fund.pdf"],
    thread: 2,
    isNewOpportunity: false,
  },
  {
    id: 3,
    subject: "TechFlow Solutions - Follow-up Discussion",
    sender: "David Chen",
    senderEmail: "d.chen@techflow.com",
    recipients: ["mark.kim@pinnacle.com"],
    body: "Hi Mark, Thank you for the feedback on our investment proposal. While we're disappointed with the decision, we appreciate the detailed rationale. We're implementing the suggested improvements and would welcome the opportunity to reconnect in 12-18 months as you mentioned.",
    timestamp: "2025-01-18 11:15",
    opportunity: "TechFlow Solutions",
    status: "Read",
    attachments: [],
    thread: 3,
    isNewOpportunity: false,
  },
  {
    id: 4,
    subject: "Blackstone Partnership - Co-investment Opportunity",
    sender: "Lisa Wang",
    senderEmail: "l.wang@blackstone.com",
    recipients: ["john.doe@pinnacle.com"],
    body: "John, We have an exciting co-investment opportunity in the renewable energy sector that might align with Pinnacle's investment thesis. The target company is a leading offshore wind developer in Northern Europe. Deal size is approximately €275M. Would you be interested in a preliminary discussion?",
    timestamp: "2025-01-17 09:00",
    opportunity: null, // Not yet in opportunities list
    status: "Unread",
    attachments: ["Renewable_Energy_Opportunity_Overview.pdf"],
    thread: 4,
    isNewOpportunity: true,
  },
]

export default function CommunicationsPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedOpportunities, setSelectedOpportunities] = useState<string[]>([])
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null)
  const [selectedInbox, setSelectedInbox] = useState<string>("all")

  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(email.status)
    const matchesOpportunity =
      selectedOpportunities.length === 0 ||
      (selectedOpportunities.includes("Unassigned") && !email.opportunity) ||
      (email.opportunity && selectedOpportunities.includes(email.opportunity))

    return matchesSearch && matchesStatus && matchesOpportunity
  })

  const groupedEmails = {
    all: filteredEmails,
    unread: filteredEmails.filter((email) => email.status === "Unread"),
    "new-opportunities": filteredEmails.filter((email) => email.isNewOpportunity),
    attachments: filteredEmails.filter((email) => email.attachments.length > 0),
    unassigned: filteredEmails.filter((email) => !email.opportunity),
    "European Growth Fund III": filteredEmails.filter((email) => email.opportunity === "European Growth Fund III"),
    "TechFlow Solutions": filteredEmails.filter((email) => email.opportunity === "TechFlow Solutions"),
    "Nordic Healthcare Platform": filteredEmails.filter((email) => email.opportunity === "Nordic Healthcare Platform"),
  }

  const currentEmails = groupedEmails[selectedInbox] || []

  const statusOptions = [
    { value: "Unread", label: "Unread" },
    { value: "Read", label: "Read" },
  ]

  const opportunityOptions = [
    { value: "Unassigned", label: "Unassigned" },
    ...Array.from(new Set(emails.filter((email) => email.opportunity).map((email) => email.opportunity!))).map(
      (opp) => ({
        value: opp,
        label: opp,
      }),
    ),
  ]

  const handleCreateOpportunity = (email: any) => {
    console.log("Creating opportunity from email:", email.subject)
  }

  const handleViewEmail = (emailId: number) => {
    setSelectedEmail(emailId)
  }

  const selectedEmailData = selectedEmail ? emails.find((e) => e.id === selectedEmail) : null

  return (
    <div className={`min-h-screen pt-14 ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
      <div className="p-8 space-y-6">
        <div className="mb-6">
          <h1 className={`text-sm font-medium mb-1 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
            Communications
          </h1>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <Card
            className={`cursor-pointer transition-all hover:shadow-md ${theme === "light" ? "bg-white border-0 shadow-sm hover:shadow-lg" : "bg-gray-800 hover:bg-gray-750"}`}
            onClick={() => setSelectedInbox("all")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Total Emails</p>
                  <p className={`text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {emails.length}
                  </p>
                </div>
                <Mail className={`h-4 w-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all hover:shadow-md ${theme === "light" ? "bg-white border-0 shadow-sm hover:shadow-lg" : "bg-gray-800 hover:bg-gray-750"}`}
            onClick={() => setSelectedInbox("unread")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Unread</p>
                  <p className={`text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>2</p>
                </div>
                <AlertCircle className={`h-4 w-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all hover:shadow-md ${theme === "light" ? "bg-white border-0 shadow-sm hover:shadow-lg" : "bg-gray-800 hover:bg-gray-750"}`}
            onClick={() => setSelectedInbox("new-opportunities")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                    New Opportunities
                  </p>
                  <p className={`text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>2</p>
                </div>
                <TrendingUp className={`h-4 w-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all hover:shadow-md ${theme === "light" ? "bg-white border-0 shadow-sm hover:shadow-lg" : "bg-gray-800 hover:bg-gray-750"}`}
            onClick={() => setSelectedInbox("attachments")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Attachments</p>
                  <p className={`text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>5</p>
                </div>
                <Paperclip className={`h-4 w-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search
                    className={`absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                  />
                  <Input
                    placeholder="Search emails..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-7 text-xs h-8 w-64 ${theme === "light" ? "bg-white border-gray-300 text-black" : "bg-gray-800 border-0 text-white"}`}
                  />
                </div>
                <MultiSelect
                  options={opportunityOptions}
                  value={selectedOpportunities}
                  onChange={setSelectedOpportunities}
                  placeholder="Filter by opportunity..."
                  className="w-48"
                />
                <MultiSelect
                  options={statusOptions}
                  value={selectedStatuses}
                  onChange={setSelectedStatuses}
                  placeholder="Filter by status..."
                  className="w-40"
                />
              </div>
              <Button
                className={
                  theme === "light"
                    ? "bg-gray-900 hover:bg-gray-800 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Compose
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className={`text-sm font-medium mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
            {selectedInbox === "all" ? "All Emails" : selectedInbox}({currentEmails.length})
          </h3>
          <div className="space-y-2">
            {currentEmails.map((email) => (
              <div
                key={email.id}
                className={`p-4 rounded cursor-pointer transition-all duration-200 ${
                  selectedEmail === email.id ? "ring-1 ring-blue-500" : ""
                } ${theme === "light" ? "hover:bg-gray-50 border border-gray-200" : "hover:bg-gray-700 border border-gray-700"}`}
                onClick={() => handleViewEmail(email.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4
                        className={`text-sm truncate ${
                          email.status === "Unread"
                            ? theme === "light"
                              ? "font-semibold text-gray-900"
                              : "font-semibold text-white"
                            : theme === "light"
                              ? "text-gray-700"
                              : "text-gray-300"
                        }`}
                      >
                        {email.subject}
                      </h4>
                      {email.status === "Unread" && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      )}
                      {email.isNewOpportunity && (
                        <Badge className="bg-green-500/20 text-green-400 text-xs border-0 flex-shrink-0">New Opp</Badge>
                      )}
                    </div>
                    <p className={`text-xs mb-1 truncate ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      From: {email.sender}
                    </p>
                    <p
                      className={`text-xs line-clamp-2 break-words ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}
                    >
                      {email.body.substring(0, 100)}...
                    </p>
                    {email.opportunity && (
                      <p className="text-xs text-blue-400 mt-1 truncate">Related to: {email.opportunity}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end space-y-1 flex-shrink-0">
                    <span className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      {email.timestamp.split(" ")[1]}
                    </span>
                    {email.attachments.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Paperclip className={`h-3 w-3 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
                        <span className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                          {email.attachments.length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-6">
              {selectedEmailData ? (
                <div className="space-y-4">
                  <div className={`border-b pb-4 ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
                    <h3
                      className={`text-sm font-medium mb-2 break-words ${theme === "light" ? "text-gray-900" : "text-white"}`}
                    >
                      {selectedEmailData.subject}
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <Avatar className="h-6 w-6 flex-shrink-0">
                          <AvatarFallback
                            className={`text-xs ${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-700 text-white"}`}
                          >
                            {selectedEmailData.sender
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className={`text-xs truncate ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                            {selectedEmailData.sender}
                          </p>
                          <p className={`text-xs truncate ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                            {selectedEmailData.senderEmail}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs flex-shrink-0 ml-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                      >
                        {selectedEmailData.timestamp}
                      </span>
                    </div>
                    <p className={`text-xs break-words ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      To: {selectedEmailData.recipients.join(", ")}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p
                      className={`text-xs leading-relaxed break-words ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
                    >
                      {selectedEmailData.body}
                    </p>

                    {selectedEmailData.attachments.length > 0 && (
                      <div className="space-y-2">
                        <h4 className={`text-xs font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                          Attachments
                        </h4>
                        {selectedEmailData.attachments.map((attachment, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between p-2 rounded ${theme === "light" ? "bg-gray-100" : "bg-gray-700"}`}
                          >
                            <div className="flex items-center space-x-2 min-w-0 flex-1">
                              <Paperclip
                                className={`h-3 w-3 flex-shrink-0 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                              />
                              <span
                                className={`text-xs truncate ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
                              >
                                {attachment}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className={`h-6 px-2 flex-shrink-0 ${theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"}`}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedEmailData.isNewOpportunity && (
                      <div className="bg-green-500/10 border border-green-500/20 p-3 rounded">
                        <p className="text-xs text-green-400 mb-2">This email contains a potential new opportunity</p>
                        <Button
                          size="sm"
                          onClick={() => handleCreateOpportunity(selectedEmailData)}
                          className={
                            theme === "light"
                              ? "bg-gray-900 hover:bg-gray-800 text-white"
                              : "bg-green-600 hover:bg-green-700 text-white"
                          }
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Create Opportunity
                        </Button>
                      </div>
                    )}
                  </div>

                  <div
                    className={`flex items-center space-x-2 pt-4 border-t ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}
                  >
                    <Button
                      size="sm"
                      className={
                        theme === "light"
                          ? "bg-gray-900 hover:bg-gray-800 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={
                        theme === "light"
                          ? "border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
                          : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                      }
                    >
                      <Forward className="h-3 w-3 mr-1" />
                      Forward
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className={`flex items-center justify-center h-64 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                >
                  <div className="text-center">
                    <Mail className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Select an email to view details</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
