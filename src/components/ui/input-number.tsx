import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { controlHeight } from "@/lib/styles"

export interface InputNumberProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "size" | "value"> {
  value?: number | null
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  size?: "small" | "middle" | "large"
  onChange?: (value: number | null) => void
  controls?: boolean
}

export function InputNumber({
  value: controlledValue,
  defaultValue,
  min = -Infinity,
  max = Infinity,
  step = 1,
  size = "middle",
  onChange,
  disabled,
  controls = true,
  className,
  onBlur,
  onKeyDown,
  ...props
}: InputNumberProps) {
  const [internalValue, setInternalValue] = React.useState<number | null>(defaultValue ?? null)
  const value = controlledValue !== undefined ? controlledValue : internalValue
  const [draft, setDraft] = React.useState(value != null ? String(value) : "")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const height = controlHeight[size]

  React.useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setDraft(value != null ? String(value) : "")
    }
  }, [value])

  function clamp(n: number) {
    return Math.min(Math.max(n, min), max)
  }

  function commit(next: number | null) {
    setInternalValue(next)
    onChange?.(next)
  }

  function commitFromInput(raw: string) {
    const trimmed = raw.trim()
    if (trimmed === "" || trimmed === "-") {
      setDraft("")
      commit(null)
      return
    }
    const num = Number(trimmed)
    if (Number.isNaN(num)) {
      setDraft(value != null ? String(value) : "")
      return
    }
    const next = clamp(num)
    setDraft(String(next))
    commit(next)
  }

  function stepValue(delta: number) {
    const next = clamp((value ?? 0) + delta)
    setDraft(String(next))
    commit(next)
  }

  return (
    <span className={cn("inline-flex items-center overflow-hidden rounded-md border bg-background transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30", height, disabled && "opacity-50", className)}>
      {controls && (
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled}
          onClick={() => stepValue(-step)}
          className="flex h-full items-center px-2 text-muted-foreground hover:bg-accent hover:text-primary disabled:pointer-events-none"
        >
          <Minus className="size-3.5" />
        </button>
      )}
      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        disabled={disabled}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={(e) => {
          commitFromInput(e.target.value)
          onBlur?.(e)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            commitFromInput((e.target as HTMLInputElement).value)
            inputRef.current?.blur()
          }
          if (e.key === "ArrowUp") {
            e.preventDefault()
            stepValue(step)
          }
          if (e.key === "ArrowDown") {
            e.preventDefault()
            stepValue(-step)
          }
          onKeyDown?.(e)
        }}
        className="w-14 bg-transparent text-center text-foreground outline-none disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        {...props}
      />
      {controls && (
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled}
          onClick={() => stepValue(step)}
          className="flex h-full items-center px-2 text-muted-foreground hover:bg-accent hover:text-primary disabled:pointer-events-none"
        >
          <Plus className="size-3.5" />
        </button>
      )}
    </span>
  )
}
