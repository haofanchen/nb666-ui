import * as React from "react"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"

const avatarSize: Record<string, string> = {
  small: "size-6 text-xs",
  default: "size-8 text-sm",
  large: "size-10 text-base",
}

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string
  alt?: string
  size?: number | "small" | "default" | "large"
  shape?: "circle" | "square"
  icon?: React.ReactNode
}

export function Avatar({
  src,
  alt,
  size = "default",
  shape = "circle",
  icon,
  className,
  children,
  ...props
}: AvatarProps) {
  const sizeClass = typeof size === "number" ? "" : avatarSize[size]
  const sizeStyle = typeof size === "number" ? { width: size, height: size } : undefined
  const [error, setError] = React.useState(false)

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden bg-accent text-accent-foreground",
        shape === "circle" ? "rounded-full" : "rounded-md",
        sizeClass,
        className,
      )}
      style={sizeStyle}
      {...props}
    >
      {src && !error ? (
        <img src={src} alt={alt} className="size-full object-cover" onError={() => setError(true)} />
      ) : icon ? (
        icon
      ) : children ? (
        children
      ) : (
        <User className={typeof size === "number" ? undefined : size === "small" ? "size-3.5" : size === "large" ? "size-5" : "size-4"} />
      )}
    </span>
  )
}


export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
}

export function AvatarGroup({ children, max = 5, className, ...props }: AvatarGroupProps) {
  const items = React.Children.toArray(children)
  const visible = items.slice(0, max)
  const rest = items.length - max

  return (
    <div className={cn("flex items-center -space-x-2", className)} {...props}>
      {visible.map((item, i) => (
        <div key={i} className="rounded-full ring-2 ring-background">
          {item}
        </div>
      ))}
      {rest > 0 && (
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-background">
          +{rest}
        </span>
      )}
    </div>
  )
}
