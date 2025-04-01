import React, { useState } from "react";

interface ToolBadgeProps {
  tool: string;
}

export default function ToolBadge({ tool }: ToolBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Get description based on tool name
  const getToolDescription = (toolName: string) => {
    const descriptions: Record<string, string> = {
      "Web Search": "Searches the web for up-to-date information",
      "Knowledge Base": "Accesses internal knowledge database",
      "Academic Papers": "Searches academic and scientific papers",
      "News Articles": "Finds recent news articles on the topic",
      "Data Analysis": "Analyzes data and statistics",
      "Image Recognition": "Identifies and analyzes images",
      "Text Analysis": "Analyzes text for patterns and insights",
    };

    return descriptions[toolName] || "AI research tool";
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full ${
        isHovered
          ? "bg-cyber-purple/70 dark:bg-neon-cyan/70"
          : "bg-cyber-purple/60 dark:bg-neon-cyan/60"
      } font-medium transition-colors duration-200 cursor-help tooltip`}
      data-tooltip={getToolDescription(tool)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: "white",
        fontWeight: 600,
        textShadow: "0 0 1px rgba(0, 0, 0, 0.3)",
      }}
    >
      {tool}
    </span>
  );
}
