import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface ModalProps {
  open?: boolean
  title?: React.ReactNode
  onCancel?: () => void
  onOk?: () => void
  footer?: React.ReactNode | React.ReactNode[] | null
  okText?: React.ReactNode
  cancelText?: React.ReactNode
  width?: number | string
  centered?: boolean
  closable?: boolean
  maskClosable?: boolean
  confirmLoading?: boolean
  children?: React.ReactNode
  className?: string
}

export function Modal({
  open = false,
  title,
  onCancel,
  onOk,
  footer,
  okText = "确定",
  cancelText = "取消",
  width = 520,
  centered = false,
  closable = true,
  maskClosable = true,
  confirmLoading = false,
  children,
  className,
}: ModalProps) {
  React.useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel?.()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onCancel])

  if (!open) return null

  const defaultFooter = (
    <div className="flex justify-end gap-2">
      <Button type="default" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button type="primary" loading={confirmLoading} onClick={onOk}>
        {okText}
      </Button>
    </div>
  )

  return createPortal(
    <div
      className={cn("fixed inset-0 z-[999] flex justify-center overflow-auto p-4", centered ? "items-center" : "items-start pt-16")}
    >
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
        onClick={() => maskClosable && onCancel?.()}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 flex w-full flex-col overflow-hidden rounded-lg bg-card shadow-card-lg",
          className,
        )}
        style={{ width: typeof width === "number" ? width : width, maxWidth: "calc(100vw - 2rem)" }}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="font-semibold">{title}</div>
          {closable && (
            <button
              type="button"
              onClick={onCancel}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="关闭"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <div className="flex-1 overflow-auto px-5 py-4 text-sm leading-6">{children}</div>
        {footer !== null && (
          <div className="flex items-center justify-end gap-2 border-t px-5 py-3.5">
            {Array.isArray(footer) ? footer : (footer ?? defaultFooter)}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
