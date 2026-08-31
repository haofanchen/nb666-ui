import * as React from "react"
import { cn } from "../../lib/utils"

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  extra?: React.ReactNode
  bordered?: boolean
  hoverable?: boolean
  loading?: boolean
  size?: "default" | "small"
  cover?: React.ReactNode
  actions?: React.ReactNode[]
}

function Card({
  title,
  extra,
  bordered = true,
  hoverable = false,
  loading = false,
  size = "default",
  cover,
  actions,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg bg-card text-card-foreground",
        bordered && "border",
        hoverable && "transition-shadow hover:shadow-card-lg",
        !bordered && "shadow-card",
        className,
      )}
      {...props}
    >
      {cover && <div className="overflow-hidden rounded-t-lg">{cover}</div>}
      {(title != null || extra != null) && (
        <div className={cn("flex items-center justify-between border-b", size === "small" ? "px-4 py-2.5" : "px-5 py-3.5")}>
          <div className="font-semibold">{title}</div>
          {extra && <div className="text-sm text-muted-foreground">{extra}</div>}
        </div>
      )}
      <div className={cn("flex-1", size === "small" ? "p-4" : "p-5")}>
        {loading ? <div className="h-24 animate-pulse rounded bg-muted" /> : children}
      </div>
      {actions && actions.length > 0 && (
        <div className="flex items-center divide-x border-t">
          {actions.map((action, i) => (
            <div key={i} className="flex flex-1 items-center justify-center py-3 text-sm">
              {action}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export interface CardMetaProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  avatar?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
}

function CardMeta({ avatar, title, description, className, ...props }: CardMetaProps) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      {avatar}
      <div className="min-w-0 flex-1">
        {title != null && <div className="font-semibold">{title}</div>}
        {description != null && <div className="mt-0.5 text-sm text-muted-foreground">{description}</div>}
      </div>
    </div>
  )
}

export { Card, CardMeta }
