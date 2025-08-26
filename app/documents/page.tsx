"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MultiSelect } from "@/components/ui/multi-select"
import { useTheme } from "@/components/theme-provider"
import { FileText, Search, Plus, Download, Eye, Calendar, User, TrendingUp, Clock, CheckCircle } from "lucide-react"

const documents = [
  {
    id: 1,
    name: "Nordic Healthcare Platform - Due Diligence Report",
    type: "Due Diligence",
    category: "Investment Analysis",
    size: "2.4 MB",
    uploadedBy: "Sarah Chen",
    uploadedDate: "2025-01-20",
    status: "Final",
    tags: ["Healthcare", "Private Equity", "Due Diligence"],
    opportunity: "Nordic Healthcare Platform",
  },
  {
    id: 2,
    name: "European Growth Fund III - Fund Memorandum",
    type: "Fund Document",
    category: "Legal",
    size: "5.1 MB",
    uploadedBy: "Emma Rodriguez",
    uploadedDate: "2025-01-19",
    status: "Draft",
    tags: ["Fund", "Venture Capital", "Legal"],
    opportunity: "European Growth Fund III",
  },
  {
    id: 3,
    name: "TechFlow Solutions - Rejection Analysis",
    type: "Analysis",
    category: "Investment Analysis",
    size: "1.8 MB",
    uploadedBy: "Mark Kim",
    uploadedDate: "2025-01-18",
    status: "Final",
    tags: ["Technology", "Direct", "Analysis"],
    opportunity: "TechFlow Solutions",
  },
  {
    id: 4,
    name: "Q4 2024 Portfolio Performance Report",
    type: "Performance Report",
    category: "Portfolio Management",
    size: "3.2 MB",
    uploadedBy: "John Doe",
    uploadedDate: "2025-01-15",
    status: "Final",
    tags: ["Portfolio", "Performance", "Quarterly"],
    opportunity: null,
  },
  {
    id: 5,
    name: "Investment Committee Meeting Minutes - January 2025",
    type: "Meeting Minutes",
    category: "Governance",
    size: "0.8 MB",
    uploadedBy: "Sarah Chen",
    uploadedDate: "2025-01-14",
    status: "Final",
    tags: ["IC", "Minutes", "Governance"],
    opportunity: null,
  },
]

export default function DocumentsPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedOpportunities, setSelectedOpportunities] = useState<string[]>([])

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(doc.category)
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(doc.status)
    const matchesOpportunity =
      selectedOpportunities.length === 0 ||
      (selectedOpportunities.includes("Unassigned") && !doc.opportunity) ||
      (doc.opportunity && selectedOpportunities.includes(doc.opportunity))

    return matchesSearch && matchesCategory && matchesStatus && matchesOpportunity
  })

  const categoryOptions = Array.from(new Set(documents.map((doc) => doc.category))).map((cat) => ({
    value: cat,
    label: cat,
  }))

  const statusOptions = Array.from(new Set(documents.map((doc) => doc.status))).map((status) => ({
    value: status,
    label: status,
  }))

  const opportunityOptions = [
    { value: "Unassigned", label: "Unassigned" },
    ...Array.from(new Set(documents.filter((doc) => doc.opportunity).map((doc) => doc.opportunity!))).map((opp) => ({
      value: opp,
      label: opp,
    })),
  ]

  return (
    <div className={`min-h-screen pt-14 ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div
            className={`p-8 rounded-lg cursor-pointer transition-colors ${
              theme === "light" ? "bg-white hover:bg-gray-50 shadow-sm border-0" : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedCategories([])}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Total Documents</p>
                <p className={`text-2xl font-bold ${theme === "light" ? "text-black" : "text-white"}`}>
                  {documents.length}
                </p>
                <p className="text-sm text-green-400">+12% this month</p>
              </div>
              <FileText className={`h-6 w-6 ${theme === "light" ? "text-black" : "text-white"}`} />
            </div>
          </div>

          <div
            className={`p-8 rounded-lg cursor-pointer transition-colors ${
              theme === "light" ? "bg-white hover:bg-gray-50 shadow-sm border-0" : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedStatuses(["Draft"])}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>In Progress</p>
                <p className={`text-2xl font-bold ${theme === "light" ? "text-black" : "text-white"}`}>3</p>
                <p className="text-sm text-yellow-400">2 due today</p>
              </div>
              <Clock className={`h-6 w-6 ${theme === "light" ? "text-black" : "text-white"}`} />
            </div>
          </div>

          <div
            className={`p-8 rounded-lg cursor-pointer transition-colors ${
              theme === "light" ? "bg-white hover:bg-gray-50 shadow-sm border-0" : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedStatuses(["Final"])}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Completed</p>
                <p className={`text-2xl font-bold ${theme === "light" ? "text-black" : "text-white"}`}>18</p>
                <p className="text-sm text-green-400">+5 this week</p>
              </div>
              <CheckCircle className={`h-6 w-6 ${theme === "light" ? "text-black" : "text-white"}`} />
            </div>
          </div>

          <div
            className={`p-8 rounded-lg cursor-pointer transition-colors ${
              theme === "light" ? "bg-white hover:bg-gray-50 shadow-sm border-0" : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedOpportunities(["Unassigned"])}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Unassigned</p>
                <p className={`text-2xl font-bold ${theme === "light" ? "text-black" : "text-white"}`}>2</p>
                <p className="text-sm text-blue-400">Need review</p>
              </div>
              <TrendingUp className={`h-6 w-6 ${theme === "light" ? "text-black" : "text-white"}`} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <FileText className={`h-5 w-5 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
            <h1 className={`text-lg font-medium ${theme === "light" ? "text-black" : "text-white"}`}>Documents</h1>
            <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              ({filteredDocuments.length})
            </span>
          </div>
          <Button
            size="sm"
            className={`h-8 text-sm ${
              theme === "light"
                ? "bg-gray-900 hover:bg-gray-800 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Plus className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}
            />
            <Input
              placeholder="Search documents..."
              className={`pl-10 h-10 text-sm ${
                theme === "light"
                  ? "bg-white text-black placeholder-gray-500 border-gray-300 shadow-sm"
                  : "bg-gray-800 text-white placeholder-gray-500 border-0"
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            options={categoryOptions}
            value={selectedCategories}
            onChange={setSelectedCategories}
            placeholder="Filter by category..."
            className="w-40"
          />
          <MultiSelect
            options={statusOptions}
            value={selectedStatuses}
            onChange={setSelectedStatuses}
            placeholder="Filter by status..."
            className="w-32"
          />
        </div>

        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className={`p-8 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg ${
                theme === "light" ? "bg-white hover:bg-gray-50 shadow-sm border-0" : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className={`text-base font-medium ${theme === "light" ? "text-black" : "text-white"}`}>
                      {doc.name}
                    </h3>
                    <Badge className="bg-blue-500/20 text-blue-400 text-sm border-0">{doc.type}</Badge>
                    <Badge
                      className={`text-sm border-0 ${
                        doc.status === "Final" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {doc.status}
                    </Badge>
                  </div>
                  <div
                    className={`flex items-center gap-6 text-sm mb-3 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      {doc.size}
                    </span>
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {doc.uploadedBy}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {doc.uploadedDate}
                    </span>
                  </div>
                  {doc.opportunity && <p className="text-sm text-blue-400">Related to: {doc.opportunity}</p>}
                </div>
                <div className="flex items-center gap-3 ml-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-9 w-9 p-0 ${
                      theme === "light"
                        ? "text-gray-600 hover:text-black hover:bg-gray-100"
                        : "text-gray-400 hover:text-white hover:bg-gray-600"
                    }`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-9 w-9 p-0 ${
                      theme === "light"
                        ? "text-gray-600 hover:text-black hover:bg-gray-100"
                        : "text-gray-400 hover:text-white hover:bg-gray-600"
                    }`}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
