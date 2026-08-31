import * as React from "react"
import { createPortal } from "react-dom"
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from "lucide-react"
import { createToastStore, type ToastItem } from "@/lib/toast-store"
import { Button } from "./button"

type ModalMethodType = "confirm" | "info" | "success" | "warning" | "error"

export interface ModalMethodOptions {
  title?: React.ReactNode
  content?: React.ReactNode
  okText?: React.ReactNode
  cancelText?: React.ReactNode
  okButtonProps?: { danger?: boolean; loading?: boolean }
  onOk?: () => void | Promise<void>
  onCancel?: () => void
  closable?: boolean
}

interface ModalMethodItem extends ToastItem {
  type: ModalMethodType
  options: ModalMethodOptions
}

const store = createToastStore<ModalMethodItem>()

function open(type: ModalMethodType, options: ModalMethodOptions) {
  return store.add({ type, options })
}

function show(options: ModalMethodOptions) {
  return open("confirm", options)
}

export const modal = {
  confirm: show,
  info: (options: ModalMethodOptions) => open("info", options),
  success: (options: ModalMethodOptions) => open("success", options),
  warning: (options: ModalMethodOptions) => open("warning", options),
  error: (options: ModalMethodOptions) => open("error", options),
  destroy: (id?: number) => {
    if (id == null) store.clear()
    else store.remove(id)
  },
  destroyAll: () => store.clear(),
}

const iconMap: Record<ModalMethodType, React.ReactNode> = {
  confirm: <TriangleAlert className="size-5 text-warning" />,
  info: <Info className="size-5 text-info" />,
  success: <CheckCircle2 className="size-5 text-success" />,
  warning: <TriangleAlert className="size-5 text-warning" />,
  error: <AlertCircle className="size-5 text-error" />,
}

function ModalMethodDialog({
  item,
  onClose,
}: {
  item: ModalMethodItem
  onClose: (id: number) => void
}) {
  const [loading, setLoading] = React.useState(false)
  const { type, options } = item
  const isConfirm = type === "confirm"

  async function handleOk() {
    try {
      setLoading(true)
      await options.onOk?.()
      onClose(item.id)
    } finally {
      setLoading(false)
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-start justify-center overflow-auto p-4 pt-20">
      <div className="fixed inset-0 bg-black/45" onClick={() => { if (options.closable === false) return; options.onCancel?.(); onClose(item.id) }} />
      <div className="relative z-10 flex w-full max-w-md items-start gap-3 rounded-lg border bg-card p-5 shadow-card-lg">
        <span className="mt-0.5 shrink-0">{iconMap[type]}</span>
        <div className="min-w-0 flex-1">
          {options.title != null && <div className="font-semibold">{options.title}</div>}
          {options.content != null && <div className="mt-1.5 text-sm leading-6 text-muted-foreground">{options.content}</div>}
          <div className="mt-4 flex justify-end gap-2">
            {isConfirm && (
              <Button type="default" onClick={() => { options.onCancel?.(); onClose(item.id) }}>
                {options.cancelText ?? "取消"}
              </Button>
            )}
            <Button
              type="primary"
              danger={options.okButtonProps?.danger}
              loading={loading || options.okButtonProps?.loading}
              onClick={handleOk}
            >
              {options.okText ?? "确定"}
            </Button>
          </div>
        </div>
        {options.closable !== false && (
          <button
            type="button"
            onClick={() => onClose(item.id)}
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="关闭"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>,
    document.body,
  )
}

export function ModalHolder() {
  const current = React.useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot)

  return (
    <>
      {current.map((item) => (
        <ModalMethodDialog key={item.id} item={item} onClose={(id) => store.remove(id)} />
      ))}
    </>
  )
}
