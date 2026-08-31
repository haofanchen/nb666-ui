import * as React from "react"
import { cn } from "../../lib/utils"

export interface TabsItem {
  key: string
  label: React.ReactNode
  children?: React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
}

export type TabPosition = "top" | "bottom" | "left" | "right"

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: TabsItem[]
  activeKey?: string
  defaultActiveKey?: string
  onChange?: (key: string) => void
  type?: "line" | "card"
  size?: "small" | "middle" | "large"
  centered?: boolean
  tabPosition?: TabPosition
  extra?: React.ReactNode
}

export function Tabs({
  items,
  activeKey: controlledKey,
  defaultActiveKey,
  onChange,
  type = "line",
  size = "middle",
  centered = false,
  tabPosition = "top",
  extra,
  className,
  ...props
}: TabsProps) {
  const [internalKey, setInternalKey] = React.useState(defaultActiveKey ?? items[0]?.key ?? "")
  const activeKey = controlledKey ?? internalKey
  const active = items.find((item) => item.key === activeKey)
  const vertical = tabPosition === "left" || tabPosition === "right"

  function handleClick(key: string, disabled?: boolean) {
    if (disabled) return
    setInternalKey(key)
    onChange?.(key)
  }

  const sizeClass = size === "small" ? "h-8 px-3 text-xs" : size === "large" ? "h-11 px-5 text-base" : "h-10 px-4 text-sm"

  const lineBorder = {
    top: "border-b border-border",
    bottom: "border-t border-border",
    left: "border-r border-border",
    right: "border-l border-border",
  }[tabPosition]

  const indicator = {
    top: "absolute inset-x-0 h-0.5 -bottom-px",
    bottom: "absolute inset-x-0 h-0.5 -top-px",
    left: "absolute inset-y-0 w-0.5 -right-px",
    right: "absolute inset-y-0 w-0.5 -left-px",
  }[tabPosition]

  const cardActive = {
    top: "rounded-t-md",
    bottom: "rounded-b-md",
    left: "rounded-l-md",
    right: "rounded-r-md",
  }[tabPosition]

  const tabList = (
    <div
      role="tablist"
      className={cn(
        vertical ? "flex flex-col items-stretch gap-1" : "flex items-center gap-1",
        type === "line" && lineBorder,
        !vertical && centered && "justify-center",
      )}
    >
      {items.map((item) => {
        const isActive = item.key === activeKey
        return (
          <button
            key={item.key}
            role="tab"
            aria-selected={isActive}
            disabled={item.disabled}
            onClick={() => handleClick(item.key, item.disabled)}
            className={cn(
              "relative inline-flex shrink-0 items-center gap-1.5 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
              vertical ? "justify-start" : "justify-center",
              sizeClass,
              type === "line" &&
                (isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"),
              type === "card" &&
                cn(
                  "border",
                  isActive ? cn("border-border bg-background text-primary", cardActive) : "border-transparent text-muted-foreground hover:text-foreground",
                ),
            )}
          >
            {item.icon}
            {item.label}
            {type === "line" && isActive && <span className={cn("rounded-full bg-primary", indicator)} />}
          </button>
        )
      })}
      {extra && <span className={cn("flex items-center", vertical ? "mt-2" : "ml-auto")}>{extra}</span>}
    </div>
  )

  const content = <div className={cn(type === "line" && !vertical && tabPosition === "top" && "pt-4", type === "line" && !vertical && tabPosition === "bottom" && "pb-4")}>{active?.children}</div>

  if (vertical) {
    return (
      <div className={cn("flex", tabPosition === "right" && "flex-row-reverse", className)} {...props}>
        <div className={cn("shrink-0", tabPosition === "left" ? "pr-4" : "pl-4")}>{tabList}</div>
        <div className="min-w-0 flex-1">{content}</div>
      </div>
    )
  }

  return (
    <div className={className} {...props}>
      {tabPosition === "top" && tabList}
      {content}
      {tabPosition === "bottom" && tabList}
    </div>
  )
}
