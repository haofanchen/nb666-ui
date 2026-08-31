import * as React from "react"
import { cn } from "@/lib/utils"

const spaceSize: Record<string, string> = {
  small: "gap-2",
  middle: "gap-4",
  large: "gap-6",
}

const spaceAlign: Record<string, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
}

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical"
  size?: "small" | "middle" | "large" | number
  align?: "start" | "end" | "center" | "baseline"
  wrap?: boolean
  split?: React.ReactNode
}

export interface SpaceCompactProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical"
  block?: boolean
}

function SpaceImpl({
  direction = "horizontal",
  size = "middle",
  align,
  wrap = false,
  split,
  className,
  children,
  ...props
}: SpaceProps) {
  const alignClass = align ? spaceAlign[align] : ""
  const sizeStyle = typeof size === "number" ? { gap: size } : undefined
  const items = React.Children.toArray(children).filter(Boolean)

  return (
    <div
      className={cn(
        "flex",
        direction === "horizontal" ? "flex-row items-center" : "flex-col",
        typeof size === "string" && spaceSize[size],
        alignClass,
        wrap && "flex-wrap",
        className,
      )}
      style={sizeStyle}
      {...props}
    >
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {i > 0 && split && <span className="shrink-0">{split}</span>}
          {child}
        </React.Fragment>
      ))}
    </div>
  )
}

function SpaceCompact({ direction = "horizontal", block = false, className, children, ...props }: SpaceCompactProps) {
  const items = React.Children.toArray(children).filter(Boolean)
  return (
    <div
      className={cn(
        "inline-flex",
        direction === "horizontal" ? "flex-row" : "flex-col",
        block && "flex w-full",
        className,
      )}
      {...props}
    >
      {items.map((child, i) => {
        const isFirst = i === 0
        const isLast = i === items.length - 1
        const childProps = (child as React.ReactElement<{ className?: string }>).props
        return (
          <div
            key={i}
            className={cn(
              "relative min-w-0",
              direction === "horizontal" && !isFirst && "-ml-px",
              direction === "vertical" && !isFirst && "-mt-px",
              isFirst && "z-10",
            )}
          >
            {React.cloneElement(child as React.ReactElement, {
              className: cn(
                childProps?.className,
                "rounded-none",
                direction === "horizontal" && (isFirst ? "rounded-l-md" : isLast ? "rounded-r-md" : ""),
                direction === "vertical" && (isFirst ? "rounded-t-md" : isLast ? "rounded-b-md" : ""),
              ),
            } as React.Attributes)}
          </div>
        )
      })}
    </div>
  )
}

export const Space = Object.assign(SpaceImpl, { Compact: SpaceCompact }) as typeof SpaceImpl & {
  Compact: typeof SpaceCompact
}

export { SpaceCompact }
