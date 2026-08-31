import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  checked?: boolean
  defaultChecked?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, defaultChecked = false, indeterminate = false, onChange, disabled, children, ...props }, ref) => {
    const innerRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => innerRef.current!)

    const isControlled = checked !== undefined
    const [innerChecked, setInnerChecked] = React.useState(defaultChecked)
    const actualChecked = isControlled ? checked : innerChecked

    React.useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate
    }, [indeterminate])

    return (
      <label className={cn("inline-flex cursor-pointer items-center gap-2", disabled && "cursor-not-allowed opacity-50", className)}>
        <span className="relative inline-flex size-4 shrink-0">
          <input
            ref={innerRef}
            type="checkbox"
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
              "flex size-4 items-center justify-center rounded border bg-background transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring/40",
              actualChecked || indeterminate ? "border-primary bg-primary text-primary-foreground" : "border-input hover:border-primary",
            )}
          >
            {indeterminate ? <span className="h-0.5 w-2 rounded-sm bg-current" /> : actualChecked ? <Check className="size-3" /> : null}
          </span>
        </span>
        {children && <span className="text-sm">{children}</span>}
      </label>
    )
  },
)
Checkbox.displayName = "Checkbox"

export interface CheckboxOption {
  label: React.ReactNode
  value: string | number
  disabled?: boolean
}

export interface CheckboxGroupProps {
  options?: CheckboxOption[]
  value?: (string | number)[]
  defaultValue?: (string | number)[]
  onChange?: (values: (string | number)[]) => void
  disabled?: boolean
  className?: string
}

function CheckboxGroup({
  options = [],
  value: controlledValue,
  defaultValue = [],
  onChange,
  disabled,
  className,
}: CheckboxGroupProps) {
  const [internalValue, setInternalValue] = React.useState<(string | number)[]>(defaultValue)
  const values = controlledValue ?? internalValue

  function toggle(v: string | number) {
    const next = values.includes(v) ? values.filter((x) => x !== v) : [...values, v]
    setInternalValue(next)
    onChange?.(next)
  }

  return (
    <div className={cn("flex flex-wrap gap-x-4 gap-y-2", className)}>
      {options.map((opt) => (
        <Checkbox
          key={String(opt.value)}
          checked={values.includes(opt.value)}
          disabled={disabled || opt.disabled}
          onChange={() => toggle(opt.value)}
        >
          {opt.label}
        </Checkbox>
      ))}
    </div>
  )
}

export { Checkbox, CheckboxGroup }
