"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { MultiSelect } from "@/components/ui/multi-select"
import { useTheme } from "@/components/theme-provider"
import {
  CheckSquare,
  Search,
  Plus,
  Calendar,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  ChevronDown,
} from "lucide-react"

const todosWithSubtasks = [
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
    subtasks: [
      { id: 11, title: "Review financial statements", completed: true },
      { id: 12, title: "Analyze market positioning", completed: false },
      { id: 13, title: "Prepare summary report", completed: false },
    ],
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
    subtasks: [],
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
    subtasks: [],
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
    subtasks: [],
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
    subtasks: [],
  },
]

export default function TodoPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedOpportunities, setSelectedOpportunities] = useState<string[]>([])
  const [showCompleted, setShowCompleted] = useState(true)
  const [viewMode, setViewMode] = useState<"company" | "personal">("company")
  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set())

  const toggleTaskExpansion = (taskId: number) => {
    const newExpanded = new Set(expandedTasks)
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId)
    } else {
      newExpanded.add(taskId)
    }
    setExpandedTasks(newExpanded)
  }

  const filteredTodos = todosWithSubtasks.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(todo.priority)
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(todo.status)
    const matchesOpportunity =
      selectedOpportunities.length === 0 ||
      (selectedOpportunities.includes("Unassigned") && !todo.opportunity) ||
      (todo.opportunity && selectedOpportunities.includes(todo.opportunity))
    const matchesCompleted = showCompleted || !todo.completed

    return matchesSearch && matchesPriority && matchesStatus && matchesOpportunity && matchesCompleted
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500/20 text-red-400"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "Low":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
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

  const priorityOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ]

  const statusOptions = [
    { value: "Not Started", label: "Not Started" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
  ]

  const opportunityOptions = [
    { value: "Unassigned", label: "Unassigned" },
    ...Array.from(new Set(todosWithSubtasks.filter((todo) => todo.opportunity).map((todo) => todo.opportunity!))).map(
      (opp) => ({
        value: opp,
        label: opp,
      }),
    ),
  ]

  return (
    <div className={`min-h-screen pt-14 ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div
            className={`p-8 rounded-lg cursor-pointer transition-colors ${
              theme === "light" ? "bg-white hover:bg-gray-50 shadow-sm border-0" : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedStatuses([])}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Total Tasks</p>
                <p className={`text-2xl font-bold ${theme === "light" ? "text-black" : "text-white"}`}>
                  {todosWithSubtasks.length}
                </p>
                <p className="text-sm text-blue-400">+3 this week</p>
              </div>
              <CheckSquare className={`h-6 w-6 ${theme === "light" ? "text-black" : "text-white"}`} />
            </div>
          </div>

          <div
            className={`p-8 rounded-lg cursor-pointer transition-colors ${
              theme === "light" ? "bg-white hover:bg-gray-50 shadow-sm border-0" : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedPriorities(["High"])}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>High Priority</p>
                <p className={`text-2xl font-bold ${theme === "light" ? "text-black" : "text-white"}`}>2</p>
                <p className="text-sm text-red-400">Urgent</p>
              </div>
              <AlertCircle className={`h-6 w-6 ${theme === "light" ? "text-black" : "text-white"}`} />
            </div>
          </div>

          <div
            className={`p-8 rounded-lg cursor-pointer transition-colors ${
              theme === "light" ? "bg-white hover:bg-gray-50 shadow-sm border-0" : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedStatuses(["In Progress"])}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>In Progress</p>
                <p className={`text-2xl font-bold ${theme === "light" ? "text-black" : "text-white"}`}>2</p>
                <p className="text-sm text-yellow-400">Active</p>
              </div>
              <Clock className={`h-6 w-6 ${theme === "light" ? "text-black" : "text-white"}`} />
            </div>
          </div>

          <div
            className={`p-8 rounded-lg cursor-pointer transition-colors ${
              theme === "light" ? "bg-white hover:bg-gray-50 shadow-sm border-0" : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedStatuses(["Completed"])}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Completed</p>
                <p className={`text-2xl font-bold ${theme === "light" ? "text-black" : "text-white"}`}>1</p>
                <p className="text-sm text-green-400">Done</p>
              </div>
              <CheckCircle className={`h-6 w-6 ${theme === "light" ? "text-black" : "text-white"}`} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <CheckSquare className={`h-5 w-5 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
            <h1 className={`text-lg font-medium ${theme === "light" ? "text-black" : "text-white"}`}>To-Do</h1>
            <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              ({filteredTodos.length})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex rounded-lg p-1 ${theme === "light" ? "bg-gray-200" : "bg-gray-800"}`}>
              <button
                onClick={() => setViewMode("company")}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  viewMode === "company"
                    ? theme === "light"
                      ? "bg-gray-900 text-white"
                      : "bg-blue-600 text-white"
                    : theme === "light"
                      ? "text-gray-600 hover:text-black"
                      : "text-gray-400 hover:text-white"
                }`}
              >
                Company
              </button>
              <button
                onClick={() => setViewMode("personal")}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  viewMode === "personal"
                    ? theme === "light"
                      ? "bg-gray-900 text-white"
                      : "bg-blue-600 text-white"
                    : theme === "light"
                      ? "text-gray-600 hover:text-black"
                      : "text-gray-400 hover:text-white"
                }`}
              >
                Personal
              </button>
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
              Add Task
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}
            />
            <Input
              placeholder="Search tasks..."
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
            options={priorityOptions}
            value={selectedPriorities}
            onChange={setSelectedPriorities}
            placeholder="Filter by priority..."
            className="w-32"
          />
          <MultiSelect
            options={statusOptions}
            value={selectedStatuses}
            onChange={setSelectedStatuses}
            placeholder="Filter by status..."
            className="w-40"
          />
        </div>

        <div className="space-y-4">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`p-8 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg ${
                todo.completed ? "opacity-75" : ""
              } ${
                theme === "light" ? "bg-white hover:bg-gray-50 shadow-sm border-0" : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <div className="flex items-start space-x-4">
                <Checkbox checked={todo.completed} className="mt-1" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3
                          className={`text-base font-medium ${
                            todo.completed
                              ? "line-through text-gray-500"
                              : theme === "light"
                                ? "text-black"
                                : "text-white"
                          }`}
                        >
                          {todo.title}
                        </h3>
                        <Badge className={`${getPriorityColor(todo.priority)} text-sm border-0`}>{todo.priority}</Badge>
                        {todo.subtasks && todo.subtasks.length > 0 && (
                          <button
                            onClick={() => toggleTaskExpansion(todo.id)}
                            className={`transition-colors ${
                              theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"
                            }`}
                          >
                            {expandedTasks.has(todo.id) ? (
                              <ChevronDown className="h-5 w-5" />
                            ) : (
                              <ChevronRight className="h-5 w-5" />
                            )}
                          </button>
                        )}
                      </div>
                      <p className={`text-sm mb-3 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        {todo.description}
                      </p>
                      {todo.opportunity && <p className="text-sm text-blue-400 mb-3">Related to: {todo.opportunity}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <User className={`h-4 w-4 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
                      <span className={`${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        {todo.assignee}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className={`h-4 w-4 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
                      <span className={`${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>{todo.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckSquare className={`h-4 w-4 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
                      <span className={`${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        {todo.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className={`h-4 w-4 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
                      <span className={`${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        {todo.createdDate}
                      </span>
                    </div>
                  </div>

                  {expandedTasks.has(todo.id) && todo.subtasks && (
                    <div
                      className={`mt-4 ml-6 space-y-3 border-l-2 pl-4 ${
                        theme === "light" ? "border-gray-300" : "border-gray-700"
                      }`}
                    >
                      {todo.subtasks.map((subtask) => (
                        <div key={subtask.id} className="flex items-center space-x-3">
                          <Checkbox checked={subtask.completed} className="h-4 w-4" />
                          <span
                            className={`text-sm ${
                              subtask.completed
                                ? "line-through text-gray-500"
                                : theme === "light"
                                  ? "text-gray-700"
                                  : "text-gray-300"
                            }`}
                          >
                            {subtask.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
