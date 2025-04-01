"use client";

import { useState, FormEvent, KeyboardEvent, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSendMessage,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [message]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
      // Reset height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        {/* Tech-inspired input */}
        <textarea
          ref={textareaRef}
          className="claude-input w-full pr-12 bg-white dark:bg-[#1a1a1a] border-2 border-soft-steel/50 dark:border-soft-steel/30 focus:outline-none focus:ring-2 focus:ring-cyber-purple dark:focus:ring-neon-cyan focus:border-cyber-purple dark:focus:border-neon-cyan resize-none theme-transition rounded-lg p-3"
          placeholder="Ask a research question..."
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          style={{
            minHeight: "50px",
            color: "var(--foreground)",
            backgroundColor: "var(--card-bg)",
          }}
        />

        {/* Tech-inspired send button */}
        <button
          type="submit"
          className={`absolute right-3 bottom-3 p-1.5 rounded-full ${
            message.trim() && !disabled
              ? "bg-cyber-purple hover:bg-cyber-purple/90 text-white"
              : "bg-soft-steel/50 dark:bg-soft-steel/30 cursor-not-allowed"
          } transition-colors duration-200`}
          disabled={!message.trim() || disabled}
        >
          <IoSend className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Tech-inspired helper text with better contrast */}
      <p
        className="mt-2 text-xs px-2 font-medium"
        style={{ color: "var(--text-muted)" }}
      >
        Ask me to research any topic for you. I'll provide a summary and
        sources.
      </p>
    </form>
  );
}
