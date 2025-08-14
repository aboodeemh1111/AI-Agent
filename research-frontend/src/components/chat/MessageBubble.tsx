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
        "relative rounded-xl p-4 shadow-sm",
        isUser
          ? "bg-gradient-to-tr from-primary to-primary/90 text-primary-foreground"
          : "bg-card/80 border backdrop-blur"
      )}
    >
      {children}
    </div>
  );
}
