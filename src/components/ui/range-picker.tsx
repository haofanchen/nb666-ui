import * as React from "react"
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { controlHeight } from "../../lib/styles"
import { useControllableState } from "../../hooks/use-controllable"
import { useClickOutside } from "../../hooks/use-click-outside"
import { WEEKDAYS, addMonths, daysInMonth, isSameDay, mondayOffset, parseISO, toISO } from "../../lib/date"

export interface RangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value" | "defaultValue"> {
  value?: [string, string] | null
  defaultValue?: [string, string]
  placeholder?: [string, string]
  size?: "small" | "middle" | "large"
  disabled?: boolean
  allowClear?: boolean
  status?: "error" | "warning"
  disabledDate?: (date: Date) => boolean
  onChange?: (value: [string, string] | null) => void
}

type Range = [string, string]

function buildCells(year: number, month: number): (Date | null)[] {
  const offset = mondayOffset(year, month)
  const total = daysInMonth(year, month)
  const cells: (Date | null)[] = Array.from({ length: offset }, () => null)
  for (let day = 1; day <= total; day++) cells.push(new Date(year, month, day))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export function RangePicker({
  value,
  defaultValue,
  placeholder = ["开始日期", "结束日期"],
  size = "middle",
  disabled = false,
  allowClear = true,
  status,
  disabledDate,
  onChange,
  className,
  ...props
}: RangePickerProps) {
  const [current, setCurrent] = useControllableState<Range | null>(value, defaultValue ?? null)
  const [pendingStart, setPendingStart] = React.useState<string | null>(null)
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)
  useClickOutside(rootRef, () => setOpen(false), open)

  const currentStart = current?.[0] ? parseISO(current[0]) : null
  const currentEnd = current?.[1] ? parseISO(current[1]) : null
  const pendingDate = pendingStart ? parseISO(pendingStart) : null
  const start = pendingDate ?? currentStart
  const end = pendingDate ? null : currentEnd
  const today = new Date()

  const [view, setView] = React.useState(() => {
    const base = start ?? today
    return { year: base.getFullYear(), month: base.getMonth() }
  })

  function commit(next: Range | null) {
    setCurrent(next)
    onChange?.(next)
  }

  function pick(date: Date) {
    if (disabledDate?.(date)) return
    const iso = toISO(date.getFullYear(), date.getMonth(), date.getDate())

    if (pendingStart) {
      const pending = parseISO(pendingStart)!
      if (date < pending) {
        setPendingStart(iso)
        return
      }
      commit([pendingStart, iso])
      setPendingStart(null)
      setOpen(false)
      return
    }

    if (!currentStart) {
      setPendingStart(iso)
      return
    }

    setPendingStart(iso)
  }

  function clear() {
    setPendingStart(null)
    commit(null)
  }

  function renderMonth(year: number, month: number, side: "left" | "right") {
    const cells = buildCells(year, month)
    const label = `${year}年${month + 1}月`
    return (
      <div className={cn("w-72 shrink-0", side === "left" && "border-r pr-3", side === "right" && "pl-3")}>
        <div className="mb-1 flex h-7 items-center justify-center text-sm font-medium">{label}</div>
        <div className="grid grid-cols-7 text-center">
          {WEEKDAYS.map((weekday) => (
            <span key={weekday} className="py-1 text-xs text-muted-foreground">{weekday}</span>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((date, i) => {
            if (!date) return <span key={`empty-${i}`} />
            const iso = toISO(date.getFullYear(), date.getMonth(), date.getDate())
            const isStart = !!start && isSameDay(date, start)
            const isEnd = !!end && isSameDay(date, end)
            const inRange = !!start && !!end && date > start && date < end
            const isToday = isSameDay(date, today)
            const isDisabled = disabledDate?.(date) ?? false

            return (
              <button
                key={iso}
                type="button"
                disabled={isDisabled}
                onClick={() => pick(date)}
                className={cn(
                  "flex h-8 items-center justify-center rounded-md text-sm transition-colors",
                  isStart || isEnd
                    ? "bg-primary font-medium text-primary-foreground"
                    : inRange
                      ? "rounded-none bg-primary/10 text-primary"
                      : isToday
                        ? "font-medium text-primary ring-1 ring-inset ring-primary/50"
                        : "hover:bg-accent",
                  isDisabled && "pointer-events-none text-muted-foreground/40 line-through",
                )}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const next = addMonths(view.year, view.month, 1)
  const display = pendingStart
    ? `${pendingStart} ~ ${placeholder[1]}`
    : current
      ? `${current[0]} ~ ${current[1]}`
      : `${placeholder[0]} ~ ${placeholder[1]}`

  return (
    <div ref={rootRef} className={cn("relative inline-block w-full", className)} {...props}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          if (disabled) return
          if (!open) {
            const base = start ?? today
            setView({ year: base.getFullYear(), month: base.getMonth() })
          }
          setOpen(!open)
        }}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setOpen((o) => !o)
          }
        }}
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 rounded-md border bg-background px-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
          controlHeight[size],
          open && "border-primary ring-2 ring-ring/30",
          status === "error" && "border-error",
          status === "warning" && "border-warning",
        )}
      >
        <span className={cn("flex-1 truncate text-left", !current && !pendingStart && "text-muted-foreground")}>
          {display}
        </span>
        {allowClear && (current || pendingStart) && !disabled && (
          <button
            type="button"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation()
              clear()
            }}
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="清空"
          >
            <X className="size-3.5" />
          </button>
        )}
        <Calendar className="size-4 shrink-0 text-muted-foreground" />
      </div>

      {open && !disabled && (
        <div className="absolute left-0 top-full z-50 mt-1 rounded-lg border bg-popover p-3 shadow-card-lg">
          <div className="mb-1 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setView((prev) => addMonths(prev.year, prev.month, -1))}
              className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="上个月"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setView((prev) => addMonths(prev.year, prev.month, 1))}
              className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="下个月"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="flex">
            {renderMonth(view.year, view.month, "left")}
            {renderMonth(next.year, next.month, "right")}
          </div>
          <div className="mt-1 flex justify-end border-t pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-1 text-xs font-medium text-primary-foreground bg-primary transition-colors hover:bg-[var(--primary-hover)]"
            >
              确定
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
