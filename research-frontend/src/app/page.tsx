"use client";

import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message, ToastState } from "@/types";
import { fetchResearch } from "@/lib/api";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import Toast from "@/components/ui/Toast";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: "",
    type: "info",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages after hydration to avoid timestamp mismatch
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I'm your AI Research Assistant. What would you like to research today?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (loading) return;

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    // Add loading message
    const loadingMessageId = uuidv4();
    const loadingMessage: Message = {
      id: loadingMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setLoading(true);

    try {
      // Fetch research results
      const researchData = await fetchResearch(content);

      // Replace loading message with research results
      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading
            ? {
                id: msg.id,
                role: "assistant",
                content: `Research complete on "${researchData.topic}"`,
                timestamp: new Date(),
                research: researchData,
              }
            : msg
        )
      );
    } catch (error) {
      // Replace loading message with error
      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading
            ? {
                id: msg.id,
                role: "assistant",
                content:
                  "Sorry, I encountered an error while researching. Please try again.",
                timestamp: new Date(),
              }
            : msg
        )
      );

      showToast("Error fetching research results", "error");
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Chat cleared. How can I help you research?",
        timestamp: new Date(),
      },
    ]);
    showToast("Conversation cleared", "info");
  };

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ visible: true, message, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onClear={clearConversation} />

      <main className="flex-1 container py-4 flex flex-col">
        <div className="flex-1 overflow-y-auto custom-scrollbar mb-4 space-y-6 pb-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onCopy={() => showToast("Message copied to clipboard", "success")}
              onShare={() =>
                showToast("Research copied to clipboard", "success")
              }
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="sticky bottom-0 bg-background pt-2">
          <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
        </div>
      </main>

      <Footer />

      {toast.visible && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
