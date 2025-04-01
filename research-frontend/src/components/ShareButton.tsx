import React, { useState } from "react";
import { IoShareSocial } from "react-icons/io5";

interface ShareButtonProps {
  researchData: {
    topic: string;
    summary: string;
    sources: string[];
  };
  onShare: () => void;
}

export default function ShareButton({
  researchData,
  onShare,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shareOptions = [
    {
      name: "Copy Link",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>
      ),
      action: () => {
        // Create a shareable URL with research data encoded
        const shareableData = encodeURIComponent(
          JSON.stringify({
            topic: researchData.topic,
            summary: researchData.summary,
            sources: researchData.sources,
          })
        );

        const shareUrl = `${window.location.origin}?research=${shareableData}`;
        navigator.clipboard.writeText(shareUrl);
        onShare();
        setIsOpen(false);
      },
    },
    {
      name: "Twitter",
      icon: (
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      action: () => {
        const tweetText = `I just researched "${researchData.topic}" using AI Research Assistant. Check it out!`;
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            tweetText
          )}`,
          "_blank"
        );
        setIsOpen(false);
      },
    },
    {
      name: "LinkedIn",
      icon: (
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      action: () => {
        const shareText = `I just researched "${researchData.topic}" using AI Research Assistant.`;
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            window.location.href
          )}&title=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        setIsOpen(false);
      },
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-cyber-purple/60 hover:bg-cyber-purple/70 dark:bg-neon-cyan/60 dark:hover:bg-neon-cyan/70 font-medium transition-colors duration-200"
        title="Share research"
        style={{
          color: "white",
          fontWeight: 600,
          textShadow: "0 0 1px rgba(0, 0, 0, 0.3)",
        }}
      >
        <IoShareSocial className="w-4 h-4" />
        Share
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-charcoal rounded-md shadow-lg z-10 border border-soft-steel/30 dark:border-soft-steel/20 animate-fade-in">
          <ul className="py-1">
            {shareOptions.map((option, index) => (
              <li key={index}>
                <button
                  onClick={option.action}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-midnight-blue dark:text-soft-white hover:bg-soft-steel/10 dark:hover:bg-soft-steel/10 transition-colors duration-200"
                >
                  <span className="text-cyber-purple dark:text-neon-cyan">
                    {option.icon}
                  </span>
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
