import * as React from "react"
import { cn } from "@/lib/utils"
import { controlHeight } from "@/lib/styles"
import { useClickOutside } from "@/hooks/use-click-outside"

export interface AutoCompleteOption {
  label: React.ReactNode
  value: string | number
  disabled?: boolean
}

export interface AutoCompleteProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onSelect"> {
  options?: AutoCompleteOption[]
  size?: "small" | "middle" | "large"
  onSelect?: (value: string | number, option: AutoCompleteOption) => void
}

export function AutoComplete({
  options = [],
  size = "middle",
  onSelect,
  className,
  placeholder,
  disabled,
  value,
  defaultValue,
  onChange,
  ...props
}: AutoCompleteProps) {
  const [query, setQuery] = React.useState<string>(String(defaultValue ?? ""))
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false), open)

  const isControlled = value !== undefined
  const current = isControlled ? String(value ?? "") : query
  const filtered = current ? options.filter((o) => String(o.label).toLowerCase().includes(current.toLowerCase())) : options

  const height = controlHeight[size]

  return (
    <div ref={ref} className={cn("relative inline-block w-full", className)}>
      <input
        value={current}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => {
          if (!isControlled) setQuery(e.target.value)
          setOpen(true)
          onChange?.(e)
        }}
        onFocus={() => setOpen(true)}
        className={cn(
          "w-full rounded-md border bg-background px-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
          height,
        )}
        {...props}
      />
      {open && !disabled && filtered.length > 0 && (
        <ul className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-card-lg scrollbar-thin">
          {filtered.map((opt) => (
            <li key={String(opt.value)}>
              <button
                type="button"
                disabled={opt.disabled}
                onClick={() => {
                  if (!isControlled) setQuery(String(opt.label))
                  setOpen(false)
                  onSelect?.(opt.value, opt)
                }}
                className={cn(
                  "w-full rounded px-3 py-2 text-left text-sm transition-colors disabled:opacity-40",
                  "hover:bg-accent",
                )}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
