import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SpinProps extends React.HTMLAttributes<HTMLDivElement> {
  spinning?: boolean
  size?: "small" | "default" | "large"
  tip?: React.ReactNode
  fullscreen?: boolean
  children?: React.ReactNode
}

export function Spin({
  spinning = true,
  size = "default",
  tip,
  fullscreen = false,
  children,
  className,
  ...props
}: SpinProps) {
  const sizeClass = size === "small" ? "size-4" : size === "large" ? "size-8" : "size-6"

  const indicator = (
    <div className="flex flex-col items-center gap-2 text-primary">
      <Loader2 className={cn(sizeClass, "animate-spin")} />
      {tip && <span className="text-sm text-muted-foreground">{tip}</span>}
    </div>
  )

  if (fullscreen) {
    if (!spinning) return null
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-background/60" {...props}>
        {indicator}
      </div>
    )
  }

  if (!children) {
    if (!spinning) return null
    return (
      <div className={cn("inline-flex", className)} {...props}>
        {indicator}
      </div>
    )
  }

  return (
    <div className={cn("relative", className)} {...props}>
      {children}
      {spinning && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60">
          {indicator}
        </div>
      )}
    </div>
  )
}
