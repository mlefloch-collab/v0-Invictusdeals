"use client"

import type React from "react"
import { useRouter } from "next/router"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MultiSelect } from "@/components/ui/multi-select"
import { useTheme } from "@/components/theme-provider"
import {
  Target,
  TrendingUp,
  FileText,
  Clock,
  CheckCircle,
  Search,
  LayoutGrid,
  BarChart3,
  User,
  Calendar,
  DollarSign,
  Plus,
  Columns3,
  X,
  Edit3,
  Upload,
  Link,
  Cloud,
  ArrowLeft,
  Check,
} from "lucide-react"

export default function OpportunitiesPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDealStatuses, setSelectedDealStatuses] = useState<string[]>([])
  const [selectedAssetClasses, setSelectedAssetClasses] = useState<string[]>([])
  const [selectedOwners, setSelectedOwners] = useState<string[]>([])
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState("MTD")

  const [showNewOpportunityModal, setShowNewOpportunityModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [creationMethod, setCreationMethod] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [webLinks, setWebLinks] = useState<string[]>([])
  const [newWebLink, setNewWebLink] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [newOpportunityId, setNewOpportunityId] = useState<number | null>(null)

  const periodData = {
    MTD: { newOpportunities: 23, dueDiligence: 34, pendingApproval: 8, approved: 156, rejected: 12 },
    YTD: { newOpportunities: 67, dueDiligence: 89, pendingApproval: 23, approved: 445, rejected: 34 },
    "Since Inception": {
      newOpportunities: 134,
      dueDiligence: 178,
      pendingApproval: 45,
      approved: 892,
      rejected: 78,
    },
  }

  const currentData = periodData[selectedPeriod]
  const activeDeals = currentData.newOpportunities + currentData.dueDiligence + currentData.pendingApproval

  const opportunities = [
    {
      id: 1,
      name: "European Growth Fund III",
      company: "EuroGrowth Partners",
      dealStatus: "Pipeline",
      stage: "Pre-Screening",
      progress: 94,
      investmentType: "Fund",
      description: "Multi-stage venture capital fund focusing on B2B SaaS companies in Europe",
      strategicFit: "Excellent",
      value: "$150M",
      assetClass: "Venture Capital",
      analyst: "Emma Rodriguez",
      dateAdded: "2025-01-20",
      todoCount: 2,
      sourcingMethod: "AI Sourced",
      priority: "High",
    },
    {
      id: 2,
      name: "Nordic Healthcare Platform",
      company: "HealthTech Nordics",
      dealStatus: "Due Diligence",
      stage: "Due Diligence",
      progress: 96,
      investmentType: "Co-investment",
      description: "Digital healthcare solutions serving 2M+ patients across Scandinavia",
      strategicFit: "Good",
      value: "$85M",
      assetClass: "Private Equity",
      analyst: "Sarah Chen",
      dateAdded: "2025-01-17",
      todoCount: 3,
      sourcingMethod: "AI Sourced",
      priority: "Medium",
    },
    {
      id: 3,
      name: "TechFlow Solutions",
      company: "TechFlow Inc.",
      dealStatus: "Rejected",
      stage: "Investment Committee",
      progress: 82,
      investmentType: "Direct",
      description: "AI-powered workflow automation platform for enterprise clients",
      strategicFit: "Poor",
      value: "$45M",
      assetClass: "Technology",
      analyst: "Mark Kim",
      dateAdded: "2025-01-15",
      todoCount: 0,
      sourcingMethod: "Web Scraping",
      priority: "Low",
    },
  ]

  const dealStatusOptions = [
    { value: "Pre-screening", label: "Pre-screening" },
    { value: "Due Diligence", label: "Due Diligence" },
    { value: "Investment Committee", label: "Investment Committee" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
    { value: "Closed", label: "Closed" },
    { value: "Pipeline", label: "Pipeline" },
  ]

  const assetClassOptions = [
    { value: "Private Equity", label: "Private Equity" },
    { value: "Venture Capital", label: "Venture Capital" },
    { value: "Real Estate", label: "Real Estate" },
    { value: "Infrastructure", label: "Infrastructure" },
    { value: "Hedge Funds", label: "Hedge Funds" },
    { value: "Technology", label: "Technology" },
  ]

  const ownerOptions = [
    { value: "Sarah Chen", label: "Sarah Chen" },
    { value: "Mark Kim", label: "Mark Kim" },
    { value: "Emma Rodriguez", label: "Emma Rodriguez" },
    { value: "David Park", label: "David Park" },
    { value: "Lisa Thompson", label: "Lisa Thompson" },
    { value: "Michael Chang", label: "Michael Chang" },
  ]

  const priorityOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ]

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDealStatus = selectedDealStatuses.length === 0 || selectedDealStatuses.includes(opp.dealStatus)
    const matchesAssetClass = selectedAssetClasses.length === 0 || selectedAssetClasses.includes(opp.assetClass)
    const matchesOwner = selectedOwners.length === 0 || selectedOwners.includes(opp.analyst)
    const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(opp.priority)

    return matchesSearch && matchesDealStatus && matchesAssetClass && matchesOwner && matchesPriority
  })

  const kanbanColumns = [
    { title: "Pre-Screening", status: "Pre-screening", color: "bg-yellow-400", headerColor: "bg-yellow-400" },
    { title: "Due Diligence", status: "Due Diligence", color: "bg-purple-400", headerColor: "bg-purple-400" },
    { title: "IC Review", status: "Investment Committee", color: "bg-orange-400", headerColor: "bg-orange-400" },
    { title: "Approved", status: "Approved", color: "bg-green-400", headerColor: "bg-green-400" },
    { title: "Rejected", status: "Rejected", color: "bg-red-400", headerColor: "bg-red-400" },
  ]

  const getOpportunitiesByStatus = (status: string) => {
    return filteredOpportunities.filter((opp) => opp.dealStatus === status)
  }

  const getStrategicFitColor = (fit: string) => {
    switch (fit) {
      case "Excellent":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Good":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Fair":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Poor":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStageColor = (stage: string) => {
    return "bg-gray-500/20 text-white border-gray-500/30"
  }

  const getInvestmentTypeColor = (type: string) => {
    return "bg-gray-500/20 text-white border-gray-500/30"
  }

  const getSourcingMethodColor = (method: string) => {
    switch (method) {
      case "AI Sourced":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Manual Entry":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      case "Email":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Web Scraping":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
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

  const handleNewOpportunity = () => {
    console.log("[v0] Creating new opportunity")
    setShowNewOpportunityModal(true)
    setCurrentStep(1)
    setCreationMethod("")
  }

  const handleMethodSelection = (method: string) => {
    setCreationMethod(method)
    if (method === "scratch") {
      // For "Start from Scratch", skip to final step
      handleCreateOpportunity()
    } else {
      // For "Use Data Sources", go to step 2
      setCurrentStep(2)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const handleAddWebLink = () => {
    if (newWebLink.trim()) {
      setWebLinks((prev) => [...prev, newWebLink.trim()])
      setNewWebLink("")
    }
  }

  const handleRemoveWebLink = (index: number) => {
    setWebLinks((prev) => prev.filter((_, i) => i !== index))
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleCreateOpportunity = () => {
    // Simulate opportunity creation
    const newId = Math.max(...opportunities.map((o) => o.id)) + 1
    setNewOpportunityId(newId)
    setShowNewOpportunityModal(false)
    setShowConfirmation(true)

    // Reset form
    setCurrentStep(1)
    setCreationMethod("")
    setUploadedFiles([])
    setWebLinks([])
    setNewWebLink("")
  }

  const handleViewOpportunity = () => {
    if (newOpportunityId) {
      router.push(`/opportunities/${newOpportunityId}`)
    }
    setShowConfirmation(false)
    setNewOpportunityId(null)
  }

  const handleCloseModal = () => {
    setShowNewOpportunityModal(false)
    setCurrentStep(1)
    setCreationMethod("")
    setUploadedFiles([])
    setWebLinks([])
    setNewWebLink("")
  }

  const handleViewDetails = (id: number) => {
    router.push(`/opportunities/${id}`)
  }

  const handleToDo = (id: number) => {
    console.log(`Handling to-do for opportunity with ID ${id}`)
    // Implement logic to handle to-do items
  }

  return (
    <div className={`min-h-screen pt-14 ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className={`text-lg font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>Opportunities</h1>
          <Button className="hover:bg-slate-600 text-white text-xs bg-black" onClick={handleNewOpportunity}>
            <Plus className="h-3 w-3 mr-1" />
            New Opportunity
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <span className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Period:</span>
            <div className="flex space-x-1">
              {["MTD", "YTD", "Since Inception"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-2 py-1 text-xs rounded ${
                    selectedPeriod === period
                      ? theme === "light"
                        ? "bg-gray-300 text-gray-900"
                        : "bg-slate-600 text-white"
                      : theme === "light"
                        ? "text-gray-600 hover:text-gray-900"
                        : "text-gray-400 hover:text-white"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className={`h-3 w-3 ${theme === "light" ? "text-black" : "text-white"}`} />
              </div>
              <div>
                <p className={`text-lg font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
                  {activeDeals}
                </p>
                <p className={`text-xs mb-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  Total Active Deals
                </p>
                <p className="text-xs text-green-400">+12% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className={`h-3 w-3 ${theme === "light" ? "text-black" : "text-white"}`} />
              </div>
              <div>
                <p className={`text-lg font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
                  {currentData.newOpportunities}
                </p>
                <p className={`text-xs mb-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  New Opportunities
                </p>
                <p className="text-xs text-green-400">+15% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <FileText className={`h-3 w-3 ${theme === "light" ? "text-black" : "text-white"}`} />
              </div>
              <div>
                <p className={`text-lg font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
                  {currentData.dueDiligence}
                </p>
                <p className={`text-xs mb-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  In Due Diligence
                </p>
                <p className="text-xs text-green-400">+8% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className={`h-3 w-3 ${theme === "light" ? "text-black" : "text-white"}`} />
              </div>
              <div>
                <p className={`text-lg font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
                  {currentData.pendingApproval}
                </p>
                <p className={`text-xs mb-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  Pending Approval
                </p>
                <p className="text-xs text-red-400">-2% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className={`h-3 w-3 ${theme === "light" ? "text-black" : "text-white"}`} />
              </div>
              <div>
                <p className={`text-lg font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
                  {currentData.approved}
                </p>
                <p className={`text-xs mb-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Approved</p>
                <p className="text-xs text-green-400">+18% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <X className={`h-3 w-3 ${theme === "light" ? "text-black" : "text-white"}`} />
              </div>
              <div>
                <p className={`text-lg font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
                  {currentData.rejected}
                </p>
                <p className={`text-xs mb-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Rejected</p>
                <p className="text-xs text-red-400">+5% from last month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
              />
              <Input
                placeholder="Search opportunities..."
                className={`pl-10 text-sm ${theme === "light" ? "bg-white border-gray-300 text-black placeholder-gray-500" : "bg-gray-800 border border-gray-700 text-white placeholder-gray-400"}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MultiSelect
              options={dealStatusOptions}
              value={selectedDealStatuses}
              onChange={setSelectedDealStatuses}
              placeholder="Filter by deal status..."
              className="w-48"
            />
            <MultiSelect
              options={assetClassOptions}
              value={selectedAssetClasses}
              onChange={setSelectedAssetClasses}
              placeholder="Filter by asset class..."
              className="w-48"
            />
            <MultiSelect
              options={ownerOptions}
              value={selectedOwners}
              onChange={setSelectedOwners}
              placeholder="Filter by owner..."
              className="w-40"
            />
            <MultiSelect
              options={priorityOptions}
              value={selectedPriorities}
              onChange={setSelectedPriorities}
              placeholder="Filter by priority..."
              className="w-40"
            />

            <div
              className={`flex rounded-md ${theme === "light" ? "border border-gray-300 bg-white" : "border border-gray-700 bg-gray-800"}`}
            >
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-slate-500 text-white"
                    : theme === "light"
                      ? "text-gray-600 hover:text-black"
                      : "text-gray-400 hover:text-white"
                }
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "kanban" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("kanban")}
                className={
                  viewMode === "kanban"
                    ? "bg-slate-500 text-white"
                    : theme === "light"
                      ? "text-gray-600 hover:text-black hover:bg-gray-100"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                }
              >
                <Columns3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {viewMode === "kanban" ? (
          <div className="flex gap-4 overflow-x-auto pb-6">
            {kanbanColumns.map((column) => (
              <div key={column.status} className="flex-shrink-0 w-72">
                {/* Modern Column Header */}
                <div
                  className={`rounded-t-xl p-3 border-b-0 ${theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800 border border-gray-700"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                      <h3 className={`text-sm font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
                        {column.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${theme === "light" ? "text-gray-600 bg-gray-200" : "text-gray-400 bg-gray-700"}`}
                      >
                        {getOpportunitiesByStatus(column.status).length}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-6 w-6 p-0 ${theme === "light" ? "text-gray-600 hover:text-black hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                        onClick={handleNewOpportunity}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Modern Column Content */}
                <div
                  className={`border border-t-0 rounded-b-xl p-3 min-h-[500px] space-y-2 ${theme === "light" ? "bg-gray-50 border-0" : "bg-gray-800/50 border-gray-700"}`}
                >
                  {getOpportunitiesByStatus(column.status).map((opportunity) => (
                    <Card
                      key={opportunity.id}
                      className={`transition-all duration-200 cursor-pointer group ${theme === "light" ? "bg-white border-0 shadow-sm hover:shadow-md" : "bg-gray-800 border border-gray-700 hover:border-gray-600 hover:shadow-lg"}`}
                      onClick={() => handleViewDetails(opportunity.id)}
                    >
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          {/* Opportunity Name */}
                          <h4
                            className={`text-sm font-semibold leading-tight group-hover:text-blue-400 transition-colors ${theme === "light" ? "text-black" : "text-white"}`}
                          >
                            {opportunity.name}
                          </h4>

                          {/* Short Description */}
                          <p
                            className={`text-xs leading-relaxed line-clamp-2 mb-3 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {opportunity.description}
                          </p>

                          {/* Badges Row */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <Badge
                              className={`${getInvestmentTypeColor(opportunity.investmentType)} text-xs px-2 py-0.5 font-medium`}
                            >
                              {opportunity.investmentType}
                            </Badge>
                            <Badge
                              className={`${getPriorityColor(opportunity.priority)} text-xs px-2 py-0.5 font-medium`}
                            >
                              {opportunity.priority}
                            </Badge>
                          </div>

                          {/* Asset Class */}
                          <div
                            className={`pt-1 ${theme === "light" ? "border-t border-gray-200" : "border-t border-gray-700"}`}
                          >
                            <p className={`text-xs mb-1 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                              Asset Class
                            </p>
                            <p className={`text-xs font-medium ${theme === "light" ? "text-black" : "text-white"}`}>
                              {opportunity.assetClass}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add New Card */}
                  {getOpportunitiesByStatus(column.status).length === 0 && (
                    <div
                      className={`flex items-center justify-center h-32 border-2 border-dashed rounded-lg ${theme === "light" ? "border-gray-300" : "border-gray-600"}`}
                    >
                      <div className="text-center">
                        <div className={`mb-2 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                          No opportunities
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={
                            theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"
                          }
                          onClick={handleNewOpportunity}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add first
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`text-sm font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
                          {opportunity.name}
                        </h3>
                        <Badge
                          className={`${getStageColor(opportunity.stage)} text-xs border bg-slate-400 border-transparent`}
                        >
                          {opportunity.stage}
                        </Badge>
                        <Badge className={`${getPriorityColor(opportunity.priority)} text-xs border`}>
                          {opportunity.priority}
                        </Badge>
                      </div>
                      <p
                        className={`mb-2 text-xs leading-relaxed ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                      >
                        {opportunity.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        className={`text-xs px-3 py-1 border-transparent ${theme === "light" ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"}`}
                        onClick={() => handleViewDetails(opportunity.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        className="hover:bg-slate-600 text-white relative text-xs px-3 py-1 bg-black"
                        onClick={() => handleToDo(opportunity.id)}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        To-Do
                        {opportunity.todoCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            {opportunity.todoCount}
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Existing grid layout code */}
                  <div className="grid grid-cols-5 gap-2">
                    <div className="flex items-center gap-2">
                      <BarChart3 className={`h-3 w-3 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
                      <div>
                        <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                          Strategic Fit
                        </p>
                        <Badge
                          className={`${getStrategicFitColor(opportunity.strategicFit)} text-xs border px-2 py-0.5`}
                        >
                          {opportunity.strategicFit}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className={`h-3 w-3 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
                      <div>
                        <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>Type</p>
                        <p className={`text-sm font-medium ${theme === "light" ? "text-black" : "text-white"}`}>
                          {opportunity.investmentType}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <TrendingUp className={`h-3 w-3 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
                      <div>
                        <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                          Asset Class
                        </p>
                        <p className={`text-sm font-medium ${theme === "light" ? "text-black" : "text-white"}`}>
                          {opportunity.assetClass}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className={`h-3 w-3 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
                      <div>
                        <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>Analyst</p>
                        <p className={`text-sm font-medium ${theme === "light" ? "text-black" : "text-white"}`}>
                          {opportunity.analyst}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className={`h-3 w-3 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
                      <div>
                        <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>Date Added</p>
                        <p className={`text-sm font-medium ${theme === "light" ? "text-black" : "text-white"}`}>
                          {opportunity.dateAdded}
                        </p>
                      </div>
                    </div>
                  </div>

                  
                  
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {showNewOpportunityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg ${theme === "light" ? "bg-white" : "bg-gray-800"}`}
          >
            {/* Modal Header */}
            <div
              className={`flex items-center justify-between p-6 border-b ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}
            >
              <div>
                <h2 className={`text-xl font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
                  Create New Opportunity
                </h2>
                <p className={`text-sm mt-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  {currentStep === 1 ? "Choose how you want to create your opportunity" : "Add your data sources"}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className={`p-2 rounded-lg hover:bg-gray-100 ${theme === "light" ? "text-gray-500 hover:bg-gray-100" : "text-gray-400 hover:bg-gray-700"}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  Step {currentStep} of 4
                </span>
                <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  {currentStep === 1 ? "Select Method" : "Add Data Sources"}
                </span>
              </div>
              <div className={`w-full h-2 rounded-full ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`}>
                <div
                  className="h-2 bg-black rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {currentStep === 1 && (
                <div>
                  <div className="text-center mb-8">
                    <h3 className={`text-lg font-semibold mb-2 ${theme === "light" ? "text-black" : "text-white"}`}>
                      How would you like to create this opportunity?
                    </h3>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Choose the method that best fits your workflow
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Start from Scratch */}
                    <button
                      onClick={() => handleMethodSelection("scratch")}
                      className={`p-8 rounded-lg border-2 border-dashed transition-all hover:border-solid ${
                        theme === "light"
                          ? "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                          : "border-gray-600 hover:border-gray-500 hover:bg-gray-700"
                      }`}
                    >
                      <div className="text-center">
                        <div
                          className={`w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center ${theme === "light" ? "bg-blue-100" : "bg-blue-900/30"}`}
                        >
                          <Edit3 className={`h-8 w-8 ${theme === "light" ? "text-blue-600" : "text-blue-400"}`} />
                        </div>
                        <h4 className={`text-lg font-semibold mb-2 ${theme === "light" ? "text-black" : "text-white"}`}>
                          Start from Scratch
                        </h4>
                        <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                          Create a new opportunity manually by filling out all the details yourself.
                        </p>
                      </div>
                    </button>

                    {/* Use Data Sources */}
                    <button
                      onClick={() => handleMethodSelection("data-sources")}
                      className={`p-8 rounded-lg border-2 border-dashed transition-all hover:border-solid ${
                        theme === "light"
                          ? "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                          : "border-gray-600 hover:border-gray-500 hover:bg-gray-700"
                      }`}
                    >
                      <div className="text-center">
                        <div
                          className={`w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center ${theme === "light" ? "bg-green-100" : "bg-green-900/30"}`}
                        >
                          <div className="flex items-center gap-1">
                            <Upload className={`h-6 w-6 ${theme === "light" ? "text-green-600" : "text-green-400"}`} />
                            <Link className={`h-6 w-6 ${theme === "light" ? "text-green-600" : "text-green-400"}`} />
                          </div>
                        </div>
                        <h4 className={`text-lg font-semibold mb-2 ${theme === "light" ? "text-black" : "text-white"}`}>
                          Use Data Sources
                        </h4>
                        <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                          Upload documents and add web links to automatically extract and populate opportunity
                          information.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className="flex items-center mb-6">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className={`flex items-center gap-2 text-sm ${theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"}`}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  </div>

                  <div className="text-center mb-8">
                    <h3 className={`text-lg font-semibold mb-2 ${theme === "light" ? "text-black" : "text-white"}`}>
                      Add Data Sources
                    </h3>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Upload documents and add web links to extract opportunity information
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Document Upload */}
                    <div>
                      <h4
                        className={`text-base font-semibold mb-4 flex items-center gap-2 ${theme === "light" ? "text-black" : "text-white"}`}
                      >
                        <FileText className="h-5 w-5" />
                        Document Upload
                      </h4>

                      {/* Upload from Computer */}
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center ${theme === "light" ? "border-gray-300" : "border-gray-600"}`}
                      >
                        <Upload
                          className={`h-8 w-8 mx-auto mb-3 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}
                        />
                        <h5 className={`font-medium mb-2 ${theme === "light" ? "text-black" : "text-white"}`}>
                          Upload from Computer
                        </h5>
                        <p className={`text-sm mb-3 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                          PDF, DOCX, PPTX files up to 10MB each
                        </p>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.docx,.pptx"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className={`inline-block px-4 py-2 text-sm rounded-lg cursor-pointer ${theme === "light" ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                        >
                          Choose Files
                        </label>
                      </div>

                      {/* Upload from Google Drive */}
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center ${theme === "light" ? "border-gray-300" : "border-gray-600"}`}
                      >
                        <Cloud
                          className={`h-8 w-8 mx-auto mb-3 ${theme === "light" ? "text-blue-400" : "text-blue-500"}`}
                        />
                        <h5 className={`font-medium mb-2 ${theme === "light" ? "text-black" : "text-white"}`}>
                          Upload from Google Drive
                        </h5>
                        <p className={`text-sm mb-3 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                          Select files from your Google Drive
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className={
                            theme === "light"
                              ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                              : "border-gray-600 text-gray-300 hover:bg-gray-700"
                          }
                        >
                          Choose Files
                        </Button>
                      </div>

                      {/* Uploaded Files List */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4">
                          <h6 className={`text-sm font-medium mb-2 ${theme === "light" ? "text-black" : "text-white"}`}>
                            Uploaded Files ({uploadedFiles.length})
                          </h6>
                          <div className="space-y-2">
                            {uploadedFiles.map((file, index) => (
                              <div
                                key={index}
                                className={`flex items-center justify-between p-2 rounded ${theme === "light" ? "bg-gray-100" : "bg-gray-700"}`}
                              >
                                <span className={`text-sm ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                                  {file.name}
                                </span>
                                <button
                                  onClick={() => handleRemoveFile(index)}
                                  className={`text-red-500 hover:text-red-700`}
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Web Links */}
                    <div>
                      <h4
                        className={`text-base font-semibold mb-4 flex items-center gap-2 ${theme === "light" ? "text-black" : "text-white"}`}
                      >
                        <Link className="h-5 w-5" />
                        Web Links
                      </h4>

                      <div className="flex gap-2 mb-4">
                        <Input
                          placeholder="Enter website URL (e.g., https://company.com)"
                          value={newWebLink}
                          onChange={(e) => setNewWebLink(e.target.value)}
                          className={
                            theme === "light"
                              ? "bg-white border-gray-300 text-black"
                              : "bg-gray-700 border-gray-600 text-white"
                          }
                          onKeyPress={(e) => e.key === "Enter" && handleAddWebLink()}
                        />
                        <Button onClick={handleAddWebLink} className="bg-gray-900 hover:bg-gray-800 text-white">
                          Add
                        </Button>
                      </div>

                      <p className={`text-xs mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        Add company websites, pitch decks, news articles, or any relevant web content
                      </p>

                      {/* Web Links List */}
                      {webLinks.length > 0 && (
                        <div>
                          <h6 className={`text-sm font-medium mb-2 ${theme === "light" ? "text-black" : "text-white"}`}>
                            Added Links ({webLinks.length})
                          </h6>
                          <div className="space-y-2">
                            {webLinks.map((link, index) => (
                              <div
                                key={index}
                                className={`flex items-center justify-between p-2 rounded ${theme === "light" ? "bg-gray-100" : "bg-gray-700"}`}
                              >
                                <span
                                  className={`text-sm truncate ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
                                >
                                  {link}
                                </span>
                                <button
                                  onClick={() => handleRemoveWebLink(index)}
                                  className={`text-red-500 hover:text-red-700 ml-2`}
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                    <Button
                      variant="outline"
                      onClick={handleCloseModal}
                      className={theme === "light" ? "border-gray-300 text-gray-700" : "border-gray-600 text-gray-300"}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateOpportunity}
                      className="bg-gray-900 hover:bg-gray-800 text-white"
                      disabled={uploadedFiles.length === 0 && webLinks.length === 0}
                    >
                      Create Opportunity
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-lg p-6 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${theme === "light" ? "bg-green-100" : "bg-green-900/30"}`}
              >
                <Check className={`h-8 w-8 ${theme === "light" ? "text-green-600" : "text-green-400"}`} />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${theme === "light" ? "text-black" : "text-white"}`}>
                Opportunity Created Successfully
              </h3>
              <p className={`text-sm mb-6 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                Your new opportunity has been created and a pre-screening report has been auto-generated.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    if (newOpportunityId) {
                      router.push(`/opportunities/${newOpportunityId}?openReport=true`)
                    }
                  }}
                  variant="outline"
                  className={`w-full ${theme === "light" ? "border-gray-300 text-gray-700 hover:bg-gray-50" : "border-gray-600 text-gray-300 hover:bg-gray-700"}`}
                >
                  View &amp; Review Pre-Screening Report
                </Button>
                <Button
                  onClick={() => {
                    if (newOpportunityId) {
                      router.push(`/opportunities/${newOpportunityId}`)
                    }
                  }}
                  variant="outline"
                  className={`w-full ${theme === "light" ? "border-gray-300 text-gray-700 hover:bg-gray-50" : "border-gray-600 text-gray-300 hover:bg-gray-700"}`}
                >
                  View Opportunity Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
