import * as React from "react"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type StepStatus = "wait" | "process" | "finish" | "error"

export interface StepItem {
  title: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  status?: StepStatus
  disabled?: boolean
}

export interface StepsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: StepItem[]
  current?: number
  direction?: "horizontal" | "vertical"
  size?: "small" | "default"
  onChange?: (current: number) => void
}

function resolveStatus(item: StepItem, index: number, current: number): StepStatus {
  if (item.status) return item.status
  if (index < current) return "finish"
  if (index === current) return "process"
  return "wait"
}

export function Steps({
  items,
  current = 0,
  direction = "horizontal",
  size = "default",
  onChange,
  className,
  ...props
}: StepsProps) {
  const vertical = direction === "vertical"

  function handleStep(index: number, disabled?: boolean) {
    if (disabled || !onChange) return
    onChange(index)
  }

  return (
    <div
      className={cn(vertical ? "flex flex-col" : "flex items-start", className)}
      {...props}
    >
      {items.map((item, i) => {
        const status = resolveStatus(item, i, current)
        const isLast = i === items.length - 1
        const clickable = !!onChange && !item.disabled

        const circleClass = cn(
          "flex items-center justify-center rounded-full border-2 font-medium transition-colors",
          size === "small" ? "size-5 text-[11px]" : "size-7 text-sm",
          status === "finish" && "border-primary bg-primary text-primary-foreground",
          status === "process" && "border-primary bg-background text-primary",
          status === "error" && "border-error bg-background text-error",
          status === "wait" && "border-border bg-background text-muted-foreground",
          clickable && "cursor-pointer hover:border-primary",
        )

        const circle = (
          <span
            className={circleClass}
            onClick={() => handleStep(i, item.disabled)}
            role={clickable ? "button" : undefined}
            tabIndex={clickable ? 0 : undefined}
            onKeyDown={clickable ? (e) => e.key === "Enter" && handleStep(i) : undefined}
          >
            {status === "finish" ? (
              <Check className={size === "small" ? "size-3" : "size-4"} />
            ) : status === "error" ? (
              <X className={size === "small" ? "size-3" : "size-4"} />
            ) : (
              item.icon ?? i + 1
            )}
          </span>
        )

        const lineColor = status === "finish" ? "bg-primary" : status === "error" ? "bg-error" : "bg-border"

        if (vertical) {
          return (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                {circle}
                {!isLast && <span className={cn("w-0.5 flex-1", lineColor)} style={{ minHeight: 24 }} />}
              </div>
              <div className={cn("pb-6", !isLast && "pb-2")}>
                <div
                  className={cn(
                    "font-medium",
                    status === "process" ? "text-primary" : status === "error" ? "text-error" : "text-foreground",
                  )}
                >
                  {item.title}
                </div>
                {item.description && <div className="mt-0.5 text-sm text-muted-foreground">{item.description}</div>}
              </div>
            </div>
          )
        }

        return (
          <div key={i} className="flex flex-1 items-start">
            <div className="flex flex-col items-center">
              {circle}
              <div className={cn("mt-2 text-center", size === "small" ? "text-xs" : "text-sm")}>
                <div
                  className={cn(
                    "font-medium",
                    status === "process"
                      ? "text-primary"
                      : status === "error"
                        ? "text-error"
                        : status === "finish"
                          ? "text-foreground"
                          : "text-muted-foreground",
                  )}
                >
                  {item.title}
                </div>
                {item.description && <div className="mt-0.5 text-xs text-muted-foreground">{item.description}</div>}
              </div>
            </div>
            {!isLast && <span className={cn("mx-3 mt-3.5 h-0.5 flex-1", lineColor)} />}
          </div>
        )
      })}
    </div>
  )
}
