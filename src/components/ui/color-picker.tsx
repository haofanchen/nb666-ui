import * as React from "react"
import { cn } from "@/lib/utils"
import { useControllableState } from "@/hooks/use-controllable"

export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string
  defaultValue?: string
  disabled?: boolean
  showText?: boolean
  onChange?: (value: string) => void
}

export function ColorPicker({
  value,
  defaultValue = "#6c5ce7",
  disabled = false,
  showText = true,
  onChange,
  className,
  ...props
}: ColorPickerProps) {
  const [current, setCurrent] = useControllableState(value, defaultValue)

  return (
    <div className={cn("inline-flex items-center gap-2", disabled && "opacity-50", className)} {...props}>
      <label className="relative inline-flex size-8 cursor-pointer overflow-hidden rounded-md border">
        <input
          type="color"
          value={current}
          disabled={disabled}
          onChange={(e) => {
            setCurrent(e.target.value)
            onChange?.(e.target.value)
          }}
          className="absolute -inset-2 size-14 cursor-pointer border-0 bg-transparent p-0"
        />
      </label>
      {showText && <span className="font-mono text-sm">{current}</span>}
    </div>
  )
}
