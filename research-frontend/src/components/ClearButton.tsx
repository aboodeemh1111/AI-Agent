import React from "react";
import { IoTrash } from "react-icons/io5";

interface ClearButtonProps {
  onClear: () => void;
}

export default function ClearButton({ onClear }: ClearButtonProps) {
  return (
    <button
      onClick={onClear}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-soft-steel/20 hover:bg-soft-steel/30 dark:bg-soft-steel/10 dark:hover:bg-soft-steel/20 text-midnight-blue dark:text-soft-steel transition-colors duration-200"
      title="Clear conversation"
    >
      <IoTrash className="w-4 h-4" />
      Clear
    </button>
  );
}
