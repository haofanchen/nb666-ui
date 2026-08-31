import * as React from "react"
import { cn } from "@/lib/utils"

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string | number
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, value, checked, defaultChecked = false, onChange, disabled, children, ...props }, ref) => {
    const isControlled = checked !== undefined
    const [innerChecked, setInnerChecked] = React.useState(defaultChecked)
    const actualChecked = isControlled ? checked : innerChecked

    return (
      <label className={cn("inline-flex cursor-pointer items-center gap-2", disabled && "cursor-not-allowed opacity-50", className)}>
        <span className="relative inline-flex size-4 shrink-0">
          <input
            ref={ref}
            type="radio"
            value={value}
            checked={actualChecked}
            disabled={disabled}
            onChange={(e) => {
              if (!isControlled) setInnerChecked(e.target.checked)
              onChange?.(e.target.checked)
            }}
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              "flex size-4 items-center justify-center rounded-full border bg-background transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring/40",
              actualChecked ? "border-primary" : "border-input hover:border-primary",
            )}
          >
            {actualChecked && <span className="size-2 rounded-full bg-primary" />}
          </span>
        </span>
        {children && <span className="text-sm">{children}</span>}
      </label>
    )
  },
)
Radio.displayName = "Radio"

export interface RadioOption {
  label: React.ReactNode
  value: string | number
  disabled?: boolean
}

export interface RadioGroupProps {
  options?: RadioOption[]
  value?: string | number
  defaultValue?: string | number
  onChange?: (value: string | number) => void
  disabled?: boolean
  direction?: "horizontal" | "vertical"
  optionType?: "default" | "button"
  className?: string
}

function RadioGroup({
  options = [],
  value: controlledValue,
  defaultValue,
  onChange,
  disabled,
  direction = "horizontal",
  optionType = "default",
  className,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string | number | undefined>(defaultValue)
  const value = controlledValue ?? internalValue

  function select(v: string | number) {
    setInternalValue(v)
    onChange?.(v)
  }

  return (
    <div className={cn("flex gap-2", direction === "vertical" && "flex-col", className)}>
      {options.map((opt) =>
        optionType === "button" ? (
          <button
            key={String(opt.value)}
            type="button"
            disabled={disabled || opt.disabled}
            onClick={() => select(opt.value)}
            className={cn(
              "h-8 rounded-md border px-3 text-sm transition-colors disabled:opacity-50",
              value === opt.value ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary hover:text-primary",
            )}
          >
            {opt.label}
          </button>
        ) : (
          <Radio
            key={String(opt.value)}
            value={opt.value}
            checked={value === opt.value}
            disabled={disabled || opt.disabled}
            onChange={() => select(opt.value)}
          >
            {opt.label}
          </Radio>
        ),
      )}
    </div>
  )
}

export { Radio, RadioGroup }
