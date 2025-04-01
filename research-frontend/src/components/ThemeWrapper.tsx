"use client";

import { useEffect, useState } from "react";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      // Initialize theme from localStorage or system preference
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
        console.log("Dark mode applied from localStorage");
      } else if (savedTheme === "light") {
        document.documentElement.classList.remove("dark");
        console.log("Light mode applied from localStorage");
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        console.log("Dark mode applied from system preference");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        console.log("Light mode applied as default");
      }
    } catch (e) {
      console.error("Error setting initial theme:", e);
    }

    // Add this function to force dark mode for testing
    const forceDarkMode = () => {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("Dark mode forced for testing");
    };

    // Call this function in your useEffect to test if dark mode styles work at all
    // forceDarkMode();
  }, []);

  // Return a placeholder during SSR
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return <>{children}</>;
}
