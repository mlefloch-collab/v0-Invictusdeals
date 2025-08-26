"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/components/theme-provider"
import { Bot, X, Send, ExternalLink, FileText, Briefcase, CheckSquare, MessageCircle, User } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  sources?: Source[]
}

interface Source {
  title: string
  type: "deal" | "task" | "document" | "communication"
  link: string
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const { theme } = useTheme()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (query: string): { content: string; sources?: Source[] } => {
    const lowerQuery = query.toLowerCase()

    // Greeting responses
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("hey")) {
      return {
        content:
          "Hello! I'm your AI assistant for dealflow management. I can help you with information about your deals, tasks, portfolio status, and more. What would you like to know?",
      }
    }

    // Investment status queries
    if (lowerQuery.includes("where we are") || lowerQuery.includes("status") || lowerQuery.includes("latest")) {
      return {
        content:
          "Here's your current portfolio status:\n\n• **65 active deals** with $2.3B in committed capital\n• **TechFlow Series B** ($15M) is in final review\n• **European Growth Fund** due diligence completed\n• **Healthcare Innovation** first management meeting scheduled\n\nYour pipeline is strong with 23 new opportunities and 34 deals in due diligence.",
        sources: [
          { title: "Portfolio Overview", type: "deal", link: "/opportunities" },
          { title: "Priority Tasks", type: "task", link: "/todo" },
          { title: "Recent Activity Report", type: "document", link: "/documents" },
        ],
      }
    }

    // Deal-specific queries
    if (lowerQuery.includes("techflow") || lowerQuery.includes("series b")) {
      return {
        content:
          "**TechFlow Series B Update:**\n\n• Investment: $15M for 20% equity\n• Term sheet status: Under final review\n• Due diligence: 80% complete\n• Outstanding: Financial model validation, customer references\n• Timeline: Target completion end of week\n\nThis is one of our priority deals with favorable terms and strong growth potential.",
        sources: [
          { title: "TechFlow Series B Deal", type: "deal", link: "/opportunities/1" },
          { title: "Due Diligence Tasks", type: "task", link: "/todo" },
        ],
      }
    }

    // Portfolio queries
    if (lowerQuery.includes("portfolio") || lowerQuery.includes("allocation")) {
      return {
        content:
          "**Current Portfolio Allocation:**\n\n• Private Equity: 90%\n• Real Estate: 70%\n• Hedge Funds: 50%\n• Infrastructure: 40%\n\n**Performance Highlights:**\n• Total AUM: $2.3B across 65 investments\n• Q4 IRR: 12% average\n• Top sectors: FinTech (+18%), Healthcare (+15%)",
        sources: [
          { title: "Portfolio Dashboard", type: "deal", link: "/" },
          { title: "Performance Report", type: "document", link: "/documents" },
        ],
      }
    }

    // Task and priority queries
    if (lowerQuery.includes("task") || lowerQuery.includes("todo") || lowerQuery.includes("priority")) {
      return {
        content:
          "**Your Priority Tasks:**\n\n**High Priority (8 tasks):**\n• 3 due diligence reviews\n• 2 IC memos pending\n• 1 board meeting prep\n• 2 new deal evaluations\n\n**Overdue (2 tasks):**\n• GreenEnergy Fund IC prep (2 days)\n• MedTech founder call (1 day)\n\n5 tasks are due this week and need immediate attention.",
        sources: [{ title: "Task Dashboard", type: "task", link: "/todo" }],
      }
    }

    // Meeting queries
    if (lowerQuery.includes("meeting") || lowerQuery.includes("calendar")) {
      return {
        content:
          "**Upcoming Meetings This Week:**\n\n• **Tuesday 2:00 PM** - Investment Committee Meeting\n• **Wednesday 10:00 AM** - GreenEnergy Fund Management Presentation\n• **Friday 9:00 AM** - Healthcare Innovation Board Meeting\n\nAll meetings have prep materials ready. Would you like me to help with any specific preparation?",
        sources: [{ title: "Meeting Calendar", type: "communication", link: "/meetings" }],
      }
    }

    // Default helpful response
    return {
      content:
        "I can help you with information about your deals, tasks, portfolio performance, and upcoming meetings. Here's a quick overview:\n\n• **23 new opportunities** in pipeline\n• **34 deals** in due diligence\n• **8 deals** pending approval\n• **Average deal size:** $12M\n\nWhat specific information would you like to know more about?",
      sources: [
        { title: "Deal Pipeline", type: "deal", link: "/opportunities" },
        { title: "Today's Priorities", type: "task", link: "/todo" },
      ],
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const aiResponse = generateAIResponse(input)
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: aiResponse.content,
      timestamp: new Date(),
      sources: aiResponse.sources,
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsTyping(false)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deal":
        return <Briefcase className="h-3 w-3" />
      case "task":
        return <CheckSquare className="h-3 w-3" />
      case "document":
        return <FileText className="h-3 w-3" />
      case "communication":
        return <MessageCircle className="h-3 w-3" />
      default:
        return <FileText className="h-3 w-3" />
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg ${
          theme === "light" ? "bg-gray-900 hover:bg-gray-800 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        <Bot className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
          <div className="fixed inset-0 bg-black/20" onClick={() => setIsOpen(false)} />
          <div
            className={`relative w-96 h-[600px] rounded-lg shadow-xl border flex flex-col ${
              theme === "light" ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"
            }`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between p-4 border-b ${
                theme === "light" ? "border-gray-200" : "border-gray-700"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Bot className={`h-5 w-5 ${theme === "light" ? "text-gray-900" : "text-white"}`} />
                <h3 className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>AI Assistant</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className={theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-white"}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className={`text-center py-8 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Hi! I'm your AI assistant.</p>
                  <p className="text-sm mt-1">Ask me about your deals, tasks, or portfolio.</p>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      {message.type === "assistant" ? (
                        <Bot className="h-4 w-4 text-blue-600" />
                      ) : (
                        <User className="h-4 w-4 text-gray-600" />
                      )}
                      <span className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.type === "user"
                          ? theme === "light"
                            ? "bg-gray-900 text-white"
                            : "bg-blue-600 text-white"
                          : theme === "light"
                            ? "bg-gray-100 text-gray-900"
                            : "bg-gray-800 text-white"
                      }`}
                    >
                      <div className="text-sm whitespace-pre-line">{message.content}</div>

                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
                          <p className="text-xs font-medium mb-2 opacity-75">Sources:</p>
                          <div className="space-y-1">
                            {message.sources.map((source, index) => (
                              <a
                                key={index}
                                href={source.link}
                                className="flex items-center space-x-2 text-xs hover:underline opacity-75 hover:opacity-100"
                              >
                                {getTypeIcon(source.type)}
                                <span>{source.title}</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 mb-1">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <span className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                      AI is typing...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className={`p-4 border-t ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about deals, tasks, or portfolio..."
                  onKeyPress={(e) => e.key === "Enter" && !isTyping && handleSendMessage()}
                  disabled={isTyping}
                  className={theme === "light" ? "bg-white" : "bg-gray-800"}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isTyping || !input.trim()}
                  className={`${
                    theme === "light" ? "bg-gray-900 hover:bg-gray-800" : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
