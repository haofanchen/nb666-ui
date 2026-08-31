import * as React from "react"
import { cn } from "../../lib/utils"

export interface DescriptionsItem {
  label: React.ReactNode
  content: React.ReactNode
  span?: number
}

export interface DescriptionsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  items: DescriptionsItem[]
  column?: number
  bordered?: boolean
  size?: "small" | "middle" | "default"
}

function chunkItems(items: DescriptionsItem[], column: number): DescriptionsItem[][] {
  const rows: DescriptionsItem[][] = []
  let row: DescriptionsItem[] = []
  let remaining = column
  for (const item of items) {
    const span = Math.max(1, Math.min(item.span ?? 1, column))
    if (span > remaining && row.length > 0) {
      rows.push(row)
      row = []
      remaining = column
    }
    row.push({ ...item, span })
    remaining -= span
    if (remaining <= 0) {
      rows.push(row)
      row = []
      remaining = column
    }
  }
  if (row.length > 0) rows.push(row)
  return rows
}

export function Descriptions({
  title,
  items,
  column = 3,
  bordered = false,
  size = "default",
  className,
  ...props
}: DescriptionsProps) {
  const rows = chunkItems(items, column)
  const padding = size === "small" ? "px-3 py-2" : size === "middle" ? "px-4 py-3" : "px-4 py-3.5"

  return (
    <div className={cn("overflow-hidden rounded-lg", bordered && "border", className)} {...props}>
      {title != null && (
        <div className={cn("border-b px-4 py-3 font-semibold", !bordered && "px-0")}>{title}</div>
      )}
      <div className={cn("grid", bordered ? "gap-px bg-border" : "gap-x-6 gap-y-4")} style={{ gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))` }}>
        {rows.flat().map((item, i) => (
          <div
            key={i}
            className={cn(
              "min-w-0 bg-card",
              !bordered && "rounded-lg",
              bordered && padding,
            )}
            style={{ gridColumn: `span ${item.span}` }}
          >
            <div className="text-sm text-muted-foreground mb-1">
              {item.label}
            </div>
            <div className="text-sm">{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
