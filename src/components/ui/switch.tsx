import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  size?: "small" | "default"
  loading?: boolean
  checkedChildren?: React.ReactNode
  unCheckedChildren?: React.ReactNode
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  size = "default",
  loading = false,
  checkedChildren,
  unCheckedChildren,
  disabled,
  className,
  ...props
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
  const checked = controlledChecked ?? internalChecked
  const isSmall = size === "small"

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled || loading}
      onClick={() => {
        setInternalChecked(!checked)
        onChange?.(!checked)
      }}
      className={cn(
        "relative inline-flex items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
        isSmall ? "h-4 w-7" : "h-6 w-11",
        checked ? "bg-primary" : "bg-input",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 flex items-center justify-center rounded-full bg-white shadow-sm transition-all",
          isSmall ? "size-3" : "size-5",
          checked && (isSmall ? "translate-x-3" : "translate-x-5"),
        )}
      >
        {loading && <Loader2 className="size-3 animate-spin text-primary" />}
      </span>
      {checkedChildren != null && unCheckedChildren != null && (
        <span className={cn("px-1 text-[10px] font-medium text-white", isSmall ? "ml-3.5 mr-0.5" : "ml-5 mr-1.5")}>
          {checked ? checkedChildren : unCheckedChildren}
        </span>
      )}
    </button>
  )
}
