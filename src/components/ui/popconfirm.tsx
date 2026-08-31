import * as React from "react"
import { TriangleAlert } from "lucide-react"
import { cn } from "../../lib/utils"
import { overlayPlacement } from "../../lib/styles"
import { useClickOutside } from "../../hooks/use-click-outside"
import { Button } from "./button"

export interface PopconfirmProps {
  title: React.ReactNode
  description?: React.ReactNode
  okText?: React.ReactNode
  cancelText?: React.ReactNode
  placement?: "top" | "bottom" | "left" | "right"
  onConfirm?: () => void
  onCancel?: () => void
  children: React.ReactElement
}

export function Popconfirm({
  title,
  description,
  okText = "确定",
  cancelText = "取消",
  placement = "top",
  onConfirm,
  onCancel,
  children,
}: PopconfirmProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false), open)

  return (
    <div ref={ref} className="relative inline-flex">
      {React.cloneElement(children, {
        onClick: (e: React.MouseEvent) => {
          ;(children.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e)
          setOpen((v) => !v)
        },
      } as React.Attributes)}
      {open && (
        <div className={cn("absolute z-50 w-64 rounded-lg border bg-popover p-4 shadow-card-lg", overlayPlacement[placement])}>
          <div className="flex items-start gap-2">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning" />
            <div>
              <div className="text-sm font-medium">{title}</div>
              {description != null && <div className="mt-1 text-sm leading-5 text-muted-foreground">{description}</div>}
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <Button size="small" type="default" onClick={() => {
              setOpen(false)
              onCancel?.()
            }}>
              {cancelText}
            </Button>
            <Button size="small" type="primary" danger onClick={() => {
              setOpen(false)
              onConfirm?.()
            }}>
              {okText}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
