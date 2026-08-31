import * as React from "react"
import { cn } from "../../lib/utils"
import { useControllableState } from "../../hooks/use-controllable"

export interface SegmentedOption {
  label: React.ReactNode
  value: string | number
  disabled?: boolean
  icon?: React.ReactNode
}

export interface SegmentedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SegmentedOption[]
  value?: string | number
  defaultValue?: string | number
  size?: "small" | "middle" | "large"
  block?: boolean
  onChange?: (value: string | number) => void
}

export function Segmented({
  options,
  value,
  defaultValue,
  size = "middle",
  block = false,
  onChange,
  className,
  ...props
}: SegmentedProps) {
  const [current, setCurrent] = useControllableState(value, defaultValue)
  const height = size === "small" ? "h-7 text-xs" : size === "large" ? "h-10 text-base" : "h-9 text-sm"

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md bg-muted p-1",
        block && "flex w-full",
        className,
      )}
      {...props}
    >
      {options.map((opt) => {
        const active = current === opt.value
        return (
          <button
            key={String(opt.value)}
            type="button"
            disabled={opt.disabled}
            onClick={() => {
              if (opt.disabled) return
              setCurrent(opt.value)
              onChange?.(opt.value)
            }}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded px-3 font-medium transition-colors disabled:pointer-events-none disabled:opacity-40",
              height,
              block && "flex-1",
              active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opt.icon}
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
