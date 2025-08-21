import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  Plus,
  Star,
  TrendingUp,
  Building2,
  Calendar,
  DollarSign,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const investmentTargets = [
  {
    id: 1,
    company: "NeuralTech AI",
    sector: "Artificial Intelligence",
    stage: "Series A",
    location: "San Francisco, CA",
    valuation: "$45M",
    fundingRaised: "$12M",
    employees: "45-60",
    founded: "2021",
    priority: "High",
    status: "Active Tracking",
    lastContact: "2 days ago",
    score: 85,
    description: "AI-powered automation platform for enterprise workflows",
    tags: ["AI/ML", "Enterprise", "SaaS"],
    logo: "/ai-tech-logo.png",
  },
  {
    id: 2,
    company: "GreenFlow Energy",
    sector: "Clean Technology",
    stage: "Seed",
    location: "Austin, TX",
    valuation: "$18M",
    fundingRaised: "$3.5M",
    employees: "15-25",
    founded: "2022",
    priority: "Medium",
    status: "Initial Research",
    lastContact: "1 week ago",
    score: 72,
    description: "Smart grid technology for renewable energy optimization",
    tags: ["CleanTech", "Energy", "IoT"],
    logo: "/placeholder-yup5o.png",
  },
  {
    id: 3,
    company: "HealthSync Pro",
    sector: "Healthcare Technology",
    stage: "Series B",
    location: "Boston, MA",
    valuation: "$120M",
    fundingRaised: "$35M",
    employees: "100-150",
    founded: "2019",
    priority: "High",
    status: "Due Diligence",
    lastContact: "Yesterday",
    score: 91,
    description: "Integrated healthcare management platform for hospitals",
    tags: ["HealthTech", "SaaS", "B2B"],
    logo: "/healthcare-tech-logo.png",
  },
  {
    id: 4,
    company: "FinFlow Solutions",
    sector: "Financial Technology",
    stage: "Series A",
    location: "New York, NY",
    valuation: "$65M",
    fundingRaised: "$18M",
    employees: "60-80",
    founded: "2020",
    priority: "Medium",
    status: "Active Tracking",
    lastContact: "3 days ago",
    score: 78,
    description: "Digital banking infrastructure for emerging markets",
    tags: ["FinTech", "Banking", "Infrastructure"],
    logo: "/fintech-logo.png",
  },
  {
    id: 5,
    company: "EduTech Innovations",
    sector: "Education Technology",
    stage: "Seed",
    location: "Seattle, WA",
    valuation: "$25M",
    fundingRaised: "$5M",
    employees: "25-35",
    founded: "2023",
    priority: "Low",
    status: "Watchlist",
    lastContact: "2 weeks ago",
    score: 64,
    description: "Personalized learning platform using adaptive AI",
    tags: ["EdTech", "AI/ML", "B2C"],
    logo: "/edutech-logo.png",
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800 border-red-200"
    case "Medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Due Diligence":
      return "bg-primary text-primary-foreground"
    case "Active Tracking":
      return "bg-secondary text-secondary-foreground"
    case "Initial Research":
      return "bg-muted text-muted-foreground"
    case "Watchlist":
      return "bg-accent text-accent-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function InvestmentTargets() {
  return (
    <div className="min-h-screen bg-gray-900 pt-14">
      <div className="p-4 space-y-4">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-gray-400" />
              <h1 className="text-sm font-medium text-white">Investment Targets</h1>
              <span className="text-xs text-gray-400">({investmentTargets.length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-7 text-xs bg-gray-700 text-gray-300 hover:bg-gray-600">
                <Filter className="h-3 w-3 mr-1" />
                Filter
              </Button>
              <Button size="sm" className="h-7 text-xs bg-slate-500 hover:bg-slate-600 text-white">
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" />
            <Input
              placeholder="Search companies..."
              className="pl-7 h-8 text-xs bg-gray-800 text-white placeholder-gray-500"
            />
          </div>
          <Select>
            <SelectTrigger className="w-24 h-8 text-xs bg-gray-800 text-white">
              <SelectValue placeholder="Sector" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800">
              <SelectItem value="ai" className="text-white hover:bg-gray-700">
                AI/ML
              </SelectItem>
              <SelectItem value="fintech" className="text-white hover:bg-gray-700">
                FinTech
              </SelectItem>
              <SelectItem value="healthtech" className="text-white hover:bg-gray-700">
                HealthTech
              </SelectItem>
              <SelectItem value="cleantech" className="text-white hover:bg-gray-700">
                CleanTech
              </SelectItem>
              <SelectItem value="edtech" className="text-white hover:bg-gray-700">
                EdTech
              </SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-24 h-8 text-xs bg-gray-800 text-white">
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800">
              <SelectItem value="seed" className="text-white hover:bg-gray-700">
                Seed
              </SelectItem>
              <SelectItem value="series-a" className="text-white hover:bg-gray-700">
                Series A
              </SelectItem>
              <SelectItem value="series-b" className="text-white hover:bg-gray-700">
                Series B
              </SelectItem>
              <SelectItem value="series-c" className="text-white hover:bg-gray-700">
                Series C+
              </SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-24 h-8 text-xs bg-gray-800 text-white">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800">
              <SelectItem value="high" className="text-white hover:bg-gray-700">
                High
              </SelectItem>
              <SelectItem value="medium" className="text-white hover:bg-gray-700">
                Medium
              </SelectItem>
              <SelectItem value="low" className="text-white hover:bg-gray-700">
                Low
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Total</p>
                  <p className="text-lg font-bold text-white">{investmentTargets.length}</p>
                </div>
                <Building2 className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">High Priority</p>
                  <p className="text-lg font-bold text-white">
                    {investmentTargets.filter((t) => t.priority === "High").length}
                  </p>
                </div>
                <Star className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Due Diligence</p>
                  <p className="text-lg font-bold text-white">
                    {investmentTargets.filter((t) => t.status === "Due Diligence").length}
                  </p>
                </div>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Avg Score</p>
                  <p className="text-lg font-bold text-white">
                    {Math.round(investmentTargets.reduce((acc, t) => acc + t.score, 0) / investmentTargets.length)}
                  </p>
                </div>
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {investmentTargets.map((target) => (
            <Card key={target.id} className="hover:shadow-sm transition-shadow bg-gray-800">
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={target.logo || "/placeholder.svg"} alt={target.company} />
                      <AvatarFallback className="text-xs bg-gray-700 text-white">
                        {target.company.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-medium text-white">{target.company}</h3>
                      <p className="text-xs text-gray-400">{target.sector}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-800">
                      <DropdownMenuItem className="text-white hover:bg-gray-700">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-gray-700">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Target
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-xs text-gray-400 mb-2">{target.description}</p>

                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div>
                    <p className="text-gray-500">Stage</p>
                    <p className="font-medium text-white">{target.stage}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Valuation</p>
                    <p className="font-medium text-white">{target.valuation}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-gray-500">Score</span>
                  <span className="font-medium text-white">{target.score}/100</span>
                </div>
                <Progress value={target.score} className="h-1 mb-2 bg-gray-700" />

                <div className="flex items-center justify-between">
                  <Badge className={getPriorityColor(target.priority)} variant="outline" className="text-xs">
                    {target.priority}
                  </Badge>
                  <Badge className={getStatusColor(target.status)} className="text-xs">
                    {target.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Last contact: {target.lastContact}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
