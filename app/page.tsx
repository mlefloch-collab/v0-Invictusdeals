"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Target, Plus, FileText, Clock, CheckCircle, X, Calendar, ClipboardList } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import Link from "next/link"

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("MTD")
  const { theme } = useTheme()

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

  return (
    <div className={`min-h-screen pt-14 ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
      <div className="p-8 space-y-6">
        <div className="mb-6">
          <h1 className={`text-sm font-medium mb-1 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
            Dashboard
          </h1>
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

        <div className="grid grid-cols-6 gap-6 mb-6">
          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Active Deals</p>
                  <p className={`text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {activeDeals}
                  </p>
                </div>
                <Target className={`h-4 w-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                    New Opportunities
                  </p>
                  <p className={`text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {currentData.newOpportunities}
                  </p>
                </div>
                <Plus className={`h-4 w-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Due Diligence</p>
                  <p className={`text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {currentData.dueDiligence}
                  </p>
                </div>
                <FileText className={`h-4 w-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Pending Approval</p>
                  <p className={`text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {currentData.pendingApproval}
                  </p>
                </div>
                <Clock className={`h-4 w-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Approved</p>
                  <p className={`text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {currentData.approved}
                  </p>
                </div>
                <CheckCircle className={`h-4 w-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Rejected</p>
                  <p className={`text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {currentData.rejected}
                  </p>
                </div>
                <X className={`h-4 w-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-8">
              <h3 className={`text-sm font-medium mb-6 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Portfolio Allocation
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Private Equity
                    </span>
                    <span className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      90%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-black h-3 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Real Estate
                    </span>
                    <span className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      70%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-black h-3 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Hedge Funds
                    </span>
                    <span className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      50%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-black h-3 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Infrastructure
                    </span>
                    <span className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      40%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-black h-3 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-8">
              <h3 className={`text-sm font-medium mb-6 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Quick Actions
              </h3>
              <div className="space-y-5">
                <div>
                  <h4 className={`text-sm font-medium mb-3 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                    Today
                  </h4>
                  <div className="space-y-3">
                    <Link
                      href="/opportunities/3"
                      className={`flex items-center space-x-3 text-sm hover:underline ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}
                    >
                      <FileText className={`h-4 w-4 ${theme === "light" ? "text-blue-500" : "text-blue-400"}`} />
                      <span>Review TechFlow Solutions Series B term sheet</span>
                    </Link>
                    <Link
                      href="/opportunities/1"
                      className={`flex items-center space-x-3 text-sm hover:underline ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}
                    >
                      <Calendar className={`h-4 w-4 ${theme === "light" ? "text-green-500" : "text-green-400"}`} />
                      <span>IC meeting prep for European Growth Fund III</span>
                    </Link>
                  </div>
                </div>
                <div>
                  <h4 className={`text-sm font-medium mb-3 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                    This Week
                  </h4>
                  <div className="space-y-3">
                    <Link
                      href="/opportunities/1"
                      className={`flex items-center space-x-3 text-sm hover:underline ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}
                    >
                      <ClipboardList
                        className={`h-4 w-4 ${theme === "light" ? "text-orange-500" : "text-orange-400"}`}
                      />
                      <span>Complete due diligence on European Growth Fund III</span>
                    </Link>
                    <Link
                      href="/meetings"
                      className={`flex items-center space-x-3 text-sm hover:underline ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}
                    >
                      <Calendar className={`h-4 w-4 ${theme === "light" ? "text-green-500" : "text-green-400"}`} />
                      <span>Quarterly portfolio review meeting</span>
                    </Link>
                    <Link
                      href="/opportunities/3"
                      className={`flex items-center space-x-3 text-sm hover:underline ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}
                    >
                      <FileText className={`h-4 w-4 ${theme === "light" ? "text-blue-500" : "text-blue-400"}`} />
                      <span>Submit TechFlow Solutions investment memo</span>
                    </Link>
                    <Link
                      href="/opportunities/2"
                      className={`flex items-center space-x-3 text-sm hover:underline ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}
                    >
                      <Calendar className={`h-4 w-4 ${theme === "light" ? "text-green-500" : "text-green-400"}`} />
                      <span>Site visit to Nordic Healthcare Platform</span>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800"}>
            <CardContent className="p-8">
              <h3 className={`text-sm font-medium mb-6 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Recent Activities
              </h3>
              <div className="space-y-4">
                <Link
                  href="/opportunities/2"
                  className="flex items-start space-x-3 hover:opacity-75 transition-opacity"
                >
                  <FileText className={`h-4 w-4 mt-0.5 ${theme === "light" ? "text-blue-500" : "text-blue-400"}`} />
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      Nordic Healthcare Platform
                    </div>
                    <div className={`text-sm mt-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Due diligence call completed
                    </div>
                    <div className={`text-xs mt-1 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                      by Sarah Chen • 2h ago
                    </div>
                  </div>
                </Link>
                <Link
                  href="/opportunities/1"
                  className="flex items-start space-x-3 hover:opacity-75 transition-opacity"
                >
                  <CheckCircle
                    className={`h-4 w-4 mt-0.5 ${theme === "light" ? "text-green-500" : "text-green-400"}`}
                  />
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      European Growth Fund III
                    </div>
                    <div className={`text-sm mt-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      IC approval received
                    </div>
                    <div className={`text-xs mt-1 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                      by Emma Rodriguez • 4h ago
                    </div>
                  </div>
                </Link>
                <Link
                  href="/opportunities/3"
                  className="flex items-start space-x-3 hover:opacity-75 transition-opacity"
                >
                  <Calendar className={`h-4 w-4 mt-0.5 ${theme === "light" ? "text-purple-500" : "text-purple-400"}`} />
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      TechFlow Solutions
                    </div>
                    <div className={`text-sm mt-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Management presentation scheduled
                    </div>
                    <div className={`text-xs mt-1 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                      by Mark Kim • 6h ago
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
