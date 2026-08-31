import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"

export interface InfiniteScrollProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  hasMore?: boolean
  loading?: boolean
  onLoadMore?: () => void
  height?: number | string
  threshold?: number
  loader?: React.ReactNode
  endMessage?: React.ReactNode
  children: React.ReactNode
}

export function InfiniteScroll({
  hasMore = false,
  loading = false,
  onLoadMore,
  height = 320,
  threshold = 40,
  loader,
  endMessage,
  className,
  children,
  ...props
}: InfiniteScrollProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  function handleScroll() {
    const el = containerRef.current
    if (!el || !hasMore || loading || !onLoadMore) return
    if (el.scrollHeight - el.scrollTop - el.clientHeight <= threshold) {
      onLoadMore()
    }
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={cn("overflow-y-auto", className)}
      style={{ height }}
      {...props}
    >
      {children}
      {loading && (
        <div className="flex justify-center py-3 text-primary">
          {loader ?? <Loader2 className="size-5 animate-spin" />}
        </div>
      )}
      {!hasMore && endMessage != null && (
        <div className="py-3 text-center text-sm text-muted-foreground">{endMessage}</div>
      )}
    </div>
  )
}
