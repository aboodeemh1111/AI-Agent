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
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container px-3 sm:px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
            <span className="absolute -inset-px rounded-lg border border-primary/20" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
              AI Research Assistant
            </h1>
          </div>
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
