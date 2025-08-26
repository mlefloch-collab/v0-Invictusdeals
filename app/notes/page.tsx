"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MultiSelect } from "@/components/ui/multi-select"
import { useTheme } from "@/components/theme-provider"
import { StickyNote, Search, Plus, Edit, Trash2, Pin, Calendar, User, Tag } from "lucide-react"

const notes = [
  {
    id: 1,
    title: "Nordic Healthcare Platform - Key Insights",
    content:
      "Strong market position in Scandinavian healthcare tech. Revenue growth of 45% YoY. Key concerns: regulatory changes in Denmark and competitive pressure from larger players. Management team has solid track record but limited international experience.",
    category: "Investment Analysis",
    tags: ["Healthcare", "Due Diligence", "Scandinavia"],
    opportunity: "Nordic Healthcare Platform",
    author: "Sarah Chen",
    createdDate: "2025-01-20",
    lastModified: "2025-01-20",
    pinned: true,
    color: "blue",
  },
  {
    id: 2,
    title: "European Growth Fund III - Partnership Notes",
    content:
      "Excellent track record with 3 previous funds. Average IRR of 22% across portfolio. Strong focus on B2B SaaS companies in Series A/B stages. Fund size target of €200M seems appropriate given market conditions.",
    category: "Partnership",
    tags: ["Fund", "Venture Capital", "Europe"],
    opportunity: "European Growth Fund III",
    author: "Emma Rodriguez",
    createdDate: "2025-01-19",
    lastModified: "2025-01-19",
    pinned: false,
    color: "green",
  },
  {
    id: 3,
    title: "TechFlow Solutions - Rejection Rationale",
    content:
      "While the technology is innovative, the market timing appears premature. Limited customer traction and high customer acquisition costs. Management team lacks enterprise sales experience. May revisit in 12-18 months if metrics improve.",
    category: "Investment Decision",
    tags: ["Technology", "Rejection", "Enterprise"],
    opportunity: "TechFlow Solutions",
    author: "Mark Kim",
    createdDate: "2025-01-18",
    lastModified: "2025-01-18",
    pinned: false,
    color: "red",
  },
  {
    id: 4,
    title: "Q4 2024 Portfolio Review - Action Items",
    content:
      "1. Schedule board meetings for underperforming assets\n2. Prepare exit strategy for mature investments\n3. Increase support for high-growth companies\n4. Review fund allocation strategy for 2025",
    category: "Portfolio Management",
    tags: ["Portfolio", "Review", "Strategy"],
    opportunity: null,
    author: "John Doe",
    createdDate: "2025-01-17",
    lastModified: "2025-01-17",
    pinned: true,
    color: "yellow",
  },
  {
    id: 5,
    title: "Market Trends - AI & Automation",
    content:
      "Significant growth in AI-powered workflow automation. Key players include UiPath, Automation Anywhere, and emerging startups. Market size expected to reach $50B by 2027. Focus areas: RPA, intelligent document processing, conversational AI.",
    category: "Market Research",
    tags: ["AI", "Automation", "Market Trends"],
    opportunity: null,
    author: "Sarah Chen",
    createdDate: "2025-01-16",
    lastModified: "2025-01-16",
    pinned: false,
    color: "purple",
  },
]

export default function NotesPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedOpportunities, setSelectedOpportunities] = useState<string[]>([])
  const [showPinnedOnly, setShowPinnedOnly] = useState(false)

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(note.category)
    const matchesOpportunity =
      selectedOpportunities.length === 0 ||
      (selectedOpportunities.includes("Unassigned") && !note.opportunity) ||
      (note.opportunity && selectedOpportunities.includes(note.opportunity))
    const matchesPinned = !showPinnedOnly || note.pinned

    return matchesSearch && matchesCategory && matchesOpportunity && matchesPinned
  })

  const categoryOptions = Array.from(new Set(notes.map((note) => note.category))).map((cat) => ({
    value: cat,
    label: cat,
  }))

  const opportunityOptions = [
    { value: "Unassigned", label: "Unassigned" },
    ...Array.from(new Set(notes.filter((note) => note.opportunity).map((note) => note.opportunity!))).map((opp) => ({
      value: opp,
      label: opp,
    })),
  ]

  return (
    <div className={`min-h-screen pt-14 ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div
            className={`p-8 rounded cursor-pointer transition-colors ${theme === "light" ? "bg-white border-0 shadow-sm hover:bg-gray-50" : "bg-gray-800 hover:bg-gray-700"}`}
            onClick={() => setSelectedCategories([])}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm mb-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Total Notes</p>
                <p className={`text-3xl font-bold mb-1 ${theme === "light" ? "text-black" : "text-white"}`}>67</p>
                <p className="text-sm text-blue-500">+5 this week</p>
              </div>
              <StickyNote className={`h-8 w-8 ${theme === "light" ? "text-black" : "text-white"}`} />
            </div>
          </div>

          <div
            className={`p-8 rounded cursor-pointer transition-colors ${theme === "light" ? "bg-white border-0 shadow-sm hover:bg-gray-50" : "bg-gray-800 hover:bg-gray-700"}`}
            onClick={() => setShowPinnedOnly(!showPinnedOnly)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm mb-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Pinned</p>
                <p className={`text-3xl font-bold mb-1 ${theme === "light" ? "text-black" : "text-white"}`}>8</p>
                <p className="text-sm text-yellow-500">Important</p>
              </div>
              <Pin className={`h-8 w-8 ${theme === "light" ? "text-black" : "text-white"}`} />
            </div>
          </div>

          <div
            className={`p-8 rounded cursor-pointer transition-colors ${theme === "light" ? "bg-white border-0 shadow-sm hover:bg-gray-50" : "bg-gray-800 hover:bg-gray-700"}`}
            onClick={() => console.log("View categories")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm mb-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Categories</p>
                <p className={`text-3xl font-bold mb-1 ${theme === "light" ? "text-black" : "text-white"}`}>12</p>
                <p className="text-sm text-green-500">Organized</p>
              </div>
              <Tag className={`h-8 w-8 ${theme === "light" ? "text-black" : "text-white"}`} />
            </div>
          </div>

          <div
            className={`p-8 rounded cursor-pointer transition-colors ${theme === "light" ? "bg-white border-0 shadow-sm hover:bg-gray-50" : "bg-gray-800 hover:bg-gray-700"}`}
            onClick={() => console.log("View recent notes")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm mb-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>This Week</p>
                <p className={`text-3xl font-bold mb-1 ${theme === "light" ? "text-black" : "text-white"}`}>14</p>
                <p className="text-sm text-purple-500">Recent</p>
              </div>
              <Calendar className={`h-8 w-8 ${theme === "light" ? "text-black" : "text-white"}`} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <StickyNote className={`h-4 w-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
            <h1 className={`text-sm font-medium ${theme === "light" ? "text-black" : "text-white"}`}>Notes</h1>
            <span className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              ({filteredNotes.length})
            </span>
          </div>
          <Button
            size="sm"
            className={`h-7 text-xs ${theme === "light" ? "bg-gray-900 hover:bg-gray-800 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
          >
            <Plus className="h-3 w-3 mr-1" />
            New Note
          </Button>
        </div>

        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}
            />
            <Input
              placeholder="Search notes..."
              className={`pl-7 h-8 text-xs ${theme === "light" ? "bg-white text-black placeholder-gray-500 border-gray-300" : "bg-gray-800 text-white placeholder-gray-500 border-0"}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <MultiSelect
            options={opportunityOptions}
            value={selectedOpportunities}
            onChange={setSelectedOpportunities}
            placeholder="Filter by opportunity..."
            className="w-40"
          />
          <MultiSelect
            options={categoryOptions}
            value={selectedCategories}
            onChange={setSelectedCategories}
            placeholder="Filter by category..."
            className="w-32"
          />
          <Button
            variant={showPinnedOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setShowPinnedOnly(!showPinnedOnly)}
            className={`h-8 text-xs transition-colors ${
              showPinnedOnly
                ? theme === "light"
                  ? "bg-gray-900 hover:bg-gray-800 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
                : theme === "light"
                  ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                  : "bg-gray-800 border-0 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Pin className="h-3 w-3 mr-1" />
            Pinned
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`transition-all duration-200 hover:shadow-lg p-8 rounded-lg cursor-pointer ${theme === "light" ? "bg-white border-0 shadow-sm hover:bg-gray-50" : "bg-gray-800 hover:bg-gray-700"}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className={`text-base font-medium ${theme === "light" ? "text-black" : "text-white"}`}>
                      {note.title}
                    </h3>
                    {note.pinned && <Pin className="h-4 w-4 text-yellow-500" />}
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400 border-0 text-sm">{note.category}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`h-8 w-8 p-0 ${theme === "light" ? "text-gray-600 hover:text-black hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-gray-600"}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`h-8 w-8 p-0 ${theme === "light" ? "text-gray-600 hover:text-black hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-gray-600"}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p
                className={`text-sm line-clamp-3 mb-4 leading-relaxed ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
              >
                {note.content}
              </p>

              {note.opportunity && <p className="text-sm text-blue-400 mb-4">Related to: {note.opportunity}</p>}

              <div className="flex flex-wrap gap-2 mb-4">
                {note.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className={`border-0 text-sm ${theme === "light" ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div
                className={`border-t pt-4 text-sm ${theme === "light" ? "border-gray-200 text-gray-500" : "border-gray-700 text-gray-500"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className={`${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>{note.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className={`${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      {note.createdDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
