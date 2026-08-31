import * as React from "react"
import { Inbox } from "lucide-react"
import { cn } from "@/lib/utils"

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: React.ReactNode
  image?: React.ReactNode
  children?: React.ReactNode
}

export function Empty({
  description = "暂无数据",
  image,
  children,
  className,
  ...props
}: EmptyProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2 py-10 text-center", className)} {...props}>
      <div className="text-muted-foreground/50">
        {image ?? <Inbox className="size-12" />}
      </div>
      <div className="text-sm text-muted-foreground">{description}</div>
      {children && <div className="mt-2">{children}</div>}
    </div>
  )
}
