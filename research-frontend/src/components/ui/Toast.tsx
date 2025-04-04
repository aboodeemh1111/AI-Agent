"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToastType } from "@/types";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeClasses = {
    success:
      "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300",
    error:
      "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300",
    info: "bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/30 dark:border-blue-600 dark:text-blue-300",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div
        className={cn(
          "flex items-center justify-between rounded-lg border-l-4 p-4 shadow-md",
          typeClasses[type]
        )}
      >
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
