import * as React from "react"
import { cn } from "../../lib/utils"

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: number | [number, number]
  defaultValue?: number | [number, number]
  range?: boolean
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  tooltipVisible?: boolean
  onChange?: (value: number | [number, number]) => void
}

export function Slider({
  value: controlledValue,
  defaultValue = 0,
  range = false,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  tooltipVisible = true,
  onChange,
  className,
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState<number | [number, number]>(defaultValue)
  const [dragging, setDragging] = React.useState(false)
  const [activeThumb, setActiveThumb] = React.useState<"start" | "end" | null>(null)
  const trackRef = React.useRef<HTMLDivElement>(null)

  const value = controlledValue ?? internalValue
  const isRange = range || Array.isArray(value)

  const [start, end] = React.useMemo(() => {
    const pair = Array.isArray(value) ? value : [value as number, value as number]
    return [...pair].sort((a, b) => a - b)
  }, [value])

  const startPercent = ((start - min) / (max - min)) * 100
  const endPercent = ((end - min) / (max - min)) * 100

  function valueFromClientX(clientX: number) {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return min
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
    const raw = min + ratio * (max - min)
    const stepped = Math.round((raw - min) / step) * step + min
    return Math.min(Math.max(stepped, min), max)
  }

  function commit(next: number | [number, number]) {
    setInternalValue(next)
    onChange?.(next)
  }

  function commitRangeThumb(thumb: "start" | "end", next: number) {
    if (!isRange) {
      commit(next)
      return
    }
    const pair: [number, number] = Array.isArray(value) ? [...value] : [value as number, value as number]
    pair[thumb === "start" ? 0 : 1] = next
    const sorted = [...pair].sort((a, b) => a - b) as [number, number]
    commit(sorted)
  }

  function handleTrackDown(e: React.PointerEvent) {
    if (disabled) return
    const next = valueFromClientX(e.clientX)
    if (isRange) {
      const thumb = Math.abs(next - start) <= Math.abs(next - end) ? "start" : "end"
      setActiveThumb(thumb)
      commitRangeThumb(thumb, next)
    } else {
      setActiveThumb(null)
      commit(next)
    }
    setDragging(true)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  function handleThumbDown(e: React.PointerEvent, thumb: "start" | "end") {
    if (disabled) return
    e.stopPropagation()
    setActiveThumb(thumb)
    setDragging(true)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  function handleMove(e: React.PointerEvent) {
    if (!dragging) return
    const next = valueFromClientX(e.clientX)
    if (isRange && activeThumb) commitRangeThumb(activeThumb, next)
    else if (!isRange) commit(next)
  }

  function clamp(next: number) {
    return Math.min(Math.max(next, min), max)
  }

  function handleKeyDown(e: React.KeyboardEvent, which: "start" | "end", current: number) {
    if (disabled) return
    let delta = 0
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") delta = -step
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") delta = step
    else if (e.key === "Home") {
      e.preventDefault()
      if (isRange) commitRangeThumb(which, min)
      else commit(min)
      return
    } else if (e.key === "End") {
      e.preventDefault()
      if (isRange) commitRangeThumb(which, max)
      else commit(max)
      return
    }
    if (delta === 0) return
    e.preventDefault()
    if (isRange) commitRangeThumb(which, clamp(current + delta))
    else commit(clamp(current + delta))
  }

  const thumb = (percent: number, thumbValue: number, which: "start" | "end", show: boolean) => (
    <div
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={thumbValue}
      tabIndex={disabled ? -1 : 0}
      onPointerDown={(e) => handleThumbDown(e, which)}
      onKeyDown={(e) => handleKeyDown(e, which, thumbValue)}
      className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-primary bg-background shadow-sm transition-transform focus-visible:ring-2 focus-visible:ring-ring/40 active:cursor-grabbing"
      style={{ left: `${percent}%` }}
    >
      {tooltipVisible && dragging && show && (
        <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-0.5 text-xs text-background">
          {thumbValue}
        </span>
      )}
    </div>
  )

  return (
    <div className={cn("flex w-full items-center gap-3", disabled && "opacity-50", className)} {...props}>
      <div
        ref={trackRef}
        onPointerDown={handleTrackDown}
        onPointerMove={handleMove}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className={cn("relative h-1.5 flex-1 cursor-pointer rounded-full bg-muted", disabled && "cursor-not-allowed")}
      >
        {isRange ? (
          <div
            className="absolute inset-y-0 rounded-full bg-primary"
            style={{ left: `${startPercent}%`, width: `${endPercent - startPercent}%` }}
          />
        ) : (
          <div className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: `${endPercent}%` }} />
        )}
        {thumb(isRange ? startPercent : endPercent, isRange ? start : end, isRange ? "start" : "end", true)}
        {isRange && thumb(endPercent, end, "end", activeThumb === "end" || activeThumb === null)}
      </div>
      <span className="w-16 shrink-0 text-right font-mono text-sm text-muted-foreground">
        {isRange ? `${start} - ${end}` : value}
      </span>
    </div>
  )
}
