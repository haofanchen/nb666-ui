import * as React from "react"
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { controlHeight } from "@/lib/styles"
import { useControllableState } from "@/hooks/use-controllable"
import { useClickOutside } from "@/hooks/use-click-outside"
import { MONTHS, WEEKDAYS, addMonths, daysInMonth, isSameDay, mondayOffset, parseISO, toISO } from "@/lib/date"

type ViewMode = "date" | "month" | "year"

export interface DatePickerProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  size?: "small" | "middle" | "large"
  disabled?: boolean
  allowClear?: boolean
  status?: "error" | "warning"
  disabledDate?: (date: Date) => boolean
  className?: string
  onChange?: (value: string) => void
}

export function DatePicker({
  value,
  defaultValue = "",
  placeholder = "请选择日期",
  size = "middle",
  disabled = false,
  allowClear = true,
  status,
  disabledDate,
  className,
  onChange,
}: DatePickerProps) {
  const [current, setCurrent] = useControllableState(value, defaultValue)
  const [open, setOpen] = React.useState(false)
  const [viewMode, setViewMode] = React.useState<ViewMode>("date")

  const selectedDate = React.useMemo(() => parseISO(current), [current])
  const today = new Date()
  const [viewDate, setViewDate] = React.useState(() => {
    const base = selectedDate ?? today
    return { year: base.getFullYear(), month: base.getMonth() }
  })

  const rootRef = React.useRef<HTMLDivElement>(null)
  useClickOutside(rootRef, () => setOpen(false), open)

  function openPanel() {
    const base = selectedDate ?? today
    setViewDate({ year: base.getFullYear(), month: base.getMonth() })
    setViewMode("date")
    setOpen(true)
  }

  function commit(iso: string) {
    setCurrent(iso)
    onChange?.(iso)
    setOpen(false)
  }

  function clear() {
    setCurrent("")
    onChange?.("")
  }

  function changeMonth(delta: number) {
    setViewDate((prev) => addMonths(prev.year, prev.month, delta))
  }

  function changeYear(delta: number) {
    setViewDate((prev) => ({ ...prev, year: prev.year + delta }))
  }

  function renderNav(delta: number, onClick: () => void) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="切换"
      >
        {delta < 0 ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
      </button>
    )
  }

  const triggerClass = cn(
    "flex w-full items-center gap-2 rounded-md border bg-background px-3 text-foreground outline-none transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30",
    controlHeight[size],
    open && "border-primary ring-2 ring-ring/30",
    status === "error" && "border-error",
    status === "warning" && "border-warning",
  )

  return (
    <div ref={rootRef} className={cn("relative inline-block w-full", className)}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(triggerClass, "cursor-pointer", disabled && "pointer-events-none opacity-50")}
        onClick={() => {
          if (disabled) return
          open ? setOpen(false) : openPanel()
        }}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            open ? setOpen(false) : openPanel()
          }
        }}
      >
        <span className={cn("flex-1 truncate text-left", !current && "text-muted-foreground")}>
          {current || placeholder}
        </span>
        {allowClear && current && !disabled && (
          <span
            role="button"
            tabIndex={-1}
            onMouseDown={(e) => e.preventDefault()}
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
        <Calendar className="shrink-0 size-4 text-muted-foreground" />
      </div>

      {open && !disabled && (
        <div className="absolute left-0 top-full z-50 mt-1 w-72 rounded-lg border bg-popover p-3 shadow-card-lg">
          <div className="mb-1 flex items-center justify-between">
            {viewMode === "date" && renderNav(-1, () => changeMonth(-1))}
            {viewMode === "month" && renderNav(-1, () => changeYear(-1))}
            {viewMode === "year" && renderNav(-1, () => changeYear(-10))}

            <button
              type="button"
              onClick={() => {
                if (viewMode === "date") setViewMode("month")
                else if (viewMode === "month") setViewMode("year")
              }}
              className="rounded-md px-2 py-1 text-sm font-medium transition-colors hover:bg-accent"
            >
              {viewMode === "date" && `${viewDate.year}年${viewDate.month + 1}月`}
              {viewMode === "month" && `${viewDate.year}年`}
              {viewMode === "year" &&
                `${Math.floor(viewDate.year / 10) * 10}-${Math.floor(viewDate.year / 10) * 10 + 11}`}
            </button>

            {viewMode === "date" && renderNav(1, () => changeMonth(1))}
            {viewMode === "month" && renderNav(1, () => changeYear(1))}
            {viewMode === "year" && renderNav(1, () => changeYear(10))}
          </div>

          {viewMode === "date" && (
            <>
              <div className="grid grid-cols-7 gap-1 text-center">
                {WEEKDAYS.map((weekday) => (
                  <span key={weekday} className="py-1 text-xs text-muted-foreground">
                    {weekday}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: mondayOffset(viewDate.year, viewDate.month) }).map((_, i) => (
                  <span key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth(viewDate.year, viewDate.month) }, (_, i) => i + 1).map(
                  (day) => {
                    const iso = toISO(viewDate.year, viewDate.month, day)
                    const date = new Date(viewDate.year, viewDate.month, day)
                    const isSelected = current === iso
                    const isToday = isSameDay(date, today)
                    const isDisabled = disabledDate?.(date) ?? false

                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => commit(iso)}
                        className={cn(
                          "flex size-8 items-center justify-center rounded-md text-sm transition-colors",
                          isSelected
                            ? "bg-primary font-medium text-primary-foreground"
                            : isToday
                              ? "font-medium text-primary ring-1 ring-inset ring-primary/50"
                              : "hover:bg-accent",
                          isDisabled && "pointer-events-none text-muted-foreground/40 line-through",
                        )}
                      >
                        {day}
                      </button>
                    )
                  },
                )}
              </div>
            </>
          )}

          {viewMode === "month" && (
            <div className="grid grid-cols-3 gap-2 py-1">
              {MONTHS.map((month, i) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => {
                    setViewDate((prev) => ({ ...prev, month: i }))
                    setViewMode("date")
                  }}
                  className={cn(
                    "rounded-md py-2 text-sm transition-colors hover:bg-accent",
                    i === viewDate.month && "bg-primary font-medium text-primary-foreground",
                  )}
                >
                  {month}
                </button>
              ))}
            </div>
          )}

          {viewMode === "year" && (
            <div className="grid grid-cols-3 gap-2 py-1">
              {Array.from(
                { length: 12 },
                (_, i) => Math.floor(viewDate.year / 10) * 10 + i,
              ).map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => {
                    setViewDate((prev) => ({ ...prev, year }))
                    setViewMode("month")
                  }}
                  className={cn(
                    "rounded-md py-2 text-sm transition-colors hover:bg-accent",
                    year === viewDate.year && "bg-primary font-medium text-primary-foreground",
                  )}
                >
                  {year}
                </button>
              ))}
            </div>
          )}

          <div className="mt-1 flex justify-center border-t pt-2">
            <button
              type="button"
              onClick={() => commit(toISO(today.getFullYear(), today.getMonth(), today.getDate()))}
              className="rounded-md px-2 py-1 text-sm text-primary transition-colors hover:bg-primary/10"
            >
              今天
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
