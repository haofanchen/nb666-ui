import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"
import { useClickOutside } from "../../hooks/use-click-outside"

export interface DropdownMenuItem {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  danger?: boolean
  children?: DropdownMenuItem[]
}

export interface DropdownProps {
  menu: DropdownMenuItem[]
  trigger?: "hover" | "click"
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end"
  disabled?: boolean
  children: React.ReactElement
  onSelect?: (info: { key: string }) => void
}

interface DropdownMenuItemViewProps {
  item: DropdownMenuItem
  onSelect?: (info: { key: string }) => void
  closeAll: () => void
}

function DropdownMenuItemView({ item, onSelect, closeAll }: DropdownMenuItemViewProps) {
  const [subOpen, setSubOpen] = React.useState(false)
  const hasChildren = !!item.children && item.children.length > 0

  const itemClass = cn(
    "flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm transition-colors",
    item.disabled
      ? "cursor-not-allowed opacity-40"
      : item.danger
        ? "text-error hover:bg-error/10"
        : "hover:bg-accent",
  )

  if (hasChildren) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setSubOpen(true)}
        onMouseLeave={() => setSubOpen(false)}
      >
        <button type="button" disabled={item.disabled} onClick={() => setSubOpen((v) => !v)} className={itemClass}>
          {item.icon}
          <span className="flex-1">{item.label}</span>
          <ChevronRight className="size-3.5 text-muted-foreground" />
        </button>
        {subOpen && (
          <div className="absolute left-full top-0 z-50 ml-1 min-w-40 rounded-md border bg-popover p-1 shadow-card-lg">
            {item.children!.map((child) => (
              <DropdownMenuItemView key={child.key} item={child} onSelect={onSelect} closeAll={closeAll} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      type="button"
      disabled={item.disabled}
      onClick={() => {
        closeAll()
        if (!item.disabled) onSelect?.({ key: item.key })
      }}
      className={itemClass}
    >
      {item.icon}
      {item.label}
    </button>
  )
}

export function Dropdown({
  menu,
  trigger = "click",
  placement = "bottom-start",
  disabled = false,
  children,
  onSelect,
}: DropdownProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false), open)

  const childProps =
    trigger === "click"
      ? {
          onClick: (e: React.MouseEvent) => {
            ;(children.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e)
            if (!disabled) setOpen((v) => !v)
          },
        }
      : undefined

  const placementClass =
    placement === "bottom-end"
      ? "left-auto right-0 top-full mt-1"
      : placement === "top-start"
        ? "bottom-full left-0 mb-1"
        : placement === "top-end"
          ? "bottom-full left-auto right-0 mb-1"
          : "left-0 top-full mt-1"

  return (
    <div
      ref={ref}
      className="relative inline-block"
      onMouseEnter={trigger === "hover" ? () => !disabled && setOpen(true) : undefined}
      onMouseLeave={trigger === "hover" ? () => setOpen(false) : undefined}
    >
      {React.cloneElement(children, childProps as React.Attributes)}
      {open && (
        <div className={cn("absolute z-50 min-w-40 rounded-md border bg-popover p-1 shadow-card-lg", placementClass)}>
          {menu.map((item) => (
            <DropdownMenuItemView key={item.key} item={item} onSelect={onSelect} closeAll={() => setOpen(false)} />
          ))}
        </div>
      )}
    </div>
  )
}
