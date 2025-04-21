"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X, HelpCircle, Activity } from "lucide-react"
import fitnessBotInstance from "../services/fitnessBot"

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize chat with greeting when opened for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = fitnessBotInstance.getGreeting()
      setMessages([
        {
          id: 1,
          text: greeting,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }

    // Focus input when chat is opened
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, messages.length])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Process message and get response
    setTimeout(() => {
      const botResponse = fitnessBotInstance.processQuery(userMessage.text)
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 500) // Small delay to simulate thinking
  }

  const formatMessage = (text: string) => {
    // Convert newlines to <br> tags and handle formatting
    return text.split("\n").map((line, i) => {
      // Check if line is a list item
      if (line.match(/^-\s/)) {
        return (
          <li key={i} className="ml-4 list-disc">
            {line.replace(/^-\s/, "")}
          </li>
        )
      }

      // Check if line is a heading (starts with word followed by colon)
      if (line.match(/^[A-Za-z\s]+(:|-)/) && line.length < 50) {
        return (
          <p key={i} className="font-semibold mt-1">
            {line}
          </p>
        )
      }

      // Check for bold text with ** markers
      if (line.includes("**")) {
        const parts = line.split("**")
        return (
          <span key={i} className={i === 0 ? "" : "mt-1 block"}>
            {parts.map((part, j) => (j % 2 === 0 ? part : <strong key={j}>{part}</strong>))}
          </span>
        )
      }

      return (
        <span key={i} className={i === 0 ? "" : "mt-1 block"}>
          {line}
        </span>
      )
    })
  }

  const handleHelpClick = () => {
    const helpResponse = fitnessBotInstance.provideGeneralFitnessAdvice()
    const helpMessage: Message = {
      id: messages.length + 1,
      text: helpResponse,
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, helpMessage])
  }

  const suggestedQueries = [
    "What workout split is good for a beginner?",
    "Diet plan for muscle gain",
    "Recommend chest exercises",
    "Fitness assessment tests",
  ]

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
        aria-label="Open fitness assistant"
      >
        <Activity className="h-6 w-6" />
      </button>

      {/* Chat interface */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 w-full sm:w-96 h-[600px] bg-white rounded-t-2xl shadow-xl flex flex-col z-50">
          {/* Chat header */}
          <div className="bg-blue-500 text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center">
              <Activity className="h-6 w-6 mr-3" />
              <div>
                <h3 className="font-semibold text-lg">Fitness Assistant</h3>
                <p className="text-xs text-blue-100">Ask me anything about fitness</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleHelpClick}
                className="p-2 hover:bg-blue-400 rounded-full transition-colors"
                aria-label="Help"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-blue-400 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                    message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {formatMessage(message.text)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested queries */}
          {messages.length < 3 && (
            <div className="px-6 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Try asking about:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.map((query, index) => (
                  <button
                    key={index}
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full transition-colors"
                    onClick={() => {
                      setInputValue(query)
                      if (inputRef.current) {
                        inputRef.current.focus()
                      }
                    }}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-100 p-4">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about workouts, supplements, nutrition..."
                className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
