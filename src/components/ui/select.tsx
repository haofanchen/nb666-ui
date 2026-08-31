import * as React from "react"
import { Check, ChevronDown, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { controlHeight, popupPanelClass } from "@/lib/styles"
import { useClickOutside } from "@/hooks/use-click-outside"

export interface SelectOption {
  label: React.ReactNode
  value: string | number
  disabled?: boolean
}

export type SelectValue = string | number | (string | number)[] | null

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value" | "defaultValue"> {
  options?: SelectOption[]
  value?: SelectValue
  defaultValue?: SelectValue
  placeholder?: string
  size?: "small" | "middle" | "large"
  disabled?: boolean
  allowClear?: boolean
  showSearch?: boolean
  multiple?: boolean
  status?: "error" | "warning"
  onChange?: (value: SelectValue, option?: SelectOption) => void
}

export function Select({
  options = [],
  value: controlledValue,
  defaultValue = null,
  placeholder = "请选择",
  size = "middle",
  disabled = false,
  allowClear = false,
  showSearch = false,
  multiple = false,
  status,
  onChange,
  className,
  ...props
}: SelectProps) {
  const [internalValue, setInternalValue] = React.useState<SelectValue>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const rootRef = React.useRef<HTMLDivElement>(null)

  const value = controlledValue !== undefined ? controlledValue : internalValue
  const selectedOptions = multiple
    ? options.filter((o) => Array.isArray(value) && value.includes(o.value))
    : options.filter((o) => o.value === value)
  const filtered =
    showSearch && search
      ? options.filter((o) => String(o.label).toLowerCase().includes(search.toLowerCase()))
      : options

  useClickOutside(rootRef, () => setOpen(false), open)

  function select(opt: SelectOption) {
    if (opt.disabled) return

    if (multiple) {
      const currentList = Array.isArray(value) ? value : []
      const next = currentList.includes(opt.value)
        ? currentList.filter((v) => v !== opt.value)
        : [...currentList, opt.value]
      setInternalValue(next)
      onChange?.(next, opt)
      setSearch("")
      return
    }

    setInternalValue(opt.value)
    onChange?.(opt.value, opt)
    setOpen(false)
    setSearch("")
  }

  function clear() {
    const next = multiple ? [] : null
    setInternalValue(next)
    onChange?.(next)
  }

  function removeValue(optValue: string | number) {
    const currentList = Array.isArray(value) ? value : []
    const next = currentList.filter((v) => v !== optValue)
    setInternalValue(next)
    onChange?.(next)
  }

  const height = controlHeight[size]
  const triggerHeight = multiple
    ? size === "small"
      ? "min-h-7 py-0.5"
      : size === "large"
        ? "min-h-11 py-1"
        : "min-h-9 py-1"
    : height

  return (
    <div
      ref={rootRef}
      className={cn("relative inline-block w-full min-w-40", className)}
      {...props}
    >
      <div
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-disabled={disabled}
        onClick={() => {
          if (disabled) return
          setOpen((o) => !o)
        }}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
            e.preventDefault()
            setOpen(true)
          } else if (e.key === "Escape") {
            setOpen(false)
          }
        }}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border bg-background px-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
          triggerHeight,
          open && "border-primary ring-2 ring-ring/30",
          status === "error" && "border-error",
          status === "warning" && "border-warning",
        )}
      >
        {multiple ? (
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
            {selectedOptions.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              selectedOptions.map((opt) => (
                <span
                  key={String(opt.value)}
                  className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs"
                >
                  <span className="truncate">{opt.label}</span>
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={(e) => {
                      e.stopPropagation()
                      removeValue(opt.value)
                    }}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="移除"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))
            )}
          </span>
        ) : (
          <span className={cn("flex-1 truncate text-left", selectedOptions.length === 0 && "text-muted-foreground")}>
            {selectedOptions[0] ? selectedOptions[0].label : placeholder}
          </span>
        )}

        <span className="flex shrink-0 items-center gap-1 text-muted-foreground">
          {allowClear && selectedOptions.length > 0 && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation()
                clear()
              }}
              className="transition-colors hover:text-foreground"
              aria-label="清空"
            >
              <X className="size-3.5" />
            </button>
          )}
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
        </span>
      </div>

      {open && (
        <div className={cn(popupPanelClass, "w-full")}>
          {showSearch && (
            <div className="flex items-center gap-2 border-b px-2 py-1.5">
              <Search className="size-3.5 text-muted-foreground" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          )}
          <ul role="listbox" className="max-h-60 overflow-auto scrollbar-thin">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-center text-sm text-muted-foreground">无匹配结果</li>
            ) : (
              filtered.map((opt) => {
                const isSelected = multiple
                  ? Array.isArray(value) && value.includes(opt.value)
                  : opt.value === value
                return (
                  <li key={String(opt.value)} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      disabled={opt.disabled}
                      onClick={() => select(opt)}
                      className={cn(
                        "flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm transition-colors disabled:opacity-40",
                        isSelected ? "bg-primary/10 text-primary" : "hover:bg-accent",
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && <Check className="size-4 shrink-0" />}
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
