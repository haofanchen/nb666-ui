import * as React from "react"
import { cn } from "@/lib/utils"

const statusColorMap: Record<string, string> = {
  success: "#16a34a",
  processing: "#6c5ce7",
  error: "#dc2626",
  warning: "#f59e0b",
  default: "#9ca3af",
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count?: React.ReactNode
  overflowCount?: number
  dot?: boolean
  showZero?: boolean
  color?: string
  status?: "success" | "processing" | "error" | "warning" | "default"
  offset?: [number, number]
}

function Badge({
  count,
  overflowCount = 99,
  dot = false,
  showZero = false,
  color,
  status = "default",
  offset,
  className,
  children,
  ...props
}: BadgeProps) {
  const statusColor = color ?? statusColorMap[status]

  const display = (() => {
    if (typeof count === "number") {
      if (count === 0 && !showZero) return null
      return count > overflowCount ? `${overflowCount}+` : count
    }
    return count
  })()

  if (!children) {
    if (dot || status !== "default") {
      return (
        <span className={cn("inline-flex items-center gap-2 text-sm", className)} {...props}>
          <span className="inline-block size-2 shrink-0 rounded-full" style={{ background: statusColor }} />
          {display != null && <span>{display}</span>}
        </span>
      )
    }

    return (
      <span
        className={cn(
          "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-medium text-white",
          className,
        )}
        style={{ background: statusColor }}
        {...props}
      >
        {display}
      </span>
    )
  }

  const showBadge = dot || display !== null

  return (
    <span className="relative inline-flex">
      {children}
      {showBadge && (
        <span
          className="absolute -translate-y-1/2 translate-x-1/2"
          style={{ top: offset?.[0] ?? 0, right: -(offset?.[1] ?? 0) }}
        >
          {dot ? (
            <span className="block size-2 rounded-full shadow-sm" style={{ background: statusColor }} />
          ) : (
            <span
              className="inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-medium text-white shadow-sm"
              style={{ background: statusColor }}
            >
              {display}
            </span>
          )}
        </span>
      )}
    </span>
  )
}

export { Badge }
