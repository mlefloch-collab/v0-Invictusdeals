"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  TrendingUp,
  FileText,
  Clock,
  CheckCircle,
  Search,
  ChevronDown,
  LayoutGrid,
  BarChart3,
  User,
  Calendar,
  DollarSign,
  Plus,
  Columns3,
} from "lucide-react"

export default function OpportunitiesPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [dealStatusFilter, setDealStatusFilter] = useState("All Deal Status")
  const [assetClassFilter, setAssetClassFilter] = useState("All Asset Classes")
  const [ownerFilter, setOwnerFilter] = useState("All Owners")
  const [priorityFilter, setPriorityFilter] = useState("All Priorities")

  const opportunities = [
    {
      id: 1,
      name: "European Growth Fund III",
      stage: "Pre-Screening",
      investmentType: "Fund",
      description: "Multi-stage venture capital fund focusing on B2B SaaS companies in Europe",
      strategicFit: "Excellent",
      value: "$150M",
      assetClass: "Venture Capital",
      analyst: "Emma Rodriguez",
      dateAdded: "2025-01-20",
      todoCount: 2,
      dealStatus: "Pipeline",
      progress: 94,
      sourcingMethod: "AI Sourced",
      priority: "High",
    },
    {
      id: 2,
      name: "Nordic Healthcare Platform",
      stage: "Due Diligence",
      investmentType: "Co-investment",
      description: "Digital healthcare solutions serving 2M+ patients across Scandinavia",
      strategicFit: "Good",
      value: "$85M",
      assetClass: "Private Equity",
      analyst: "Sarah Chen",
      dateAdded: "2025-01-17",
      todoCount: 3,
      dealStatus: "Due Diligence",
      progress: 96,
      sourcingMethod: "AI Sourced",
      priority: "Medium",
    },
    {
      id: 3,
      name: "TechFlow Solutions",
      stage: "Rejected",
      investmentType: "Direct",
      description: "AI-powered workflow automation platform for enterprise clients",
      strategicFit: "Poor",
      value: "$45M",
      assetClass: "Technology",
      analyst: "Mark Kim",
      dateAdded: "2025-01-15",
      todoCount: 0,
      dealStatus: "Rejected",
      progress: 82,
      sourcingMethod: "Web Scraping",
      priority: "Low",
    },
  ]

  const dealStatusOptions = [
    "All Deal Status",
    "Pipeline",
    "Pre-screening",
    "Due Diligence",
    "Investment Committee",
    "Approved",
    "Rejected",
    "Closed",
  ]
  const assetClassOptions = [
    "All Asset Classes",
    "Private Equity",
    "Venture Capital",
    "Real Estate",
    "Infrastructure",
    "Hedge Funds",
    "Technology",
  ]
  const ownerOptions = [
    "All Owners",
    "Sarah Chen",
    "Mark Kim",
    "Emma Rodriguez",
    "David Park",
    "Lisa Thompson",
    "Michael Chang",
  ]
  const priorityOptions = ["All Priorities", "High", "Medium", "Low"]

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDealStatus = dealStatusFilter === "All Deal Status" || opp.dealStatus === dealStatusFilter
    const matchesAssetClass = assetClassFilter === "All Asset Classes" || opp.assetClass === assetClassFilter
    const matchesOwner = ownerFilter === "All Owners" || opp.analyst === ownerFilter
    const matchesPriority = priorityFilter === "All Priorities" || opp.priority === priorityFilter

    return matchesSearch && matchesDealStatus && matchesAssetClass && matchesOwner && matchesPriority
  })

  const kanbanColumns = [
    { title: "Pre-Screening", status: "Pipeline", color: "bg-yellow-400", headerColor: "bg-yellow-400" },
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
    // TODO: Open new opportunity modal
  }

  const handleViewDetails = (opportunityId: number) => {
    console.log(`[v0] Viewing details for opportunity ${opportunityId}`)
    window.location.href = `/opportunities/${opportunityId}`
  }

  const handleToDo = (opportunityId: number) => {
    console.log(`[v0] Opening to-do for opportunity ${opportunityId}`)
    // TODO: Open to-do modal or page
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-14">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white">Opportunities</h1>
          <Button className="bg-slate-500 hover:bg-slate-600 text-white text-xs" onClick={handleNewOpportunity}>
            <Plus className="h-3 w-3 mr-1" />
            New Opportunity
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-3 w-3 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">7</p>
                <p className="text-xs text-gray-400 mb-1">Total Active Deals</p>
                <p className="text-xs text-green-400">+12% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-3 w-3 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">23</p>
                <p className="text-xs text-gray-400 mb-1">New Opportunities</p>
                <p className="text-xs text-green-400">+15% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-3 w-3 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">2</p>
                <p className="text-xs text-gray-400 mb-1">In Due Diligence</p>
                <p className="text-xs text-green-400">+8% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-3 w-3 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">1</p>
                <p className="text-xs text-gray-400 mb-1">Pending Approval</p>
                <p className="text-xs text-red-400">-2% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">1</p>
                <p className="text-xs text-gray-400 mb-1">Approved</p>
                <p className="text-xs text-green-400">+18% from last month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search opportunities..."
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={dealStatusFilter}
                onChange={(e) => setDealStatusFilter(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 text-sm rounded px-3 py-2 pr-8 appearance-none cursor-pointer"
              >
                {dealStatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={assetClassFilter}
                onChange={(e) => setAssetClassFilter(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 text-sm rounded px-3 py-2 pr-8 appearance-none cursor-pointer"
              >
                {assetClassOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={ownerFilter}
                onChange={(e) => setOwnerFilter(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 text-sm rounded px-3 py-2 pr-8 appearance-none cursor-pointer"
              >
                {ownerOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 text-sm rounded px-3 py-2 pr-8 appearance-none cursor-pointer"
              >
                {priorityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="flex border border-gray-700 rounded-md bg-gray-800">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-slate-500 text-white" : "text-gray-400 hover:text-white"}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "kanban" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("kanban")}
                className={viewMode === "kanban" ? "bg-slate-500 text-white" : "text-gray-400 hover:text-white"}
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
                <div className="bg-gray-800 border border-gray-700 rounded-t-xl p-3 border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                      <h3 className="text-sm font-semibold text-white">{column.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                        {getOpportunitiesByStatus(column.status).length}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                        onClick={handleNewOpportunity}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Modern Column Content */}
                <div className="bg-gray-800/50 border border-gray-700 border-t-0 rounded-b-xl p-3 min-h-[500px] space-y-2">
                  {getOpportunitiesByStatus(column.status).map((opportunity) => (
                    <Card
                      key={opportunity.id}
                      className="bg-gray-800 border border-gray-700 hover:border-gray-600 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                      onClick={() => handleViewDetails(opportunity.id)}
                    >
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          {/* Opportunity Name */}
                          <h4 className="text-sm font-semibold text-white leading-tight group-hover:text-blue-400 transition-colors">
                            {opportunity.name}
                          </h4>

                          {/* Short Description */}
                          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">
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
                          <div className="pt-1 border-t border-gray-700">
                            <p className="text-xs text-gray-500 mb-1">Asset Class</p>
                            <p className="text-xs font-medium text-white">{opportunity.assetClass}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add New Card */}
                  {getOpportunitiesByStatus(column.status).length === 0 && (
                    <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-600 rounded-lg">
                      <div className="text-center">
                        <div className="text-gray-500 mb-2">No opportunities</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
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
              <Card key={opportunity.id} className="bg-gray-800 border border-gray-700">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-white">{opportunity.name}</h3>
                        <Badge className={`${getStageColor(opportunity.stage)} text-xs border`}>
                          {opportunity.stage}
                        </Badge>
                        <Badge className={`${getPriorityColor(opportunity.priority)} text-xs border`}>
                          {opportunity.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mb-2 text-xs leading-relaxed">{opportunity.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 text-xs px-3 py-1"
                        onClick={() => handleViewDetails(opportunity.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        className="bg-slate-500 hover:bg-slate-600 text-white relative text-xs px-3 py-1"
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
                      <BarChart3 className="h-3 w-3 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Strategic Fit</p>
                        <Badge
                          className={`${getStrategicFitColor(opportunity.strategicFit)} text-xs border px-2 py-0.5`}
                        >
                          {opportunity.strategicFit}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="h-3 w-3 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="text-sm font-medium text-white">{opportunity.investmentType}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Asset Class</p>
                        <p className="text-sm font-medium text-white">{opportunity.assetClass}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Analyst</p>
                        <p className="text-sm font-medium text-white">{opportunity.analyst}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Date Added</p>
                        <p className="text-sm font-medium text-white">{opportunity.dateAdded}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
