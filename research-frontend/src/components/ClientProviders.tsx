"use client";

import { ReactNode } from "react";
import { NextThemeProvider } from "./NextThemeProvider";

export function ClientProviders({ children }: { children: ReactNode }) {
  return <NextThemeProvider>{children}</NextThemeProvider>;
}
