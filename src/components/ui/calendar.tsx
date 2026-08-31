import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { WEEKDAYS, addMonths, daysInMonth, isSameDay, mondayOffset, parseISO, toISO } from "@/lib/date"
import { useControllableState } from "@/hooks/use-controllable"

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: Date | string
  defaultValue?: Date | string
  onChange?: (date: Date) => void
  onPanelChange?: (date: Date) => void
  dateCellRender?: (date: Date) => React.ReactNode
  dateFullCellRender?: (date: Date) => React.ReactNode
  fullscreen?: boolean
  disabledDate?: (date: Date) => boolean
}

function normalizeValue(value: Date | string | undefined): Date {
  if (value == null) return new Date()
  if (typeof value === "string") return parseISO(value) ?? new Date()
  return value
}

function buildCells(year: number, month: number): (Date | null)[] {
  const offset = mondayOffset(year, month)
  const total = daysInMonth(year, month)
  const cells: (Date | null)[] = Array.from({ length: offset }, () => null)
  for (let day = 1; day <= total; day++) cells.push(new Date(year, month, day))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export function Calendar({
  value,
  defaultValue,
  onChange,
  onPanelChange,
  dateCellRender,
  dateFullCellRender,
  fullscreen = false,
  disabledDate,
  className,
  ...props
}: CalendarProps) {
  const [current, setCurrent] = useControllableState(value, defaultValue)
  const selectedDate = normalizeValue(current)
  const today = new Date()
  const [view, setView] = React.useState(() => ({
    year: selectedDate.getFullYear(),
    month: selectedDate.getMonth(),
  }))

  function changeMonth(delta: number) {
    setView((prev) => {
      const next = addMonths(prev.year, prev.month, delta)
      onPanelChange?.(new Date(next.year, next.month, 1))
      return next
    })
  }

  function select(date: Date) {
    if (disabledDate?.(date)) return
    setCurrent(date)
    onChange?.(date)
  }

  const cells = buildCells(view.year, view.month)

  const header = (
    <div className={cn("flex items-center", fullscreen ? "border-b px-4 py-3" : "px-3 py-2")}>
      <button
        type="button"
        onClick={() => changeMonth(-1)}
        className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="上个月"
      >
        <ChevronLeft className="size-4" />
      </button>
      <span className="flex-1 text-center text-sm font-semibold">{view.year}年{view.month + 1}月</span>
      <button
        type="button"
        onClick={() => changeMonth(1)}
        className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="下个月"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  )

  return (
    <div
      className={cn(
        fullscreen ? "rounded-lg border bg-card" : "inline-block rounded-lg border bg-card p-3",
        className,
      )}
      {...props}
    >
      {header}
      <div className={cn(fullscreen && "px-4 pb-4")}>
        <div className="grid grid-cols-7">
          {WEEKDAYS.map((weekday) => (
            <div
              key={weekday}
              className={cn(
                "py-2 text-center text-xs text-muted-foreground",
                fullscreen ? "border-b font-medium" : "",
              )}
            >
              {weekday}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((date, i) => {
            if (!date) return <div key={`empty-${i}`} />
            const iso = toISO(date.getFullYear(), date.getMonth(), date.getDate())
            const selected = isSameDay(date, selectedDate)
            const isToday = isSameDay(date, today)
            const disabled = disabledDate?.(date) ?? false
            const content = dateFullCellRender
              ? dateFullCellRender(date)
              : dateCellRender
                ? dateCellRender(date)
                : date.getDate()

            return (
              <div
                key={iso}
                role="button"
                tabIndex={disabled ? -1 : 0}
                onClick={() => select(date)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    select(date)
                  }
                }}
                className={cn(
                  fullscreen ? "min-h-24 border-b border-r px-2 py-2 text-left align-top" : "flex items-center justify-center",
                  disabled ? "cursor-not-allowed text-muted-foreground/40" : "cursor-pointer",
                )}
              >
                {dateFullCellRender ? (
                  content
                ) : (
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-md text-sm transition-colors",
                      fullscreen ? "h-7 w-7" : "size-8",
                      selected
                        ? "bg-primary font-medium text-primary-foreground"
                        : isToday
                          ? "font-medium text-primary ring-1 ring-inset ring-primary/50"
                          : "hover:bg-accent",
                    )}
                  >
                    {content}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
