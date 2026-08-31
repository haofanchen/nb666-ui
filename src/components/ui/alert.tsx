import * as React from "react"
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from "lucide-react"
import { cn } from "../../lib/utils"

const alertStyles = {
  success: { border: "border-success/30 bg-success/5", icon: <CheckCircle2 className="size-4 text-success" />, title: "text-success" },
  info: { border: "border-info/30 bg-info/5", icon: <Info className="size-4 text-info" />, title: "text-info" },
  warning: { border: "border-warning/30 bg-warning/5", icon: <TriangleAlert className="size-4 text-warning" />, title: "text-warning" },
  error: { border: "border-error/30 bg-error/5", icon: <AlertCircle className="size-4 text-error" />, title: "text-error" },
} as const

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: keyof typeof alertStyles
  message: React.ReactNode
  description?: React.ReactNode
  showIcon?: boolean
  closable?: boolean
  onClose?: () => void
  banner?: boolean
}

export function Alert({
  type = "info",
  message,
  description,
  showIcon = false,
  closable = false,
  onClose,
  banner = false,
  className,
  ...props
}: AlertProps) {
  const [visible, setVisible] = React.useState(true)
  if (!visible) return null
  const style = alertStyles[type]

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-md border px-4 py-3 text-sm",
        style.border,
        banner && "rounded-none border-x-0 border-t-0",
        className,
      )}
      {...props}
    >
      {showIcon && <span className="mt-0.5 shrink-0">{style.icon}</span>}
      <div className="flex-1">
        <div className={cn("font-medium", style.title)}>{message}</div>
        {description && <div className="mt-1 leading-6 text-foreground/80">{description}</div>}
      </div>
      {closable && (
        <button
          type="button"
          onClick={() => {
            setVisible(false)
            onClose?.()
          }}
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="关闭"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
