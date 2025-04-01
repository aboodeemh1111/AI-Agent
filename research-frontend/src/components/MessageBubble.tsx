import React from "react";

interface MessageBubbleProps {
  isUser: boolean;
  children: React.ReactNode;
}

export default function MessageBubble({
  isUser,
  children,
}: MessageBubbleProps) {
  return (
    <div
      className={`relative rounded-lg p-4 shadow-sm ${
        isUser
          ? "user-message bg-cyber-purple text-white"
          : "assistant-message bg-white dark:bg-[#1a1a1a] border border-soft-steel/30 dark:border-soft-steel/20"
      }`}
      style={{
        color: isUser ? "white" : "var(--foreground)",
        backgroundColor: isUser ? "var(--cyber-purple)" : "var(--card-bg)",
      }}
    >
      {children}
    </div>
  );
}
