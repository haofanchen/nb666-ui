import * as React from "react"
import { Check, ChevronDown, ChevronRight, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { controlHeight } from "../../lib/styles"
import { useClickOutside } from "../../hooks/use-click-outside"

export interface CascaderOption {
  label: React.ReactNode
  value: string | number
  disabled?: boolean
  children?: CascaderOption[]
}

export interface CascaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value" | "defaultValue"> {
  options: CascaderOption[]
  value?: (string | number)[]
  defaultValue?: (string | number)[]
  placeholder?: string
  size?: "small" | "middle" | "large"
  disabled?: boolean
  allowClear?: boolean
  status?: "error" | "warning"
  expandTrigger?: "click" | "hover"
  onChange?: (value: (string | number)[], selectedOptions: CascaderOption[]) => void
}

function findPath(options: CascaderOption[], values: (string | number)[]): CascaderOption[] {
  const path: CascaderOption[] = []
  let level = options
  for (const value of values) {
    const matched = level.find((opt) => opt.value === value)
    if (!matched) break
    path.push(matched)
    level = matched.children ?? []
  }
  return path
}

export function Cascader({
  options,
  value: controlledValue,
  defaultValue,
  placeholder = "请选择",
  size = "middle",
  disabled = false,
  allowClear = true,
  status,
  expandTrigger = "click",
  onChange,
  className,
  ...props
}: CascaderProps) {
  const [internalValue, setInternalValue] = React.useState<(string | number)[]>(defaultValue ?? [])
  const [open, setOpen] = React.useState(false)
  const [activePath, setActivePath] = React.useState<CascaderOption[]>([])
  const rootRef = React.useRef<HTMLDivElement>(null)
  useClickOutside(rootRef, () => setOpen(false), open)

  const value = controlledValue ?? internalValue
  const selectedPath = React.useMemo(() => findPath(options, value), [options, value])
  const height = controlHeight[size]

  function openPanel() {
    setActivePath(selectedPath.slice(0, -1))
    setOpen(true)
  }

  function commit(next: (string | number)[], path: CascaderOption[]) {
    setInternalValue(next)
    onChange?.(next, path)
  }

  function activate(colIndex: number, option: CascaderOption) {
    const nextPath = [...activePath.slice(0, colIndex), option]
    setActivePath(nextPath)

    if (!option.children || option.children.length === 0) {
      commit(nextPath.map((o) => o.value), nextPath)
      setOpen(false)
    }
  }

  const columns: CascaderOption[][] = []
  let level = options
  columns.push(level)
  for (let i = 0; i < activePath.length; i++) {
    level = activePath[i].children ?? []
    columns.push(level)
  }

  return (
    <div ref={rootRef} className={cn("relative inline-block w-full min-w-44", className)} {...props}>
      <div
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-disabled={disabled}
        onClick={() => {
          if (disabled) return
          open ? setOpen(false) : openPanel()
        }}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
            e.preventDefault()
            openPanel()
          } else if (e.key === "Escape") {
            setOpen(false)
          }
        }}
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 rounded-md border bg-background px-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
          height,
          open && "border-primary ring-2 ring-ring/30",
          status === "error" && "border-error",
          status === "warning" && "border-warning",
        )}
      >
        <span className={cn("flex-1 truncate text-left", selectedPath.length === 0 && "text-muted-foreground")}>
          {selectedPath.length > 0 ? selectedPath.map((opt) => opt.label).join(" / ") : placeholder}
        </span>
        {allowClear && selectedPath.length > 0 && !disabled && (
          <button
            type="button"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation()
              setInternalValue([])
              onChange?.([], [])
            }}
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="清空"
          >
            <X className="size-3.5" />
          </button>
        )}
        <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </div>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 flex overflow-hidden rounded-lg border bg-popover p-1 shadow-card-lg">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="min-w-36 border-r last:border-r-0">
              {column.length === 0 ? (
                <div className="px-3 py-6 text-sm text-muted-foreground">无数据</div>
              ) : (
                column.map((option) => {
                  const isActive = activePath[colIndex]?.value === option.value
                  const isLeaf = !option.children || option.children.length === 0
                  return (
                    <button
                      key={String(option.value)}
                      type="button"
                      disabled={option.disabled}
                      onClick={() => activate(colIndex, option)}
                      onMouseEnter={expandTrigger === "hover" && !option.disabled ? () => {
                        const nextPath = [...activePath.slice(0, colIndex), option]
                        setActivePath(nextPath)
                      } : undefined}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded px-3 py-2 text-left text-sm transition-colors disabled:opacity-40",
                        isActive ? "bg-primary/10 text-primary" : "hover:bg-accent",
                      )}
                    >
                      <span className="truncate">{option.label}</span>
                      {!isLeaf ? <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" /> : isActive ? <Check className="size-3.5 shrink-0" /> : null}
                    </button>
                  )
                })
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
