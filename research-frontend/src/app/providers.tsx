"use client";

import { ReactNode } from "react";
import { ThemeWrapper } from "@/components/ThemeWrapper";

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeWrapper>{children}</ThemeWrapper>;
}
