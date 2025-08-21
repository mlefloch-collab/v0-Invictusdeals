"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Building2, Search, Plus, MapPin, DollarSign, TrendingUp, Users, Globe, ChevronDown } from "lucide-react"

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
  const [selectedFilter, setSelectedFilter] = useState("All")

  const filteredManagers = assetManagers.filter(
    (manager) =>
      manager.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedFilter === "All" || manager.status === selectedFilter),
  )

  return (
    <div className="min-h-screen bg-gray-900 pt-14">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white">Asset Managers</h1>
          <Button className="bg-slate-500 hover:bg-slate-600 text-white text-xs">
            <Plus className="h-3 w-3 mr-1" />
            Add Asset Manager
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <Building2 className="h-3 w-3 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">24</p>
                <p className="text-xs text-gray-400 mb-1">Total Managers</p>
                <p className="text-xs text-green-400">+8% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-3 w-3 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">$2.1T</p>
                <p className="text-xs text-gray-400 mb-1">Total AUM</p>
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
                <p className="text-lg font-semibold text-white">+11.8%</p>
                <p className="text-xs text-gray-400 mb-1">Avg Performance</p>
                <p className="text-xs text-green-400">+2.1% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-3 w-3 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">56</p>
                <p className="text-xs text-gray-400 mb-1">Active Deals</p>
                <p className="text-xs text-green-400">+15% from last month</p>
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
                placeholder="Search asset managers..."
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <div className="relative">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 text-sm rounded px-3 py-2 pr-8 appearance-none cursor-pointer"
              >
                {["All", "Active", "Under Review", "Inactive"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Asset Manager Cards */}
        <div className="space-y-2">
          {filteredManagers.map((manager) => (
            <Card key={manager.id} className="bg-gray-800 border border-gray-700">
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white">{manager.name}</h3>
                      <Badge className="bg-gray-500/20 text-white border-gray-500/30 text-xs border">
                        {manager.type}
                      </Badge>
                      <Badge
                        className={`text-xs border ${manager.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}
                      >
                        {manager.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
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
                      className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 text-xs px-3 py-1"
                    >
                      View Details
                    </Button>
                    <Button className="bg-slate-500 hover:bg-slate-600 text-white text-xs px-3 py-1">Contact</Button>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-3 w-3 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">AUM</p>
                      <p className="text-sm font-medium text-white">{manager.aum}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Performance</p>
                      <p className="text-sm font-medium text-green-400">{manager.performance}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Active Deals</p>
                      <p className="text-sm font-medium text-white">{manager.deals}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Building2 className="h-3 w-3 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Founded</p>
                      <p className="text-sm font-medium text-white">{manager.founded}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Contact</p>
                      <p className="text-sm font-medium text-white">{manager.contact.name}</p>
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
