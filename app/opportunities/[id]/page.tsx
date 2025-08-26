"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input, Textarea } from "@/components/ui/input"
import { useTheme } from "@/components/theme-provider"
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Plus,
  ExternalLink,
  Flag,
  Check,
  Edit,
  Trash2,
  Save,
  X,
  GripVertical,
  MessageCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  ThumbsUp,
  Building,
  BarChart3,
  Bold,
  Italic,
  Underline,
  HelpCircle,
  Zap,
  Activity,
} from "lucide-react"

export default function OpportunityDetail({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { theme } = useTheme()

  const [showAllInfo, setShowAllInfo] = useState(false)
  const [editingTeam, setEditingTeam] = useState(false)
  const [editingFields, setEditingFields] = useState(false)
  const [showAllReports, setShowAllReports] = useState(false)
  const [showAllTodos, setShowAllTodos] = useState(false)
  const [showAllComms, setShowAllComms] = useState(false)
  const [notes, setNotes] = useState<
    Array<{
      id: string
      content: string
      date: string
      author: string
      category: string
      title?: string
      linkedDeal?: string
    }>
  >([])
  const [showAllNotes, setShowAllNotes] = useState(false)
  const [showAllDocuments, setShowAllDocuments] = useState(false)
  const [showReportCanvas, setShowReportCanvas] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [showCommentDialog, setShowCommentDialog] = useState(false)
  const [showQuestionDialog, setShowQuestionDialog] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)
  const [activeElement, setActiveElement] = useState<{ type: string; id: string } | null>(null)

  const [editingHeader, setEditingHeader] = useState(false)
  const [reportTitle, setReportTitle] = useState("Pre-screening Report")
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [showFieldSelector, setShowFieldSelector] = useState(false)
  const [currentComment, setCurrentComment] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [currentAIPrompt, setCurrentAIPrompt] = useState("")

  const [enrichmentTarget, setEnrichmentTarget] = useState<{
    sectionId: string
    blockId: string
    itemId: string
  } | null>(null)

  const [reportSections, setReportSections] = useState([
    {
      id: "executive-summary",
      name: "Executive Summary",
      blocks: [
        {
          id: "opportunity-overview",
          title: "Opportunity overview",
          width: "1/2",
          items: [
            {
              id: "opp-desc",
              type: "field",
              content: "Investment Thesis",
              fieldType: "Text",
              value:
                "Nordic Healthcare Platform represents a compelling investment opportunity in the rapidly expanding digital health sector. The company has established itself as the leading AI-powered diagnostic platform across Scandinavia, serving over 2.1 million patients through 340+ healthcare facilities. With proprietary machine learning algorithms achieving 94% diagnostic accuracy rates and regulatory approvals across all Nordic countries, the platform addresses critical healthcare efficiency challenges while generating strong unit economics. The Series B funding will accelerate international expansion into DACH markets and enhance AI capabilities through strategic R&D investments.",
              source: "Investment Committee Memo - Nordic Healthcare.pdf",
            },
          ],
        },
        {
          id: "key-terms",
          title: "Key terms",
          width: "1/2",
          items: [
            {
              id: "stage",
              type: "field",
              content: "Stage",
              fieldType: "Text",
              value: "Series B",
              source: "Term Sheet - Series B Final.pdf",
            },
            {
              id: "security-component",
              type: "field",
              content: "Security/Component",
              fieldType: "Text",
              value: "Preferred Stock",
              source: "Term Sheet - Series B Final.pdf",
            },
            {
              id: "round-size",
              type: "field",
              content: "Round size",
              fieldType: "Currency",
              value: "$85M",
              source: "Term Sheet - Series B Final.pdf",
            },
            {
              id: "pre-money",
              type: "field",
              content: "Pre-money valuation",
              fieldType: "Currency",
              value: "$340M",
              source: "Valuation Analysis - DCF Model.xlsx",
            },
            {
              id: "moic-range",
              type: "field",
              content: "Target MOIC Range",
              fieldType: "Number",
              value: "3.2x - 4.8x",
              source: "Financial Projections - Base Case.xlsx",
            },
            {
              id: "irr-range",
              type: "field",
              content: "Target IRR Range %",
              fieldType: "Number",
              value: "28% - 35%",
              source: "Financial Projections - Base Case.xlsx",
            },
          ],
        },
      ],
    },
    {
      id: "key-criteria",
      name: "Investment Analysis",
      blocks: [
        {
          id: "market-opportunity",
          title: "Market Opportunity",
          width: "full",
          items: [
            {
              id: "market-opportunity-desc",
              type: "field",
              content: "Market Analysis",
              fieldType: "Text",
              value:
                "The European digital health market represents a €45B opportunity growing at 12% CAGR, driven by aging demographics, physician shortages, and regulatory support for digital therapeutics. Nordic Healthcare operates in the high-value AI diagnostics segment (€8.2B TAM) where traditional solutions suffer from 40-60% false positive rates and lengthy processing times. The company's differentiated approach combining computer vision, natural language processing, and clinical decision support creates significant competitive moats while addressing genuine market pain points.",
              source: "Market Analysis - European HealthTech 2024.pdf",
            },
          ],
        },
        {
          id: "business-model",
          title: "Business Model & Unit Economics",
          width: "full",
          items: [
            {
              id: "business-model-desc",
              type: "field",
              content: "Revenue Model Analysis",
              fieldType: "Text",
              value:
                "Nordic Healthcare operates a highly scalable SaaS model with three primary revenue streams: (1) Platform licensing fees averaging €24K annually per healthcare facility, (2) Per-diagnostic transaction fees of €3.50 generating 78% gross margins, and (3) Premium AI modules commanding 40% price premiums. The company demonstrates exceptional unit economics with customer acquisition costs of €8,200 recovering within 11 months, lifetime values exceeding €180K, and net revenue retention of 142%. Monthly recurring revenue has grown 340% over 24 months with churn rates below 2.1% annually, indicating strong product-market fit and pricing power.",
              source: "Financial Deep Dive - Unit Economics.xlsx",
            },
          ],
        },
        {
          id: "competitive-analysis",
          title: "Competitive Positioning",
          width: "1/2",
          items: [
            {
              id: "competitive-advantage",
              type: "field",
              content: "Competitive Moats",
              fieldType: "Text",
              value:
                "Nordic Healthcare has established multiple defensive moats: (1) Proprietary dataset of 12M+ anonymized diagnostic cases creating training advantages, (2) Regulatory approvals requiring 18-24 months for competitors to replicate, (3) Integration partnerships with Epic, Cerner, and regional EMR providers creating switching costs, (4) Network effects as diagnostic accuracy improves with scale. The company's 67% market share in Nordic AI diagnostics and exclusive partnerships with leading medical universities provide sustainable competitive advantages.",
              source: "Competitive Intelligence Report Q4 2024.pdf",
            },
          ],
        },
        {
          id: "management-team",
          title: "Management Assessment",
          width: "1/2",
          items: [
            {
              id: "team-analysis",
              type: "field",
              content: "Leadership Evaluation",
              fieldType: "Text",
              value:
                "The management team combines deep healthcare domain expertise with proven execution capabilities. CEO Dr. Erik Lindqvist (former Chief Medical Officer at Karolinska Institute) brings 15+ years clinical experience and regulatory relationships. CTO Maria Andersson (ex-Google Health, Stanford PhD) leads a 47-person engineering team with specialized AI/ML capabilities. The team has successfully navigated complex regulatory environments, scaled operations across multiple countries, and maintained product innovation velocity while achieving profitability.",
              source: "Management Due Diligence Report.pdf",
            },
          ],
        },
      ],
    },
    {
      id: "key-risks-merits",
      name: "Risk Assessment",
      blocks: [
        {
          id: "key-risks",
          title: "Key Investment Risks",
          width: "1/2",
          color: "red",
          items: [
            {
              id: "regulatory-risk",
              type: "field",
              content: "Regulatory & Compliance Risk",
              fieldType: "Text",
              value:
                "Healthcare AI faces evolving regulatory frameworks with potential for retrospective compliance requirements. EU AI Act implementation may impose additional validation costs and operational constraints. Medical device classification changes could require costly re-certification processes.",
              source: "Legal Risk Assessment.pdf",
            },
            {
              id: "competition-risk",
              type: "field",
              content: "Competitive Threat Risk",
              fieldType: "Text",
              value:
                "Large technology companies (Google Health, Microsoft Healthcare Bot, IBM Watson Health) possess superior resources and may enter Nordic markets through acquisitions or partnerships. Established healthcare IT vendors could develop competing AI capabilities.",
              source: "Competitive Threat Analysis.pdf",
            },
            {
              id: "technology-risk",
              type: "field",
              content: "Technology & Scalability Risk",
              fieldType: "Text",
              value:
                "AI model performance may degrade with geographic expansion due to population health variations. Integration complexity with legacy healthcare systems could limit scalability and increase customer acquisition timelines.",
              source: "Technical Due Diligence Report.pdf",
            },
          ],
        },
        {
          id: "key-merits",
          title: "Investment Merits",
          width: "1/2",
          color: "green",
          items: [
            {
              id: "market-leadership",
              type: "field",
              content: "Market Leadership Position",
              fieldType: "Text",
              value:
                "Dominant 67% market share in Nordic AI diagnostics with first-mover advantages and regulatory approvals creating 18-24 month barriers to entry. Strong brand recognition among healthcare professionals and proven ability to expand into adjacent therapeutic areas.",
              source: "Market Position Analysis.pdf",
            },
            {
              id: "financial-performance",
              type: "field",
              content: "Strong Financial Metrics",
              fieldType: "Text",
              value:
                "Achieved profitability with 82% gross margins, 142% net revenue retention, and 340% ARR growth over 24 months. Strong balance sheet with 18 months runway and positive operating cash flow generation providing financial flexibility for growth investments.",
              source: "Financial Performance Review Q4 2024.xlsx",
            },
            {
              id: "expansion-opportunity",
              type: "field",
              content: "International Expansion Potential",
              fieldType: "Text",
              value:
                "Clear pathway to DACH market expansion leveraging existing regulatory approvals and EMR partnerships. Significant whitespace opportunity in AI-powered chronic disease management and preventive care applications with established customer relationships.",
              source: "International Expansion Strategy.pdf",
            },
          ],
        },
      ],
    },
    {
      id: "recommendation",
      name: "Investment Recommendation",
      blocks: [
        {
          id: "investment-recommendation",
          title: "Investment Committee Recommendation",
          width: "full",
          color: "green",
          items: [
            {
              id: "recommendation-text",
              type: "field",
              content: "Final Recommendation",
              fieldType: "Text",
              value:
                "PROCEED TO INVESTMENT - Nordic Healthcare Platform represents an exceptional investment opportunity combining market leadership, strong financial performance, and significant expansion potential. The company's differentiated AI technology, regulatory moats, and proven management team position it well for continued growth in the expanding digital health market. Recommend proceeding with $15M investment at proposed terms, subject to completion of technical and legal due diligence. The investment aligns with our healthcare technology thesis and portfolio construction objectives while offering attractive risk-adjusted returns in the 28-35% IRR range.",
              source: "Investment Committee Recommendation.pdf",
            },
          ],
        },
      ],
    },
  ])

  const opportunity = {
    id: Number.parseInt(params.id),
    name:
      params.id === "1"
        ? "European Growth Fund III"
        : params.id === "2"
          ? "Nordic Healthcare Platform"
          : "TechFlow Solutions",
    owner: params.id === "1" ? "Emma Rodriguez" : params.id === "2" ? "Sarah Chen" : "Mark Kim",
    dateAdded: params.id === "1" ? "2025-01-20" : params.id === "2" ? "2025-01-17" : "2025-01-15",
    dateModified: params.id === "1" ? "2025-01-22" : params.id === "2" ? "2025-01-19" : "2025-01-18",
    priority: params.id === "1" ? "High" : params.id === "2" ? "Medium" : "Low",
    dealStatus: params.id === "1" ? "Pipeline" : params.id === "2" ? "Due Diligence" : "Rejected",
    investmentType: params.id === "1" ? "Fund" : params.id === "2" ? "Co-investment" : "Direct",
    assetClass: params.id === "1" ? "Venture Capital" : params.id === "2" ? "Private Equity" : "Technology",
    description:
      params.id === "1"
        ? "Multi-stage venture capital fund focusing on B2B SaaS companies in Europe"
        : params.id === "2"
          ? "Digital healthcare solutions serving 2M+ patients across Scandinavia"
          : "AI-powered workflow automation platform for enterprise clients",
    strategicFit: params.id === "1" ? "Excellent" : params.id === "2" ? "Good" : "Poor",
    value: params.id === "1" ? "$150M" : params.id === "2" ? "$85M" : "$45M",
    analyst: params.id === "1" ? "Emma Rodriguez" : params.id === "2" ? "Sarah Chen" : "Mark Kim",
    stage: params.id === "1" ? "Pre-Screening" : params.id === "2" ? "Due Diligence" : "Rejected",
    rejectionReason:
      params.id === "3"
        ? "Market size concerns and competitive landscape analysis revealed limited growth potential. Management team lacks experience in enterprise sales, which is critical for this business model."
        : null,
    rejectionStage: params.id === "3" ? "Pre-screening" : null,
  }

  const [fieldValues, setFieldValues] = useState(() => {
    const getTemplateFields = (investmentType: string) => {
      switch (investmentType) {
        case "Fund":
          return {
            "Opportunity Information": [
              { label: "Opportunity Name", value: opportunity.name },
              { label: "Asset Manager", value: "European Growth Partners" },
              { label: "Opportunity Description", value: opportunity.description },
              { label: "Asset Class", value: opportunity.assetClass },
              { label: "Sub Asset Class", value: "B2B SaaS" },
              { label: "Geography", value: "Europe" },
              { label: "Investment Strategy", value: "Capital gain/growth" },
            ],
            "Investment terms": [
              { label: "Fund Size", value: "$150M" },
              { label: "Target IRR Range %", value: "18-22%" },
              { label: "Target MOIC Range", value: "2.8-3.2x" },
              { label: "Target Yield Range %", value: "15-18%" },
              { label: "Target holding period (years)", value: "4-6" },
            ],
            "Timeline & process": [
              { label: "Receive Date", value: "2025-01-20" },
              { label: "Expected IC Date", value: "2025-02-20" },
              { label: "Closing Date", value: "2025-04-15" },
            ],
          }
        case "Co-investment":
          return {
            "Opportunity Information": [
              { label: "Opportunity Name", value: opportunity.name },
              { label: "Asset Manager", value: "Nordic Capital Partners" },
              { label: "Opportunity Description", value: opportunity.description },
              { label: "Stage", value: "Series B" },
              { label: "Security/Component", value: "Preferred Equity" },
              { label: "Geography", value: "Scandinavia" },
              { label: "Sector", value: "Healthcare Technology" },
              { label: "Investment Strategy", value: "Capital gain/growth" },
            ],
            "Investment terms": [
              { label: "Round size", value: "$85M" },
              { label: "Pre-money valuation", value: "$200M" },
              { label: "Target MOIC Range", value: "3-4x" },
              { label: "Target IRR Range %", value: "20-25%" },
              { label: "Target holding period (years)", value: "3-5" },
            ],
            "Timeline & process": [
              { label: "Receive Date", value: "2025-01-17" },
              { label: "Expected IC Date", value: "2025-02-15" },
              { label: "Closing Date", value: "2025-03-30" },
            ],
          }
        case "Direct":
        default:
          return {
            "Opportunity Information": [
              { label: "Opportunity Name", value: opportunity.name },
              { label: "Opportunity Description", value: opportunity.description },
              { label: "Stage", value: "Series A" },
              { label: "Security/Component", value: "Preferred Equity" },
              { label: "Geography", value: "North America" },
              { label: "Sector", value: "Enterprise Software" },
              { label: "Investment Strategy", value: "Capital gain/growth" },
            ],
            "Investment terms": [
              { label: "Round size", value: "$45M" },
              { label: "Pre-money valuation", value: "$120M" },
              { label: "Target MOIC Range", value: "2.5-3.5x" },
              { label: "Target IRR Range %", value: "18-22%" },
              { label: "Target holding period (years)", value: "4-6" },
            ],
            "Timeline & process": [
              { label: "Receive Date", value: "2025-01-15" },
              { label: "Expected IC Date", value: "2025-02-10" },
              { label: "Closing Date", value: "2025-03-15" },
            ],
          }
      }
    }
    return getTemplateFields(opportunity.investmentType)
  })

  const [dealTeam, setDealTeam] = useState([
    {
      id: 1,
      name: opportunity.owner,
      role: "Deal Lead",
      avatar: opportunity.owner
        .split(" ")
        .map((n) => n[0])
        .join(""),
    },
    { id: 2, name: "Mark Kim", role: "Support", avatar: "MK" },
    { id: 3, name: "Jennifer Liu", role: "Reviewer", avatar: "JL" },
  ])

  const dealStages =
    opportunity.dealStatus === "Rejected"
      ? [
          { name: "Pipeline", completed: true },
          { name: "Under Review", completed: true },
          { name: "Rejected", completed: true, current: true, rejected: true },
        ]
      : opportunity.dealStatus === "Due Diligence"
        ? [
            { name: "Pipeline", completed: true },
            { name: "Under Review", completed: true },
            { name: "Due Diligence", completed: true, current: true },
            { name: "Investment Committee", completed: false },
            { name: "Approved", completed: false },
          ]
        : [
            { name: "Pipeline", completed: true, current: true },
            { name: "Under Review", completed: false },
            { name: "Due Diligence", completed: false },
            { name: "Investment Committee", completed: false },
            { name: "Approved", completed: false },
          ]

  const currentStageIndex = dealStages.findIndex((stage) => stage.current)
  const progressPercentage = ((currentStageIndex + 1) / dealStages.length) * 100

  const deliverables = [
    { name: "Pre-Screening Report", status: "In Progress", type: "report" },
    { name: "IC Memorandum", status: "Not Started", type: "memo" },
    { name: "Due Diligence Report", status: "Not Started", type: "report" },
    { name: "Investment Committee Presentation", status: "Not Started", type: "presentation" },
  ]

  const reports = [
    { name: "Pre-Screening Report", status: "In Progress", type: "Pre-Screening" },
    { name: "IC Memo", status: "Not Started", type: "IC Memo" },
  ]

  const [documents, setDocuments] = useState<
    Array<{ id: string; name: string; type: string; size: string; uploadDate: string; status: string }>
  >([])

  const [todos, setTodos] = useState<
    Array<{ id: number; task: string; dueDate: string; completed: boolean; priority: string }>
  >([
    { id: 1, task: "Complete market analysis", dueDate: "2025-01-25", completed: false, priority: "Medium" },
    { id: 2, task: "Schedule management meeting", dueDate: "2025-01-24", completed: false, priority: "Medium" },
    { id: 3, task: "Review financial statements", dueDate: "2025-01-26", completed: true, priority: "Medium" },
    { id: 4, task: "Prepare IC presentation", dueDate: "2025-01-28", completed: false, priority: "Medium" },
    { id: 5, task: "Conduct reference calls", dueDate: "2025-01-30", completed: false, priority: "Medium" },
  ])

  const [communications, setCommunications] = useState<
    Array<{ id: number; type: string; subject: string; date: string; from: string }>
  >([
    { id: 1, type: "Email", subject: "Initial screening completed", date: "2025-01-22", from: "Sarah Chen" },
    { id: 2, type: "Call", subject: "Management team discussion", date: "2025-01-21", from: "Mark Kim" },
    { id: 3, type: "Meeting", subject: "Due diligence kickoff", date: "2025-01-20", from: "Jennifer Liu" },
    { id: 4, type: "Email", subject: "Financial data request", date: "2025-01-19", from: "Sarah Chen" },
  ])

  const [meetings, setMeetings] = useState<
    Array<{ id: string; type: string; title: string; date: string; time?: string; attendees?: string }>
  >([])

  const [editingField, setEditingField] = useState<{ sectionId: string; blockId: string; itemId: string } | null>(null)
  const [selectedTextRange, setSelectedTextRange] = useState<{ start: number; end: number; text: string } | null>(null)
  const [showAIFloatingPanel, setShowAIFloatingPanel] = useState(false)
  const [aiPanelPosition, setAiPanelPosition] = useState({ x: 0, y: 0 })

  const [showCommentsPane, setShowCommentsPane] = useState(false)
  const [comments, setComments] = useState<Array<{ id: string; text: string; section: string; timestamp: string }>>([])
  const [questions, setQuestions] = useState<Array<{ id: string; text: string; section: string; timestamp: string }>>(
    [],
  )

  const [mentionSuggestions, setMentionSuggestions] = useState<string[]>([])
  const [showMentions, setShowMentions] = useState(false)

  const teamMembers = ["Emma Rodriguez", "John Smith", "Sarah Johnson", "Michael Chen", "Lisa Wang"]

  const handleCommentChange = (value: string) => {
    setCurrentComment(value)
    const lastAtIndex = value.lastIndexOf("@")
    if (lastAtIndex !== -1) {
      const searchTerm = value.slice(lastAtIndex + 1).toLowerCase()
      const filtered = teamMembers.filter((member) => member.toLowerCase().includes(searchTerm))
      setMentionSuggestions(filtered)
      setShowMentions(filtered.length > 0)
    } else {
      setShowMentions(false)
    }
  }

  const selectMention = (member: string) => {
    const lastAtIndex = currentComment.lastIndexOf("@")
    const newComment = currentComment.slice(0, lastAtIndex) + `@${member} `
    setCurrentComment(newComment)
    setShowMentions(false)
  }

  const [showAIDialog, setShowAIDialog] = useState(false)

  const openEditingPanel = (type: string, id: string, sectionId: string, blockId: string) => {
    setActiveElement({ type: id, id: id })
    if (type === "comment") setShowCommentDialog(true)
    else if (type === "question") setShowQuestionDialog(true)
    else if (type === "ai") setShowAIDialog(true)
  }

  const updateFieldValue = (sectionName: string, fieldIndex: number, newValue: string) => {
    setFieldValues((prev) => ({
      ...prev,
      [sectionName]: prev[sectionName].map((field, index) =>
        index === fieldIndex ? { ...field, value: newValue } : field,
      ),
    }))
  }

  const removeTeamMember = (id: number) => {
    setDealTeam((prev) => prev.filter((member) => member.id !== id))
  }

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Not Started":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const handleViewReport = (reportName: string) => {
    if (reportName === "Pre-Screening Report") {
      setShowReportCanvas(true)
    }
  }

  const updateReportFieldValue = (sectionId: string, blockId: string, itemId: string, value: string) => {
    setReportSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              blocks: section.blocks.map((block) =>
                block.id === blockId
                  ? {
                      ...block,
                      items: block.items.map((item) => (item.id === itemId ? { ...item, value } : item)),
                    }
                  : block,
              ),
            }
          : section,
      ),
    )
  }

  const [gridColumns, setGridColumns] = useState<{ [key: string]: number }>({})
  const [isDragging, setIsDragging] = useState<string | null>(null)
  const isDraggingRef = useRef<string | null>(null)

  const handleGridResize = (elementId: string, newWidth: "1/4" | "1/2" | "full") => {
    // Update block width in the data structure
    setReportSections((prev) =>
      prev.map((section) => ({
        ...section,
        blocks: section.blocks.map((block) => (block.id === elementId ? { ...block, width: newWidth } : block)),
      })),
    )
  }

  const handleMouseDown = (elementId: string, e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(elementId)
    isDraggingRef.current = elementId

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current || elementId !== isDraggingRef.current) return

      const container = document.querySelector(".report-grid-container")
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const relativeX = moveEvent.clientX - containerRect.left
      const containerWidth = containerRect.width

      // Calculate which grid zone we're in
      const quarterWidth = containerWidth / 4
      const halfWidth = containerWidth / 2

      let newWidth: "1/4" | "1/2" | "full"
      if (relativeX <= quarterWidth) {
        newWidth = "1/4"
      } else if (relativeX <= halfWidth) {
        newWidth = "1/2"
      } else {
        newWidth = "full"
      }

      // Visual feedback during drag
      const element = document.querySelector(`[data-element-id="${elementId}"]`)
      if (element) {
        element.classList.remove("col-span-1", "col-span-2", "col-span-4")
        element.classList.add(newWidth === "1/4" ? "col-span-1" : newWidth === "1/2" ? "col-span-2" : "col-span-4")
      }
    }

    const handleMouseUp = () => {
      const container = document.querySelector(".report-grid-container")
      if (!container) {
        // Clean up even if container not found
        setIsDragging(null)
        isDraggingRef.current = null
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        return
      }

      const element = document.querySelector(`[data-element-id="${elementId}"]`)
      if (element) {
        let finalWidth: "1/4" | "1/2" | "full" = "1/4"
        if (element.classList.contains("col-span-4")) finalWidth = "full"
        else if (element.classList.contains("col-span-2")) finalWidth = "1/2"

        handleGridResize(elementId, finalWidth)
      }

      setIsDragging(null)
      isDraggingRef.current = null
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const addNewBlock = (sectionId: string) => {
    setReportSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          const newBlock = {
            id: `block-${Date.now()}`,
            title: "New Block",
            width: "full" as const,
            color: "gray" as const,
            items: [],
          }
          return { ...section, blocks: [...section.blocks, newBlock] }
        }
        return section
      }),
    )
  }

  const removeSection = (sectionId: string) => {
    setReportSections((prev) => prev.filter((section) => section.id !== sectionId))
  }

  const removeBlock = (sectionId: string, blockId: string) => {
    setReportSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              blocks: section.blocks.filter((block) => block.id !== blockId),
            }
          : section,
      ),
    )
  }

  const [showElementOptions, setShowElementOptions] = useState(false)
  const [selectedBlockForElementInternal, setSelectedBlockForElementInternal] = useState<{
    sectionId: string
    blockId: string
  } | null>(null)
  const [showGraphEditor, setShowGraphEditor] = useState(false)
  const [currentGraph, setCurrentGraph] = useState({
    type: "bar" as "bar" | "line" | "pie",
    data: [
      { label: "Q1", value: 25 },
      { label: "Q2", value: 35 },
      { label: "Q3", value: 45 },
      { label: "Q4", value: 55 },
    ],
    title: "Sample Chart",
    xAxisLabel: "Quarters",
    yAxisLabel: "Values",
    colors: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"],
  })

  const addNewElement = (sectionId: string, blockId: string, elementType: "field" | "image" | "graph" = "field") => {
    setReportSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            blocks: section.blocks.map((block) => {
              if (block.id === blockId) {
                let newElement
                if (elementType === "image") {
                  newElement = {
                    id: `element-${Date.now()}`,
                    content: "Image Placeholder",
                    fieldType: "Image" as const,
                    value: "/data-analysis-chart.png",
                  }
                } else if (elementType === "graph") {
                  newElement = {
                    id: `element-${Date.now()}`,
                    content: "Chart",
                    fieldType: "Chart" as const,
                    value: JSON.stringify({}),
                  }
                } else {
                  newElement = {
                    id: `element-${Date.now()}`,
                    content: "New Field",
                    fieldType: "Text" as const,
                    value: "",
                  }
                }
                return { ...block, items: [...block.items, newElement] }
              }
              return block
            }),
          }
        }
        return section
      }),
    )
    setShowElementOptions(false)
    setSelectedBlockForElementInternal(null)
  }

  const deleteElement = (sectionId: string, blockId: string, elementId: string) => {
    setReportSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            blocks: section.blocks.map((block) => {
              if (block.id === blockId) {
                return { ...block, items: block.items.filter((item) => item.id !== elementId) }
              }
              return block
            }),
          }
        }
        return section
      }),
    )
  }

  const addNewSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      name: "New Section",
      blocks: [
        {
          id: `block-${Date.now()}`,
          title: "New Block",
          width: "full" as const,
          items: [
            {
              id: `item-${Date.now()}`,
              content: "New Field",
              fieldType: "Text" as const,
              value: "",
            },
          ],
        },
      ],
    }
    setReportSections((prev) => [...prev, newSection])
  }

  const changeBlockWidth = (sectionId: string, blockId: string, width: "1/4" | "1/2" | "full") => {
    setReportSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              blocks: section.blocks.map((block) => (block.id === blockId ? { ...block, width } : block)),
            }
          : section,
      ),
    )
  }

  const handleElementAction = (type: "comment" | "question" | "ai", elementType: string, elementId: string) => {
    setActiveElement({ type: elementType, id: elementId })
    if (type === "comment") setShowCommentDialog(true)
    else if (type === "question") setShowQuestionDialog(true)
    else if (type === "ai") setShowAIDialog(true)
  }

  const handleTextSelection = (sectionId: string, blockId: string, itemId: string, element: HTMLElement) => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      const range = selection.getRangeAt(0)
      const selectedText = selection.toString()
      const fullText = element.textContent || ""
      const start = fullText.indexOf(selectedText)
      const end = start + selectedText.length

      setSelectedTextRange({ start, end, text: selectedText })
      setEnrichmentTarget({ sectionId, blockId, itemId })

      // Position floating AI panel near selection
      const rect = range.getBoundingClientRect()
      setAiPanelPosition({
        x: rect.left + rect.width / 2,
        y: rect.bottom + 10,
      })
      setShowAIFloatingPanel(true)
    }
  }

  const handleFieldClick = (sectionId: string, blockId: string, itemId: string) => {
    setEditingField({ sectionId, blockId, itemId })
  }

  const handleFieldBlur = (sectionId: string, blockId: string, itemId: string, newValue: string) => {
    setReportSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              blocks: section.blocks.map((block) =>
                block.id === blockId
                  ? {
                      ...block,
                      items: block.items.map((item) => (item.id === itemId ? { ...item, value: newValue } : item)),
                    }
                  : block,
              ),
            }
          : section,
      ),
    )
  }

  const refineSelectedText = (refinedText: string) => {
    if (!enrichmentTarget || !selectedTextRange) return

    setReportSections((prev) =>
      prev.map((section) =>
        section.id === enrichmentTarget.sectionId
          ? {
              ...section,
              blocks: section.blocks.map((block) =>
                block.id === enrichmentTarget.blockId
                  ? {
                      ...block,
                      items: block.items.map((item) =>
                        item.id === enrichmentTarget.itemId
                          ? {
                              ...item,
                              value:
                                item.value.substring(0, selectedTextRange.start) +
                                refinedText +
                                item.value.substring(selectedTextRange.end),
                            }
                          : item,
                      ),
                    }
                  : block,
              ),
            }
          : section,
      ),
    )
    setShowAIFloatingPanel(false)
    setSelectedTextRange(null)
    setEnrichmentTarget(null)
  }

  const [showAllMeetings, setShowAllMeetings] = useState(false)
  const meetingsData = [
    { id: 1, type: "Meeting", title: "Management Team Meeting", date: "2024-02-15", attendees: "John Smith, Jane Doe" },
    { id: 2, type: "Call", title: "Investor Update Call", date: "2024-02-20", attendees: "Investor A, Investor B" },
  ]

  const [showNewNoteModal, setShowNewNoteModal] = useState(false)
  const [showNewTodoModal, setShowNewTodoModal] = useState(false)
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false)
  const [showNewDocumentModal, setShowNewDocumentModal] = useState(false)
  const [newNote, setNewNote] = useState("")
  const [newTodo, setNewTodo] = useState("")
  const [newTodoDate, setNewTodoDate] = useState("")
  const [newMeetingTitle, setNewMeetingTitle] = useState("")
  const [newMeetingDate, setNewMeetingDate] = useState("")
  const [newMeetingType, setNewMeetingType] = useState("Management Presentation")
  const [newDocumentName, setNewDocumentName] = useState("")
  const [newDocumentType, setNewDocumentType] = useState("Term Sheet")

  const [newTodoOwner, setNewTodoOwner] = useState("")
  const [newTodoPriority, setNewTodoPriority] = useState("Medium")
  const [newTodoDescription, setNewTodoDescription] = useState("")
  const [newNoteTitle, setNewNoteTitle] = useState("")
  const [newNoteOwner, setNewNoteOwner] = useState("")
  const [newMeetingParticipants, setNewMeetingParticipants] = useState("")
  const [newMeetingLocation, setNewMeetingLocation] = useState("")
  const [newMeetingAgenda, setNewMeetingAgenda] = useState("")
  const [newMeetingNotes, setNewMeetingNotes] = useState("")
  const [newEmailTo, setNewEmailTo] = useState("")
  const [newEmailCC, setNewEmailCC] = useState("")
  const [newEmailSubject, setNewEmailSubject] = useState("")
  const [newEmailBody, setNewEmailBody] = useState("")
  const [newEmailAttachments, setNewEmailAttachments] = useState("")
  const [showNewCommunicationModal, setShowNewCommunicationModal] = useState(false)

  const [availableFields, setAvailableFields] = useState([
    { id: "company-name", name: "Company Name", type: "Text" },
    { id: "valuation", name: "Valuation", type: "Currency" },
    { id: "revenue", name: "Revenue", type: "Currency" },
    { id: "growth-rate", name: "Growth Rate", type: "Percentage" },
    { id: "market-size", name: "Market Size", type: "Currency" },
    { id: "team-size", name: "Team Size", type: "Number" },
  ])
  const [selectedText, setSelectedText] = useState<{
    text: string
    element: HTMLElement
    sectionId: string
    blockId: string
    itemId: string
  } | null>(null)
  const [showFormattingToolbar, setShowFormattingToolbar] = useState(false)
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 })
  const [editingLogo, setEditingLogo] = useState(false)
  const [logoUrl, setLogoUrl] = useState("/fintech-logo.png")
  const [showAddDropdown, setShowAddDropdown] = useState(false)

  const handleTextSelectionToolbar = (sectionId: string, blockId: string, itemId: string, element: HTMLElement) => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      const selectedText = selection.toString()
      const range = selection.getRangeAt(0)

      setSelectedText({
        text: selectedText,
        element,
        sectionId,
        blockId,
        itemId,
      })

      setToolbarPosition({
        x: range.getBoundingClientRect().left + range.getBoundingClientRect().width / 2,
        y: range.getBoundingClientRect().top - 60,
      })

      setShowFormattingToolbar(true)
      setShowAIFloatingPanel(false)
    } else {
      setShowFormattingToolbar(false)
      setSelectedText(null)
    }
  }

  const applyTextFormatting = (format: string) => {
    if (!selectedText) return

    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)

      switch (format) {
        case "bold":
          document.execCommand("bold", false)
          break
        case "italic":
          document.execCommand("italic", false)
          break
        case "underline":
          document.execCommand("underline", false)
          break
        case "strikethrough":
          document.execCommand("strikeThrough", false)
          break
        case "code":
          const code = document.createElement("code")
          code.style.backgroundColor = "#f3f4f6"
          code.style.padding = "2px 4px"
          code.style.borderRadius = "3px"
          code.style.fontFamily = "monospace"
          try {
            range.surroundContents(code)
          } catch (e) {
            code.appendChild(range.extractContents())
            range.insertNode(code)
          }
          break
      }
    }

    setShowFormattingToolbar(false)
    setSelectedText(null)
  }

  const enhanceSelectedText = (action: "refine" | "ask" | "enrich") => {
    if (!selectedText) return

    setShowAIFloatingPanel(true)
    setShowFormattingToolbar(false)

    // Simulate AI enhancement
    setTimeout(() => {
      if (selectedText) {
        let enhancedText = selectedText.text

        switch (action) {
          case "refine":
            enhancedText = `${selectedText.text} (refined by AI)`
            break
          case "enrich":
            enhancedText = `${selectedText.text} with additional context and insights`
            break
          case "ask":
            // For ask, we would show a different interface
            return
        }

        // Replace the selected text with enhanced version
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          range.deleteContents()
          range.insertNode(document.createTextNode(enhancedText))
        }
      }

      setShowAIFloatingPanel(false)
      setSelectedText(null)
    }, 1500)
  }

  const addFieldToBlock = (sectionId: string, blockId: string, fieldId: string) => {
    const field = availableFields.find((f) => f.id === fieldId)
    if (!field) return

    const newElement = {
      id: `element-${Date.now()}`,
      content: field.name,
      fieldType: field.type as any,
      value: field.type === "Currency" ? "$0" : field.type === "Number" ? "0" : "",
    }

    setReportSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            blocks: section.blocks.map((block) => {
              if (block.id === blockId) {
                return { ...block, items: [...block.items, newElement] }
              }
              return block
            }),
          }
        }
        return section
      }),
    )

    setShowFieldSelector(false)
  }

  const handleLogoClick = () => {
    setEditingLogo(true)
  }

  const handleLogoChange = (newUrl: string) => {
    setLogoUrl(newUrl)
    setEditingLogo(false)
  }

  useEffect(() => {
    const openReport = searchParams.get("openReport")
    if (openReport === "true") {
      setShowReportCanvas(true)
    }
  }, [searchParams])

  const formatText = (format: string) => {
    applyTextFormatting(format)
  }

  const handleAIRefine = () => {
    if (selectedText) {
      enhanceSelectedText("refine")
    }
  }

  const handleAIQuestion = () => {
    if (selectedText) {
      enhanceSelectedText("ask")
    }
  }

  const handleAddComment = () => {
    setShowCommentModal(true)
    setShowFormattingToolbar(false)
  }

  const handleAddQuestion = () => {
    setShowQuestionModal(true)
    setShowFormattingToolbar(false)
  }

  const handleAddDropdown = (type: string) => {
    console.log(`[v0] Adding ${type}`)

    switch (type) {
      case "Section":
        const newSection = {
          id: `section-${Date.now()}`,
          name: "New Section",
          blocks: [
            {
              id: `block-${Date.now()}`,
              title: "New Block",
              width: "full" as const,
              items: [
                {
                  id: `text-${Date.now()}`,
                  type: "text" as const,
                  content: "Click to edit this text...",
                },
              ],
            },
          ],
        }
        setReportSections((prev) => [...prev, newSection])
        break
      case "Block":
        if (!selectedBlockForElementInternal) return
        const { sectionId } = selectedBlockForElementInternal
        const newBlock = {
          id: `block-${Date.now()}`,
          title: "New Block",
          width: "1/2" as const,
          items: [
            {
              id: `text-${Date.now()}`,
              type: "text" as const,
              content: "Click to edit this text...",
            },
          ],
        }
        setReportSections((prev) =>
          prev.map((section) =>
            section.id === sectionId ? { ...section, blocks: [...section.blocks, newBlock] } : section,
          ),
        )
        break
      case "Field":
        setShowFieldSelector(true)
        break
      case "Graph":
        if (!selectedBlockForElementInternal) return
        const { sectionId: graphSectionId, blockId: graphBlockId } = selectedBlockForElementInternal
        const newGraphItem = {
          id: `graph-${Date.now()}`,
          type: "graph" as const,
          content: "Sample Graph",
          graphType: "bar",
          data: [
            { name: "Q1", value: 400 },
            { name: "Q2", value: 300 },
            { name: "Q3", value: 500 },
            { name: "Q4", value: 200 },
          ],
        }
        setReportSections((prev) =>
          prev.map((section) =>
            section.id === graphSectionId
              ? {
                  ...section,
                  blocks: section.blocks.map((block) =>
                    block.id === graphBlockId ? { ...block, items: [...block.items, newGraphItem] } : block,
                  ),
                }
              : section,
          ),
        )
        break
      case "Image":
        if (!selectedBlockForElementInternal) return
        const { sectionId: imageSectionId, blockId: imageBlockId } = selectedBlockForElementInternal
        const newImageItem = {
          id: `image-${Date.now()}`,
          type: "image" as const,
          content: "Click to upload image",
          src: "/placeholder-image.png",
        }
        setReportSections((prev) =>
          prev.map((section) =>
            section.id === imageSectionId
              ? {
                  ...section,
                  blocks: section.blocks.map((block) =>
                    block.id === imageBlockId ? { ...block, items: [...block.items, newImageItem] } : block,
                  ),
                }
              : section,
          ),
        )
        break
    }

    setShowAddDropdown(false)
    setSelectedBlockForElementInternal(null)
  }

  const getStageCircleClasses = (stage: any) => {
    if (stage.rejected) {
      return "bg-red-500 border-red-500 text-white shadow-sm"
    }
    if (stage.completed) {
      return "bg-black border-black text-white shadow-md"
    }
    if (stage.current) {
      return "bg-gray-600 border-gray-600 text-white shadow-sm ring-2 ring-gray-300"
    }
    return "bg-gray-100 border-gray-300 text-gray-400"
  }

  const getStageTextClasses = (stage: any) => {
    if (stage.rejected) {
      return "text-red-500 font-medium"
    }
    if (stage.completed) {
      return "text-black font-semibold"
    }
    if (stage.current) {
      return "text-gray-700 font-medium"
    }
    return "text-gray-400"
  }

  const getStageLineClasses = (stage: any) => {
    if (stage.completed) {
      return stage.rejected ? "bg-red-500" : "bg-black"
    }
    return "bg-gray-200"
  }

  return (
    <div className={`min-h-screen pt-14 ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            className={`${theme === "light" ? "text-gray-600 hover:text-black hover:bg-gray-100" : "text-gray-400 hover:text-white"}`}
            onClick={() => router.push("/opportunities")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Opportunities
          </Button>
        </div>

        {/* Top Header Card */}
        <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800 border border-gray-700"}>
          <CardContent className="p-6 py-4 px-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h1 className={`text-2xl font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
                    {opportunity.name}
                  </h1>
                  <Badge className={`${getPriorityColor(opportunity.priority)} border`}>
                    <Flag className="h-3 w-3 mr-1" />
                    {opportunity.priority} Priority
                  </Badge>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Badge
                      className={`${theme === "light" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} border-0 font-medium px-3 py-1 text-xs`}
                    >
                      {opportunity.assetClass}
                    </Badge>
                    <Badge
                      className={`${theme === "light" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} border-0 font-medium px-3 py-1 text-xs`}
                    >
                      {opportunity.investmentType}
                    </Badge>
                  </div>
                  <div
                    className={`flex items-center gap-4 text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                  >
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{opportunity.owner}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{opportunity.dateAdded}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{opportunity.dateModified}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`mb-4 pb-4 border-b ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
              <p className={`text-sm ${theme === "light" ? "text-gray-700" : "text-gray-300"} leading-relaxed`}>
                {opportunity.description}
              </p>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm font-medium ${theme === "light" ? "text-black" : "text-white"}`}>
                  Deal Progress
                </span>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between">
                  {dealStages.map((stage, index) => (
                    <div key={stage.name} className="flex flex-col items-center flex-1">
                      <div className="flex items-center w-full">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-all duration-200 ${getStageCircleClasses(stage)}`}
                        >
                          {stage.rejected ? (
                            "✕"
                          ) : stage.completed ? (
                            <Check className="h-3 w-3" />
                          ) : stage.current ? (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-gray-300" />
                          )}
                        </div>
                        {index < dealStages.length - 1 && (
                          <div
                            className={`flex-1 h-1 mx-2 rounded-full transition-all duration-200 ${getStageLineClasses(stage)}`}
                          />
                        )}
                      </div>
                      <span
                        className={`text-xs mt-2 text-center leading-tight transition-all duration-200 ${getStageTextClasses(stage)}`}
                      >
                        {stage.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {opportunity.dealStatus === "Rejected" && opportunity.rejectionReason && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mt-6">
                <h3 className="text-base font-medium text-red-400 mb-3">Rejection Reason</h3>
                <p className="text-sm text-red-300 leading-relaxed">{opportunity.rejectionReason}</p>
                <div className="mt-3 text-sm text-red-400">
                  Rejected at: {opportunity.rejectionStage} • Date: {opportunity.dateModified}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Executive Summary */}
          <div className="space-y-6 min-h-full">
            <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800 border border-gray-700"}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className={`${theme === "light" ? "text-black" : "text-white"} text-xl`}>
                    Executive Summary
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingFields(!editingFields)}
                    className={`${theme === "light" ? "text-gray-600 hover:text-black hover:bg-gray-100" : "text-gray-400 hover:text-white"} h-8`}
                  >
                    {editingFields ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                    {editingFields ? "Save" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className={`border-b ${theme === "light" ? "border-gray-200" : "border-gray-700"} mb-4`}></div>
                  {Object.entries(fieldValues).map(([sectionName, fields]) => (
                    <div key={sectionName} className="mb-4">
                      <h4
                        className={`text-xs mb-2 uppercase tracking-wide font-extrabold ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                      >
                        {sectionName}
                      </h4>
                      <div className="space-y-2">
                        {fields.map(
                          (field, index) =>
                            field.label !== "Opportunity Description" && (
                              <div key={index} className="flex justify-between items-center py-1">
                                <span className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                                  {field.label}
                                </span>
                                {editingFields ? (
                                  <Input
                                    value={field.value}
                                    onChange={(e) => updateFieldValue(sectionName, index, e.target.value)}
                                    className={`text-xs font-medium h-7 max-w-32 ${theme === "light" ? "bg-white border-gray-300 text-black" : "bg-gray-700 border-gray-600 text-white"}`}
                                  />
                                ) : (
                                  <span
                                    className={`text-xs font-medium ${theme === "light" ? "text-black" : "text-white"}`}
                                  >
                                    {field.value}
                                  </span>
                                )}
                              </div>
                            ),
                        )}
                      </div>
                      {sectionName !== Object.keys(fieldValues)[Object.keys(fieldValues).length - 1] && (
                        <div
                          className={`border-b ${theme === "light" ? "border-gray-200" : "border-gray-700"} mt-4`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="space-y-6 min-h-full">
            <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800 border border-gray-700"}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className={`${theme === "light" ? "text-black" : "text-white"} text-xl`}>
                    Reports & Documents
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Reports Subsection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-sm font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
                      Reports
                    </h3>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowAllReports(!showAllReports)}
                      className={`${theme === "light" ? "text-gray-600 hover:text-black hover:bg-gray-100" : "text-gray-400 hover:text-white"} h-8 text-xs`}
                    >
                      {showAllReports ? "Show Less" : "View All"}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {(showAllReports ? reports : reports.slice(0, 2)).map((report, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:opacity-80 transition-opacity ${theme === "light" ? "bg-gray-50" : "bg-gray-700"}`}
                        onClick={() => handleViewReport(report.name)}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className={`h-4 w-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
                          <span className={`text-sm font-medium ${theme === "light" ? "text-black" : "text-white"}`}>
                            {report.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(report.status)} text-xs border`}>{report.status}</Badge>
                          <ExternalLink
                            className={`h-4 w-4 cursor-pointer ${theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents Subsection */}
                <div className={`border-t pt-4 ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-sm font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
                      Documents
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowAllDocuments(!showAllDocuments)}
                        className={`${theme === "light" ? "text-gray-600 hover:text-black hover:bg-gray-100" : "text-gray-400 hover:text-white"} h-8 text-xs`}
                      >
                        {showAllDocuments ? "Show Less" : "View All"}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setShowNewDocumentModal(true)}
                        className={`h-8 text-xs ${theme === "light" ? "bg-gray-900 hover:bg-gray-800 text-white" : "bg-slate-500 hover:bg-slate-600 text-white"}`}
                      >
                        <Plus className="h-3 w-3 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {(showAllDocuments ? documents : documents.slice(0, 2)).map((document, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg ${theme === "light" ? "bg-gray-50" : "bg-gray-700"}`}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className={`h-4 w-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
                          <div>
                            <span
                              className={`text-sm font-medium block ${theme === "light" ? "text-black" : "text-white"}`}
                            >
                              {document.name}
                            </span>
                            {document.size && (
                              <span className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                                {document.size} • {document.uploadDate}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(document.status)} text-xs border`}>
                            {document.status}
                          </Badge>
                          {document.status === "Uploaded" && (
                            <ExternalLink
                              className={`h-4 w-4 cursor-pointer ${theme === "light" ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"}`}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Quick Actions Card */}
          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800 border border-gray-700"}>
            <CardHeader className="pb-4">
              <CardTitle
                className={`${theme === "light" ? "text-black" : "text-white"} text-xl flex items-center gap-3`}
              >
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div
                className={`p-3 rounded-lg border ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-700 border-gray-600"}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === "light" ? "bg-green-100" : "bg-green-900"}`}
                  >
                    <Check className={`h-4 w-4 ${theme === "light" ? "text-green-600" : "text-green-400"}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-medium ${theme === "light" ? "text-black" : "text-white"} mb-1`}>
                      Complete Investment Memo
                    </h4>
                    <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Due: Jan 22, 2025 • Assigned: Sarah Chen
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-3 rounded-lg border ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-700 border-gray-600"}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === "light" ? "bg-blue-100" : "bg-blue-900"}`}
                  >
                    <Calendar className={`h-4 w-4 ${theme === "light" ? "text-blue-600" : "text-blue-400"}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-medium ${theme === "light" ? "text-black" : "text-white"} mb-1`}>
                      Due Diligence Review
                    </h4>
                    <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Apr 30, 2024 • 10:00 AM
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-3 rounded-lg border ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-700 border-gray-600"}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === "light" ? "bg-purple-100" : "bg-purple-900"}`}
                  >
                    <MessageCircle className={`h-4 w-4 ${theme === "light" ? "text-purple-600" : "text-purple-400"}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-medium ${theme === "light" ? "text-black" : "text-white"} mb-1`}>
                      Follow up on financials
                    </h4>
                    <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Email sent • Awaiting response
                    </p>
                  </div>
                </div>
              </div>

              <Button
                className={`w-full mt-4 ${theme === "light" ? "bg-black hover:bg-gray-800 text-white" : "bg-white hover:bg-gray-100 text-black"}`}
                onClick={() => setShowNewTodoModal(true)}
              >
                New Action
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activities Card */}
          <Card className={theme === "light" ? "bg-white border-0 shadow-sm" : "bg-gray-800 border border-gray-700"}>
            <CardHeader className="pb-4">
              <CardTitle
                className={`${theme === "light" ? "text-black" : "text-white"} text-xl flex items-center gap-3`}
              >
                <Activity className="h-5 w-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div
                className={`p-3 rounded-lg border ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-700 border-gray-600"}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === "light" ? "bg-green-100" : "bg-green-900"}`}
                  >
                    <FileText className={`h-4 w-4 ${theme === "light" ? "text-green-600" : "text-green-400"}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-medium ${theme === "light" ? "text-black" : "text-white"} mb-1`}>
                      Document review completed
                    </h4>
                    <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Financial statements reviewed by Sarah Chen
                    </p>
                    <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"} mt-1`}>
                      2 hours ago
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-3 rounded-lg border ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-700 border-gray-600"}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === "light" ? "bg-blue-100" : "bg-blue-900"}`}
                  >
                    <MessageCircle className={`h-4 w-4 ${theme === "light" ? "text-blue-600" : "text-blue-400"}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-medium ${theme === "light" ? "text-black" : "text-white"} mb-1`}>
                      New comment added
                    </h4>
                    <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Michael Johnson commented on valuation model
                    </p>
                    <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"} mt-1`}>
                      4 hours ago
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-3 rounded-lg border ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-700 border-gray-600"}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === "light" ? "bg-purple-100" : "bg-purple-900"}`}
                  >
                    <Calendar className={`h-4 w-4 ${theme === "light" ? "text-purple-600" : "text-purple-400"}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-medium ${theme === "light" ? "text-black" : "text-white"} mb-1`}>
                      Meeting scheduled
                    </h4>
                    <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Management presentation scheduled by Lisa Wang
                    </p>
                    <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"} mt-1`}>
                      6 hours ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Completely redesigned report canvas with modern, compact styling and functional editing controls */}
      {/* Report Canvas Modal */}
      {showReportCanvas && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-7xl h-[95vh] flex shadow-2xl">
            {/* Main Report Area */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto bg-white p-8">
                <div className="max-w-5xl mx-auto">
                  <div className="mb-10 p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative group">
                        <img
                          src={logoUrl || "/placeholder.svg"}
                          alt="Company Logo"
                          className="w-16 h-16 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={handleLogoClick}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded flex items-center justify-center">
                          <Edit className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>

                      <div className="flex-1">
                        {editingHeader ? (
                          <Input
                            value={reportTitle}
                            onChange={(e) => setReportTitle(e.target.value)}
                            onBlur={() => setEditingHeader(false)}
                            onKeyDown={(e) => e.key === "Enter" && setEditingHeader(false)}
                            className="text-xl font-bold border-0 bg-transparent p-0 focus:bg-white focus:border focus:border-gray-300 text-gray-800"
                            autoFocus
                          />
                        ) : (
                          <h1
                            className="text-xl font-bold text-gray-800 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded"
                            onClick={() => setEditingHeader(true)}
                          >
                            {reportTitle}
                          </h1>
                        )}
                        <p className="text-base text-gray-700 mt-2">{opportunity.name}</p>
                        <p className="text-sm text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowReportCanvas(false)}
                        className="h-9 w-9 p-0"
                      >
                        <X className="w-5 h-5 text-gray-700" />
                      </Button>
                    </div>
                  </div>

                  {reportSections.map((section) => (
                    <div key={section.id} className="mb-8 group relative">
                      <div
                        className="bg-gray-100 px-5 py-4 mb-5 rounded-lg flex items-center justify-between group-hover:bg-gray-200 transition-colors"
                        onMouseEnter={() => setHoveredSection(section.id)}
                        onMouseLeave={() => setHoveredSection(null)}
                      >
                        <div className="flex items-center gap-3">
                          {section.id === "executive-summary" && <FileText className="w-5 h-5 text-gray-700" />}
                          {section.id === "financial-overview" && <TrendingUp className="w-5 h-5 text-gray-700" />}
                          {section.id === "key-criteria" && <CheckCircle className="w-5 h-5 text-gray-700" />}
                          <h2 className="font-bold text-lg text-gray-800">{section.name}</h2>
                        </div>
                        {hoveredSection === section.id && (
                          <div className="absolute top-2 right-2 flex items-center gap-1 bg-white rounded shadow-lg border p-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleElementAction("comment", "section", section.id)}
                              className="p-1 h-6 w-6"
                            >
                              <MessageCircle className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleElementAction("question", "section", section.id)}
                              className="p-1 h-6 w-6"
                            >
                              <HelpCircle className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeSection(section.id)}
                              className="p-1 h-6 w-6 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="report-grid-container grid grid-cols-4 gap-6 auto-rows-min">
                        {section.blocks.map((block) => (
                          <div
                            key={block.id}
                            data-element-id={block.id}
                            className={`group/block relative transition-all duration-200 ${
                              block.width === "1/4" ? "col-span-1" : block.width === "1/2" ? "col-span-2" : "col-span-4"
                            } ${isDragging === block.id ? "z-10 shadow-lg" : ""}`}
                            onMouseEnter={() => setHoveredBlock(block.id)}
                            onMouseLeave={() => setHoveredBlock(null)}
                          >
                            <div
                              className={`${
                                block.color === "red"
                                  ? "bg-red-50"
                                  : block.color === "green"
                                    ? "bg-green-50"
                                    : "bg-gray-50"
                              } rounded-lg p-5 hover:shadow-sm transition-all min-h-[120px] relative`}
                            >
                              <div className="flex items-center justify-between mb-4">
                                {block.title && (
                                  <div className="flex items-center gap-3">
                                    {block.id === "key-risks" && <AlertTriangle className="w-4 h-4 text-red-600" />}
                                    {block.id === "key-merits" && <CheckCircle className="w-4 h-4 text-green-600" />}
                                    {block.id === "recommendation" && <ThumbsUp className="w-4 h-4 text-green-600" />}
                                    {block.id === "opportunity-overview" && (
                                      <Building className="w-4 h-4 text-gray-700" />
                                    )}
                                    <h3
                                      className={`font-semibold text-lg ${
                                        block.color === "red"
                                          ? "text-red-800"
                                          : block.color === "green"
                                            ? "text-green-800"
                                            : "text-gray-800"
                                      }`}
                                    >
                                      {block.title}
                                    </h3>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 opacity-0 group-hover/block:opacity-100 transition-opacity">
                                  <div className="relative">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-8 w-8 p-0"
                                      onClick={() => {
                                        setSelectedBlockForElementInternal({ sectionId: section.id, blockId: block.id })
                                        setShowAddDropdown(!showAddDropdown)
                                      }}
                                      title="Add Element"
                                    >
                                      <Plus className="h-4 w-4 text-gray-700" />
                                    </Button>
                                    {showAddDropdown &&
                                      selectedBlockForElementInternal?.sectionId === section.id &&
                                      selectedBlockForElementInternal?.blockId === block.id && (
                                        <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg z-50 min-w-[120px]">
                                          <button
                                            className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                                            onClick={() => handleAddDropdown("Section")}
                                          >
                                            Section
                                          </button>
                                          <button
                                            className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                                            onClick={() => handleAddDropdown("Block")}
                                          >
                                            Block
                                          </button>
                                          <button
                                            className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                                            onClick={() => handleAddDropdown("Field")}
                                          >
                                            Field
                                          </button>
                                          <button
                                            className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                                            onClick={() => handleAddDropdown("Graph")}
                                          >
                                            Graph
                                          </button>
                                          <button
                                            className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                                            onClick={() => handleAddDropdown("Image")}
                                          >
                                            Image
                                          </button>
                                        </div>
                                      )}
                                  </div>
                                  <GripVertical className="h-4 w-4 text-gray-600 cursor-move" title="Move Block" />
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeBlock(section.id, block.id)}
                                    className="p-1 h-6 w-6 text-red-600 hover:text-red-700"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>

                              <div className="space-y-4">
                                {(() => {
                                  const numberFields = block.items.filter(
                                    (item) => item.fieldType === "Number" || item.fieldType === "Currency",
                                  )
                                  const otherFields = block.items.filter(
                                    (item) => item.fieldType !== "Number" && item.fieldType !== "Currency",
                                  )

                                  return (
                                    <>
                                      {/* Number fields in 2-column grid */}
                                      {numberFields.length > 0 && (
                                        <div className="grid grid-cols-2 gap-4">
                                          {numberFields.map((item) => (
                                            <div key={item.id} className="group/field relative">
                                              <div className="bg-white p-4 rounded border border-gray-200 hover:border-gray-300 transition-colors">
                                                <div
                                                  className="text-xl font-bold text-gray-800 mb-2 cursor-text hover:bg-gray-50 p-1 rounded"
                                                  contentEditable
                                                  suppressContentEditableWarning
                                                  onBlur={(e) => {
                                                    // Update the value
                                                    const newValue = e.currentTarget.textContent || ""
                                                    setReportSections((prev) =>
                                                      prev.map((s) =>
                                                        s.id === section.id
                                                          ? {
                                                              ...s,
                                                              blocks: s.blocks.map((b) =>
                                                                b.id === block.id
                                                                  ? {
                                                                      ...b,
                                                                      items: b.items.map((i) =>
                                                                        i.id === item.id
                                                                          ? { ...i, value: newValue }
                                                                          : i,
                                                                      ),
                                                                    }
                                                                  : b,
                                                              ),
                                                            }
                                                          : s,
                                                      ),
                                                    )
                                                  }}
                                                >
                                                  {item.value || "Enter value"}
                                                </div>
                                                <div className="absolute top-2 right-2 opacity-0 group-hover/field:opacity-100 transition-opacity flex gap-1">
                                                  <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-6 w-6 p-0"
                                                    onClick={() => deleteElement(section.id, block.id, item.id)}
                                                    title="Delete"
                                                  >
                                                    <X className="h-4 w-4 text-red-600" />
                                                  </Button>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}

                                      {/* Other fields with enhanced inline editing */}
                                      {otherFields.map((item) => (
                                        <div
                                          key={item.id}
                                          className="group/field relative"
                                          onMouseEnter={() => setHoveredItem(item.id)}
                                          onMouseLeave={() => setHoveredItem(null)}
                                        >
                                          <div className="bg-white p-4 rounded border border-gray-200 hover:border-gray-300 transition-colors">
                                            <div className="text-sm text-gray-600 mb-2">{item.content}</div>
                                            {item.fieldType === "Chart" ? (
                                              <div className="w-full h-52 bg-gray-50 rounded flex items-center justify-center border border-gray-200">
                                                <div className="text-center">
                                                  <BarChart3 className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                                                  <div className="text-base text-gray-600">Interactive Chart</div>
                                                  <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="mt-3 bg-transparent"
                                                    onClick={() => setShowGraphEditor(true)}
                                                  >
                                                    Edit Chart
                                                  </Button>
                                                </div>
                                              </div>
                                            ) : item.fieldType === "Image" ? (
                                              <div className="relative group/image">
                                                <img
                                                  src={item.value || "/placeholder.svg"}
                                                  alt={item.content}
                                                  className="w-full h-36 object-cover rounded cursor-pointer"
                                                  onClick={() => {
                                                    // Trigger image upload
                                                    const input = document.createElement("input")
                                                    input.type = "file"
                                                    input.accept = "image/*"
                                                    input.onchange = (e) => {
                                                      const file = (e.target as HTMLInputElement).files?.[0]
                                                      if (file) {
                                                        const reader = new FileReader()
                                                        reader.onload = (e) => {
                                                          const newImageUrl = e.target?.result as string
                                                          setReportSections((prev) =>
                                                            prev.map((s) =>
                                                              s.id === section.id
                                                                ? {
                                                                    ...s,
                                                                    blocks: s.blocks.map((b) =>
                                                                      b.id === block.id
                                                                        ? {
                                                                            ...b,
                                                                            items: b.items.map((i) =>
                                                                              i.id === item.id
                                                                                ? { ...i, value: newImageUrl }
                                                                                : i,
                                                                            ),
                                                                          }
                                                                        : b,
                                                                    ),
                                                                  }
                                                                : s,
                                                            ),
                                                          )
                                                        }
                                                        reader.readAsDataURL(file)
                                                      }
                                                    }
                                                    input.click()
                                                  }}
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/image:bg-opacity-20 transition-all rounded flex items-center justify-center">
                                                  <Edit className="w-6 h-6 text-white opacity-0 group-hover/image:opacity-100 transition-opacity" />
                                                </div>
                                              </div>
                                            ) : (
                                              <div
                                                className="text-base text-gray-800 cursor-text hover:bg-gray-50 p-2 rounded min-h-[60px] leading-relaxed"
                                                contentEditable
                                                suppressContentEditableWarning
                                                onMouseUp={(e) => {
                                                  setTimeout(() => {
                                                    handleTextSelectionToolbar(
                                                      section.id,
                                                      block.id,
                                                      item.id,
                                                      e.currentTarget,
                                                    )
                                                  }, 10)
                                                }}
                                                onBlur={(e) => {
                                                  const newValue = e.currentTarget.textContent || ""
                                                  setReportSections((prev) =>
                                                    prev.map((s) =>
                                                      s.id === section.id
                                                        ? {
                                                            ...s,
                                                            blocks: s.blocks.map((b) =>
                                                              b.id === block.id
                                                                ? {
                                                                    ...b,
                                                                    items: b.items.map((i) =>
                                                                      i.id === item.id ? { ...i, value: newValue } : i,
                                                                    ),
                                                                  }
                                                                : b,
                                                            ),
                                                          }
                                                        : s,
                                                    ),
                                                  )
                                                }}
                                                title={item.source ? `Source: ${item.source}` : "Click to edit"}
                                              >
                                                {item.value || "Click to add content..."}
                                              </div>
                                            )}
                                            {item.source && (
                                              <div className="absolute bottom-2 left-2 opacity-0 group-hover/field:opacity-100 transition-opacity">
                                                <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded shadow-lg">
                                                  {item.source}
                                                </div>
                                              </div>
                                            )}
                                            {hoveredItem === item.id && (
                                              <div className="absolute top-1 right-1 flex items-center gap-1 bg-white rounded shadow-lg border p-1">
                                                <Button
                                                  size="sm"
                                                  variant="ghost"
                                                  onClick={() => handleElementAction("comment", "item", item.id)}
                                                  className="p-1 h-5 w-5"
                                                >
                                                  <MessageCircle className="w-2.5 h-2.5" />
                                                </Button>
                                                <Button
                                                  size="sm"
                                                  variant="ghost"
                                                  onClick={() => handleElementAction("question", "item", item.id)}
                                                  className="p-1 h-5 w-5"
                                                >
                                                  <HelpCircle className="w-2.5 h-2.5" />
                                                </Button>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </>
                                  )
                                })()}
                              </div>
                            </div>
                            {hoveredBlock === block.id && (
                              <div className="absolute top-2 right-2 flex items-center gap-1 bg-white rounded shadow-lg border p-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeBlock(section.id, block.id)}
                                  className="p-1 h-6 w-6 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="text-center">
                    <Button
                      onClick={addNewSection}
                      variant="outline"
                      className="bg-white hover:bg-gray-50 border-gray-300"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Section
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 bg-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCommentsPane(!showCommentsPane)}
                    className="text-sm h-9"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Comments & Questions
                    {showCommentsPane ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReportCanvas(false)}
                    className="text-sm h-9"
                  >
                    Close
                  </Button>
                  <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white text-sm h-9">
                    Save Report
                  </Button>
                </div>
              </div>
            </div>

            {showCommentsPane && (
              <div className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-40 flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Comments & Questions</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowCommentsPane(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                  {comments.length === 0 && questions.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-10">No comments or questions yet</p>
                  ) : (
                    <>
                      {comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <MessageCircle className="w-5 h-5 text-blue-600" />
                            <span className="text-sm text-gray-500">{comment.section}</span>
                          </div>
                          <p className="text-base text-gray-900">{comment.text}</p>
                          <p className="text-sm text-gray-500 mt-2">{comment.timestamp}</p>
                        </div>
                      ))}
                      {questions.map((question) => (
                        <div key={question.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <HelpCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm text-gray-500">{question.section}</span>
                          </div>
                          <p className="text-base text-gray-900">{question.text}</p>
                          <p className="text-sm text-gray-500 mt-2">{question.timestamp}</p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Added Element Type Selection Modal */}
      {showElementOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Add Element</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                onClick={() => {
                  if (selectedBlockForElementInternal) {
                    addNewElement(
                      selectedBlockForElementInternal.sectionId,
                      selectedBlockForElementInternal.blockId,
                      "field",
                    )
                  }
                }}
              >
                Field
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                onClick={() => {
                  if (selectedBlockForElementInternal) {
                    addNewElement(
                      selectedBlockForElementInternal.sectionId,
                      selectedBlockForElementInternal.blockId,
                      "image",
                    )
                  }
                }}
              >
                Image
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                onClick={() => {
                  if (selectedBlockForElementInternal) {
                    addNewElement(
                      selectedBlockForElementInternal.sectionId,
                      selectedBlockForElementInternal.blockId,
                      "graph",
                    )
                  }
                }}
              >
                Graph
              </Button>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                className="text-gray-700 border-gray-300 bg-transparent"
                onClick={() => {
                  setShowElementOptions(false)
                  setSelectedBlockForElementInternal(null)
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Added Canva-style Graph Editor Modal */}
      {showGraphEditor && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-6xl h-[90vh] flex shadow-2xl rounded-lg overflow-hidden">
            {/* Graph Editor Sidebar */}
            <div className="w-80 bg-gray-50 p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Chart Editor</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowGraphEditor(false)}>
                  X
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Chart Type</label>
                  <select
                    value={currentGraph.type}
                    onChange={(e) => setCurrentGraph((prev) => ({ ...prev, type: e.target.value as any }))}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="bar">Bar Chart</option>
                    <option value="line">Line Chart</option>
                    <option value="pie">Pie Chart</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Chart Title</label>
                  <Input
                    value={currentGraph.title}
                    onChange={(e) => setCurrentGraph((prev) => ({ ...prev, title: e.target.value }))}
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Data Points</label>
                  <div className="space-y-2">
                    {currentGraph.data.map((point, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={point.label}
                          onChange={(e) => {
                            const newData = [...currentGraph.data]
                            newData[index].label = e.target.value
                            setCurrentGraph((prev) => ({ ...prev, data: newData }))
                          }}
                          placeholder="Label"
                          className="text-sm"
                        />
                        <Input
                          type="number"
                          value={point.value}
                          onChange={(e) => {
                            const newData = [...currentGraph.data]
                            newData[index].value = Number(e.target.value)
                            setCurrentGraph((prev) => ({ ...prev, data: newData }))
                          }}
                          placeholder="Value"
                          className="text-sm"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const newData = currentGraph.data.filter((_, i) => i !== index)
                            setCurrentGraph((prev) => ({ ...prev, data: newData }))
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          X
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 bg-transparent"
                    onClick={() => {
                      setCurrentGraph((prev) => ({
                        ...prev,
                        data: [...prev.data, { label: `Point ${prev.data.length + 1}`, value: 0 }],
                      }))
                    }}
                  >
                    Add Data Point
                  </Button>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={() => {
                      // Save the graph and close editor
                      setShowGraphEditor(false)
                    }}
                    className="flex-1"
                  >
                    Save Chart
                  </Button>
                  <Button variant="outline" onClick={() => setShowGraphEditor(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>

            {/* Graph Preview */}
            <div className="flex-1 p-6 flex items-center justify-center">
              <div className="w-full h-96 bg-white rounded border border-gray-200 p-4">
                <div className="h-full flex flex-col">
                  <h3 className="text-lg font-semibold mb-4 text-center">{currentGraph.title}</h3>

                  {currentGraph.type === "bar" && (
                    <div className="flex-1 flex items-end justify-center gap-4 px-4">
                      {currentGraph.data.map((point, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className="bg-blue-500 rounded-t transition-all duration-300"
                            style={{
                              height: `${Math.max((point.value / Math.max(...currentGraph.data.map((d) => d.value))) * 200, 10)}px`,
                              width: "40px",
                            }}
                          />
                          <div className="text-xs mt-2 text-center">{point.label}</div>
                          <div className="text-xs">{point.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentGraph.type === "line" && (
                    <div className="flex-1 relative">
                      <svg className="w-full h-full" viewBox="0 0 400 200">
                        <polyline
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          points={currentGraph.data
                            .map((point, index) => {
                              const x = (index / (currentGraph.data.length - 1)) * 350 + 25
                              const y = 175 - (point.value / Math.max(...currentGraph.data.map((d) => d.value))) * 150
                              return `${x},${y}`
                            })
                            .join(" ")}
                        />
                        {currentGraph.data.map((point, index) => {
                          const x = (index / (currentGraph.data.length - 1)) * 350 + 25
                          const y = 175 - (point.value / Math.max(...currentGraph.data.map((d) => d.value))) * 150
                          return (
                            <g key={index}>
                              <circle cx={x} cy={y} r="4" fill="#3b82f6" />
                              <text x={x} y="195" textAnchor="middle" className="text-xs">
                                {point.label}
                              </text>
                            </g>
                          )
                        })}
                      </svg>
                    </div>
                  )}

                  {currentGraph.type === "pie" && (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="relative">
                        <svg width="200" height="200" viewBox="0 0 200 200">
                          {(() => {
                            const total = currentGraph.data.reduce((sum, point) => sum + point.value, 0)
                            let currentAngle = 0
                            return currentGraph.data.map((point, index) => {
                              const angle = (point.value / total) * 360
                              const startAngle = currentAngle
                              currentAngle += angle

                              const x1 = 100 + 80 * Math.cos(((startAngle - 90) * Math.PI) / 180)
                              const y1 = 100 + 80 * Math.sin(((startAngle - 90) * Math.PI) / 180)
                              const x2 = 100 + 80 * Math.cos(((startAngle + angle - 90) * Math.PI) / 180)
                              const y2 = 100 + 80 * Math.sin(((startAngle + angle - 90) * Math.PI) / 180)

                              const largeArcFlag = angle > 180 ? 1 : 0

                              return (
                                <path
                                  key={index}
                                  d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                  fill={currentGraph.colors[index % currentGraph.colors.length]}
                                  stroke="white"
                                  strokeWidth="2"
                                />
                              )
                            })
                          })()}
                        </svg>
                        <div className="absolute -right-24 top-0 space-y-2">
                          {currentGraph.data.map((point, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                              <div
                                className="w-3 h-3 rounded"
                                style={{ backgroundColor: currentGraph.colors[index % currentGraph.colors.length] }}
                              />
                              <span>
                                {point.label}: {point.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Add Comment</h3>
            <Textarea
              value={currentComment}
              onChange={(e) => setCurrentComment(e.target.value)}
              placeholder="Enter your comment..."
              className="w-full mb-4 min-h-[100px] text-gray-800 bg-white border-gray-300"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowCommentModal(false)}
                className="text-gray-700 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (currentComment.trim()) {
                    setComments((prev) => [
                      ...prev,
                      {
                        id: Date.now().toString(),
                        text: currentComment,
                        section: "Current Section",
                        timestamp: new Date().toLocaleString(),
                      },
                    ])
                    setCurrentComment("")
                    setShowCommentModal(false)
                  }
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white"
              >
                Add Comment
              </Button>
            </div>
          </div>
        </div>
      )}

      {showQuestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Ask Question</h3>
            <Textarea
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              placeholder="Enter your question..."
              className="w-full mb-4 min-h-[100px] text-gray-800 bg-white border-gray-300"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowQuestionModal(false)}
                className="text-gray-700 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (currentQuestion.trim()) {
                    setQuestions((prev) => [
                      ...prev,
                      {
                        id: Date.now().toString(),
                        text: currentQuestion,
                        section: "Current Section",
                        timestamp: new Date().toLocaleString(),
                      },
                    ])
                    setCurrentQuestion("")
                    setShowQuestionModal(false)
                  }
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white"
              >
                Ask Question
              </Button>
            </div>
          </div>
        </div>
      )}

      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">AI Assistant</h3>
            <Textarea
              value={currentAIPrompt}
              onChange={(e) => setCurrentAIPrompt(e.target.value)}
              placeholder="Ask AI for help with this section..."
              className="w-full mb-4 min-h-[100px] text-gray-800 bg-white border-gray-300"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAIModal(false)} className="text-gray-700 border-gray-300">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setCurrentAIPrompt("")
                  setShowAIModal(false)
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white"
              >
                Get AI Help
              </Button>
            </div>
          </div>
        </div>
      )}

      {showAIFloatingPanel && selectedTextRange && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 min-w-[300px]"
          style={{
            left: `${aiPanelPosition.x - 150}px`,
            top: `${aiPanelPosition.y}px`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="text-sm font-medium text-gray-800 mb-3">AI Refine Selection</div>
          <div className="text-xs text-gray-600 mb-3 p-2 bg-gray-50 rounded border">"{selectedTextRange.text}"</div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => refineSelectedText(`Enhanced: ${selectedTextRange.text}`)}
              className="bg-gray-800 hover:bg-gray-700 text-white text-xs"
            >
              Enhance
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => refineSelectedText(`Expanded analysis: ${selectedTextRange.text}`)}
              className="text-gray-700 border-gray-300 text-xs"
            >
              Expand
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => refineSelectedText(`Simplified: ${selectedTextRange.text}`)}
              className="text-gray-700 border-gray-300 text-xs"
            >
              Simplify
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowAIFloatingPanel(false)}
              className="text-gray-500 text-xs"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {showNewNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`rounded-lg p-6 w-full max-w-lg shadow-xl ${theme === "light" ? "bg-white border border-gray-200" : "bg-gray-800 border border-gray-700"}`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
              Create New Note
            </h3>

            <div className="space-y-4">
              <Input
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Note title..."
                className={`w-full ${theme === "light" ? "text-gray-800 bg-white border-gray-300" : "text-white bg-gray-700 border-gray-600"}`}
              />

              <select
                value={newNoteOwner}
                onChange={(e) => setNewNoteOwner(e.target.value)}
                className={`w-full p-2 rounded border ${theme === "light" ? "text-gray-800 bg-white border-gray-300" : "text-white bg-gray-700 border-gray-600"}`}
              >
                <option value="">Select Owner</option>
                <option value="Emma Rodriguez">Emma Rodriguez</option>
                <option value="Michael Chen">Michael Chen</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
              </select>

              <Input
                value="European Growth Fund III"
                disabled
                placeholder="Linked Deal"
                className={`w-full ${theme === "light" ? "text-gray-500 bg-gray-50 border-gray-300" : "text-gray-400 bg-gray-600 border-gray-600"}`}
              />

              <div className="relative">
                <Textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Note content..."
                  className={`w-full min-h-[120px] ${theme === "light" ? "text-gray-800 bg-white border-gray-300" : "text-white bg-gray-700 border-gray-600"}`}
                />
                <Button
                  type="button"
                  onClick={() => setNewNote("AI-generated note content based on deal context and recent activities...")}
                  className="absolute top-2 right-2 p-1 h-auto text-xs bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Write with AI
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewNoteModal(false)
                  setNewNote("")
                  setNewNoteTitle("")
                  setNewNoteOwner("")
                }}
                className={theme === "light" ? "text-gray-700 border-gray-300" : "text-gray-300 border-gray-600"}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (newNote.trim() && newNoteTitle.trim()) {
                    setNotes((prev) => [
                      {
                        id: Date.now().toString(),
                        title: newNoteTitle,
                        content: newNote,
                        author: newNoteOwner || "Current User",
                        date: new Date().toLocaleDateString(),
                        category: "General",
                        linkedDeal: "European Growth Fund III",
                      },
                      ...prev,
                    ])
                    setNewNote("")
                    setNewNoteTitle("")
                    setNewNoteOwner("")
                    setShowNewNoteModal(false)
                  }
                }}
                className={`${theme === "light" ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-slate-500 hover:bg-slate-600 text-white"}`}
              >
                Create Note
              </Button>
            </div>
          </div>
        </div>
      )}

      {showNewTodoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`rounded-lg p-6 w-full max-w-lg shadow-xl ${theme === "light" ? "bg-white border border-gray-200" : "bg-gray-800 border border-gray-700"}`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
              Create New Task
            </h3>

            <div className="space-y-4">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Task name..."
                className={`w-full ${theme === "light" ? "text-gray-800 bg-white border-gray-300" : "text-white bg-gray-700 border-gray-600"}`}
              />

              <select
                value={newTodoOwner}
                onChange={(e) => setNewTodoOwner(e.target.value)}
                className={`w-full p-2 rounded border ${theme === "light" ? "text-gray-800 bg-white border-gray-300" : "text-white bg-gray-700 border-gray-600"}`}
              >
                <option value="">Select Owner</option>
                <option value="Emma Rodriguez">Emma Rodriguez</option>
                <option value="Michael Chen">Michael Chen</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
              </select>

              <Input
                type="date"
                value={newTodoDate}
                onChange={(e) => setNewTodoDate(e.target.value)}
                className={`w-full ${theme === "light" ? "text-gray-800 bg-white border-gray-300" : "text-white bg-gray-700 border-gray-600"}`}
              />

              <select
                value={newTodoPriority}
                onChange={(e) => setNewTodoPriority(e.target.value)}
                className={`w-full p-2 rounded border ${theme === "light" ? "text-gray-800 bg-white border-gray-300" : "text-white bg-gray-700 border-gray-600"}`}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>

              <div className="relative">
                <Textarea
                  value={newTodoDescription}
                  onChange={(e) => setNewTodoDescription(e.target.value)}
                  placeholder="Task description..."
                  className={`w-full min-h-[80px] ${theme === "light" ? "text-gray-800 bg-white border-gray-300" : "text-white bg-gray-700 border-gray-600"}`}
                />
                <Button
                  type="button"
                  onClick={() => setNewTodoDescription("AI-generated task description based on context...")}
                  className="absolute top-2 right-2 p-1 h-auto text-xs bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Write with AI
                </Button>
              </div>

              <Input
                value="European Growth Fund III"
                disabled
                placeholder="Linked Deal"
                className={`w-full ${theme === "light" ? "text-gray-500 bg-gray-50 border-gray-300" : "text-gray-400 bg-gray-600 border-gray-600"}`}
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewMeetingModal(false)
                  setNewMeetingTitle("")
                  setNewMeetingDate("")
                  setNewMeetingParticipants("")
                  setNewMeetingLocation("")
                  setNewMeetingAgenda("")
                  setNewMeetingNotes("")
                }}
                className={theme === "light" ? "text-gray-700 border-gray-300" : "text-gray-300 border-gray-600"}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (newTodo.trim() && newTodoDate) {
                    setTodos((prev) => [
                      {
                        id: Date.now(),
                        task: newTodo,
                        dueDate: new Date(newTodoDate).toLocaleDateString(),
                        completed: false,
                        priority: newTodoPriority,
                        description: newTodoDescription,
                        linkedDeal: "European Growth Fund III",
                      },
                      ...prev,
                    ])
                    setNewTodo("")
                    setNewTodoDate("")
                    setNewTodoPriority("Medium")
                    setNewTodoDescription("")
                    setShowNewTodoModal(false)
                  }
                }}
                className={`${theme === "light" ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-slate-500 hover:bg-slate-600 text-white"}`}
              >
                Create Task
              </Button>
            </div>
          </div>
        </div>
      )}

      {showNewDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`rounded-lg p-6 w-full max-w-lg shadow-xl ${theme === "light" ? "bg-white border border-gray-200" : "bg-gray-800 border border-gray-700"}`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
              Upload New Document
            </h3>

            <div className="space-y-4">
              <Input
                value={newDocumentName}
                onChange={(e) => setNewDocumentName(e.target.value)}
                placeholder="Document name..."
                className={`w-full ${theme === "light" ? "text-gray-800 bg-white border-gray-300" : "text-white bg-gray-700 border-gray-600"}`}
              />

              <select
                value={newDocumentType}
                onChange={(e) => setNewDocumentType(e.target.value)}
                className={`w-full p-2 rounded border ${theme === "light" ? "text-gray-800 bg-white border-gray-300" : "text-white bg-gray-700 border-gray-600"}`}
              >
                <option value="Term Sheet">Term Sheet</option>
                <option value="Financial Model">Financial Model</option>
                <option value="Due Diligence Report">Due Diligence Report</option>
                <option value="Legal Agreement">Legal Agreement</option>
                <option value="Other">Other</option>
              </select>

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${theme === "light" ? "bg-gray-50 border-gray-300 hover:bg-gray-100" : "bg-gray-700 border-gray-600 hover:bg-gray-600"}`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className={`w-8 h-8 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.232 5.724"
                      />
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 9v7m0-10 0-4M8 1a1.5 1.5 0 0 1 3 0m-3 0h1.5A1.5 0 0 1 10 2.5V3m-1.5-.5h3"
                      />
                    </svg>
                    <p className={`mb-2 text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>

              <Input
                value="European Growth Fund III"
                disabled
                placeholder="Linked Deal"
                className={`w-full ${theme === "light" ? "text-gray-500 bg-gray-50 border-gray-300" : "text-gray-400 bg-gray-600 border-gray-600"}`}
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewDocumentModal(false)
                  setNewDocumentName("")
                  setNewDocumentType("Term Sheet")
                }}
                className={theme === "light" ? "text-gray-700 border-gray-300" : "text-gray-300 border-gray-600"}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (newDocumentName.trim()) {
                    setDocuments((prev) => [
                      {
                        id: Date.now().toString(),
                        name: newDocumentName,
                        type: newDocumentType,
                        size: "1.2 MB",
                        uploadDate: new Date().toLocaleDateString(),
                        status: "Uploaded",
                        linkedDeal: "European Growth Fund III",
                      },
                      ...prev,
                    ])
                    setNewDocumentName("")
                    setNewDocumentType("Term Sheet")
                    setShowNewDocumentModal(false)
                  }
                }}
                className={`${theme === "light" ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-slate-500 hover:bg-slate-600 text-white"}`}
              >
                Upload Document
              </Button>
            </div>
          </div>
        </div>
      )}

      {showNewCommunicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`rounded-lg p-6 w-full max-w-2xl shadow-xl ${theme === "light" ? "bg-white border border-gray-200" : "bg-gray-800 border border-gray-700"}`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
              Draft New Email
            </h3>

            <div className="space-y-4">
              <Input
                value={newEmailTo}
                onChange={(e) => setNewEmailTo(e.target.value)}
                placeholder="To: recipient@example.com"
                className={`w-full ${theme === "light" ? "text-gray-800 bg-white border-gray-300" : "text-white bg-gray-700 border-gray-600"}`}
              />

              <Input
                value={newEmailCC}
                onChange={(e) => setNewEmailCC(e.target.value)}
                placeholder="CC: (optional)"
                className={`w-full ${theme === "light" ? "text-gray-800 bg-white border-gray-300" : "text-white bg-gray-700 border-gray-600"}`}
              />

              <Input
                value={newEmailSubject}
                onChange={(e) => setNewEmailSubject(e.target.value)}
                placeholder="Subject..."
                className={`w-full ${theme === "light" ? "text-gray-800 bg-white border-gray-300" : "text-white bg-gray-700 border-gray-600"}`}
              />

              <div className="relative">
                <Textarea
                  value={newEmailBody}
                  onChange={(e) => setNewEmailBody(e.target.value)}
                  placeholder="Email body..."
                  className={`w-full min-h-[150px] ${theme === "light" ? "text-gray-800 bg-white border-gray-300" : "text-white bg-gray-700 border-gray-600"}`}
                />
                <Button
                  type="button"
                  onClick={() =>
                    setNewEmailBody("AI-drafted email content based on deal context and communication history...")
                  }
                  className="absolute top-2 right-2 p-1 h-auto text-xs bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Write with AI
                </Button>
              </div>

              <Input
                value={newEmailAttachments}
                onChange={(e) => setNewEmailAttachments(e.target.value)}
                placeholder="Attachments (optional)..."
                className={`w-full ${theme === "light" ? "text-gray-800 bg-white border-gray-300" : "text-white bg-gray-700 border-gray-600"}`}
              />

              <Input
                value="European Growth Fund III"
                disabled
                placeholder="Linked Deal"
                className={`w-full ${theme === "light" ? "text-gray-500 bg-gray-50 border-gray-300" : "text-gray-400 bg-gray-600 border-gray-600"}`}
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewCommunicationModal(false)
                  setNewEmailTo("")
                  setNewEmailCC("")
                  setNewEmailSubject("")
                  setNewEmailBody("")
                  setNewEmailAttachments("")
                }}
                className={theme === "light" ? "text-gray-700 border-gray-300" : "text-gray-300 border-gray-600"}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (newEmailTo.trim() && newEmailSubject.trim() && newEmailBody.trim()) {
                    setCommunications((prev) => [
                      {
                        id: Date.now().toString(),
                        subject: newEmailSubject,
                        from: "current.user@pinnacle.com",
                        to: newEmailTo,
                        cc: newEmailCC,
                        date: new Date().toLocaleDateString(),
                        preview: newEmailBody.substring(0, 100) + "...",
                        body: newEmailBody,
                        attachments: newEmailAttachments,
                        linkedDeal: "European Growth Fund III",
                      },
                      ...prev,
                    ])
                    setNewEmailTo("")
                    setNewEmailCC("")
                    setNewEmailSubject("")
                    setNewEmailBody("")
                    setNewEmailAttachments("")
                    setShowNewCommunicationModal(false)
                  }
                }}
                className={`${theme === "light" ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-slate-500 hover:bg-slate-600 text-white"}`}
              >
                Send Email
              </Button>
            </div>
          </div>
        </div>
      )}

      {showFormattingToolbar && selectedText && (
        <div
          className="fixed bg-white border rounded-lg shadow-lg p-2 flex items-center gap-2 z-50"
          style={{
            left: `${toolbarPosition.x}px`,
            top: `${toolbarPosition.y}px`,
          }}
        >
          <Button size="sm" variant="ghost" onClick={() => formatText("bold")} title="Bold">
            <Bold className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => formatText("italic")} title="Italic">
            <Italic className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => formatText("underline")} title="Underline">
            <Underline className="h-4 w-4" />
          </Button>
          <div className="w-px h-4 bg-gray-300" />
          <Button size="sm" variant="ghost" onClick={() => handleAIRefine()} title="Refine with AI">
            <Sparkles className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleAIQuestion()} title="Ask AI">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <div className="w-px h-4 bg-gray-300" />
          <Button size="sm" variant="ghost" onClick={() => handleAddComment()} title="Add Comment">
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleAddQuestion()} title="Add Question">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      )}

      {showAIFloatingPanel && (
        <div
          className="fixed z-[60] bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80"
          style={{
            left: `${toolbarPosition.x - 160}px`,
            top: `${toolbarPosition.y + 40}px`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold">AI Enhancement</h3>
          </div>
          <div className="text-sm text-gray-600 mb-3">Enhancing: "{selectedText?.text.substring(0, 50)}..."</div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm">Processing...</span>
          </div>
        </div>
      )}

      {showFieldSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full">
            <h3 className="text-lg font-semibold mb-4">Add Field</h3>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              placeholder="Search or create field..."
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowFieldSelector(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowFieldSelector(false)}>Add Field</Button>
            </div>
          </div>
        </div>
      )}

      {reportSections.map((section) =>
        section.blocks.map(
          (block) =>
            block.id === "key-terms" && (
              <>
                {(() => {
                  if (block.id === "key-terms") {
                    return (
                      <>
                        {block.items.map((item, index) => (
                          <div
                            key={item.id}
                            className="group/field relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600 mb-2">{item.value}</div>
                              <div className="text-sm text-gray-600">{item.content}</div>
                            </div>
                            {item.source && (
                              <div className="absolute bottom-2 left-2 opacity-0 group-hover/field:opacity-100 transition-opacity">
                                <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded shadow-lg">
                                  {item.source}
                                </div>
                              </div>
                            )}
                            {hoveredItem === item.id && (
                              <div className="absolute top-1 right-1 flex items-center gap-1 bg-white rounded shadow-lg border p-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleElementAction("comment", "item", item.id)}
                                  className="p-1 h-5 w-5"
                                >
                                  <MessageCircle className="w-2.5 h-2.5" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleElementAction("question", "item", item.id)}
                                  className="p-1 h-5 w-5"
                                >
                                  <HelpCircle className="w-2.5 h-2.5" />
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )
                  }
                })()}
              </>
            ),
        ),
      )}
    </div>
  )
}
