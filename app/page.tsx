"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, Plus, FileText, Clock, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("MTD")

  const periodData = {
    MTD: { activeDeals: 65, newOpportunities: 23, dueDiligence: 34, pendingApproval: 8, approved: 156 },
    YTD: { activeDeals: 142, newOpportunities: 67, dueDiligence: 89, pendingApproval: 23, approved: 445 },
    "Since Inception": {
      activeDeals: 287,
      newOpportunities: 134,
      dueDiligence: 178,
      pendingApproval: 45,
      approved: 892,
    },
  }

  const currentData = periodData[selectedPeriod]

  return (
    <div className="min-h-screen bg-gray-900 pt-14">
      <div className="p-4 space-y-4">
        <div className="mb-4">
          <h1 className="text-sm font-medium text-white mb-1">Good morning</h1>
          <p className="text-xs text-gray-400">Here's what needs your attention today</p>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">Period:</span>
            <div className="flex space-x-1">
              {["MTD", "YTD", "Since Inception"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-2 py-1 text-xs rounded ${
                    selectedPeriod === period ? "bg-slate-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3 mb-4">
          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Active Deals</p>
                  <p className="text-lg font-bold text-white">{currentData.activeDeals}</p>
                </div>
                <Target className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">New Opportunities</p>
                  <p className="text-lg font-bold text-white">{currentData.newOpportunities}</p>
                </div>
                <Plus className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Due Diligence</p>
                  <p className="text-lg font-bold text-white">{currentData.dueDiligence}</p>
                </div>
                <FileText className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Pending Approval</p>
                  <p className="text-lg font-bold text-white">{currentData.pendingApproval}</p>
                </div>
                <Clock className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Approved</p>
                  <p className="text-lg font-bold text-white">{currentData.approved}</p>
                </div>
                <CheckCircle className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <h3 className="text-xs font-medium text-white mb-3">Portfolio Allocation</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Private Equity</span>
                    <span className="text-xs text-gray-400">90%</span>
                  </div>
                  <Progress value={90} className="h-1" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Real Estate</span>
                    <span className="text-xs text-gray-400">70%</span>
                  </div>
                  <Progress value={70} className="h-1" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Hedge Funds</span>
                    <span className="text-xs text-gray-400">50%</span>
                  </div>
                  <Progress value={50} className="h-1" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Infrastructure</span>
                    <span className="text-xs text-gray-400">40%</span>
                  </div>
                  <Progress value={40} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <h3 className="text-xs font-medium text-white mb-3">Priorities</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-medium text-gray-300 mb-1">Today</h4>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-400">• Review TechFlow Series B term sheet</div>
                    <div className="text-xs text-gray-400">• IC meeting prep for GreenEnergy Fund</div>
                    <div className="text-xs text-gray-400">• Call with MedTech startup founder</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-300 mb-1">This Week</h4>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-400">• Complete due diligence on 3 deals</div>
                    <div className="text-xs text-gray-400">• Quarterly portfolio review meeting</div>
                    <div className="text-xs text-gray-400">• Submit investment committee memo</div>
                    <div className="text-xs text-gray-400">• Site visit to PropTech company</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardContent className="p-3">
              <h3 className="text-xs font-medium text-white mb-3">Recent Highlights</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-white">FinTech Solutions Deal</div>
                    <div className="text-xs text-gray-400">Initial screening completed</div>
                    <div className="text-xs text-gray-500">2h ago</div>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-white">European Growth Fund</div>
                    <div className="text-xs text-gray-400">Due diligence phase completed</div>
                    <div className="text-xs text-gray-500">1d ago</div>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-white">Healthcare Innovation</div>
                    <div className="text-xs text-gray-400">First management meeting scheduled</div>
                    <div className="text-xs text-gray-500">2d ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
