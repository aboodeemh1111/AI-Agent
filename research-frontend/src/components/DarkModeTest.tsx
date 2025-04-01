"use client";

import { useEffect, useState } from "react";

export function DarkModeTest() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
      console.log("Dark mode check:", isDarkMode);
    };

    // Check initially
    checkDarkMode();

    // Set up observer to monitor class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50 p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white text-xs">
      <div>Dark Mode: {isDark ? "ON" : "OFF"}</div>
      <div className="mt-1">
        <div className="bg-white dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700">
          White/Gray background
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-1 border border-gray-200 dark:border-gray-700">
          Gray background
        </div>
        <div className="bg-blue-500 dark:bg-blue-600 p-1 text-white">
          Blue background
        </div>
      </div>
    </div>
  );
}
