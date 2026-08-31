import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DrawerProps {
  open?: boolean
  title?: React.ReactNode
  placement?: "left" | "right" | "top" | "bottom"
  width?: number | string
  height?: number | string
  onClose?: () => void
  closable?: boolean
  maskClosable?: boolean
  footer?: React.ReactNode | null
  children?: React.ReactNode
  className?: string
}

export function Drawer({
  open = false,
  title,
  placement = "right",
  width = 378,
  height = 378,
  onClose,
  closable = true,
  maskClosable = true,
  footer,
  children,
  className,
}: DrawerProps) {
  React.useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose?.()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  const horizontal = placement === "left" || placement === "right"
  const sizeStyle = horizontal ? { width } : { height }
  const positionClass =
    placement === "left"
      ? "left-0 top-0 h-full"
      : placement === "right"
        ? "right-0 top-0 h-full"
        : placement === "top"
          ? "left-0 top-0 w-full"
          : "left-0 bottom-0 w-full"

  return createPortal(
    <div className="fixed inset-0 z-[999]">
      <div className="absolute inset-0 bg-black/45" onClick={() => maskClosable && onClose?.()} />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute flex flex-col bg-card shadow-card-lg",
          horizontal ? "h-full max-w-[calc(100vw-3rem)]" : "w-full max-h-[calc(100vh-3rem)]",
          placement === "right" && "animate-in slide-in-from-right",
          placement === "left" && "animate-in slide-in-from-left",
          placement === "top" && "animate-in slide-in-from-top",
          placement === "bottom" && "animate-in slide-in-from-bottom",
          positionClass,
          className,
        )}
        style={sizeStyle}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="font-semibold">{title}</div>
          {closable && (
            <button type="button" onClick={onClose} className="text-muted-foreground transition-colors hover:text-foreground" aria-label="关闭">
              <X className="size-4" />
            </button>
          )}
        </div>
        <div className="flex-1 overflow-auto px-5 py-4 text-sm leading-6">{children}</div>
        {footer !== undefined && footer !== null && <div className="border-t px-5 py-3.5">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}
