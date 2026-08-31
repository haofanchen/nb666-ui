import * as React from "react"
import { cn } from "@/lib/utils"

export interface FloatButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  icon?: React.ReactNode
  type?: "default" | "primary"
  shape?: "circle" | "square"
}

export function FloatButton({
  icon,
  type = "default",
  shape = "circle",
  className,
  children,
  ...props
}: FloatButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "fixed bottom-8 right-8 z-50 flex items-center justify-center text-foreground shadow-card transition-colors",
        shape === "circle" ? "size-12 rounded-full" : "h-12 rounded-lg px-4",
        type === "primary" ? "bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]" : "border border-border bg-background hover:border-primary hover:text-primary",
        className,
      )}
      {...props}
    >
      {icon ?? children}
    </button>
  )
}
