import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

export interface BreadcrumbItem {
  title: React.ReactNode
  href?: string
  icon?: React.ReactNode
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items?: BreadcrumbItem[]
  separator?: React.ReactNode
}

export function Breadcrumb({
  items,
  separator = <ChevronRight className="size-3.5 text-muted-foreground" />,
  className,
  children,
  ...props
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex flex-wrap items-center", className)} {...props}>
      <ol className="flex items-center gap-1.5 text-sm">
        {items
          ? items.map((item, i) => {
              const isLast = i === items.length - 1
              return (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span className="shrink-0">{separator}</span>}
                  {item.href && !isLast ? (
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.icon}
                      {item.title}
                    </a>
                  ) : (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1",
                        isLast ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {item.icon}
                      {item.title}
                    </span>
                  )}
                </li>
              )
            })
          : children}
      </ol>
    </nav>
  )
}
