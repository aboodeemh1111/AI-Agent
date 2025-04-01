import React from "react";

interface WelcomeScreenProps {
  onDismiss: () => void;
}

export default function WelcomeScreen({ onDismiss }: WelcomeScreenProps) {
  return (
    <div className="fixed inset-0 bg-midnight-blue/80 dark:bg-midnight-blue/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-charcoal rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-cyber-purple/10 dark:bg-cyber-purple/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-cyber-purple dark:text-neon-cyan"
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
        </div>
        <h2 className="text-xl font-bold text-midnight-blue dark:text-soft-white text-center mb-4">
          Welcome to{" "}
          <span className="text-cyber-purple dark:text-neon-cyan">AI</span>{" "}
          Research Assistant
        </h2>
        <p className="text-midnight-blue/80 dark:text-soft-white/80 mb-6 text-center">
          Your intelligent research companion powered by AI. Ask any question
          and get comprehensive research results with sources.
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <div className="bg-cyber-purple/10 dark:bg-cyber-purple/20 p-2 rounded-full mr-3">
              <svg
                className="w-5 h-5 text-cyber-purple dark:text-neon-cyan"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-midnight-blue dark:text-soft-white">
                Comprehensive Research
              </h3>
              <p className="text-sm text-soft-steel dark:text-soft-steel/70">
                Get detailed summaries on any topic with verified sources
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-cyber-purple/10 dark:bg-cyber-purple/20 p-2 rounded-full mr-3">
              <svg
                className="w-5 h-5 text-cyber-purple dark:text-neon-cyan"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-midnight-blue dark:text-soft-white">
                Lightning Fast
              </h3>
              <p className="text-sm text-soft-steel dark:text-soft-steel/70">
                Get research results in seconds, not hours
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-cyber-purple/10 dark:bg-cyber-purple/20 p-2 rounded-full mr-3">
              <svg
                className="w-5 h-5 text-cyber-purple dark:text-neon-cyan"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-midnight-blue dark:text-soft-white">
                Reliable Information
              </h3>
              <p className="text-sm text-soft-steel dark:text-soft-steel/70">
                All research is backed by credible sources
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="w-full py-3 px-4 bg-cyber-purple hover:bg-cyber-purple/90 dark:bg-neon-cyan dark:hover:bg-neon-cyan/90 text-white dark:text-midnight-blue font-medium rounded-lg transition-colors duration-200"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
