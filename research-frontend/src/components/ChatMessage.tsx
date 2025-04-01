import Image from "next/image";
import { useState } from "react";
import LoadingAnimation from "./LoadingAnimation";
import SourceLink from "./SourceLink";
import ToolBadge from "./ToolBadge";
import ShareButton from "./ShareButton";
import MessageBubble from "./MessageBubble";
import { IoCopy, IoCheckmark, IoPersonCircle } from "react-icons/io5";

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

export default function ChatMessage({
  message,
  onCopy,
  onShare,
}: {
  message: Message;
  onCopy?: () => void;
  onShare?: () => void;
}) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  // Format the timestamp without date-fns
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // Function to copy message content to clipboard
  const copyToClipboard = () => {
    let textToCopy = message.content;

    // If it's a research message, include all the details
    if (message.research) {
      textToCopy = `${message.content}\n\n${message.research.topic}\n\n${
        message.research.summary
      }\n\nSources:\n${message.research.sources
        .map((source) => `- ${source}`)
        .join("\n")}\n\nTools Used: ${message.research.tools.join(", ")}`;
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      if (onCopy) onCopy();
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } message-animation`}
    >
      <div
        className={`flex max-w-full sm:max-w-[90%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        } items-start gap-2`}
      >
        {/* Avatar - Tech-inspired */}
        {!isUser && (
          <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-cyber-purple/10 dark:bg-cyber-purple/20 mt-1">
            <svg
              className="w-4 h-4 text-cyber-purple dark:text-neon-cyan"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
        )}

        {/* Message content - Tech-inspired */}
        <div
          className={`flex flex-col ${
            isUser ? "items-end" : "items-start"
          } space-y-1 flex-1 overflow-hidden`}
        >
          <MessageBubble isUser={isUser}>
            {/* Copy button */}
            {!isUser && (
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-1 text-soft-steel hover:text-cyber-purple dark:text-soft-steel/70 dark:hover:text-neon-cyan transition-colors duration-200"
                title="Copy to clipboard"
              >
                {copied ? (
                  <IoCheckmark className="w-5 h-5" />
                ) : (
                  <IoCopy className="w-5 h-5" />
                )}
              </button>
            )}

            {message.isLoading ? (
              <LoadingAnimation />
            ) : message.research ? (
              <div className="space-y-4">
                <div className="font-medium text-base sm:text-lg pr-8 text-contrast-safe">
                  {message.content}
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-cyber-purple dark:text-neon-cyan">
                    {message.research.topic}
                  </h3>
                  <p className="text-sm sm:text-base text-contrast-safe">
                    {message.research.summary}
                  </p>

                  {message.research.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-soft-steel/30 dark:border-soft-steel/20">
                      <h4 className="text-sm font-semibold mb-2 text-contrast-safe">
                        Sources:
                      </h4>
                      <ul className="text-sm space-y-1.5 list-disc list-inside">
                        {message.research.sources.map((source, index) => (
                          <SourceLink key={index} source={source} />
                        ))}
                      </ul>
                    </div>
                  )}

                  {message.research.tools.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-soft-steel/30 dark:border-soft-steel/20">
                      <h4 className="text-sm font-semibold mb-2 text-contrast-safe">
                        Tools Used:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {message.research.tools.map((tool, index) => (
                          <ToolBadge key={index} tool={tool} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-2">
                  <ShareButton
                    researchData={{
                      topic: message.research.topic,
                      summary: message.research.summary,
                      sources: message.research.sources,
                    }}
                    onShare={() => {
                      if (onShare) onShare();
                    }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-sm sm:text-base pr-8 text-contrast-safe">
                {message.content}
              </p>
            )}
          </MessageBubble>

          {/* Timestamp - Tech-inspired with better contrast */}
          <span className="text-xs text-muted px-2">
            {formatTime(new Date(message.timestamp))}
          </span>
        </div>

        {/* User avatar - Tech-inspired */}
        {isUser && (
          <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-cyber-purple mt-1">
            <IoPersonCircle className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
