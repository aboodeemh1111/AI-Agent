"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function NextThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Set the theme
  const handleSetTheme = (newTheme: "light" | "dark") => {
    try {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);

      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      console.error("Error setting theme:", e);
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);

    try {
      // Check for saved preference in localStorage first
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;

      if (savedTheme) {
        setTheme(savedTheme);
        // Make sure the class is applied
        if (savedTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      }
    } catch (e) {
      console.error("Error accessing localStorage:", e);
    }
  }, []);

  // Return a placeholder during SSR
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a NextThemeProvider");
  }
  return context;
}
