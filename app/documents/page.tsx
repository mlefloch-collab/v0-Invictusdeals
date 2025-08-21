"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, Plus, Download, Eye, Calendar, User, FolderOpen } from "lucide-react"

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
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedOpportunity, setSelectedOpportunity] = useState("All")

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || doc.category === selectedCategory) &&
      (selectedStatus === "All" || doc.status === selectedStatus) &&
      (selectedOpportunity === "All" ||
        (selectedOpportunity === "Unassigned" && !doc.opportunity) ||
        doc.opportunity === selectedOpportunity),
  )

  const categories = ["All", ...Array.from(new Set(documents.map((doc) => doc.category)))]
  const statuses = ["All", ...Array.from(new Set(documents.map((doc) => doc.status)))]
  const opportunities = [
    "All",
    "Unassigned",
    ...Array.from(new Set(documents.filter((doc) => doc.opportunity).map((doc) => doc.opportunity))),
  ]

  return (
    <div className="min-h-screen bg-gray-900 pt-14">
      <div className="p-4 space-y-4">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-gray-400" />
              <h1 className="text-sm font-medium text-white">Documents</h1>
              <span className="text-xs text-gray-400">({documents.length})</span>
            </div>
            <Button size="sm" className="h-7 text-xs bg-slate-500 hover:bg-slate-600 text-white">
              <Plus className="h-3 w-3 mr-1" />
              Upload
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Total</p>
                  <p className="text-lg font-bold text-white">127</p>
                </div>
                <FileText className="h-4 w-4 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Categories</p>
                  <p className="text-lg font-bold text-white">8</p>
                </div>
                <FolderOpen className="h-4 w-4 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">This Month</p>
                  <p className="text-lg font-bold text-white">23</p>
                </div>
                <Calendar className="h-4 w-4 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Downloads</p>
                  <p className="text-lg font-bold text-white">1.2K</p>
                </div>
                <Download className="h-4 w-4 text-white" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" />
            <Input
              placeholder="Search documents..."
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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-24 h-8 text-xs bg-gray-800 text-white border border-gray-700 rounded px-2"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-20 h-8 text-xs bg-gray-800 text-white border border-gray-700 rounded px-2"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="bg-gray-800 border border-gray-700">
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white">{doc.name}</h3>
                      <Badge className="bg-gray-500/20 text-white border-gray-500/30 text-xs border">{doc.type}</Badge>
                      <Badge
                        className={`text-xs border ${doc.status === "Final" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"}`}
                      >
                        {doc.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <User className="h-3 w-3" />
                      <span>{doc.uploadedBy}</span>
                      <span>•</span>
                      <Calendar className="h-3 w-3" />
                      <span>{doc.uploadedDate}</span>
                    </div>
                    {doc.opportunity && <p className="text-xs text-blue-400 mb-1">Related to: {doc.opportunity}</p>}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 h-7 text-xs px-2"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 h-7 text-xs px-2"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {doc.tags.map((tag) => (
                    <Badge key={tag} className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs border">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
