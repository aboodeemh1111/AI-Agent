import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type,
  onClose,
  duration = 2000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor =
    type === "success"
      ? "bg-neon-cyan"
      : type === "error"
      ? "bg-red-500"
      : "bg-cyber-purple";

  const textColor =
    type === "success" ? "text-midnight-blue" : "text-soft-white";

  const icon =
    type === "success" ? (
      <svg
        className={`w-5 h-5 ${textColor}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ) : type === "error" ? (
      <svg
        className="w-5 h-5 text-soft-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ) : (
      <svg
        className="w-5 h-5 text-soft-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 copy-notification">
      <div
        className={`${bgColor} ${textColor} px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2`}
      >
        <div className="flex-shrink-0">{icon}</div>
        <p>{message}</p>
      </div>
    </div>
  );
}
