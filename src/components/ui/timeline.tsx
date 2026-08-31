import * as React from "react"
import { cn } from "@/lib/utils"

export interface TimelineItem {
  content: React.ReactNode
  color?: string
  dot?: React.ReactNode
  label?: React.ReactNode
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[]
  pending?: React.ReactNode
  reverse?: boolean
}

export function Timeline({
  items,
  pending,
  reverse = false,
  className,
  ...props
}: TimelineProps) {
  const list = reverse ? [...items].reverse() : items

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {list.map((item, i) => {
        const isLast = i === list.length - 1 && !pending
        return (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className="mt-1.5 block size-3 shrink-0 rounded-full border-2"
                style={{ borderColor: item.color ?? "var(--primary)", background: item.dot ? undefined : item.color ?? "var(--primary)" }}
              >
                {item.dot}
              </span>
              {!isLast && <span className="w-px flex-1 bg-border" style={{ minHeight: 20 }} />}
            </div>
            <div className="flex-1 pb-6">
              {item.label != null && <div className="text-xs text-muted-foreground">{item.label}</div>}
              <div className="mt-0.5 text-sm leading-6">{item.content}</div>
            </div>
          </div>
        )
      })}
      {pending != null && (
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <span className="mt-1.5 block size-3 shrink-0 rounded-full border-2 border-dashed border-border" />
          </div>
          <div className="pb-2 text-sm leading-6 text-muted-foreground">{pending}</div>
        </div>
      )}
    </div>
  )
}
