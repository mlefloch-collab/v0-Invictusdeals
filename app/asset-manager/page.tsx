"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MultiSelect } from "@/components/ui/multi-select"
import { Building2, Search, Plus, MapPin, DollarSign, TrendingUp, Users, Globe } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

const assetManagers = [
  {
    id: 1,
    name: "Blackstone Group",
    type: "Private Equity",
    aum: "$975B",
    location: "New York, NY",
    founded: 1985,
    deals: 23,
    performance: "+12.5%",
    status: "Active",
    logo: "/placeholder.svg?height=40&width=40",
    contact: {
      name: "Michael Chen",
      title: "Managing Director",
      email: "m.chen@blackstone.com",
      phone: "+1 (212) 583-5000",
    },
    focus: ["Buyouts", "Real Estate", "Credit"],
    website: "blackstone.com",
  },
  {
    id: 2,
    name: "KKR & Co",
    type: "Private Equity",
    aum: "$504B",
    location: "New York, NY",
    founded: 1976,
    deals: 18,
    performance: "+15.2%",
    status: "Active",
    logo: "/placeholder.svg?height=40&width=40",
    contact: {
      name: "Sarah Williams",
      title: "Partner",
      email: "s.williams@kkr.com",
      phone: "+1 (212) 750-8300",
    },
    focus: ["Growth Equity", "Infrastructure", "Real Estate"],
    website: "kkr.com",
  },
  {
    id: 3,
    name: "Apollo Global Management",
    type: "Alternative Investment",
    aum: "$548B",
    location: "New York, NY",
    founded: 1990,
    deals: 15,
    performance: "+9.8%",
    status: "Under Review",
    logo: "/placeholder.svg?height=40&width=40",
    contact: {
      name: "David Rodriguez",
      title: "Senior Vice President",
      email: "d.rodriguez@apollo.com",
      phone: "+1 (212) 515-3200",
    },
    focus: ["Credit", "Private Equity", "Real Assets"],
    website: "apollo.com",
  },
]

export default function AssetManagerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const { theme } = useTheme()

  const filteredManagers = assetManagers.filter((manager) => {
    const matchesSearch = manager.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(manager.status)
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(manager.type)

    return matchesSearch && matchesStatus && matchesType
  })

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Under Review", label: "Under Review" },
    { value: "Inactive", label: "Inactive" },
  ]

  const typeOptions = Array.from(new Set(assetManagers.map((manager) => manager.type))).map((type) => ({
    value: type,
    label: type,
  }))

  return (
    <div className={`min-h-screen pt-14 ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
            Asset Managers
          </h1>
          <Button
            className={`text-xs ${theme === "light" ? "bg-gray-900 hover:bg-gray-800 text-white" : "bg-slate-500 hover:bg-slate-600 text-white"}`}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Asset Manager
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className={`${theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Building2 className={`h-3 w-3 ${theme === "light" ? "text-gray-900" : "text-white"}`} />
              </div>
              <div>
                <p className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>24</p>
                <p className={`text-xs mb-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  Total Managers
                </p>
                <p className="text-xs text-green-500">+8% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className={`${theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className={`h-3 w-3 ${theme === "light" ? "text-gray-900" : "text-white"}`} />
              </div>
              <div>
                <p className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>$2.1T</p>
                <p className={`text-xs mb-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Total AUM</p>
                <p className="text-xs text-green-500">+12% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className={`${theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className={`h-3 w-3 ${theme === "light" ? "text-gray-900" : "text-white"}`} />
              </div>
              <div>
                <p className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>+11.8%</p>
                <p className={`text-xs mb-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  Avg Performance
                </p>
                <p className="text-xs text-green-500">+2.1% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className={`${theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className={`h-3 w-3 ${theme === "light" ? "text-gray-900" : "text-white"}`} />
              </div>
              <div>
                <p className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>56</p>
                <p className={`text-xs mb-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Active Deals</p>
                <p className="text-xs text-green-500">+15% from last month</p>
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
                placeholder="Search asset managers..."
                className={`pl-10 text-sm ${theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder-gray-500" : "bg-gray-800 border-gray-700 text-white placeholder-gray-400"}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MultiSelect
              options={typeOptions}
              value={selectedTypes}
              onChange={setSelectedTypes}
              placeholder="Filter by type..."
              className="w-40"
            />
            <MultiSelect
              options={statusOptions}
              value={selectedStatuses}
              onChange={setSelectedStatuses}
              placeholder="Filter by status..."
              className="w-36"
            />
          </div>
        </div>

        {/* Asset Manager Cards */}
        <div className="space-y-4">
          {filteredManagers.map((manager) => (
            <Card key={manager.id} className={`${theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-sm font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                        {manager.name}
                      </h3>
                      <Badge
                        className={`text-xs border ${theme === "light" ? "bg-gray-100 text-gray-900 border-gray-300" : "bg-gray-500/20 text-white border-gray-500/30"}`}
                      >
                        {manager.type}
                      </Badge>
                      <Badge
                        className={`text-xs border ${manager.status === "Active" ? "bg-green-100 text-green-700 border-green-300" : theme === "light" ? "bg-gray-100 text-gray-600 border-gray-300" : "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}
                      >
                        {manager.status}
                      </Badge>
                    </div>
                    <div
                      className={`flex items-center gap-2 mb-2 text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                    >
                      <MapPin className="h-3 w-3" />
                      <span>{manager.location}</span>
                      <span>•</span>
                      <Globe className="h-3 w-3" />
                      <span>{manager.website}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      className={`text-xs px-3 py-1 ${theme === "light" ? "bg-white border-gray-300 text-gray-900 hover:bg-gray-50" : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"}`}
                    >
                      View Details
                    </Button>
                    <Button
                      className={`text-xs px-3 py-1 ${theme === "light" ? "bg-gray-900 hover:bg-gray-800 text-white" : "bg-slate-500 hover:bg-slate-600 text-white"}`}
                    >
                      Contact
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className={`h-3 w-3 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
                    <div>
                      <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>AUM</p>
                      <p className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                        {manager.aum}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrendingUp className={`h-3 w-3 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
                    <div>
                      <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>Performance</p>
                      <p className="text-sm font-medium text-green-500">{manager.performance}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className={`h-3 w-3 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
                    <div>
                      <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>Active Deals</p>
                      <p className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                        {manager.deals}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Building2 className={`h-3 w-3 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
                    <div>
                      <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>Founded</p>
                      <p className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                        {manager.founded}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className={`h-3 w-3 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`} />
                    <div>
                      <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>Contact</p>
                      <p className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                        {manager.contact.name}
                      </p>
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
