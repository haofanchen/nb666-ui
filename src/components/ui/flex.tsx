import * as React from "react"
import { cn } from "@/lib/utils"

const flexAlign: Record<string, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
}

const flexJustify: Record<string, string> = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  "space-between": "justify-between",
  "space-around": "justify-around",
}

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean
  gap?: number | "small" | "middle" | "large"
  align?: "start" | "end" | "center" | "baseline" | "stretch"
  justify?: "start" | "end" | "center" | "space-between" | "space-around"
  wrap?: boolean
  flex?: React.CSSProperties["flex"]
}

export function Flex({
  vertical = false,
  gap,
  align,
  justify,
  wrap = false,
  flex,
  className,
  style,
  children,
  ...props
}: FlexProps) {
  const gapClass =
    gap === "small" ? "gap-2" : gap === "middle" ? "gap-4" : gap === "large" ? "gap-6" : undefined
  const alignClass = align ? flexAlign[align] : undefined
  const justifyClass = justify ? flexJustify[justify] : undefined

  return (
    <div
      className={cn(
        "flex",
        vertical ? "flex-col" : "flex-row",
        gapClass,
        alignClass,
        justifyClass,
        wrap && "flex-wrap",
        className,
      )}
      style={{ gap: typeof gap === "number" ? gap : undefined, flex, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}
