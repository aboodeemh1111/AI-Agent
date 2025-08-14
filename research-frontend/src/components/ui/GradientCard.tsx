import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GradientCardProps = {
  children: ReactNode;
  className?: string;
};

export default function GradientCard({
  children,
  className,
}: GradientCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card/70 backdrop-blur shadow-sm",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(110deg,rgba(255,255,255,0.06),rgba(255,255,255,0)_40%,rgba(255,255,255,0)_60%,rgba(255,255,255,0.06))] before:opacity-100",
        className
      )}
    >
      <div className="absolute -inset-0.5 -z-10 rounded-2xl bg-[conic-gradient(at_top_right,theme(colors.primary.DEFAULT)/20%,transparent_30%,theme(colors.fuchsia.500)/20%,transparent_60%,theme(colors.cyan.400)/20%)] blur-xl" />
      <div className="relative p-4 sm:p-6">{children}</div>
    </div>
  );
}
