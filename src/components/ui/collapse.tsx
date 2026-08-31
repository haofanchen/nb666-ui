import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CollapseItem {
  key: string
  label: React.ReactNode
  children: React.ReactNode
  disabled?: boolean
  extra?: React.ReactNode
}

export interface CollapseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: CollapseItem[]
  accordion?: boolean
  defaultActiveKey?: string | string[]
  activeKey?: string | string[]
  onChange?: (keys: string[]) => void
  bordered?: boolean
  expandIconPosition?: "start" | "end"
}

export function Collapse({
  items,
  accordion = false,
  defaultActiveKey = [],
  activeKey: controlledKey,
  onChange,
  bordered = true,
  expandIconPosition = "start",
  className,
  ...props
}: CollapseProps) {
  const normalize = (k: string | string[]) => (Array.isArray(k) ? k : [k])
  const [internalKeys, setInternalKeys] = React.useState<string[]>(normalize(defaultActiveKey))
  const keys = controlledKey !== undefined ? normalize(controlledKey) : internalKeys

  function toggle(key: string, disabled?: boolean) {
    if (disabled) return
    let next: string[]
    if (accordion) {
      next = keys.includes(key) ? [] : [key]
    } else {
      next = keys.includes(key) ? keys.filter((k) => k !== key) : [...keys, key]
    }
    setInternalKeys(next)
    onChange?.(next)
  }

  return (
    <div className={cn("divide-y overflow-hidden rounded-lg", bordered && "border", className)} {...props}>
      {items.map((item) => {
        const open = keys.includes(item.key)
        return (
          <div key={item.key} className="bg-card">
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => toggle(item.key, item.disabled)}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-accent/50 disabled:pointer-events-none disabled:opacity-50",
              )}
            >
              {expandIconPosition === "start" && <ChevronRight className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-90")} />}
              <span className="flex-1">{item.label}</span>
              {item.extra && <span className="text-muted-foreground">{item.extra}</span>}
              {expandIconPosition === "end" && <ChevronRight className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-90")} />}
            </button>
            {open && <div className="px-4 pb-4 text-sm leading-6 text-foreground/80">{item.children}</div>}
          </div>
        )
      })}
    </div>
  )
}
