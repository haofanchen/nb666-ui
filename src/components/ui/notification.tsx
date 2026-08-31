import * as React from "react"
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from "lucide-react"
import { createToastStore, type ToastItem } from "../../lib/toast-store"

type NotificationType = "success" | "info" | "warning" | "error"

interface NotificationItem extends ToastItem {
  type: NotificationType
  message: React.ReactNode
  description?: React.ReactNode
  duration: number
}

const store = createToastStore<NotificationItem>()

function add(
  type: NotificationType,
  message: React.ReactNode,
  description?: React.ReactNode,
  duration = 4.5,
) {
  const id = store.add({ type, message, description, duration })
  if (duration > 0) setTimeout(() => store.remove(id), duration * 1000)
  return id
}

export const notification = {
  success: (message: React.ReactNode, description?: React.ReactNode, duration = 4.5) =>
    add("success", message, description, duration),
  info: (message: React.ReactNode, description?: React.ReactNode, duration = 4.5) =>
    add("info", message, description, duration),
  warning: (message: React.ReactNode, description?: React.ReactNode, duration = 4.5) =>
    add("warning", message, description, duration),
  error: (message: React.ReactNode, description?: React.ReactNode, duration = 4.5) =>
    add("error", message, description, duration),
  destroy: () => store.clear(),
}

const iconMap: Record<NotificationType, React.ReactNode> = {
  success: <CheckCircle2 className="size-5 text-success" />,
  info: <Info className="size-5 text-info" />,
  warning: <TriangleAlert className="size-5 text-warning" />,
  error: <AlertCircle className="size-5 text-error" />,
}

export function NotificationHolder() {
  const current = React.useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot)

  return (
    <div className="pointer-events-none fixed right-4 top-6 z-[1000] flex w-80 flex-col gap-2">
      {current.map((n) => (
        <div key={n.id} className="pointer-events-auto flex items-start gap-3 rounded-lg border bg-popover p-4 shadow-card-lg">
          <span className="mt-0.5 shrink-0">{iconMap[n.type]}</span>
          <div className="flex-1">
            <div className="font-medium">{n.message}</div>
            {n.description != null && <div className="mt-1 text-sm leading-6 text-muted-foreground">{n.description}</div>}
          </div>
          <button type="button" onClick={() => store.remove(n.id)} className="shrink-0 text-muted-foreground transition-colors hover:text-foreground" aria-label="关闭">
            <X className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}
