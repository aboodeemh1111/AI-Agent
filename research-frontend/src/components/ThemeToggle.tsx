"use client";

import { useEffect, useState } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Initialize theme state from document class
  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    // Update state
    setTheme(newTheme);

    // Apply class to HTML element
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-12 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 dark:focus:ring-offset-midnight-blue theme-transition"
      aria-pressed={theme === "dark"}
      style={{
        backgroundColor: theme === "dark" ? "#00D4FF" : "#A6B1C0",
      }}
    >
      <span className="sr-only">
        {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      </span>
      <span
        className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out"
        style={{
          transform:
            theme === "dark" ? "translateX(1.5rem)" : "translateX(0.25rem)",
        }}
      >
        {theme === "dark" ? (
          <IoSunny className="w-4 h-4 text-neon-cyan" />
        ) : (
          <IoMoon className="w-4 h-4 text-cyber-purple" />
        )}
      </span>
    </button>
  );
}
