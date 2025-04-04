"use client";

import { FileText } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";

interface HeaderProps {
  onClear: () => void;
}

export default function Header({ onClear }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            AI Research Assistant
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="flex items-center gap-1.5"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
