import * as React from "react"
import { cn } from "@/lib/utils"

export interface StatisticProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "prefix"> {
  title?: React.ReactNode
  value: React.ReactNode
  precision?: number
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  valueStyle?: React.CSSProperties
}

export function Statistic({
  title,
  value,
  precision,
  prefix,
  suffix,
  valueStyle,
  className,
  ...props
}: StatisticProps) {
  const display =
    typeof value === "number" && precision != null ? value.toFixed(precision) : value

  return (
    <div className={cn("min-w-0", className)} {...props}>
      {title != null && <div className="text-sm text-muted-foreground">{title}</div>}
      <div className="mt-1 flex items-baseline gap-1.5" style={valueStyle}>
        {prefix != null && <span className="text-sm text-muted-foreground">{prefix}</span>}
        <span className="text-2xl font-semibold tabular-nums">{display}</span>
        {suffix != null && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  )
}
