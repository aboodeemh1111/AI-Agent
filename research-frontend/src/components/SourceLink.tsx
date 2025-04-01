import React, { useState } from "react";

interface SourceLinkProps {
  source: string;
}

export default function SourceLink({ source }: SourceLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Try to extract a URL from the source text
  const extractUrl = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const match = text.match(urlRegex);
    return match ? match[0] : null;
  };

  const url = extractUrl(source);

  if (!url) {
    return (
      <li className="break-words" style={{ color: "var(--foreground)" }}>
        {source}
      </li>
    );
  }

  return (
    <li className="break-words">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors duration-200 ${
          isHovered
            ? "text-neon-cyan dark:text-neon-cyan"
            : "text-cyber-purple dark:text-neon-cyan"
        } hover:underline font-medium`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          textShadow: "0 0 1px rgba(0, 0, 0, 0.2)",
          fontWeight: 600,
        }}
      >
        {source}
      </a>
    </li>
  );
}
