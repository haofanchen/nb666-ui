import * as React from "react"
import { AlertCircle, CheckCircle2, Info, Loader2, TriangleAlert, X } from "lucide-react"
import { createToastStore, type ToastItem } from "@/lib/toast-store"

type MessageType = "success" | "info" | "warning" | "error" | "loading"

interface MessageItem extends ToastItem {
  type: MessageType
  content: React.ReactNode
  duration: number
}

const store = createToastStore<MessageItem>()

function add(type: MessageType, content: React.ReactNode, duration: number) {
  const id = store.add({ type, content, duration })
  if (duration > 0) setTimeout(() => store.remove(id), duration * 1000)
  return id
}

export const message = {
  success: (content: React.ReactNode, duration = 3) => add("success", content, duration),
  info: (content: React.ReactNode, duration = 3) => add("info", content, duration),
  warning: (content: React.ReactNode, duration = 3) => add("warning", content, duration),
  error: (content: React.ReactNode, duration = 3) => add("error", content, duration),
  loading: (content: React.ReactNode, duration = 0) => add("loading", content, duration),
  destroy: () => store.clear(),
}

const iconMap: Record<MessageType, React.ReactNode> = {
  success: <CheckCircle2 className="size-4 text-success" />,
  info: <Info className="size-4 text-info" />,
  warning: <TriangleAlert className="size-4 text-warning" />,
  error: <AlertCircle className="size-4 text-error" />,
  loading: <Loader2 className="size-4 animate-spin text-primary" />,
}

export function MessageHolder() {
  const current = React.useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot)

  return (
    <div className="pointer-events-none fixed left-1/2 top-6 z-[1000] flex -translate-x-1/2 flex-col items-center gap-2">
      {current.map((m) => (
        <div
          key={m.id}
          className="pointer-events-auto flex items-center gap-2 rounded-lg border bg-popover px-4 py-2.5 text-sm shadow-card-lg"
        >
          {iconMap[m.type]}
          <span>{m.content}</span>
          <button
            type="button"
            onClick={() => store.remove(m.id)}
            className="ml-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="关闭"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}
