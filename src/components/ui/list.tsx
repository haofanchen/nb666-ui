import * as React from "react"
import { cn } from "@/lib/utils"

export interface ListProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  dataSource: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  bordered?: boolean
  size?: "small" | "default" | "large"
  loading?: boolean
}

export function List<T>({
  dataSource,
  renderItem,
  header,
  footer,
  bordered = true,
  size = "default",
  loading = false,
  className,
  ...props
}: ListProps<T>) {
  const padding = size === "small" ? "px-3 py-2" : size === "large" ? "px-5 py-4" : "px-4 py-3"

  return (
    <div className={cn("overflow-hidden rounded-lg", bordered && "border", className)} {...props}>
      {header != null && <div className="border-b bg-muted/40 px-4 py-3 font-medium">{header}</div>}
      {loading ? (
        <div className="divide-y">
          {[0, 1, 2].map((i) => (
            <div key={i} className={cn("animate-pulse", padding)}>
              <div className="h-4 w-3/4 rounded bg-muted" />
            </div>
          ))}
        </div>
      ) : (
        <div className="divide-y">
          {dataSource.map((item, i) => (
            <div key={i} className={cn(padding)}>
              {renderItem(item, i)}
            </div>
          ))}
          {dataSource.length === 0 && <div className="py-12 text-center text-sm text-muted-foreground">暂无数据</div>}
        </div>
      )}
      {footer != null && <div className="border-t bg-muted/40 px-4 py-3">{footer}</div>}
    </div>
  )
}
