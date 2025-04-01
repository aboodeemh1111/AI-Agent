"use client";

import { useTheme } from "./NextThemeProvider";
import { useEffect, useState } from "react";

export function ThemeDebug() {
  const [theme, setTheme] = useState<string>("unknown");
  const [mounted, setMounted] = useState(false);
  const [htmlClass, setHtmlClass] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Try to get theme from context
      const themeContext = useTheme();
      setTheme(themeContext.theme);
    } catch (err) {
      setError("Theme context not available");
      // Fallback to checking HTML class
      if (document.documentElement.classList.contains("dark")) {
        setTheme("dark (from HTML class)");
      } else {
        setTheme("light (from HTML class)");
      }
    }

    setMounted(true);
    setHtmlClass(document.documentElement.className);

    // Update the HTML class when it changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setHtmlClass(document.documentElement.className);
          // Update theme based on HTML class
          if (document.documentElement.classList.contains("dark")) {
            setTheme("dark (from HTML class)");
          } else {
            setTheme("light (from HTML class)");
          }
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-2 rounded shadow text-xs z-50">
      {error && <div className="text-red-500">{error}</div>}
      <div>Theme: {theme}</div>
      <div>HTML Class: {htmlClass}</div>
      <div>
        localStorage:{" "}
        {typeof window !== "undefined"
          ? localStorage.getItem("theme") || "not set"
          : "SSR"}
      </div>
    </div>
  );
}
