"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckSquare, Search, Plus, Calendar, User, Clock, AlertCircle, CheckCircle } from "lucide-react"

const todos = [
  {
    id: 1,
    title: "Review Nordic Healthcare Platform due diligence report",
    description: "Complete analysis of financial statements and market positioning",
    priority: "High",
    status: "In Progress",
    dueDate: "2025-01-22",
    assignee: "Sarah Chen",
    opportunity: "Nordic Healthcare Platform",
    category: "Due Diligence",
    completed: false,
    createdDate: "2025-01-20",
  },
  {
    id: 2,
    title: "Prepare IC presentation for European Growth Fund III",
    description: "Create comprehensive investment committee presentation with risk analysis",
    priority: "High",
    status: "Not Started",
    dueDate: "2025-01-25",
    assignee: "Emma Rodriguez",
    opportunity: "European Growth Fund III",
    category: "Investment Committee",
    completed: false,
    createdDate: "2025-01-19",
  },
  {
    id: 3,
    title: "Schedule management meeting with TechFlow Solutions",
    description: "Arrange follow-up meeting to discuss rejection feedback",
    priority: "Medium",
    status: "Completed",
    dueDate: "2025-01-21",
    assignee: "Mark Kim",
    opportunity: "TechFlow Solutions",
    category: "Communication",
    completed: true,
    createdDate: "2025-01-18",
  },
  {
    id: 4,
    title: "Update portfolio performance dashboard",
    description: "Refresh Q4 2024 performance metrics and prepare monthly report",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2025-01-24",
    assignee: "John Doe",
    opportunity: null,
    category: "Portfolio Management",
    completed: false,
    createdDate: "2025-01-17",
  },
  {
    id: 5,
    title: "Conduct reference calls for Blackstone partnership",
    description: "Complete reference checks with previous co-investors",
    priority: "Low",
    status: "Not Started",
    dueDate: "2025-01-28",
    assignee: "Sarah Chen",
    opportunity: null,
    category: "Partnership",
    completed: false,
    createdDate: "2025-01-16",
  },
]

export default function TodoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedOpportunity, setSelectedOpportunity] = useState("All")
  const [showCompleted, setShowCompleted] = useState(true)

  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedPriority === "All" || todo.priority === selectedPriority) &&
      (selectedStatus === "All" || todo.status === selectedStatus) &&
      (selectedOpportunity === "All" ||
        (selectedOpportunity === "Unassigned" && !todo.opportunity) ||
        todo.opportunity === selectedOpportunity) &&
      (showCompleted || !todo.completed),
  )

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-400" />
      case "Not Started":
        return <AlertCircle className="h-4 w-4 text-gray-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const opportunities = [
    "All",
    "Unassigned",
    ...Array.from(new Set(todos.filter((todo) => todo.opportunity).map((todo) => todo.opportunity))),
  ]

  return (
    <div className="min-h-screen bg-gray-900 pt-14">
      <div className="p-4 space-y-4">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckSquare className="h-4 w-4 text-gray-400" />
              <h1 className="text-sm font-medium text-white">To-Do</h1>
              <span className="text-xs text-gray-400">({todos.length})</span>
            </div>
            <Button size="sm" className="h-7 text-xs bg-slate-500 hover:bg-slate-600 text-white">
              <Plus className="h-3 w-3 mr-1" />
              Add Task
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Total</p>
                  <p className="text-lg font-bold text-white">42</p>
                </div>
                <CheckSquare className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">In Progress</p>
                  <p className="text-lg font-bold text-white">18</p>
                </div>
                <Clock className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Overdue</p>
                  <p className="text-lg font-bold text-white">3</p>
                </div>
                <AlertCircle className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Completed</p>
                  <p className="text-lg font-bold text-white">21</p>
                </div>
                <CheckCircle className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" />
            <Input
              placeholder="Search tasks..."
              className="pl-7 h-8 text-xs bg-gray-800 text-white placeholder-gray-500"
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
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="w-20 h-8 text-xs bg-gray-800 text-white border border-gray-700 rounded px-2"
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-24 h-8 text-xs bg-gray-800 text-white border border-gray-700 rounded px-2"
          >
            <option value="All">All</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="space-y-2">
          {filteredTodos.map((todo) => (
            <Card key={todo.id} className={`bg-gray-800 border border-gray-700 ${todo.completed ? "opacity-75" : ""}`}>
              <CardContent className="p-3">
                <div className="flex items-start space-x-3">
                  <Checkbox checked={todo.completed} className="mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        <h3
                          className={`text-sm font-medium ${todo.completed ? "line-through text-gray-500" : "text-white"}`}
                        >
                          {todo.title}
                        </h3>
                        <p className="text-xs text-gray-400 mb-1">{todo.description}</p>
                        {todo.opportunity && <p className="text-xs text-blue-400">Related to: {todo.opportunity}</p>}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge className={`${getPriorityColor(todo.priority)} text-xs border`}>{todo.priority}</Badge>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(todo.status)}
                          <span className="text-xs text-gray-400">{todo.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-400">{todo.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-400">{todo.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckSquare className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-400">{todo.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-400">{todo.createdDate}</span>
                      </div>
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
