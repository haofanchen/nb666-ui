import * as React from "react"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  percent?: number
  status?: "normal" | "active" | "success" | "exception"
  type?: "line" | "circle" | "dashboard"
  size?: number | "small" | "default"
  strokeWidth?: number
  steps?: number
  showInfo?: boolean
  format?: (percent?: number) => React.ReactNode
}

export function Progress({
  percent = 0,
  status = "normal",
  type = "line",
  size = "default",
  strokeWidth = 8,
  steps,
  showInfo = true,
  format,
  className,
  ...props
}: ProgressProps) {
  const clamped = Math.min(Math.max(percent, 0), 100)
  const barColor =
    status === "success" ? "bg-success"
    : status === "exception" ? "bg-error"
    : "bg-primary"

  const info = format ? format(clamped) : (
    <span className={cn("text-sm", status === "success" ? "text-success" : status === "exception" ? "text-error" : "text-foreground")}>
      {status === "success" ? <Check className="size-4" /> : status === "exception" ? <X className="size-4" /> : `${Math.round(clamped)}%`}
    </span>
  )

  if (type === "circle") {
    const r = 50 - strokeWidth / 2
    const circumference = 2 * Math.PI * r
    const offset = circumference - (clamped / 100) * circumference
    const sizePx = typeof size === "number" ? size : size === "small" ? 80 : 120
    const stroke = status === "success" ? "#16a34a" : status === "exception" ? "#dc2626" : "var(--primary)"

    return (
      <div className={cn("inline-flex items-center gap-3", className)} {...props}>
        <div className="relative" style={{ width: sizePx, height: sizePx }}>
          <svg width={sizePx} height={sizePx} className="-rotate-90">
            <circle cx={sizePx / 2} cy={sizePx / 2} r={r} fill="none" stroke="var(--muted)" strokeWidth={strokeWidth} />
            <circle
              cx={sizePx / 2}
              cy={sizePx / 2}
              r={r}
              fill="none"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.4s ease" }}
            />
          </svg>
          {showInfo && <span className="absolute inset-0 flex items-center justify-center">{info}</span>}
        </div>
      </div>
    )
  }

  if (type === "dashboard") {
    const r = 50 - strokeWidth / 2
    const circumference = Math.PI * r
    const offset = circumference - (clamped / 100) * circumference
    const sizePx = typeof size === "number" ? size : size === "small" ? 100 : 160
    const stroke = status === "success" ? "#16a34a" : status === "exception" ? "#dc2626" : "var(--primary)"
    const height = sizePx / 2 + strokeWidth

    return (
      <div className={cn("inline-flex items-center gap-3", className)} {...props}>
        <div className="relative" style={{ width: sizePx, height }}>
          <svg width={sizePx} height={height}>
            <path
              d={`M ${sizePx / 2 - r} ${sizePx / 2} A ${r} ${r} 0 0 1 ${sizePx / 2 + r} ${sizePx / 2}`}
              fill="none"
              stroke="var(--muted)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d={`M ${sizePx / 2 - r} ${sizePx / 2} A ${r} ${r} 0 0 1 ${sizePx / 2 + r} ${sizePx / 2}`}
              fill="none"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.4s ease" }}
            />
          </svg>
          {showInfo && <span className="absolute inset-x-0 bottom-0 flex justify-center">{info}</span>}
        </div>
      </div>
    )
  }

  const height = typeof size === "number" ? size : size === "small" ? 6 : strokeWidth

  if (steps && steps > 0) {
    const activeSteps = Math.round((clamped / 100) * steps)
    return (
      <div className={cn("flex w-full items-center gap-3", className)} {...props}>
        <div className="flex flex-1 gap-1">
          {Array.from({ length: steps }, (_, i) => (
            <span
              key={i}
              className={cn("h-full flex-1 rounded-sm transition-colors", i < activeSteps ? barColor : "bg-muted")}
              style={{ height }}
            />
          ))}
        </div>
        {showInfo && info}
      </div>
    )
  }

  return (
    <div className={cn("flex w-full items-center gap-3", className)} {...props}>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted" style={{ height }}>
        <div
          className={cn("h-full rounded-full transition-[width] duration-300", barColor, status === "active" && "animate-pulse")}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showInfo && info}
    </div>
  )
}
