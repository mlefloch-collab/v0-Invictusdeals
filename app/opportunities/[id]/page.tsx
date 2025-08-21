"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Plus,
  ExternalLink,
  Flag,
  ChevronDown,
  ChevronUp,
  Users,
  Check,
  Edit,
  Trash2,
  Save,
} from "lucide-react"

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [showAllInfo, setShowAllInfo] = useState(false)
  const [editingTeam, setEditingTeam] = useState(false)
  const [editingFields, setEditingFields] = useState(false)
  const [showAllReports, setShowAllReports] = useState(false)
  const [showAllTodos, setShowAllTodos] = useState(false)
  const [showAllComms, setShowAllComms] = useState(false)
  const [showAllNotes, setShowAllNotes] = useState(false)
  const [showAllDocuments, setShowAllDocuments] = useState(false)

  const opportunity = {
    id: Number.parseInt(params.id),
    name:
      params.id === "1"
        ? "European Growth Fund III"
        : params.id === "2"
          ? "Nordic Healthcare Platform"
          : "TechFlow Solutions",
    owner: params.id === "1" ? "Emma Rodriguez" : params.id === "2" ? "Sarah Chen" : "Mark Kim",
    dateAdded: params.id === "1" ? "2025-01-20" : params.id === "2" ? "2025-01-17" : "2025-01-15",
    dateModified: params.id === "1" ? "2025-01-22" : params.id === "2" ? "2025-01-19" : "2025-01-18",
    priority: params.id === "1" ? "High" : params.id === "2" ? "Medium" : "Low",
    dealStatus: params.id === "1" ? "Pipeline" : params.id === "2" ? "Due Diligence" : "Rejected",
    investmentType: params.id === "1" ? "Fund" : params.id === "2" ? "Co-investment" : "Direct",
    assetClass: params.id === "1" ? "Venture Capital" : params.id === "2" ? "Private Equity" : "Technology",
    description:
      params.id === "1"
        ? "Multi-stage venture capital fund focusing on B2B SaaS companies in Europe"
        : params.id === "2"
          ? "Digital healthcare solutions serving 2M+ patients across Scandinavia"
          : "AI-powered workflow automation platform for enterprise clients",
    strategicFit: params.id === "1" ? "Excellent" : params.id === "2" ? "Good" : "Poor",
    value: params.id === "1" ? "$150M" : params.id === "2" ? "$85M" : "$45M",
    analyst: params.id === "1" ? "Emma Rodriguez" : params.id === "2" ? "Sarah Chen" : "Mark Kim",
    stage: params.id === "1" ? "Pre-Screening" : params.id === "2" ? "Due Diligence" : "Rejected",
    rejectionReason:
      params.id === "3"
        ? "Market size concerns and competitive landscape analysis revealed limited growth potential. Management team lacks experience in enterprise sales, which is critical for this business model."
        : null,
    rejectionStage: params.id === "3" ? "Pre-screening" : null,
  }

  const [fieldValues, setFieldValues] = useState(() => {
    const getTemplateFields = (investmentType: string) => {
      switch (investmentType) {
        case "Fund":
          return {
            "Opportunity Information": [
              { label: "Opportunity Name", value: opportunity.name },
              { label: "Asset Manager", value: "European Growth Partners" },
              { label: "Opportunity Description", value: opportunity.description },
              { label: "Asset Class", value: opportunity.assetClass },
              { label: "Sub Asset Class", value: "B2B SaaS" },
              { label: "Geography", value: "Europe" },
              { label: "Investment Strategy", value: "Capital gain/growth" },
            ],
            "Investment terms": [
              { label: "Fund Size", value: "$150M" },
              { label: "Target IRR Range %", value: "18-22%" },
              { label: "Target MOIC Range", value: "2.8-3.2x" },
              { label: "Target Yield Range %", value: "15-18%" },
              { label: "Target holding period (years)", value: "4-6" },
            ],
            "Timeline & process": [
              { label: "Receive Date", value: "2025-01-20" },
              { label: "Expected IC Date", value: "2025-02-20" },
              { label: "Closing Date", value: "2025-04-15" },
            ],
          }
        case "Co-investment":
          return {
            "Opportunity Information": [
              { label: "Opportunity Name", value: opportunity.name },
              { label: "Asset Manager", value: "Nordic Capital Partners" },
              { label: "Opportunity Description", value: opportunity.description },
              { label: "Stage", value: "Series B" },
              { label: "Security/Component", value: "Preferred Equity" },
              { label: "Geography", value: "Scandinavia" },
              { label: "Sector", value: "Healthcare Technology" },
              { label: "Investment Strategy", value: "Capital gain/growth" },
            ],
            "Investment terms": [
              { label: "Round size", value: "$85M" },
              { label: "Pre-money valuation", value: "$200M" },
              { label: "Target MOIC Range", value: "3-4x" },
              { label: "Target IRR Range %", value: "20-25%" },
              { label: "Target holding period (years)", value: "3-5" },
            ],
            "Timeline & process": [
              { label: "Receive Date", value: "2025-01-17" },
              { label: "Expected IC Date", value: "2025-02-15" },
              { label: "Closing Date", value: "2025-03-30" },
            ],
          }
        case "Direct":
        default:
          return {
            "Opportunity Information": [
              { label: "Opportunity Name", value: opportunity.name },
              { label: "Opportunity Description", value: opportunity.description },
              { label: "Stage", value: "Series A" },
              { label: "Security/Component", value: "Preferred Equity" },
              { label: "Geography", value: "North America" },
              { label: "Sector", value: "Enterprise Software" },
              { label: "Investment Strategy", value: "Capital gain/growth" },
            ],
            "Investment terms": [
              { label: "Round size", value: "$45M" },
              { label: "Pre-money valuation", value: "$120M" },
              { label: "Target MOIC Range", value: "2.5-3.5x" },
              { label: "Target IRR Range %", value: "18-22%" },
              { label: "Target holding period (years)", value: "4-6" },
            ],
            "Timeline & process": [
              { label: "Receive Date", value: "2025-01-15" },
              { label: "Expected IC Date", value: "2025-02-10" },
              { label: "Closing Date", value: "2025-03-15" },
            ],
          }
      }
    }
    return getTemplateFields(opportunity.investmentType)
  })

  const [dealTeam, setDealTeam] = useState([
    {
      id: 1,
      name: opportunity.owner,
      role: "Deal Lead",
      avatar: opportunity.owner
        .split(" ")
        .map((n) => n[0])
        .join(""),
    },
    { id: 2, name: "Mark Kim", role: "Support", avatar: "MK" },
    { id: 3, name: "Jennifer Liu", role: "Reviewer", avatar: "JL" },
  ])

  const dealStages =
    opportunity.dealStatus === "Rejected"
      ? [
          { name: "Pipeline", completed: true },
          { name: "Under Review", completed: true },
          { name: "Rejected", completed: true, current: true, rejected: true },
        ]
      : opportunity.dealStatus === "Due Diligence"
        ? [
            { name: "Pipeline", completed: true },
            { name: "Under Review", completed: true },
            { name: "Due Diligence", completed: true, current: true },
            { name: "Investment Committee", completed: false },
            { name: "Approved", completed: false },
          ]
        : [
            { name: "Pipeline", completed: true, current: true },
            { name: "Under Review", completed: false },
            { name: "Due Diligence", completed: false },
            { name: "Investment Committee", completed: false },
            { name: "Approved", completed: false },
          ]

  const currentStageIndex = dealStages.findIndex((stage) => stage.current)
  const progressPercentage = ((currentStageIndex + 1) / dealStages.length) * 100

  const deliverables = [
    { name: "Pre-Screening Report", status: "In Progress", type: "report" },
    { name: "IC Memorandum", status: "Not Started", type: "memo" },
    { name: "Due Diligence Report", status: "Not Started", type: "report" },
    { name: "Investment Committee Presentation", status: "Not Started", type: "presentation" },
  ]

  const reports = [
    { name: "Pre-Screening Report", status: "In Progress", type: "Pre-Screening" },
    { name: "IC Memo", status: "Not Started", type: "IC Memo" },
  ]

  const documents = [
    { name: "Pitch Deck", status: "Uploaded", type: "presentation", uploadDate: "2025-01-20", size: "2.4 MB" },
    { name: "Cap Table", status: "Uploaded", type: "spreadsheet", uploadDate: "2025-01-19", size: "156 KB" },
    { name: "Financial Statements", status: "Pending", type: "document", uploadDate: null, size: null },
    {
      name: "Management Presentation",
      status: "Uploaded",
      type: "presentation",
      uploadDate: "2025-01-18",
      size: "5.2 MB",
    },
  ]

  const todos = [
    { id: 1, task: "Complete market analysis", dueDate: "2025-01-25", completed: false },
    { id: 2, task: "Schedule management meeting", dueDate: "2025-01-24", completed: false },
    { id: 3, task: "Review financial statements", dueDate: "2025-01-26", completed: true },
    { id: 4, task: "Prepare IC presentation", dueDate: "2025-01-28", completed: false },
    { id: 5, task: "Conduct reference calls", dueDate: "2025-01-30", completed: false },
  ]

  const communications = [
    { id: 1, type: "Email", subject: "Initial screening completed", date: "2025-01-22", from: "Sarah Chen" },
    { id: 2, type: "Call", subject: "Management team discussion", date: "2025-01-21", from: "Mark Kim" },
    { id: 3, type: "Meeting", subject: "Due diligence kickoff", date: "2025-01-20", from: "Jennifer Liu" },
    { id: 4, type: "Email", subject: "Financial data request", date: "2025-01-19", from: "Sarah Chen" },
  ]

  const notes = [
    {
      id: 1,
      content: "Strong management team with proven track record in healthcare technology",
      date: "2025-01-22",
      author: "Sarah Chen",
    },
    {
      id: 2,
      content: "Market opportunity is significant with limited competition",
      date: "2025-01-21",
      author: "Sarah Chen",
    },
    {
      id: 3,
      content: "Revenue growth trajectory looks promising based on preliminary data",
      date: "2025-01-20",
      author: "Mark Kim",
    },
  ]

  const updateFieldValue = (sectionName: string, fieldIndex: number, newValue: string) => {
    setFieldValues((prev) => ({
      ...prev,
      [sectionName]: prev[sectionName].map((field, index) =>
        index === fieldIndex ? { ...field, value: newValue } : field,
      ),
    }))
  }

  const removeTeamMember = (id: number) => {
    setDealTeam((prev) => prev.filter((member) => member.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Not Started":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-14">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white"
            onClick={() => router.push("/opportunities")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Opportunities
          </Button>
        </div>

        {/* Top Header Card */}
        <Card className="bg-gray-800 border border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-xl font-semibold text-white mb-2">{opportunity.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Owner: {opportunity.owner}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Added: {opportunity.dateAdded}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Modified: {opportunity.dateModified}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-white text-gray-900 border-white font-medium px-3 py-1">
                    {opportunity.assetClass}
                  </Badge>
                  <Badge className="bg-white text-gray-900 border-white font-medium px-3 py-1">
                    {opportunity.investmentType}
                  </Badge>
                </div>
              </div>
              <Badge className={`${getPriorityColor(opportunity.priority)} border`}>
                <Flag className="h-3 w-3 mr-1" />
                {opportunity.priority} Priority
              </Badge>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">Deal Progress</span>
                <span className="text-sm text-gray-400">{Math.round(progressPercentage)}% Complete</span>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  {dealStages.map((stage, index) => (
                    <div key={stage.name} className="flex flex-col items-center flex-1">
                      <div className="flex items-center w-full">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                            stage.rejected
                              ? "bg-red-500 border-red-500 text-white"
                              : stage.completed
                                ? "bg-white border-white text-gray-900"
                                : stage.current
                                  ? "bg-gray-400 border-gray-400 text-gray-900"
                                  : "bg-gray-700 border-gray-600 text-gray-400"
                          }`}
                        >
                          {stage.rejected ? (
                            "✕"
                          ) : stage.completed ? (
                            <Check className="h-4 w-4" />
                          ) : stage.current ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-current" />
                          )}
                        </div>
                        {index < dealStages.length - 1 && (
                          <div
                            className={`flex-1 h-0.5 mx-2 ${
                              stage.completed ? (stage.rejected ? "bg-red-500" : "bg-white") : "bg-gray-600"
                            }`}
                          />
                        )}
                      </div>
                      <span
                        className={`text-xs mt-2 text-center font-medium ${
                          stage.rejected ? "text-red-400" : stage.current ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {stage.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-white mb-2">AI Progress Summary</h3>
              <p className="text-sm text-gray-300">
                {opportunity.dealStatus === "Rejected"
                  ? `Deal was rejected at ${opportunity.rejectionStage} stage. Mark Kim completed the initial assessment and determined this opportunity does not meet our investment criteria. The rejection was finalized on ${opportunity.dateModified} after thorough evaluation of market conditions and competitive positioning.`
                  : opportunity.dealStatus === "Due Diligence"
                    ? `${opportunity.owner} is leading the due diligence process for ${opportunity.name}. Financial analysis is 70% complete with legal review scheduled for next week. Management presentations are scheduled for February 5th and 8th. Critical action items: complete market sizing analysis by January 30th and finalize reference calls with existing customers.`
                    : `${opportunity.owner} needs to complete the initial screening for ${opportunity.name} by January 25th. Market analysis shows strong potential in the ${opportunity.assetClass.toLowerCase()} sector. Next steps include scheduling management meetings and preparing preliminary investment thesis. Priority focus on competitive positioning and scalability assessment.`}
              </p>
            </div>

            {opportunity.dealStatus === "Rejected" && opportunity.rejectionReason && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mt-4">
                <h3 className="text-sm font-medium text-red-400 mb-2">Rejection Reason</h3>
                <p className="text-sm text-red-300">{opportunity.rejectionReason}</p>
                <div className="mt-2 text-xs text-red-400">
                  Rejected at: {opportunity.rejectionStage} • Date: {opportunity.dateModified}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Panel - Opportunity Information */}
          <div className="space-y-4 min-h-full">
            <Card className="bg-gray-800 border border-gray-700 h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">Opportunity Information</CardTitle>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingFields(!editingFields)}
                    className="text-gray-400 hover:text-white h-8"
                  >
                    {editingFields ? <Save className="h-3 w-3 mr-1" /> : <Edit className="h-3 w-3 mr-1" />}
                    {editingFields ? "Save" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(fieldValues).map(([sectionName, fields]) => (
                  <div key={sectionName}>
                    <h3 className="text-sm font-semibold text-white mb-2 border-b border-gray-700 pb-1">
                      {sectionName}
                    </h3>
                    <div className="space-y-1">
                      {fields.map((field, index) => (
                        <div key={index} className="flex justify-between items-center py-1">
                          <span className="text-sm text-gray-400">{field.label}</span>
                          {editingFields ? (
                            <Input
                              value={field.value}
                              onChange={(e) => updateFieldValue(sectionName, index, e.target.value)}
                              className={`text-sm text-white font-medium bg-gray-700 border-gray-600 h-7 ${
                                field.label === "Opportunity Description" ? "text-right max-w-xs" : "max-w-32"
                              }`}
                            />
                          ) : (
                            <span
                              className={`text-sm text-white font-medium ${
                                field.label === "Opportunity Description" ? "text-right max-w-xs" : ""
                              }`}
                            >
                              {field.value}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border border-gray-700 h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Deal Team
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingTeam(!editingTeam)}
                    className="text-gray-400 hover:text-white h-8"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dealTeam.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-slate-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.role}</p>
                      </div>
                      {editingTeam && (
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-6 w-6 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeTeamMember(member.id)}
                            className="text-red-400 hover:text-red-300 h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  {editingTeam && (
                    <Button size="sm" className="bg-slate-500 hover:bg-slate-600 w-full h-8 text-sm">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Team Member
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="space-y-4 min-h-full">
            {/* Reports & Documents */}
            <Card className="bg-gray-800 border border-gray-700 h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">Reports & Documents</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Reports Subsection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white">Reports</h3>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowAllReports(!showAllReports)}
                      className="text-gray-400 hover:text-white h-7 text-xs"
                    >
                      {showAllReports ? "Show Less" : "View All"}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {(showAllReports ? reports : reports.slice(0, 2)).map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-white font-medium">{report.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(report.status)} text-xs border`}>{report.status}</Badge>
                          <ExternalLink className="h-4 w-4 text-gray-400 cursor-pointer hover:text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents Subsection */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white">Documents</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowAllDocuments(!showAllDocuments)}
                        className="text-gray-400 hover:text-white h-7 text-xs"
                      >
                        {showAllDocuments ? "Show Less" : "View All"}
                      </Button>
                      <Button size="sm" className="bg-slate-500 hover:bg-slate-600 h-7 text-xs">
                        <Plus className="h-3 w-3 mr-1" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {(showAllDocuments ? documents : documents.slice(0, 2)).map((document, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <div>
                            <span className="text-sm text-white font-medium block">{document.name}</span>
                            {document.size && (
                              <span className="text-xs text-gray-400">
                                {document.size} • {document.uploadDate}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(document.status)} text-xs border`}>
                            {document.status}
                          </Badge>
                          {document.status === "Uploaded" && (
                            <ExternalLink className="h-4 w-4 text-gray-400 cursor-pointer hover:text-white" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* To-Do */}
            <Card className="bg-gray-800 border border-gray-700 h-fit">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-white text-lg">To-Do</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowAllTodos(!showAllTodos)}
                    className="text-gray-400 hover:text-white h-7 text-xs"
                  >
                    {showAllTodos ? "Show Less" : "View All"}
                  </Button>
                  <Button size="sm" className="bg-slate-500 hover:bg-slate-600 h-7 text-xs">
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(showAllTodos ? todos : todos.slice(0, 2)).map((todo) => (
                    <div key={todo.id} className="flex items-center gap-2 p-2 bg-gray-700 rounded">
                      <div
                        className={`w-3 h-3 rounded border flex items-center justify-center ${
                          todo.completed ? "bg-green-500 border-green-500" : "border-gray-500"
                        }`}
                      >
                        {todo.completed && <Check className="h-2 w-2 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm ${todo.completed ? "text-gray-500 line-through" : "text-white"} truncate font-medium`}
                        >
                          {todo.task}
                        </p>
                        <p className="text-xs text-gray-400">{todo.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Communications */}
            <Card className="bg-gray-800 border border-gray-700 h-fit">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-white text-lg">Communications</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowAllComms(!showAllComms)}
                    className="text-gray-400 hover:text-white h-7 text-xs"
                  >
                    {showAllComms ? "Show Less" : "View All"}
                  </Button>
                  <Button size="sm" className="bg-slate-500 hover:bg-slate-600 h-7 text-xs">
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(showAllComms ? communications : communications.slice(0, 2)).map((comm) => (
                    <div key={comm.id} className="p-2 bg-gray-700 rounded">
                      <div className="flex items-center gap-1 mb-1">
                        <MessageSquare className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400 font-medium">{comm.type}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-400">{comm.date}</span>
                      </div>
                      <p className="text-sm text-white truncate font-medium">{comm.subject}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="bg-gray-800 border border-gray-700 h-fit">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-white text-lg">Notes</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowAllNotes(!showAllNotes)}
                    className="text-gray-400 hover:text-white h-7 text-xs"
                  >
                    {showAllNotes ? "Show Less" : "View All"}
                  </Button>
                  <Button size="sm" className="bg-slate-500 hover:bg-slate-600 h-7 text-xs">
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(showAllNotes ? notes : notes.slice(0, 1)).map((note) => (
                    <div key={note.id} className="p-2 bg-gray-700 rounded">
                      <p className="text-sm text-white mb-1 line-clamp-2 font-medium">{note.content}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <span>{note.author}</span>
                        <span>•</span>
                        <span>{note.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-gray-800 border border-gray-700">
          <CardContent className="p-4">
            <Button
              variant="ghost"
              onClick={() => setShowAllInfo(!showAllInfo)}
              className="text-gray-400 hover:text-white w-full justify-between"
            >
              <span className="text-base font-medium">View All Deal Information</span>
              {showAllInfo ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {showAllInfo && (
              <div className="mt-4 space-y-4 bg-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">Additional Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Strategic Fit:</span>
                        <span className="text-white">{opportunity.strategicFit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Value:</span>
                        <span className="text-white">{opportunity.value}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Analyst:</span>
                        <span className="text-white">{opportunity.analyst}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
