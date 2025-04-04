import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MessageBubbleProps {
  isUser: boolean;
  children: ReactNode;
}

export default function MessageBubble({
  isUser,
  children,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg p-4 shadow-sm",
        isUser ? "bg-primary text-primary-foreground" : "bg-card border"
      )}
    >
      {children}
    </div>
  );
}
