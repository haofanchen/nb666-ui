import * as React from "react"
import { Clock, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { controlHeight } from "../../lib/styles"
import { useControllableState } from "../../hooks/use-controllable"
import { useClickOutside } from "../../hooks/use-click-outside"

export interface TimePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value" | "defaultValue"> {
  value?: string
  defaultValue?: string
  placeholder?: string
  size?: "small" | "middle" | "large"
  disabled?: boolean
  allowClear?: boolean
  status?: "error" | "warning"
  format?: "HH:mm" | "HH:mm:ss"
  onChange?: (value: string) => void
}

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)

function parseTime(value: string): { hour: number; minute: number; second: number } | null {
  const match = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/.exec(value)
  if (!match) return null
  const hour = Number(match[1])
  const minute = Number(match[2])
  const second = Number(match[3] ?? 0)
  if (hour > 23 || minute > 59 || second > 59) return null
  return { hour, minute, second }
}

function formatTime(hour: number, minute: number, second: number, format: "HH:mm" | "HH:mm:ss") {
  const base = `${pad(hour)}:${pad(minute)}`
  return format === "HH:mm:ss" ? `${base}:${pad(second)}` : base
}

export function TimePicker({
  value,
  defaultValue = "",
  placeholder = "请选择时间",
  size = "middle",
  disabled = false,
  allowClear = true,
  status,
  format = "HH:mm:ss",
  onChange,
  className,
  ...props
}: TimePickerProps) {
  const [current, setCurrent] = useControllableState(value, defaultValue)
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)
  useClickOutside(rootRef, () => setOpen(false), open)

  const time = React.useMemo(() => parseTime(current) ?? { hour: 0, minute: 0, second: 0 }, [current])

  function commit(hour: number, minute: number, second: number) {
    const next = formatTime(hour, minute, second, format)
    setCurrent(next)
    onChange?.(next)
  }

  function clear() {
    setCurrent("")
    onChange?.("")
  }

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)
  const seconds = Array.from({ length: 60 }, (_, i) => i)

  function renderColumn(
    list: number[],
    active: number,
    onPick: (n: number) => void,
  ) {
    return (
      <div className="h-48 w-14 shrink-0 overflow-auto border-r last:border-r-0 scrollbar-thin">
        {list.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onPick(n)}
            className={cn(
              "flex h-8 w-full items-center justify-center text-sm transition-colors",
              n === active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent",
            )}
          >
            {pad(n)}
          </button>
        ))}
        <span className="block h-40" />
      </div>
    )
  }

  return (
    <div ref={rootRef} className={cn("relative inline-block w-full", className)} {...props}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center gap-2 rounded-md border bg-background px-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
          controlHeight[size],
          open && "border-primary ring-2 ring-ring/30",
          status === "error" && "border-error",
          status === "warning" && "border-warning",
        )}
      >
        <span className={cn("flex-1 text-left", !current && "text-muted-foreground")}>
          {current || placeholder}
        </span>
        {allowClear && current && !disabled && (
          <span
            role="button"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation()
              clear()
            }}
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="清空"
          >
            <X className="size-3.5" />
          </span>
        )}
        <Clock className="size-4 shrink-0 text-muted-foreground" />
      </button>

      {open && !disabled && (
        <div className="absolute left-0 top-full z-50 mt-1 rounded-lg border bg-popover p-2 shadow-card-lg">
          <div className="flex">
            {renderColumn(hours, time.hour, (n) => commit(n, time.minute, time.second))}
            {renderColumn(minutes, time.minute, (n) => commit(time.hour, n, time.second))}
            {format === "HH:mm:ss" && renderColumn(seconds, time.second, (n) => commit(time.hour, time.minute, n))}
          </div>
          <div className="flex justify-between border-t pt-2">
            <button
              type="button"
              onClick={() => {
                const now = new Date()
                commit(now.getHours(), now.getMinutes(), now.getSeconds())
                setOpen(false)
              }}
              className="rounded-md px-2 py-1 text-xs text-primary transition-colors hover:bg-primary/10"
            >
              此刻
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  clear()
                  setOpen(false)
                }}
                className="rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent"
              >
                清空
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-1 text-xs font-medium text-primary-foreground bg-primary transition-colors hover:bg-[var(--primary-hover)]"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
