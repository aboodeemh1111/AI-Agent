import { useState } from "react";
import { Message } from "@/types";
import { formatTime } from "@/lib/utils";
import { Copy, Check, User, Bot } from "lucide-react";
import MessageBubble from "./MessageBubble";
import ResearchSummary from "./ResearchSummary";

interface ChatMessageProps {
  message: Message;
  onCopy?: () => void;
  onShare?: () => void;
}

// Loading Animation Component
function LoadingDots() {
  return (
    <div className="flex space-x-1 items-center h-full px-2">
      <span className="loading-dot w-2 h-2 bg-muted-foreground rounded-full"></span>
      <span className="loading-dot w-2 h-2 bg-muted-foreground rounded-full"></span>
      <span className="loading-dot w-2 h-2 bg-muted-foreground rounded-full"></span>
    </div>
  );
}

export default function ChatMessage({
  message,
  onCopy,
  onShare,
}: ChatMessageProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    let textToCopy = message.content;
    if (message.research) {
      textToCopy = `Topic: ${message.research.topic}\n\nSummary:\n${
        message.research.summary
      }\n\nSources:\n${message.research.sources.join(
        "\n"
      )}\n\nTools Used: ${message.research.tools.join(", ")}`;
    }
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      if (onCopy) onCopy();
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Bot className="h-4 w-4 text-primary" />
        </div>
      )}

      <div
        className={`max-w-[85%] sm:max-w-[80%] md:max-w-[70%] ${
          isUser ? "order-1" : "order-2"
        }`}
      >
        <MessageBubble isUser={isUser}>
          {/* Copy Button for Assistant Messages */}
          {!isUser && !message.isLoading && message.content && (
            <button
              className="absolute top-1 right-1 h-7 w-7 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-background/50"
              onClick={copyToClipboard}
              aria-label="Copy message"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          )}

          {message.isLoading ? (
            <LoadingDots />
          ) : message.research ? (
            <ResearchSummary
              research={message.research}
              onShare={() => {
                if (onShare) onShare();
              }}
            />
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </MessageBubble>

        <p
          className={`text-xs text-muted-foreground mt-1 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>

      {isUser && (
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 order-2 shadow-sm">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
    </div>
  );
}
