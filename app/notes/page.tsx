"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedOpportunity, setSelectedOpportunity] = useState("All")
  const [showPinnedOnly, setShowPinnedOnly] = useState(false)

  const filteredNotes = notes.filter(
    (note) =>
      (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "All" || note.category === selectedCategory) &&
      (selectedOpportunity === "All" ||
        (selectedOpportunity === "Unassigned" && !note.opportunity) ||
        note.opportunity === selectedOpportunity) &&
      (!showPinnedOnly || note.pinned),
  )

  const categories = ["All", ...Array.from(new Set(notes.map((note) => note.category)))]
  const opportunities = [
    "All",
    "Unassigned",
    ...Array.from(new Set(notes.filter((note) => note.opportunity).map((note) => note.opportunity))),
  ]

  return (
    <div className="min-h-screen bg-gray-900 pt-14">
      <div className="p-4 space-y-4">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <StickyNote className="h-4 w-4 text-gray-400" />
              <h1 className="text-sm font-medium text-white">Notes</h1>
              <span className="text-xs text-gray-400">({notes.length})</span>
            </div>
            <Button size="sm" className="h-7 text-xs bg-slate-500 hover:bg-slate-600 text-white">
              <Plus className="h-3 w-3 mr-1" />
              New Note
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Total</p>
                  <p className="text-lg font-bold text-white">67</p>
                </div>
                <StickyNote className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Pinned</p>
                  <p className="text-lg font-bold text-white">8</p>
                </div>
                <Pin className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Categories</p>
                  <p className="text-lg font-bold text-white">12</p>
                </div>
                <Tag className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">This Week</p>
                  <p className="text-lg font-bold text-white">14</p>
                </div>
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" />
            <Input
              placeholder="Search notes..."
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
          <Button
            variant={showPinnedOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setShowPinnedOnly(!showPinnedOnly)}
            className={`h-8 text-xs ${
              showPinnedOnly
                ? "bg-slate-500 hover:bg-slate-600 text-white"
                : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Pin className="h-3 w-3 mr-1" />
            Pinned
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="bg-gray-800 border border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader className="pb-2 p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-sm flex items-center text-white">
                      {note.title}
                      {note.pinned && <Pin className="h-3 w-3 ml-1 text-yellow-400" />}
                    </CardTitle>
                    <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 mt-1 text-xs border">
                      {note.category}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-5 w-5 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-5 w-5 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 p-3 pt-0">
                <p className="text-xs text-gray-300 line-clamp-3">{note.content}</p>

                {note.opportunity && <p className="text-xs text-blue-400">Related to: {note.opportunity}</p>}

                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag) => (
                    <Badge key={tag} className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs border">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-2 text-xs text-gray-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span className="text-gray-400">{note.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="text-gray-400">{note.createdDate}</span>
                    </div>
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
