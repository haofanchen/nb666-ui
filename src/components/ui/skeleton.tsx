import * as React from "react"
import { cn } from "../../lib/utils"

export interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  loading?: boolean
  active?: boolean
  avatar?: boolean
  title?: boolean | { width?: number | string }
  paragraph?: boolean | { rows?: number; width?: number | string }
  children?: React.ReactNode
}

export function Skeleton({
  loading = true,
  active = true,
  avatar = false,
  title = true,
  paragraph = true,
  children,
  className,
  ...props
}: SkeletonProps) {
  if (!loading) return <>{children}</>

  const titleWidth = typeof title === "object" && title.width != null ? title.width : "40%"
  const rows = (typeof paragraph === "object" && paragraph.rows != null ? paragraph.rows : 3) as number
  const paragraphWidth = typeof paragraph === "object" && paragraph.width != null ? paragraph.width : undefined

  return (
    <div className={cn("w-full space-y-2", className)} {...props}>
      <div className="flex items-start gap-3">
        {avatar && <div className={cn("size-8 shrink-0 rounded-full bg-muted", active && "animate-pulse")} />}
        <div className="flex-1 space-y-2">
          {title !== false && <div className={cn("h-4 rounded bg-muted", active && "animate-pulse")} style={{ width: titleWidth }} />}
          {paragraph !== false && (
            <div className="space-y-2">
              {Array.from({ length: rows }, (_, i) => (
                <div
                  key={i}
                  className={cn("h-3.5 rounded bg-muted", active && "animate-pulse")}
                  style={{ width: i === rows - 1 ? "60%" : paragraphWidth ?? "100%" }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
