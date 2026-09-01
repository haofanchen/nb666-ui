import * as React from "react"
import { cn } from "../../lib/utils"
import { useClickOutside } from "../../hooks/use-click-outside"

export interface PopoverProps {
  content: React.ReactNode
  title?: React.ReactNode
  placement?: "top" | "bottom" | "left" | "right"
  trigger?: "hover" | "click"
  className?: string
  children: React.ReactElement
}

export function Popover({
  content,
  title,
  placement = "top",
  trigger = "click",
  className,
  children,
}: PopoverProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false), open)

  const childProps =
    trigger === "click"
      ? {
          onClick: (e: React.MouseEvent) => {
            ;(children.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e)
            setOpen((v) => !v)
          },
        }
      : undefined

  const bridgePlacement = {
    top: "bottom-full left-1/2 pb-2 -translate-x-1/2",
    bottom: "top-full left-1/2 pt-2 -translate-x-1/2",
    left: "right-full top-1/2 pr-2 -translate-y-1/2",
    right: "left-full top-1/2 pl-2 -translate-y-1/2",
  } as const

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={trigger === "hover" ? () => setOpen(true) : undefined}
      onMouseLeave={trigger === "hover" ? () => setOpen(false) : undefined}
    >
      {React.cloneElement(children, childProps as React.Attributes)}
      {open && (
        <div className={cn("absolute z-50", bridgePlacement[placement])}>
          <div className={cn("w-64 rounded-lg border bg-popover p-4 text-sm shadow-card-lg", className)}>
            {title != null && <div className="mb-2 font-medium">{title}</div>}
            <div className="text-muted-foreground">{content}</div>
          </div>
        </div>
      )}
    </div>
  )
}
