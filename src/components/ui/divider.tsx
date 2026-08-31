import * as React from "react"
import { cn } from "../../lib/utils"

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "left" | "center" | "right"
  dashed?: boolean
  type?: "horizontal" | "vertical"
  plain?: boolean
}

export function Divider({
  orientation = "center",
  dashed = false,
  type = "horizontal",
  plain = false,
  className,
  children,
  ...props
}: DividerProps) {
  if (type === "vertical") {
    return (
      <div
        className={cn(
          "inline-block h-[0.9em] self-stretch align-middle",
          dashed ? "border-l border-dashed border-border" : "w-px bg-border",
          className,
        )}
        {...props}
      />
    )
  }

  const withText = React.Children.count(children) > 0 && !plain

  return (
    <div
      className={cn("flex items-center gap-4", className)}
      role="separator"
      {...props}
    >
      {orientation === "left" ? null : <span className={cn("h-px flex-1", dashed ? "border-t border-dashed border-border" : "bg-border")} />}
      {withText ? (
        <span className="shrink-0 text-sm text-muted-foreground">{children}</span>
      ) : (
        children
      )}
      {orientation === "right" ? null : <span className={cn("h-px flex-1", dashed ? "border-t border-dashed border-border" : "bg-border")} />}
    </div>
  )
}
