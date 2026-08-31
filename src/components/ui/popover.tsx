import * as React from "react"
import { cn } from "@/lib/utils"
import { overlayPlacement } from "@/lib/styles"
import { useClickOutside } from "@/hooks/use-click-outside"

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

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={trigger === "hover" ? () => setOpen(true) : undefined}
      onMouseLeave={trigger === "hover" ? () => setOpen(false) : undefined}
    >
      {React.cloneElement(children, childProps as React.Attributes)}
      {open && (
        <div
          className={cn(
            "absolute z-50 w-64 rounded-lg border bg-popover p-4 text-sm shadow-card-lg",
            overlayPlacement[placement],
            className,
          )}
        >
          {title != null && <div className="mb-2 font-medium">{title}</div>}
          <div className="text-muted-foreground">{content}</div>
        </div>
      )}
    </div>
  )
}
