import * as React from "react"
import { cn } from "../../lib/utils"
import { useBreakpoint, type Breakpoint } from "../../hooks/use-breakpoint"

const GutterContext = React.createContext<number>(0)

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number | [number, number]
  align?: "top" | "middle" | "bottom"
  justify?: "start" | "end" | "center" | "space-between" | "space-around"
}

export function Row({
  gutter = 0,
  align = "top",
  justify = "start",
  className,
  style,
  children,
  ...props
}: RowProps) {
  const [h, v] = Array.isArray(gutter) ? gutter : [gutter, 0]
  const alignClass = align === "middle" ? "items-center" : align === "bottom" ? "items-end" : "items-start"
  const justifyClass =
    justify === "end" ? "justify-end"
    : justify === "center" ? "justify-center"
    : justify === "space-between" ? "justify-between"
    : justify === "space-around" ? "justify-around"
    : "justify-start"

  return (
    <GutterContext.Provider value={h}>
      <div
        className={cn("flex flex-wrap", alignClass, justifyClass, className)}
        style={{ marginLeft: -h / 2, marginRight: -h / 2, rowGap: v, ...style }}
        {...props}
      >
        {children}
      </div>
    </GutterContext.Provider>
  )
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number
  offset?: number
  flex?: string | number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

export function Col({
  span = 24,
  offset = 0,
  flex,
  xs,
  sm,
  md,
  lg,
  xl,
  className,
  style,
  children,
  ...props
}: ColProps) {
  const gutter = React.useContext(GutterContext)
  const bp = useBreakpoint()
  const responsive: Partial<Record<Breakpoint, number | undefined>> = { xs, sm, md, lg, xl }
  let currentSpan = span
  for (const key of ["xs", "sm", "md", "lg", "xl"] as const) {
    if (responsive[key] != null && breakpointRank(key) <= breakpointRank(bp)) {
      currentSpan = responsive[key]!
    }
  }

  const width = currentSpan === 0 ? "0%" : `${(currentSpan / 24) * 100}%`
  const marginLeft = offset ? `${(offset / 24) * 100}%` : undefined
  const padding = gutter / 2

  return (
    <div
      className={cn("min-w-0", className)}
      style={{
        flex: flex ?? `0 0 ${width}`,
        maxWidth: flex ? undefined : width,
        marginLeft,
        paddingLeft: padding,
        paddingRight: padding,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

function breakpointRank(bp: Breakpoint): number {
  return ["xs", "sm", "md", "lg", "xl"].indexOf(bp)
}
