import * as React from "react"
import { cn } from "../../lib/utils"

export interface AffixProps extends React.HTMLAttributes<HTMLDivElement> {
  offsetTop?: number
  offsetBottom?: number
}

export function Affix({ offsetTop, offsetBottom, className, children, ...props }: AffixProps) {
  return (
    <div
      className={cn("sticky", className)}
      style={{ top: offsetTop, bottom: offsetBottom }}
      {...props}
    >
      {children}
    </div>
  )
}
