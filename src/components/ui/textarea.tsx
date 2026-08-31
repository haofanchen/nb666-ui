import * as React from "react"
import { cn } from "../../lib/utils"

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: "small" | "middle" | "large"
  status?: "error" | "warning"
  showCount?: boolean
  maxLength?: number
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      size = "middle",
      status,
      showCount = false,
      maxLength,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined
    const [innerValue, setInnerValue] = React.useState<string>(String(defaultValue ?? ""))
    const current = isControlled ? String(value ?? "") : innerValue

    const height =
      size === "small" ? "min-h-16 text-xs" : size === "large" ? "min-h-32 text-base" : "min-h-20 text-sm"

    return (
      <div className={cn("relative w-full", className)}>
        <textarea
          ref={ref}
          value={current}
          maxLength={maxLength}
          onChange={(e) => {
            if (!isControlled) setInnerValue(e.target.value)
            onChange?.(e)
          }}
          className={cn(
            "w-full resize-y rounded-md border bg-background px-3 py-2 text-foreground outline-none placeholder:text-muted-foreground transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
            height,
            status === "error" && "border-error focus:border-error focus:ring-error/30",
            status === "warning" && "border-warning focus:border-warning focus:ring-warning/30",
          )}
          {...props}
        />
        {showCount && maxLength != null && (
          <div className="pointer-events-none absolute bottom-2 right-3 text-xs text-muted-foreground">
            {current.length}/{maxLength}
          </div>
        )}
      </div>
    )
  },
)
TextArea.displayName = "TextArea"
