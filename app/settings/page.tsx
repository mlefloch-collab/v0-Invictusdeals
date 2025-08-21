"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Building2,
  Users,
  Shield,
  Workflow,
  Plug,
  FileText,
  Settings,
  Database,
  Save,
  Plus,
  Trash2,
  Edit,
  Eye,
  Crown,
  X,
  Copy,
  User,
  BarChart3,
  GripVertical,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function SettingsPage() {
  const [teamMembersData, setTeamMembersData] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@pinnaclecapital.com",
      role: "Managing Partner",
      department: "Leadership",
      status: "Active",
      avatar: "/professional-woman-brown-hair.png",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@pinnaclecapital.com",
      role: "IC Member",
      department: "Investment Committee",
      status: "Active",
      avatar: "/professional-asian-man-glasses.png",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@pinnaclecapital.com",
      role: "Associate",
      department: "Deal Team",
      status: "Active",
      avatar: "/professional-latina-woman.png",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@pinnaclecapital.com",
      role: "Analyst",
      department: "Deal Team",
      status: "Active",
      avatar: "/young-asian-professional.png",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.thompson@pinnaclecapital.com",
      role: "Legal",
      department: "Legal & Compliance",
      status: "Active",
      avatar: "/professional-blonde-woman-suit.png",
    },
    {
      id: 6,
      name: "Robert Wilson",
      email: "robert.wilson@pinnaclecapital.com",
      role: "Compliance",
      department: "Legal & Compliance",
      status: "Active",
      avatar: "/professional-older-man.png",
    },
    {
      id: 7,
      name: "Jennifer Davis",
      email: "jennifer.davis@pinnaclecapital.com",
      role: "Sales",
      department: "Business Development",
      status: "Active",
      avatar: "/professional-redhead.png",
    },
  ])

  const [templateConfigurations, setTemplateConfigurations] = useState([
    {
      name: "Fund Investment Template",
      templateType: "opportunity",
      sections: [
        {
          id: "opportunity-info",
          name: "Opportunity Information",
          fields: [
            { name: "Opportunity Name", type: "Text" },
            { name: "Asset Manager", type: "Text" },
            { name: "Opportunity Description", type: "Text" },
            { name: "Asset Class", type: "Select" },
            { name: "Sub Asset Class", type: "Select" },
            { name: "Geography", type: "Select" },
            { name: "Investment Strategy", type: "Text" },
          ],
        },
        {
          id: "investment-terms",
          name: "Investment terms",
          fields: [
            { name: "Fund Size", type: "Currency" },
            { name: "Target IRR Range %", type: "Number" },
            { name: "Target MOIC Range", type: "Number" },
            { name: "Target Yield Range %", type: "Number" },
            { name: "Target holding period (years)", type: "Number" },
          ],
        },
        {
          id: "timeline-process",
          name: "Timeline & process",
          fields: [
            { name: "Receive Date", type: "Date" },
            { name: "Expected IC Date", type: "Date" },
            { name: "Closing Date", type: "Date" },
          ],
        },
      ],
    },
    {
      name: "Co-Investment Template",
      templateType: "opportunity",
      sections: [
        {
          id: "opportunity-info",
          name: "Opportunity Information",
          fields: [
            { name: "Opportunity Name", type: "Text" },
            { name: "Asset Manager", type: "Text" },
            { name: "Opportunity Description", type: "Text" },
            { name: "Stage", type: "Select" },
            { name: "Security/Component", type: "Select" },
            { name: "Geography", type: "Select" },
            { name: "Sector", type: "Select" },
            { name: "Investment Strategy", type: "Text" },
          ],
        },
        {
          id: "investment-terms",
          name: "Investment terms",
          fields: [
            { name: "Round size", type: "Currency" },
            { name: "Pre-money valuation", type: "Currency" },
            { name: "Target MOIC Range", type: "Number" },
            { name: "Target IRR Range %", type: "Number" },
            { name: "Target holding period (years)", type: "Number" },
          ],
        },
        {
          id: "timeline-process",
          name: "Timeline & process",
          fields: [
            { name: "Receive Date", type: "Date" },
            { name: "Expected IC Date", type: "Date" },
            { name: "Closing Date", type: "Date" },
          ],
        },
      ],
    },
    {
      name: "Direct Investment Template",
      templateType: "opportunity",
      sections: [
        {
          id: "opportunity-info",
          name: "Opportunity Information",
          fields: [
            { name: "Opportunity Name", type: "Text" },
            { name: "Opportunity Description", type: "Text" },
            { name: "Stage", type: "Select" },
            { name: "Security/Component", type: "Select" },
            { name: "Geography", type: "Select" },
            { name: "Sector", type: "Select" },
            { name: "Investment Strategy", type: "Text" },
          ],
        },
        {
          id: "investment-terms",
          name: "Investment terms",
          fields: [
            { name: "Round size", type: "Currency" },
            { name: "Pre-money valuation", type: "Currency" },
            { name: "Target MOIC Range", type: "Number" },
            { name: "Target IRR Range %", type: "Number" },
            { name: "Target holding period (years)", type: "Number" },
          ],
        },
        {
          id: "timeline-process",
          name: "Timeline & process",
          fields: [
            { name: "Receive Date", type: "Date" },
            { name: "Expected IC Date", type: "Date" },
            { name: "Closing Date", type: "Date" },
          ],
        },
      ],
    },
    {
      name: "Asset Manager Profile",
      templateType: "asset-manager",
      sections: [
        {
          id: "firm-overview",
          name: "Firm Overview",
          fields: [
            { name: "Firm Name", type: "Text" },
            { name: "Founded Year", type: "Number" },
            { name: "Headquarters Location", type: "Text" },
            { name: "Total AUM", type: "Currency" },
            { name: "Number of Employees", type: "Number" },
            { name: "Firm Website", type: "Text" },
          ],
        },
        {
          id: "investment-focus",
          name: "Investment Focus",
          fields: [
            { name: "Investment Strategy", type: "Multi-Select" },
            { name: "Target Asset Classes", type: "Multi-Select" },
            { name: "Geographic Focus", type: "Multi-Select" },
            { name: "Sector Focus", type: "Multi-Select" },
            { name: "Investment Size Range", type: "Text" },
            { name: "Fund Size Range", type: "Text" },
          ],
        },
        {
          id: "track-record",
          name: "Track Record",
          fields: [
            { name: "Number of Funds Raised", type: "Number" },
            { name: "Total Capital Raised", type: "Currency" },
            { name: "Number of Portfolio Companies", type: "Number" },
            { name: "Notable Exits", type: "Text" },
            { name: "Average Fund IRR", type: "Number" },
            { name: "Average Fund MOIC", type: "Number" },
          ],
        },
        {
          id: "key-personnel",
          name: "Key Personnel",
          fields: [
            { name: "Managing Partner", type: "Text" },
            { name: "Investment Committee Members", type: "Text" },
            { name: "Key Investment Professionals", type: "Text" },
            { name: "Years of Experience", type: "Number" },
          ],
        },
        {
          id: "contact-details",
          name: "Contact Details",
          fields: [
            { name: "Primary Contact Name", type: "Text" },
            { name: "Primary Contact Title", type: "Text" },
            { name: "Primary Contact Email", type: "Email" },
            { name: "Primary Contact Phone", type: "Phone" },
            { name: "Office Address", type: "Text" },
          ],
        },
      ],
    },
  ])

  const [showEditModal, setShowEditModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)

  const [editingUser, setEditingUser] = useState(null)
  const [editingField, setEditingField] = useState(null)
  const [activeTemplateTab, setActiveTemplateTab] = useState("page")
  const [editingTemplate, setEditingTemplate] = useState(null)

  const [creatingTemplate, setCreatingTemplate] = useState<{ type: "page" | "report" } | null>(null)
  const [newTemplateName, setNewTemplateName] = useState("")
  const [selectedDependencyField, setSelectedDependencyField] = useState("")
  const [selectedOptionValue, setSelectedOptionValue] = useState("")

  const [viewingTemplate, setViewingTemplate] = useState<{ type: "page" | "report"; name: string } | null>(null)
  const [duplicatingTemplate, setDuplicatingTemplate] = useState<{ type: "page" | "report"; name: string } | null>(null)

  const [editingTemplateName, setEditingTemplateName] = useState(false)
  const [tempTemplateName, setTempTemplateName] = useState("")

  const [fields, setFields] = useState([
    { name: "Opportunity Name", type: "Text", options: "", editable: false, system: true },
    { name: "Vintage", type: "Number", options: "", editable: true },
    { name: "Asset Manager", type: "Select", options: "BlackRock,Vanguard,State Street,Fidelity", editable: true },
    { name: "Opportunity Description", type: "Text", options: "", editable: true },
    { name: "Investment type", type: "Select", options: "Direct,Fund,Co-investment", editable: true },
    {
      name: "Asset Class",
      type: "Select",
      options: "Private Equity,Venture Capital,Real Estate,Infrastructure,Hedge Funds",
      editable: false,
      system: true,
    },
    { name: "Sub Asset Class", type: "Select", options: "Growth Equity,Buyout,Seed,Series A,Series B", editable: true },
    {
      name: "Geography",
      type: "Select",
      options: "North America,Europe,Asia Pacific,Latin America,Middle East & Africa",
      editable: true,
    },
    {
      name: "Sector",
      type: "Select",
      options: "Technology,Healthcare,Financial Services,Consumer,Industrial",
      editable: true,
    },
    { name: "Investment Strategy", type: "Text", options: "", editable: true },
    { name: "Stage", type: "Select", options: "Seed,Early Stage,Growth,Late Stage,Pre-IPO", editable: true },
    { name: "Security/Component", type: "Select", options: "Equity,Debt,Convertible,Preferred", editable: true },
    {
      name: "Deal Status",
      type: "Select",
      options: "Pipeline,Under Review,Due Diligence,Investment Committee,Approved,Declined,Closed",
      editable: false,
      system: true,
    },
    { name: "Priority", type: "Select", options: "High,Medium,Low", editable: false, system: true },
    { name: "Date Added", type: "Date", options: "", editable: false, system: true },
    { name: "Date Modified", type: "Date", options: "", editable: false, system: true },
    { name: "Fund Size", type: "Currency", options: "", editable: true },
    { name: "Target IRR Range %", type: "Number", options: "", editable: true },
    { name: "Target MOIC Range", type: "Number", options: "", editable: true },
    { name: "Target Yield Range %", type: "Number", options: "", editable: true },
    { name: "Target holding period (years)", type: "Number", options: "", editable: true },
    { name: "Round size", type: "Currency", options: "", editable: true },
    { name: "Pre-money valuation", type: "Currency", options: "", editable: true },
    { name: "Receive Date", type: "Date", options: "", editable: true },
    { name: "Expected IC Date", type: "Date", options: "", editable: true },
    { name: "Closing Date", type: "Date", options: "", editable: true },
    { name: "Business model", type: "Text", options: "", editable: true },
    { name: "MOAT", type: "Text", options: "", editable: true },
    { name: "Market", type: "Text", options: "", editable: true },
    { name: "PMF", type: "Text", options: "", editable: true },
    { name: "Founder & Management & Board", type: "Text", options: "", editable: true },
    { name: "Financials", type: "Text", options: "", editable: true },
    { name: "Valuation", type: "Text", options: "", editable: true },
    { name: "Return analysis", type: "Text", options: "", editable: true },
    { name: "Key Risks", type: "Text", options: "", editable: true },
    { name: "Key Merits", type: "Text", options: "", editable: true },
    { name: "Recommendation", type: "Text", options: "", editable: true },
    // Asset Manager Profile fields
    { name: "Firm Name", type: "Text", options: "", editable: true },
    { name: "Founded Year", type: "Number", options: "", editable: true },
    { name: "Headquarters Location", type: "Text", options: "", editable: true },
    { name: "Total AUM", type: "Currency", options: "", editable: true },
    { name: "Number of Employees", type: "Number", options: "", editable: true },
    { name: "Investment Philosophy", type: "Text", options: "", editable: true },
    {
      name: "Primary Asset Classes",
      type: "Select",
      options: "Private Equity,Venture Capital,Real Estate,Infrastructure,Hedge Funds",
      editable: true,
    },
    {
      name: "Geographic Focus",
      type: "Select",
      options: "North America,Europe,Asia Pacific,Latin America,Middle East & Africa",
      editable: true,
    },
    {
      name: "Sector Specialization",
      type: "Select",
      options: "Technology,Healthcare,Financial Services,Consumer,Industrial",
      editable: true,
    },
    { name: "Investment Stage", type: "Select", options: "Seed,Early Stage,Growth,Late Stage,Pre-IPO", editable: true },
    { name: "Typical Check Size", type: "Currency", options: "", editable: true },
    { name: "Fund Strategy", type: "Text", options: "", editable: true },
    { name: "Number of Funds Raised", type: "Number", options: "", editable: true },
    { name: "Total Capital Raised", type: "Currency", options: "", editable: true },
    { name: "Average Fund Size", type: "Currency", options: "", editable: true },
    { name: "Net IRR", type: "Number", options: "", editable: true },
    { name: "Net MOIC", type: "Number", options: "", editable: true },
    { name: "Notable Exits", type: "Text", options: "", editable: true },
    { name: "Managing Partner", type: "Text", options: "", editable: true },
    { name: "Investment Committee Members", type: "Text", options: "", editable: true },
    { name: "Years of Experience", type: "Number", options: "", editable: true },
    { name: "Previous Experience", type: "Text", options: "", editable: true },
    { name: "Primary Contact Name", type: "Text", options: "", editable: true },
    { name: "Contact Title", type: "Text", options: "", editable: true },
    { name: "Email Address", type: "Text", options: "", editable: true },
    { name: "Phone Number", type: "Text", options: "", editable: true },
    { name: "Office Address", type: "Text", options: "", editable: true },
    { name: "Website", type: "Text", options: "", editable: true },
  ])
  const [fieldSearch, setFieldSearch] = useState("")
  const [templateSections, setTemplateSections] = useState([])
  const [editingSection, setEditingSection] = useState(null)

  const [reportSections, setReportSections] = useState([])

  const [reportTypes, setReportTypes] = useState([
    { id: "pre-screening", name: "Pre-Screening" },
    { id: "ic-memo", name: "IC Memo" },
  ])
  const [creatingReportType, setCreatingReportType] = useState(false)
  const [newReportTypeName, setNewReportTypeName] = useState("")
  const [editingReportType, setEditingReportType] = useState<string | null>(null)

  useEffect(() => {
    if (editingTemplate?.name === "Direct Opportunities Report" && reportSections.length === 0) {
      setReportSections([
        {
          id: "executive-summary",
          name: "Section 1: Executive Summary",
          blocks: [
            {
              id: "opportunity-overview",
              title: "BLOCK 1: Opportunity overview",
              width: "1/2",
              items: [
                { id: "opp-name", type: "field", content: "Opportunity Name", fieldType: "Text" },
                { id: "asset-mgr", type: "field", content: "Asset Manager", fieldType: "Select" },
                { id: "opp-desc", type: "field", content: "Opportunity Description", fieldType: "Text" },
                { id: "stage", type: "field", content: "Stage", fieldType: "Text" },
                { id: "security", type: "field", content: "Security/Component", fieldType: "Text" },
                { id: "geography", type: "field", content: "Geography", fieldType: "Multi-select" },
                { id: "sector", type: "field", content: "Sector", fieldType: "Multi-select" },
              ],
            },
            {
              id: "key-terms",
              title: "BLOCK 3: Key terms",
              width: "1/2",
              items: [
                { id: "round-size", type: "field", content: "Round size", fieldType: "Currency" },
                { id: "pre-money", type: "field", content: "Pre-money valuation", fieldType: "Currency" },
                {
                  id: "moic-range",
                  type: "field",
                  content: "Target MOIC Range",
                  fieldType: "Number or Percentage Range",
                },
                {
                  id: "irr-range",
                  type: "field",
                  content: "Target IRR Range %",
                  fieldType: "Percentage or Percentage Range",
                },
                { id: "holding-period", type: "field", content: "Target holding period (years)", fieldType: "Number" },
              ],
            },
          ],
        },
        {
          id: "key-criteria",
          name: "Key criteria",
          blocks: [
            {
              id: "criteria-block",
              title: "",
              width: "full",
              items: [
                { id: "business-model", type: "field", content: "Business model", fieldType: "Text" },
                { id: "moat", type: "field", content: "MOAT", fieldType: "Text" },
                { id: "market", type: "field", content: "Market", fieldType: "Text" },
                { id: "pmf", type: "field", content: "PMF", fieldType: "Text" },
                { id: "founder-mgmt", type: "field", content: "Founder & Management & Board", fieldType: "Text" },
                { id: "financials", type: "field", content: "Financials", fieldType: "Text" },
                { id: "valuation", type: "field", content: "Valuation", fieldType: "Text" },
                { id: "return-analysis", type: "field", content: "Return analysis", fieldType: "Text" },
              ],
            },
          ],
        },
        {
          id: "recommendation",
          name: "Recommendation",
          blocks: [
            {
              id: "recommendation-block",
              title: "",
              width: "full",
              items: [
                { id: "key-risks", type: "field", content: "Key Risks", fieldType: "Text" },
                { id: "key-merits", type: "field", content: "Key Merits", fieldType: "Text" },
                { id: "recommendation", type: "field", content: "Recommendation", fieldType: "Text" },
              ],
            },
          ],
        },
      ])
    }
  }, [editingTemplate, reportSections.length])

  const [selectedTheme, setSelectedTheme] = useState("professional")

  const colorPalettes = [
    {
      name: "Company Branding",
      id: "company",
      colors: {
        primary: "#64748b", // This would be configurable from General Settings
        secondary: "#94a3b8",
        accent: "#475569",
        background: "#f8fafc",
      },
    },
    {
      name: "Custom",
      id: "custom",
      colors: {
        primary: "#1e40af",
        secondary: "#64748b",
        accent: "#0ea5e9",
        background: "#f8fafc",
      },
    },
  ]

  const [customColors, setCustomColors] = useState({
    primary: "#1e40af",
    secondary: "#64748b",
    accent: "#0ea5e9",
  })

  const addReportSection = () => {
    const newSection = {
      id: Date.now().toString(),
      name: "New Section",
      subsections: [],
    }
    setReportSections([...reportSections, newSection])
  }

  const addSubsection = (sectionId: string) => {
    setReportSections((sections) =>
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              subsections: [
                ...section.subsections,
                {
                  id: `${sectionId}-${Date.now()}`,
                  name: "New Subsection",
                  blocks: [],
                },
              ],
            }
          : section,
      ),
    )
  }

  const addBlock = (sectionId: string, subsectionId: string, blockType: string) => {
    const newBlock = {
      id: `${subsectionId}-${Date.now()}`,
      type: blockType,
      width: "full",
      fields: blockType === "field-group" ? [] : undefined,
      title:
        blockType === "field-group"
          ? "New Field Group"
          : blockType === "chart"
            ? "New Chart"
            : blockType === "image"
              ? "New Image"
              : "New Text Block",
    }

    setReportSections((sections) =>
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              subsections: section.subsections.map((subsection) =>
                subsection.id === subsectionId
                  ? {
                      ...subsection,
                      blocks: [...subsection.blocks, newBlock],
                    }
                  : subsection,
              ),
            }
          : section,
      ),
    )
  }

  useEffect(() => {
    if (editingTemplate && editingTemplate.type === "page") {
      const config = templateConfigurations.find((t) => t.name === editingTemplate.name)
      if (config) {
        setTemplateSections(config.sections)
        console.log(`[v0] Auto-loaded configuration for ${editingTemplate.name}`)
      } else {
        // If no configuration found, start with empty sections
        setTemplateSections([])
        console.log(`[v0] No configuration found for ${editingTemplate.name}, starting empty`)
      }
    }
  }, [editingTemplate, templateConfigurations])

  const [reportHeader, setReportHeader] = useState({
    title: "Investment Committee Report",
    subtitle: `Generated on ${new Date().toLocaleDateString()}`,
  })

  const moveSection = (fromIndex: number, toIndex: number) => {
    setReportSections((sections) => {
      const newSections = [...sections]
      const [movedSection] = newSections.splice(fromIndex, 1)
      newSections.splice(toIndex, 0, movedSection)
      return newSections
    })
  }

  const moveBlock = (sectionId: string, fromIndex: number, toIndex: number) => {
    setReportSections((sections) =>
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              blocks: (() => {
                const blocks = [...(section.blocks || [])]
                const [movedBlock] = blocks.splice(fromIndex, 1)
                blocks.splice(toIndex, 0, movedBlock)
                return blocks
              })(),
            }
          : section,
      ),
    )
  }

  const moveItem = (sectionId: string, blockId: string, fromIndex: number, toIndex: number) => {
    setReportSections((sections) =>
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              blocks: (section.blocks || []).map((block) =>
                block.id === blockId
                  ? {
                      ...block,
                      items: (() => {
                        const items = [...(block.items || [])]
                        const [movedItem] = items.splice(fromIndex, 1)
                        items.splice(toIndex, 0, movedItem)
                        return items
                      })(),
                    }
                  : block,
              ),
            }
          : section,
      ),
    )
  }

  const moveTemplateSection = (fromIndex: number, toIndex: number) => {
    setTemplateSections((sections) => {
      const newSections = [...sections]
      const [movedSection] = newSections.splice(fromIndex, 1)
      newSections.splice(toIndex, 0, movedSection)
      return newSections
    })
  }

  const moveTemplateField = (fromIndex: number, toIndex: number) => {
    setTemplateSections((sections) => {
      return sections.map((section) => {
        const fields = [...section.fields]
        const [movedField] = fields.splice(fromIndex, 1)
        fields.splice(toIndex, 0, movedField)
        return { ...section, fields }
      })
    })
  }

  const [fieldSearchQuery, setFieldSearchQuery] = useState("")
  const [editingSectionId, setEditingSectionId] = useState(null)
  const [editingSectionName, setEditingSectionName] = useState("")

  const addFieldToSection = (sectionId, field) => {
    setTemplateSections((sections) =>
      sections.map((section) =>
        section.id === sectionId ? { ...section, fields: [...section.fields, field] } : section,
      ),
    )
  }

  const removeFieldFromSection = (sectionId, fieldIndex) => {
    setTemplateSections((sections) =>
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, fields: section.fields.filter((_, index) => index !== fieldIndex) }
          : section,
      ),
    )
  }

  const removeSection = (sectionId) => {
    setTemplateSections((sections) => sections.filter((section) => section.id !== sectionId))
  }

  const updateSectionName = (sectionId, newName) => {
    setTemplateSections((sections) =>
      sections.map((section) => (section.id === sectionId ? { ...section, name: newName } : section)),
    )
  }

  const filteredFields = fields.filter((field) => field.name.toLowerCase().includes(fieldSearchQuery.toLowerCase()))
  const [editingSectionIndex, setEditingSectionIndex] = useState(null)
  const [tempSectionName, setTempSectionName] = useState("")
  const [newTemplateType, setNewTemplateType] = useState("opportunity")

  const preScreeningTemplates = [
    {
      name: "Co-investment Pre-screening Report",
      dependencyField: "Investment Type",
      dependencyValue: "Co-investment",
      sections: [
        {
          name: "Executive Summary",
          blocks: [
            {
              name: "Opportunity overview",
              fields: [
                "Opportunity Name",
                "Asset Manager",
                "Opportunity Description",
                "Stage",
                "Security/Component",
                "Geography",
                "Sector",
              ],
            },
            {
              name: "Key terms",
              fields: [
                "Round size",
                "Pre-money valuation",
                "Target MOIC Range",
                "Target IRR Range %",
                "Target holding period (years)",
              ],
            },
          ],
        },
        {
          name: "Key criteria",
          fields: [
            "Business model",
            "MOAT",
            "Market",
            "PMF",
            "Founder & Management & Board",
            "Financials",
            "Valuation",
            "Return analysis",
          ],
        },
        {
          name: "Recommendation",
          fields: ["Key Risks", "Key Merits", "Recommendation"],
        },
      ],
    },
    {
      name: "Direct Pre-screening Report",
      dependencyField: "Investment Type",
      dependencyValue: "Direct",
      sections: [
        {
          name: "Executive Summary",
          blocks: [
            {
              name: "Opportunity overview",
              fields: [
                "Opportunity Name",
                "Asset Manager",
                "Opportunity Description",
                "Stage",
                "Security/Component",
                "Geography",
                "Sector",
              ],
            },
            {
              name: "Key terms",
              fields: [
                "Round size",
                "Pre-money valuation",
                "Target MOIC Range",
                "Target IRR Range %",
                "Target holding period (years)",
              ],
            },
          ],
        },
        {
          name: "Key criteria",
          fields: [
            "Business model",
            "MOAT",
            "Market",
            "PMF",
            "Founder & Management & Board",
            "Financials",
            "Valuation",
            "Return analysis",
          ],
        },
        {
          name: "Recommendation",
          fields: ["Key Risks", "Key Merits", "Recommendation"],
        },
      ],
    },
    {
      name: "Fund Pre-screening Report",
      dependencyField: "Investment Type",
      dependencyValue: "Fund",
      sections: [
        {
          name: "Executive Summary",
          blocks: [
            {
              name: "Opportunity overview",
              fields: [
                "Opportunity Name",
                "Asset Manager",
                "AuM",
                "Strategy",
                "First time manager?",
                "First time fund?",
                "Opportunity Description",
              ],
            },
            {
              name: "Key terms",
              fields: [
                "Fund size",
                "Raised to date",
                "Target MOIC Range",
                "Target IRR Range %",
                "Target Yield Range %",
                "Target holding period (years)",
              ],
            },
          ],
        },
        {
          name: "Key criteria",
          fields: [
            "Detailed description of the strategy",
            "Market",
            "Sourcing & Dealflow",
            "Due Diligence process",
            "Track record",
            "Team",
            "Alignment of interest (if applicable)",
            "Operational risk",
          ],
        },
        {
          name: "Recommendation",
          fields: ["Key Risks", "Key Merits", "Recommendation"],
        },
      ],
    },
  ]

  const [pageTemplates, setPageTemplates] = useState([
    {
      name: "Fund Investment Template",
      templateType: "opportunity",
      sections: [
        {
          id: "opportunity-info",
          name: "Opportunity Information",
          fields: [
            { name: "Opportunity Name", type: "Text" },
            { name: "Asset Manager", type: "Text" },
            { name: "Opportunity Description", type: "Text" },
            { name: "Asset Class", type: "Multi-Select" },
            { name: "Sub Asset Class", type: "Multi-Select" },
            { name: "Geography", type: "Multi-select" },
            { name: "Investment Strategy", type: "Multi-Select" },
          ],
        },
        {
          id: "investment-terms",
          name: "Investment terms",
          fields: [
            { name: "Fund Size", type: "Currency" },
            { name: "Target IRR Range %", type: "Percentage or Percentage Range" },
            { name: "Target MOIC Range", type: "Number or Percentage Range" },
            { name: "Target Yield Range %", type: "Percentage or Percentage Range" },
            { name: "Target holding period (years)", type: "Number" },
          ],
        },
        {
          id: "timeline-process",
          name: "Timeline & process",
          fields: [
            { name: "Receive Date", type: "Date" },
            { name: "Expected IC Date", type: "Date" },
            { name: "Closing Date", type: "Date" },
          ],
        },
      ],
    },
    {
      name: "Co-Investment Template",
      templateType: "opportunity",
      sections: [
        {
          id: "opportunity-info",
          name: "Opportunity Information",
          fields: [
            { name: "Opportunity Name", type: "Text" },
            { name: "Asset Manager", type: "Text" },
            { name: "Opportunity Description", type: "Text" },
            { name: "Stage", type: "Text" },
            { name: "Security / Component", type: "Text" },
            { name: "Geography", type: "Multi-select" },
            { name: "Sector / Industry", type: "Multi-select" },
            { name: "Investment Strategy", type: "Multi-Select" },
          ],
        },
        {
          id: "investment-terms",
          name: "Investment terms",
          fields: [
            { name: "Round size", type: "Currency" },
            { name: "Pre-money valuation", type: "Currency" },
            { name: "Target MOIC Range", type: "Number or Percentage Range" },
            { name: "Target IRR Range %", type: "Percentage or Percentage Range" },
            { name: "Target holding period (years)", type: "Number" },
          ],
        },
        {
          id: "timeline-process",
          name: "Timeline & process",
          fields: [
            { name: "Receive Date", type: "Date" },
            { name: "Expected IC Date", type: "Date" },
            { name: "Closing Date", type: "Date" },
          ],
        },
      ],
    },
    {
      name: "Asset Manager Profile",
      templateType: "asset-manager",
      sections: [
        {
          id: "manager-info",
          name: "Manager Information",
          fields: [
            { name: "Manager Name", type: "Text" },
            { name: "Headquarters", type: "Text" },
            { name: "AUM", type: "Currency" },
            { name: "Investment Focus", type: "Text" },
          ],
        },
        {
          id: "contact-info",
          name: "Contact Information",
          fields: [
            { name: "Contact Name", type: "Text" },
            { name: "Contact Title", type: "Text" },
            { name: "Contact Email", type: "Text" },
            { name: "Contact Phone", type: "Text" },
          ],
        },
      ],
    },
  ])

  const [sectionFieldSearch, setSectionFieldSearch] = useState({})

  const handleSectionDrop = (e, sectionIndex) => {
    e.preventDefault()
    const dragData = JSON.parse(e.dataTransfer.getData("text/plain"))

    if (dragData.type === "section" && dragData.sectionIndex !== sectionIndex) {
      const newSections = [...templateSections]
      const [movedSection] = newSections.splice(dragData.sectionIndex, 1)
      newSections.splice(sectionIndex, 0, movedSection)
      setTemplateSections(newSections)
    }
  }

  const handleFieldDrop = (e, sectionIndex, fieldIndex) => {
    e.preventDefault()
    const dragData = JSON.parse(e.dataTransfer.getData("text/plain"))

    if (dragData.type === "field") {
      const newSections = [...templateSections]
      newSections[sectionIndex].fields.splice(fieldIndex, 0, dragData.field)
      setTemplateSections(newSections)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-14">
      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Settings className="h-4 w-4 text-gray-400" />
              <h1 className="text-sm font-medium text-white">Enterprise Settings</h1>
            </div>
            <Button size="sm" className="h-7 text-xs bg-slate-500 hover:bg-slate-600 text-white">
              <Save className="h-3 w-3 mr-1" />
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-9 h-8 bg-gray-800">
            <TabsTrigger
              value="general"
              className="flex items-center space-x-1 text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
            >
              <Building2 className="h-3 w-3" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="flex items-center space-x-1 text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
            >
              <Users className="h-3 w-3" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger
              value="fields"
              className="flex items-center space-x-1 text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
            >
              <Settings className="h-3 w-3" />
              <span className="hidden sm:inline">Fields</span>
            </TabsTrigger>
            <TabsTrigger
              value="page"
              className="flex items-center space-x-1 text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
            >
              <FileText className="h-3 w-3" />
              <span className="hidden sm:inline">Page</span>
            </TabsTrigger>
            <TabsTrigger
              value="report"
              className="flex items-center space-x-1 text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
            >
              <BarChart3 className="h-3 w-3" />
              <span className="hidden sm:inline">Report</span>
            </TabsTrigger>
            <TabsTrigger
              value="workflows"
              className="flex items-center space-x-1 text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
            >
              <Workflow className="h-3 w-3" />
              <span className="hidden sm:inline">Workflows</span>
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="flex items-center space-x-1 text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
            >
              <Plug className="h-3 w-3" />
              <span className="hidden sm:inline">Integrations</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex items-center space-x-1 text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
            >
              <Shield className="h-3 w-3" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="flex items-center space-x-1 text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
            >
              <Database className="h-3 w-3" />
              <span className="hidden sm:inline">System</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card className="bg-gray-800 border-transparent">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white">General Settings</CardTitle>
                <CardDescription className="text-xs text-gray-400">Basic company configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="companyName" className="text-xs text-gray-300">
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      defaultValue="Pinnacle Capital"
                      className="h-8 text-xs bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="currency" className="text-xs text-gray-300">
                      Currency
                    </Label>
                    <Select defaultValue="usd">
                      <SelectTrigger className="h-8 text-xs bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="usd" className="text-white">
                          USD ($)
                        </SelectItem>
                        <SelectItem value="eur" className="text-white">
                          EUR (€)
                        </SelectItem>
                        <SelectItem value="gbp" className="text-white">
                          GBP (£)
                        </SelectItem>
                        <SelectItem value="jpy" className="text-white">
                          JPY (¥)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="timezone" className="text-xs text-gray-300">
                      Timezone
                    </Label>
                    <Select defaultValue="est">
                      <SelectTrigger className="h-8 text-xs bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="est" className="text-white">
                          Eastern Time (EST)
                        </SelectItem>
                        <SelectItem value="pst" className="text-white">
                          Pacific Time (PST)
                        </SelectItem>
                        <SelectItem value="cst" className="text-white">
                          Central Time (CST)
                        </SelectItem>
                        <SelectItem value="mst" className="text-white">
                          Mountain Time (MST)
                        </SelectItem>
                        <SelectItem value="utc" className="text-white">
                          UTC
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="logo" className="text-xs text-gray-300">
                      Company Logo
                    </Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                          <img src="/pinnacle-logo.png" alt="Pinnacle Capital" className="w-10 h-10 object-contain" />
                        </div>
                        <div>
                          <p className="text-xs text-white font-medium">Company Logo</p>
                          <p className="text-xs text-gray-400">Current logo</p>
                        </div>
                        <Button
                          size="sm"
                          className="h-8 text-xs bg-gray-600 hover:bg-gray-500 text-white ml-auto"
                          onClick={() => console.log("[v0] Upload new logo clicked")}
                        >
                          Upload New
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-300">Company Branding Colors</Label>
                  <div className="p-3 bg-gray-700 rounded-lg border border-gray-600 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-400">Primary Color</Label>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-slate-500 rounded border border-gray-500"></div>
                          <Input
                            defaultValue="#64748b"
                            className="h-7 text-xs bg-gray-600 border-gray-500 text-white flex-1"
                            placeholder="#64748b"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-400">Secondary Color</Label>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-400 rounded border border-gray-500"></div>
                          <Input
                            defaultValue="#9ca3af"
                            className="h-7 text-xs bg-gray-600 border-gray-500 text-white flex-1"
                            placeholder="#9ca3af"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-400">Accent Color</Label>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-emerald-500 rounded border border-gray-500"></div>
                          <Input
                            defaultValue="#10b981"
                            className="h-7 text-xs bg-gray-600 border-gray-500 text-white flex-1"
                            placeholder="#10b981"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-400">Text Color</Label>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-800 rounded border border-gray-500"></div>
                          <Input
                            defaultValue="#1f2937"
                            className="h-7 text-xs bg-gray-600 border-gray-500 text-white flex-1"
                            placeholder="#1f2937"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        className="h-7 text-xs bg-slate-500 hover:bg-slate-600 text-white"
                        onClick={() => console.log("[v0] Save branding colors clicked")}
                      >
                        Save Colors
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card className="bg-gray-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm text-white">Team Members</CardTitle>
                    <CardDescription className="text-xs text-gray-400">
                      Manage users, roles, and permissions
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="h-7 text-xs bg-slate-500 hover:bg-slate-600 text-white"
                      onClick={() => {
                        setShowInviteModal(true)
                        console.log("[v0] Invite user clicked")
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Invite User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {teamMembersData.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 rounded bg-gray-700">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="text-xs bg-gray-600 text-white">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="text-xs font-medium text-white">{member.name}</p>
                            {member.role === "Managing Partner" && <Crown className="h-3 w-3 text-yellow-400" />}
                            <Badge
                              variant={member.status === "Active" ? "default" : "secondary"}
                              className={`text-xs px-1 py-0 ${member.status === "Active" ? "bg-white text-black" : ""}`}
                            >
                              {member.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-400">{member.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">{member.role}</span>
                            <span className="text-xs text-gray-600">•</span>
                            <span className="text-xs text-gray-500">{member.department}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-600"
                          onClick={() => console.log(`[v0] View user ${member.name} clicked`)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-600"
                          onClick={() => {
                            setEditingUser(member)
                            setShowEditModal(true)
                            console.log(`[v0] Edit user ${member.name} clicked`)
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-600"
                          onClick={() => console.log(`[v0] Delete user ${member.name} clicked`)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {showEditModal && editingUser && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg w-96">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-white">Edit User</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                      onClick={() => setShowEditModal(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 block mb-2">Profile Picture</label>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={editingUser.avatar || "/placeholder.svg"} alt={editingUser.name} />
                          <AvatarFallback className="text-xs bg-gray-600 text-white">
                            {editingUser.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="avatar-upload"
                            onChange={(e) => {
                              console.log("[v0] Avatar file selected:", e.target.files[0])
                            }}
                          />
                          <label
                            htmlFor="avatar-upload"
                            className="cursor-pointer text-xs text-slate-400 hover:text-slate-300"
                          >
                            Change Photo
                          </label>
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Name</label>
                      <input
                        type="text"
                        defaultValue={editingUser.name}
                        className="w-full h-8 px-3 text-xs bg-gray-700 text-white rounded"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue={editingUser.email}
                        className="w-full h-8 px-3 text-xs bg-gray-700 text-white rounded"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Role</label>
                      <select
                        defaultValue={editingUser.role}
                        className="w-full h-8 px-3 text-xs bg-gray-700 text-white rounded"
                      >
                        <option value="Managing Partner">Managing Partner</option>
                        <option value="IC Member">IC Member</option>
                        <option value="Associate">Associate</option>
                        <option value="Analyst">Analyst</option>
                        <option value="Legal">Legal</option>
                        <option value="Compliance">Compliance</option>
                        <option value="Sales">Sales</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Department</label>
                      <input
                        type="text"
                        defaultValue={editingUser.department}
                        className="w-full h-8 px-3 text-xs bg-gray-700 text-white rounded"
                      />
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        className="h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          console.log("[v0] Save user changes")
                          setShowEditModal(false)
                        }}
                      >
                        Save Changes
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-gray-400 hover:text-white"
                        onClick={() => setShowEditModal(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showInviteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg w-96">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-white">Invite New User</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                      onClick={() => setShowInviteModal(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 block mb-2">Profile Picture</label>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="text-xs bg-gray-600 text-white">
                            <User className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="invite-avatar-upload"
                            onChange={(e) => {
                              console.log("[v0] Invite avatar file selected:", e.target.files[0])
                            }}
                          />
                          <label
                            htmlFor="invite-avatar-upload"
                            className="cursor-pointer text-xs text-slate-400 hover:text-slate-300"
                          >
                            Upload Photo
                          </label>
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Name</label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        className="w-full h-8 px-3 text-xs bg-gray-700 text-white rounded"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        className="w-full h-8 px-3 text-xs bg-gray-700 text-white rounded"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Role</label>
                      <select className="w-full h-8 px-3 text-xs bg-gray-700 text-white rounded">
                        <option value="">Select role</option>
                        <option value="Managing Partner">Managing Partner</option>
                        <option value="IC Member">IC Member</option>
                        <option value="Associate">Associate</option>
                        <option value="Analyst">Analyst</option>
                        <option value="Legal">Legal</option>
                        <option value="Compliance">Compliance</option>
                        <option value="Sales">Sales</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Department</label>
                      <input
                        type="text"
                        placeholder="Enter department"
                        className="w-full h-8 px-3 text-xs bg-gray-700 text-white rounded"
                      />
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        className="h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          console.log("[v0] Send invitation")
                          setShowInviteModal(false)
                        }}
                      >
                        Send Invitation
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-gray-400 hover:text-white"
                        onClick={() => setShowInviteModal(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Card className="bg-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white">Roles & Permissions</CardTitle>
                <CardDescription className="text-xs text-gray-400">
                  Configure user roles and access levels for your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Managing Partner",
                    users: 1,
                    permissions: ["Full Access", "Deal Review", "IC Participation", "User Management"],
                    color: "bg-red-600",
                    description: "Senior leadership with full system access and deal review authority",
                  },
                  {
                    name: "IC Member",
                    users: 1,
                    permissions: ["IC Access", "Deal Approval", "Portfolio View", "Committee Reports"],
                    color: "bg-purple-600",
                    description: "Investment Committee members who review and approve opportunities",
                  },
                  {
                    name: "Associate",
                    users: 1,
                    permissions: ["Deal Analysis", "Opportunity Management", "Research", "Portfolio Entry"],
                    color: "bg-blue-600",
                    description: "Deal team members responsible for analyzing investment opportunities",
                  },
                  {
                    name: "Analyst",
                    users: 1,
                    permissions: ["Deal Analysis", "Research", "Data Entry", "Report Generation"],
                    color: "bg-green-600",
                    description: "Deal team members focused on research and analysis",
                  },
                  {
                    name: "Legal",
                    users: 1,
                    permissions: ["Legal Review", "Document Access", "Compliance Check", "Contract Management"],
                    color: "bg-yellow-600",
                    description: "Legal team with access to legal documents and compliance matters",
                  },
                  {
                    name: "Compliance",
                    users: 1,
                    permissions: ["Compliance Review", "Audit Access", "Risk Assessment", "Regulatory Reports"],
                    color: "bg-orange-600",
                    description: "Compliance team ensuring regulatory adherence",
                  },
                  {
                    name: "Sales",
                    users: 1,
                    permissions: ["Client Access", "Pipeline View", "Presentation Tools", "CRM Integration"],
                    color: "bg-pink-600",
                    description: "Business development team managing client relationships",
                  },
                ].map((role, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded bg-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${role.color}`}></div>
                      <div>
                        <p className="text-xs font-medium text-white">{role.name}</p>
                        <p className="text-xs text-gray-400 mb-1">
                          {role.users} • {role.permissions.join(", ")}
                        </p>
                        <p className="text-xs text-gray-500">{role.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-600"
                        onClick={() => console.log(`[v0] Configure role ${role.name}`)}
                      >
                        <Settings className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-600"
                        onClick={() => console.log(`[v0] Edit role ${role.name}`)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs font-medium text-white">Custom Roles</p>
                      <p className="text-xs text-gray-400">Create additional roles for your organization</p>
                    </div>
                    <Button
                      size="sm"
                      className="h-7 text-xs bg-slate-500 hover:bg-slate-600 text-white"
                      onClick={() => console.log("[v0] Add custom role clicked")}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Role
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fields" className="space-y-4">
            <Card className="bg-gray-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm text-white">Field Management</CardTitle>
                    <CardDescription className="text-xs text-gray-400">
                      Configure opportunity and investment fields
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-slate-500 hover:bg-slate-600 text-white"
                    onClick={() =>
                      setEditingField({ name: "", type: "Text", options: "", editable: true, isNew: true })
                    }
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Field
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredFields.map((field) => (
                    <div key={field.name} className="flex items-center justify-between p-2 bg-gray-700 rounded text-xs">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="h-3 w-3 text-gray-400 cursor-move" />
                        <span className="font-medium text-white">{field.name}</span>
                        <span className="text-gray-400">({field.type})</span>
                        {!field.editable && (
                          <span className="px-1 py-0.5 bg-gray-600 text-gray-300 rounded text-xs">System</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-600"
                          onClick={() => setEditingField({ ...field, isNew: false })}
                          disabled={!field.editable}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-600"
                          onClick={() => console.log(`[v0] Delete field ${field.name}`)}
                          disabled={!field.editable || field.system}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {editingField && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-sm font-medium text-white mb-4">
                    {editingField.isNew ? "Add New Field" : "Edit Field"}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Field Name</label>
                      <input
                        type="text"
                        value={editingField.name}
                        onChange={(e) => setEditingField({ ...editingField, name: e.target.value })}
                        className="w-full h-8 px-3 text-xs bg-gray-700 text-white rounded"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Field Type</label>
                      <select
                        value={editingField.type}
                        onChange={(e) => setEditingField({ ...editingField, type: e.target.value })}
                        className="w-full h-8 px-3 text-xs bg-gray-700 text-white rounded"
                      >
                        <option value="Text">Text</option>
                        <option value="Number">Number</option>
                        <option value="Select">Select</option>
                        <option value="Multi-Select">Multi-Select</option>
                        <option value="Date">Date</option>
                        <option value="Currency">Currency</option>
                        <option value="Percentage">Percentage</option>
                        <option value="Range">Range</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Options (comma separated)</label>
                      <textarea
                        value={editingField.options}
                        onChange={(e) => setEditingField({ ...editingField, options: e.target.value })}
                        className="w-full h-16 px-3 py-2 text-xs bg-gray-700 text-white rounded resize-none"
                        placeholder="Option 1, Option 2, Option 3"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-6">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                      onClick={() => setEditingField(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="h-7 text-xs hover:bg-blue-700 text-white bg-blue-600"
                      onClick={() => {
                        console.log(`[v0] ${editingField.isNew ? "Creating" : "Updating"} field:`, editingField)
                        setEditingField(null)
                      }}
                    >
                      {editingField.isNew ? "Create" : "Update"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="page" className="space-y-4">
            <Card className="bg-gray-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm text-white">Page Templates</CardTitle>
                    <CardDescription className="text-xs text-gray-400">
                      Configure opportunity information page layouts and field organization
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setCreatingTemplate({ type: "page" })}
                    size="sm"
                    className="h-7 text-xs bg-slate-500 hover:bg-slate-600 text-white"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    New Template
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div></div>
                </div>

                {/* Template Type Sections */}
                <div className="space-y-6">
                  {/* Opportunity Templates */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Opportunity Templates</h4>
                    <div className="space-y-2">
                      {pageTemplates
                        .filter((template) => template.templateType === "opportunity")
                        .map((template) => (
                          <div key={template.name} className="bg-gray-700 rounded-lg p-3 border border-gray-700">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium text-white">{template.name}</h4>
                                <p className="text-xs text-gray-400">Information Page</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setViewingTemplate({ type: "page", name: template.name })}
                                  className="h-7 w-7 p-0"
                                >
                                  <Eye className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingTemplate({ type: "page", name: template.name })}
                                  className="h-7 w-7 p-0"
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setDuplicatingTemplate({ type: "page", name: template.name })}
                                  className="h-7 w-7 p-0"
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Asset Manager Templates */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Asset Manager Templates</h4>
                    <div className="space-y-2">
                      {pageTemplates
                        .filter((template) => template.templateType === "asset-manager")
                        .map((template) => (
                          <div key={template.name} className="bg-gray-700 rounded-lg p-3 border border-gray-700">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium text-white">{template.name}</h4>
                                <p className="text-xs text-gray-400">Information Page</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setViewingTemplate({ type: "page", name: template.name })}
                                  className="h-7 w-7 p-0"
                                >
                                  <Eye className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingTemplate({ type: "page", name: template.name })}
                                  className="h-7 w-7 p-0"
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setDuplicatingTemplate({ type: "page", name: template.name })}
                                  className="h-7 w-7 p-0"
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="report" className="space-y-4">
            <Card className="bg-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white">Report Templates</CardTitle>
                <CardDescription className="text-xs text-gray-400">
                  Configure report layouts with sections, blocks, and visual elements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white">Report Types</h3>
                      <Button
                        size="sm"
                        className="h-8 text-xs hover:bg-emerald-700 text-white bg-slate-500"
                        onClick={() => setCreatingReportType(true)}
                      >
                        + New Report Type
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {reportTypes.map((reportType) => (
                        <div key={reportType.id} className="space-y-3">
                          <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                            <div className="flex items-center justify-between">
                              <div>
                                {editingReportType === reportType.id ? (
                                  <input
                                    type="text"
                                    value={reportType.name}
                                    onChange={(e) => {
                                      setReportTypes((prev) =>
                                        prev.map((rt) =>
                                          rt.id === reportType.id ? { ...rt, name: e.target.value } : rt,
                                        ),
                                      )
                                    }}
                                    onBlur={() => setEditingReportType(null)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") setEditingReportType(null)
                                      if (e.key === "Escape") setEditingReportType(null)
                                    }}
                                    className="bg-gray-600 text-white text-sm px-2 py-1 rounded border-none outline-none"
                                    autoFocus
                                  />
                                ) : (
                                  <h4
                                    className="text-sm font-medium text-white cursor-pointer hover:text-gray-300"
                                    onClick={() => setEditingReportType(reportType.id)}
                                  >
                                    {reportType.name}
                                  </h4>
                                )}
                                <p className="text-xs text-gray-400">Report Type</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  className="h-8 w-8 p-0 bg-transparent hover:bg-gray-600 text-gray-400 hover:text-white"
                                  onClick={() => setEditingReportType(reportType.id)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  className="h-8 w-8 p-0 bg-transparent hover:bg-red-600 text-gray-400 hover:text-white"
                                  onClick={() => {
                                    setReportTypes((prev) => prev.filter((rt) => rt.id !== reportType.id))
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {reportType.id === "pre-screening" && (
                            <div className="ml-4 space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-400">Templates (Field dependency: Investment Type)</p>
                                <Button
                                  size="sm"
                                  className="h-7 text-xs hover:bg-emerald-700 text-white bg-slate-500"
                                  onClick={() => {
                                    setCreatingTemplate({ type: "report" })
                                  }}
                                >
                                  + New Template
                                </Button>
                              </div>
                              {preScreeningTemplates.map((template) => (
                                <div key={template.name} className="p-3 bg-gray-600 rounded-lg border border-gray-500">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h5 className="text-sm font-medium text-white">{template.name}</h5>
                                      <p className="text-xs text-gray-400">
                                        {template.dependencyField}: {template.dependencyValue}
                                      </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Button
                                        size="sm"
                                        className="h-7 w-7 p-0 bg-transparent hover:bg-gray-500 text-gray-400 hover:text-white"
                                        onClick={() => {
                                          setViewingTemplate({ type: "report", name: template.name })
                                        }}
                                      >
                                        <Eye className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="h-7 w-7 p-0 bg-transparent hover:bg-gray-500 text-gray-400 hover:text-white"
                                        onClick={() => {
                                          setEditingTemplate({ type: "report", name: template.name })
                                        }}
                                      >
                                        <Edit className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="h-7 w-7 p-0 bg-transparent hover:bg-gray-500 text-gray-400 hover:text-white"
                                        onClick={() => {
                                          setDuplicatingTemplate({ type: "report", name: template.name })
                                        }}
                                      >
                                        <Copy className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Create Report Type Modal */}
            {creatingReportType && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-gray-900 p-6 rounded-lg w-96 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Create New Report Type</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Report Type Name</label>
                      <input
                        type="text"
                        value={newReportTypeName}
                        onChange={(e) => setNewReportTypeName(e.target.value)}
                        placeholder="Enter report type name"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-slate-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCreatingReportType(false)
                        setNewReportTypeName("")
                      }}
                      className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (newReportTypeName.trim()) {
                          const newId = newReportTypeName.toLowerCase().replace(/\s+/g, "-")
                          setReportTypes((prev) => [...prev, { id: newId, name: newReportTypeName.trim() }])
                          setCreatingReportType(false)
                          setNewReportTypeName("")
                        }
                      }}
                      className="bg-slate-500 hover:bg-slate-600 text-white"
                    >
                      Create Report Type
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="workflows" className="space-y-4">
            <Card className="bg-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white">Workflow Automation</CardTitle>
                <CardDescription className="text-xs text-gray-400">
                  Configure automated processes and approvals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-gray-400 text-center py-8">
                  Workflow configuration will be available in future updates
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card className="bg-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white">Integrations</CardTitle>
                <CardDescription className="text-xs text-gray-400">Connect external services and tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-gray-400 text-center py-8">
                  Integration management will be available in future updates
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card className="bg-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white">Security Settings</CardTitle>
                <CardDescription className="text-xs text-gray-400">
                  Configure access controls and security policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-gray-400 text-center py-8">
                  Security configuration will be available in future updates
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card className="bg-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white">System Administration</CardTitle>
                <CardDescription className="text-xs text-gray-400">
                  System maintenance and configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-gray-400 text-center py-8">
                  System administration will be available in future updates
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Page Template Builder Modal */}
        {editingTemplate && editingTemplate.type === "page" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">{editingTemplate.name} - Template Builder</h2>
                <Button variant="ghost" size="sm" onClick={() => setEditingTemplate(null)} className="h-8 w-8 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 space-y-4 overflow-y-auto">
                  <div>
                    <h3 className="text-sm font-medium text-white mb-2">Configuration</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-300">Dependency:</label>
                        <select className="w-full mt-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white">
                          <option>Investment Type</option>
                          <option>Asset Class</option>
                          <option>Geography</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-300">Option:</label>
                        <select className="w-full mt-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white">
                          <option>Direct</option>
                          <option>Fund</option>
                          <option>Co-investment</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Canvas */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
                  <div className="max-w-4xl mx-auto">
                    <div className="space-y-3">
                      {templateSections.map((section, sectionIndex) => (
                        <div
                          key={section.id}
                          className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                          onDrop={(e) => handleSectionDrop(e, sectionIndex)}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          <div className="bg-gray-700 px-4 py-2 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <GripVertical
                                className="h-4 w-4 text-gray-400 cursor-move"
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData(
                                    "text/plain",
                                    JSON.stringify({
                                      type: "section",
                                      sectionIndex,
                                    }),
                                  )
                                }}
                              />
                              {editingSectionIndex === sectionIndex ? (
                                <input
                                  type="text"
                                  value={editingSectionName}
                                  onChange={(e) => setEditingSectionName(e.target.value)}
                                  onBlur={() => {
                                    const newSections = [...templateSections]
                                    newSections[sectionIndex].name = editingSectionName
                                    setTemplateSections(newSections)
                                    setEditingSectionIndex(null)
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      const newSections = [...templateSections]
                                      newSections[sectionIndex].name = editingSectionName
                                      setTemplateSections(newSections)
                                      setEditingSectionIndex(null)
                                    }
                                    if (e.key === "Escape") {
                                      setEditingSectionIndex(null)
                                    }
                                  }}
                                  className="text-sm font-medium bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 outline-none"
                                  autoFocus
                                />
                              ) : (
                                <h3
                                  className="text-sm font-medium text-white cursor-pointer hover:text-slate-400"
                                  onClick={() => {
                                    setEditingSectionIndex(sectionIndex)
                                    setEditingSectionName(section.name)
                                  }}
                                >
                                  {section.name}
                                </h3>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newSections = templateSections.filter((_, i) => i !== sectionIndex)
                                setTemplateSections(newSections)
                              }}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="p-4">
                            {section.fields.map((field, fieldIndex) => (
                              <div
                                key={field.id}
                                className="flex items-center justify-between p-2 bg-gray-700 rounded mb-2 text-xs"
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData(
                                    "text/plain",
                                    JSON.stringify({
                                      type: "field",
                                      sectionIndex,
                                      fieldIndex,
                                      field,
                                    }),
                                  )
                                }}
                                onDrop={(e) => handleFieldDrop(e, sectionIndex, fieldIndex)}
                                onDragOver={(e) => e.preventDefault()}
                              >
                                <div className="flex items-center space-x-2">
                                  <GripVertical className="h-3 w-3 text-gray-400 cursor-move" />
                                  <span className="font-medium text-white">{field.name}</span>
                                  <span className="text-gray-400">({field.type})</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newSections = [...templateSections]
                                    newSections[sectionIndex].fields = newSections[sectionIndex].fields.filter(
                                      (_, i) => i !== fieldIndex,
                                    )
                                    setTemplateSections(newSections)
                                  }}
                                  className="h-5 w-5 p-0 text-gray-400 hover:text-red-400"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}

                            <Button
                              onClick={() => {
                                const newSection = {
                                  id: Date.now().toString(),
                                  name: "New Section",
                                  fields: [],
                                }
                                setTemplateSections([...templateSections, newSection])
                              }}
                              className="w-full h-10 bg-gray-700 hover:bg-gray-600 border border-dashed border-gray-600 text-xs"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add Section
                            </Button>
                          </div>
                        </div>
                      ))}

                      <Button
                        onClick={() => {
                          const newSection = {
                            id: Date.now().toString(),
                            name: "New Section",
                            fields: [],
                          }
                          setTemplateSections([...templateSections, newSection])
                        }}
                        className="w-full h-10 bg-gray-700 hover:bg-gray-600 border border-dashed border-gray-600 text-xs"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add Section
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 p-4 border-t border-gray-700">
                <Button variant="ghost" onClick={() => setEditingTemplate(null)} className="h-8 text-xs">
                  Cancel
                </Button>
                <Button
                  onClick={() => setEditingTemplate(null)}
                  className="bg-slate-500 hover:bg-slate-600 h-8 text-xs"
                >
                  Save Template
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Report Template Builder Modal */}
        {editingTemplate && editingTemplate.type === "report" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">{editingTemplate.name} - Report Builder</h2>
                <Button variant="ghost" size="sm" onClick={() => setEditingTemplate(null)} className="h-8 w-8 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 space-y-4 overflow-y-auto">
                  <div>
                    <h3 className="text-sm font-medium text-white mb-2">Configuration</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-300">Dependency:</label>
                        <select className="w-full mt-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white">
                          <option>Investment Type</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-300">Option:</label>
                        <select className="w-full mt-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white">
                          <option>Direct</option>
                          <option>Fund</option>
                          <option>Co-investment</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-white mb-2">Theme</h3>
                    <div className="space-y-2">
                      <div className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
                        <div className="text-xs text-white">Company Branding</div>
                        <div className="flex space-x-1 mt-1">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
                        <div className="text-xs text-white">Custom</div>
                        <div className="flex space-x-1 mt-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Canvas */}
                <div className="flex-1 p-4 overflow-y-auto bg-white">
                  <div className="max-w-4xl mx-auto">
                    {/* Report Header */}
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white font-bold">P</span>
                      </div>
                      <h1 className="text-xl font-bold text-gray-900">Pre-screening Report</h1>
                      <p className="text-sm text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
                    </div>

                    {/* Report Sections */}
                    {preScreeningTemplates
                      .find((template) => template.name === editingTemplate.name)
                      ?.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-6">
                          <div className="bg-gray-200 px-4 py-2 mb-3">
                            <h3 className="font-medium text-gray-900">{section.name}</h3>
                          </div>

                          {section.blocks ? (
                            <div className="grid grid-cols-2 gap-4">
                              {section.blocks.map((block, blockIndex) => (
                                <div key={blockIndex} className="space-y-2">
                                  <h4 className="font-medium text-sm text-gray-800">{block.name}</h4>
                                  {block.fields.map((field, fieldIndex) => (
                                    <div key={fieldIndex} className="text-sm text-gray-700 py-1">
                                      {field}
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {section.fields?.map((field, fieldIndex) => (
                                <div key={fieldIndex} className="text-sm text-gray-700 py-1">
                                  {field}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}

                    <button className="w-full mt-4 p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400">
                      + Add Section
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 p-4 border-t border-gray-700">
                <Button variant="outline" onClick={() => setEditingTemplate(null)}>
                  Cancel
                </Button>
                <Button className="bg-slate-500 hover:bg-slate-600">Save Template</Button>
              </div>
            </div>
          </div>
        )}

        {/* Report Template View Modal */}
        {viewingTemplate && viewingTemplate.type === "report" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg w-[80vw] h-[80vh] max-w-4xl flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">{viewingTemplate.name} - Preview</h2>
                <Button
                  size="sm"
                  className="h-8 w-8 p-0 bg-transparent hover:bg-gray-700 text-gray-400 hover:text-white"
                  onClick={() => setViewingTemplate(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 bg-white overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto">
                  {/* Report Header */}
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-gray-900 rounded mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold">P</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Pre-screening Report</h1>
                    <p className="text-sm text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
                  </div>

                  {/* Report Content */}
                  {preScreeningTemplates
                    .find((template) => template.name === viewingTemplate.name)
                    ?.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="mb-6">
                        <div className="bg-gray-200 px-4 py-2 mb-3">
                          <h3 className="font-medium text-gray-900">{section.name}</h3>
                        </div>

                        {section.blocks ? (
                          <div className="grid grid-cols-2 gap-4">
                            {section.blocks.map((block, blockIndex) => (
                              <div key={blockIndex} className="space-y-2">
                                <h4 className="font-medium text-sm text-gray-800">{block.name}</h4>
                                {block.fields.map((field, fieldIndex) => (
                                  <div
                                    key={fieldIndex}
                                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                  >
                                    <span className="text-sm text-gray-700">{field}</span>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {section.fields?.map((field, fieldIndex) => (
                              <div
                                key={fieldIndex}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded"
                              >
                                <span className="text-sm text-gray-700">{field}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
