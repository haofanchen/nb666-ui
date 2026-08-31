import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MenuItemType {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  children?: MenuItemType[]
}

export interface MenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  items: MenuItemType[]
  mode?: "inline" | "horizontal" | "vertical"
  selectedKeys?: string[]
  defaultSelectedKeys?: string[]
  defaultOpenKeys?: string[]
  onClick?: (info: { key: string }) => void
  theme?: "light" | "dark"
  inlineCollapsed?: boolean
}

export function Menu({
  items,
  mode = "inline",
  selectedKeys: controlledSelected,
  defaultSelectedKeys = [],
  defaultOpenKeys = [],
  onClick,
  theme = "light",
  inlineCollapsed = false,
  className,
  ...props
}: MenuProps) {
  const [internalSelected, setInternalSelected] = React.useState<string[]>(defaultSelectedKeys)
  const [openKeys, setOpenKeys] = React.useState<string[]>(defaultOpenKeys)
  const selectedKeys = controlledSelected ?? internalSelected

  function select(key: string, disabled?: boolean) {
    if (disabled) return
    setInternalSelected([key])
    onClick?.({ key })
  }

  function toggleOpen(key: string) {
    setOpenKeys((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  const isDark = theme === "dark"

  function renderItem(item: MenuItemType, depth: number): React.ReactNode {
    const hasChildren = item.children && item.children.length > 0
    const selected = selectedKeys.includes(item.key)
    const open = openKeys.includes(item.key)

    if (mode === "horizontal") {
      return (
        <div
          key={item.key}
          className="relative"
          onMouseEnter={() => hasChildren && setOpenKeys((prev) => [...new Set([...prev, item.key])])}
          onMouseLeave={() => hasChildren && setOpenKeys((prev) => prev.filter((k) => k !== item.key))}
        >
          <button
            type="button"
            disabled={item.disabled}
            onClick={() => (hasChildren ? toggleOpen(item.key) : select(item.key, item.disabled))}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors",
              selected ? "text-primary" : isDark ? "text-white/70 hover:text-white" : "text-foreground hover:text-primary",
              item.disabled && "opacity-40",
            )}
          >
            {item.icon}
            {item.label}
            {hasChildren && <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />}
          </button>
          {hasChildren && open && (
            <div
              className={cn(
                "absolute left-0 top-full z-50 min-w-40 rounded-md border p-1 shadow-card-lg",
                isDark ? "border-white/10 bg-[#1b1c2a]" : "border-border bg-popover",
              )}
            >
              {item.children!.map((child) => renderItem(child, depth + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <div key={item.key}>
        <div
          role="menuitem"
          tabIndex={0}
          onClick={() => (hasChildren ? toggleOpen(item.key) : select(item.key, item.disabled))}
          className={cn(
            "flex cursor-pointer select-none items-center gap-2 rounded-md text-sm transition-colors",
            mode === "inline" && inlineCollapsed ? "justify-center px-2 py-2" : "px-3 py-2",
            selected ? (isDark ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary") : isDark ? "text-white/70 hover:bg-white/5 hover:text-white" : "text-foreground hover:bg-accent hover:text-accent-foreground",
            item.disabled && "pointer-events-none opacity-40",
          )}
        >
          <span className={cn("shrink-0", inlineCollapsed && "size-5")}>{item.icon}</span>
          {(!inlineCollapsed || mode === "vertical") && <span className="flex-1 truncate">{item.label}</span>}
          {hasChildren && !inlineCollapsed && (
            <ChevronDown className={cn("size-3.5 text-muted-foreground transition-transform", open && "rotate-180")} />
          )}
        </div>
        {hasChildren && open && !inlineCollapsed && (
          <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-border pl-2">
            {item.children!.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        mode === "horizontal" ? "flex items-center" : "flex flex-col gap-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => renderItem(item, 0))}
    </div>
  )
}
