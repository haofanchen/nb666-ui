import * as React from "react"
import { cn } from "../../lib/utils"

export interface CountdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange" | "value" | "defaultValue" | "prefix"> {
  value?: number | string | Date
  defaultValue?: number | string | Date
  title?: React.ReactNode
  format?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  valueStyle?: React.CSSProperties
  onFinish?: () => void
  onChange?: (remaining: number) => void
  render?: (remaining: number) => React.ReactNode
}

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)

function toTimestamp(value: number | string | Date | undefined): number | null {
  if (value == null) return null
  if (typeof value === "number") return value
  if (value instanceof Date) return value.getTime()
  const time = new Date(value).getTime()
  return Number.isNaN(time) ? null : time
}

function formatRemaining(ms: number, format: string) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const tokens: Record<string, string> = {
    DD: String(days),
    HH: pad(hours),
    mm: pad(minutes),
    ss: pad(seconds),
  }

  return format.replace(/DD|HH|mm|ss/g, (token) => tokens[token])
}

export function Countdown({
  value,
  defaultValue,
  title,
  format = "HH:mm:ss",
  prefix,
  suffix,
  valueStyle,
  onFinish,
  onChange,
  render,
  className,
  ...props
}: CountdownProps) {
  const isControlled = value !== undefined
  const [internalValue] = React.useState(defaultValue)
  const target = toTimestamp(isControlled ? value : internalValue)
  const [now, setNow] = React.useState(() => Date.now())

  React.useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const remaining = target == null ? 0 : Math.max(0, target - now)

  React.useEffect(() => {
    onChange?.(remaining)
  }, [remaining, onChange])

  React.useEffect(() => {
    if (remaining <= 0 && target != null) onFinish?.()
  }, [remaining, target, onFinish])

  return (
    <div className={cn("min-w-0", className)} {...props}>
      {title != null && <div className="text-sm text-muted-foreground">{title}</div>}
      <div className="mt-1 flex items-baseline gap-1.5" style={valueStyle}>
        {prefix != null && <span className="text-sm text-muted-foreground">{prefix}</span>}
        <span className="text-2xl font-semibold tabular-nums">
          {render ? render(remaining) : formatRemaining(remaining, format)}
        </span>
        {suffix != null && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  )
}
