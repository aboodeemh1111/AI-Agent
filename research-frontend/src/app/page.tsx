"use client";

import { useState, useRef, useEffect } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import Toast from "@/components/Toast";
import WelcomeScreen from "@/components/WelcomeScreen";
import ClearButton from "@/components/ClearButton";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
  research?: {
    topic: string;
    summary: string;
    sources: string[];
    tools: string[];
  };
};

type ToastState = {
  visible: boolean;
  message: string;
  type: "success" | "error" | "info";
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your AI Research Assistant. What would you like to research today?",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: "",
    type: "info",
  });
  const [showWelcome, setShowWelcome] = useState(true);

  // Check if user has visited before
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedResearchAssistant");
    if (hasVisited) {
      setShowWelcome(false);
    }
  }, []);

  const dismissWelcome = () => {
    localStorage.setItem("hasVisitedResearchAssistant", "true");
    setShowWelcome(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    // Add loading message from assistant
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get research results");
      }

      // Replace loading message with actual response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                content: `I've researched "${data.topic}" for you.`,
                isLoading: false,
                research: data,
              }
            : msg
        )
      );
    } catch (err: any) {
      // Replace loading message with error
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                content: `Sorry, I encountered an error: ${
                  err.message || "Unknown error"
                }`,
                isLoading: false,
              }
            : msg
        )
      );

      // Show error toast
      setToast({
        visible: true,
        message: `Error: ${err.message || "Unknown error"}`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to show toast notification when content is copied
  const showCopyToast = () => {
    setToast({
      visible: true,
      message: "Copied to clipboard!",
      type: "success",
    });
  };

  // Function to hide toast
  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const clearConversation = () => {
    // Show a confirmation dialog
    if (window.confirm("Are you sure you want to clear the conversation?")) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "Hello! I'm your AI Research Assistant. What would you like to research today?",
          timestamp: new Date(),
        },
      ]);

      // Show toast notification
      setToast({
        visible: true,
        message: "Conversation cleared",
        type: "info",
      });
    }
  };

  const handleShare = () => {
    setToast({
      visible: true,
      message: "Share link copied to clipboard!",
      type: "success",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-dark-charcoal theme-transition">
      {/* Welcome screen for first-time visitors */}
      {showWelcome && <WelcomeScreen onDismiss={dismissWelcome} />}

      {/* Header with better contrast */}
      <header className="flex items-center justify-between py-3 px-4 sm:px-6 border-b border-soft-steel/30 dark:border-soft-steel/20 bg-white dark:bg-dark-charcoal glass-effect theme-transition sticky top-0 z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-8 h-8 flex items-center justify-center bg-cyber-purple/10 dark:bg-cyber-purple/20 rounded-lg">
            <Image
              src="/file.svg"
              alt="Research icon"
              width={18}
              height={18}
              className="text-cyber-purple dark:text-neon-cyan"
            />
          </div>
          <h1
            className="text-lg sm:text-xl font-medium"
            style={{ color: "var(--foreground)" }}
          >
            <span className="text-cyber-purple dark:text-neon-cyan">AI</span>{" "}
            Research Assistant
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ClearButton onClear={clearConversation} />
          <ThemeToggle />
        </div>
      </header>

      {/* Chat container with better contrast */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 custom-scrollbar theme-transition bg-white dark:bg-dark-charcoal">
        <div className="claude-container space-y-6">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onCopy={showCopyToast}
              onShare={handleShare}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area with better contrast */}
      <div className="border-t border-soft-steel/30 dark:border-soft-steel/20 bg-white dark:bg-dark-charcoal p-3 sm:p-4 glass-effect theme-transition">
        <div className="claude-container">
          <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
        </div>
      </div>

      {/* Toast notification */}
      {toast.visible && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
