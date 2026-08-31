import * as React from "react"
import { cn } from "@/lib/utils"
import { overlayPlacement } from "@/lib/styles"
import { useClickOutside } from "@/hooks/use-click-outside"

export interface TooltipProps {
  title: React.ReactNode
  placement?: "top" | "bottom" | "left" | "right"
  trigger?: "hover" | "click"
  className?: string
  children: React.ReactElement
}

export function Tooltip({
  title,
  placement = "top",
  trigger = "hover",
  className,
  children,
}: TooltipProps) {
  const [visible, setVisible] = React.useState(false)
  const ref = React.useRef<HTMLSpanElement>(null)
  useClickOutside(ref, () => setVisible(false), trigger === "click" && visible)

  const childProps =
    trigger === "click"
      ? {
          onClick: (e: React.MouseEvent) => {
            ;(children.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e)
            setVisible((v) => !v)
          },
        }
      : {
          onMouseEnter: (e: React.MouseEvent) => {
            ;(children.props as { onMouseEnter?: (e: React.MouseEvent) => void }).onMouseEnter?.(e)
            setVisible(true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            ;(children.props as { onMouseLeave?: (e: React.MouseEvent) => void }).onMouseLeave?.(e)
            setVisible(false)
          },
        }

  return (
    <span ref={ref} className="relative inline-flex">
      {React.cloneElement(children, childProps as React.Attributes)}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 max-w-60 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-card-lg",
            overlayPlacement[placement],
            className,
          )}
        >
          {title}
        </div>
      )}
    </span>
  )
}
