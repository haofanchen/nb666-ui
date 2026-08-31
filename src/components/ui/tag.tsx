import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

const presetColors: Record<string, string> = {
  default: "border-border bg-muted text-muted-foreground",
  success: "border-transparent bg-success/10 text-success",
  processing: "border-transparent bg-primary/10 text-primary",
  error: "border-transparent bg-error/10 text-error",
  warning: "border-transparent bg-warning/10 text-warning",
}

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string
  closable?: boolean
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void
  bordered?: boolean
  icon?: React.ReactNode
}

export function Tag({
  color,
  closable = false,
  onClose,
  bordered = true,
  icon,
  className,
  children,
  ...props
}: TagProps) {
  const isPreset = !color || color in presetColors
  const presetClass = color ? presetColors[color] : presetColors.default

  const customStyle = !isPreset
    ? bordered
      ? { color, borderColor: color }
      : { background: color, color: "#fff" }
    : undefined

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded px-2 text-xs font-medium",
        isPreset ? presetClass : bordered ? "border" : "",
        className,
      )}
      style={customStyle}
      {...props}
    >
      {icon}
      {children}
      {closable && (
        <button
          type="button"
          onClick={onClose}
          className="ml-0.5 rounded-full transition-opacity hover:opacity-70"
          aria-label="关闭"
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  )
}
