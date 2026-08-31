import * as React from "react"
import { Eye, EyeOff, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { controlHeight } from "@/lib/styles"

const inputSizeClass: Record<string, string> = {
  small: `${controlHeight.small} px-2`,
  middle: `${controlHeight.middle} px-3`,
  large: `${controlHeight.large} px-3.5`,
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  size?: "small" | "middle" | "large"
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  addonBefore?: React.ReactNode
  addonAfter?: React.ReactNode
  allowClear?: boolean
  status?: "error" | "warning"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size = "middle",
      prefix,
      suffix,
      addonBefore,
      addonAfter,
      allowClear = false,
      status,
      value,
      defaultValue,
      onChange,
      disabled,
      type,
      ...props
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => innerRef.current!)

    const isControlled = value !== undefined
    const [innerValue, setInnerValue] = React.useState<string>(String(defaultValue ?? ""))
    const [showPassword, setShowPassword] = React.useState(false)
    const currentValue = isControlled ? String(value ?? "") : innerValue
    const isPassword = type === "password"
    const inputType = isPassword && showPassword ? "text" : type

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (!isControlled) setInnerValue(e.target.value)
      onChange?.(e)
    }

    function handleClear() {
      if (!isControlled) setInnerValue("")
      const el = innerRef.current
      if (!el) return
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set
      setter?.call(el, "")
      el.dispatchEvent(new Event("input", { bubbles: true }))
    }

    const input = (
      <input
        ref={innerRef}
        value={currentValue}
        type={inputType}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          "w-full min-w-0 bg-transparent text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          inputSizeClass[size],
          className,
        )}
        {...props}
      />
    )

    const clearVisible = allowClear && !disabled && currentValue.length > 0

    const clear = (
      <span className="shrink-0 pr-2.5">
        {clearVisible && (
          <button
            type="button"
            tabIndex={-1}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClear}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="清空"
          >
            <X className="size-3.5" />
          </button>
        )}
      </span>
    )

    const box = (
      <span
        className={cn(
          "group flex w-full items-center gap-2 rounded-md border bg-background transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30",
          status === "error" && "border-error focus-within:border-error focus-within:ring-error/30",
          status === "warning" && "border-warning focus-within:border-warning focus-within:ring-warning/30",
        )}
      >
        {prefix && <span className="shrink-0 pl-2.5 text-muted-foreground">{prefix}</span>}
        {input}
        {allowClear && clear}
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShowPassword((v) => !v)}
            className="shrink-0 pr-2.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? "隐藏密码" : "显示密码"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
        {suffix && <span className="shrink-0 pr-2.5 text-muted-foreground">{suffix}</span>}
      </span>
    )

    if (!addonBefore && !addonAfter) return box

    return (
      <span className="flex w-full items-stretch">
        {addonBefore && (
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-border bg-muted px-3 text-sm text-muted-foreground">
            {addonBefore}
          </span>
        )}
        <span className="min-w-0 flex-1 [&>span]:rounded-none">
          {box}
        </span>
        {addonAfter && (
          <span className="inline-flex items-center rounded-r-md border border-l-0 border-border bg-muted px-3 text-sm text-muted-foreground">
            {addonAfter}
          </span>
        )}
      </span>
    )
  },
)
Input.displayName = "Input"

export { Input }
