import * as React from "react"
import { Loader2 } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      type: {
        default: "border border-input bg-background text-foreground shadow-xs hover:border-primary hover:text-primary",
        primary: "border border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)]",
        dashed: "border border-dashed border-input bg-background text-foreground hover:border-primary hover:text-primary",
        text: "border border-transparent bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "border border-transparent bg-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        small: "h-7 rounded px-2.5 text-xs",
        middle: "h-9 px-4",
        large: "h-11 rounded-lg px-6 text-base",
      },
    },
    defaultVariants: {
      type: "default",
      size: "middle",
    },
  },
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof buttonVariants> {
  danger?: boolean
  loading?: boolean
  block?: boolean
  icon?: React.ReactNode
  htmlType?: "button" | "submit" | "reset"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      type = "default",
      size = "middle",
      danger = false,
      loading = false,
      block = false,
      icon,
      disabled,
      children,
      htmlType = "button",
      ...props
    },
    ref,
  ) => {
    const dangerClass = danger && type !== "link"
      ? "border-transparent bg-error text-error-foreground hover:bg-error/90"
      : danger && type === "link"
        ? "text-error hover:text-error/80"
        : undefined

    return (
      <button
        ref={ref}
        type={htmlType}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({ type, size }),
          block && "w-full",
          dangerClass,
          className,
        )}
        {...props}
      >
        {loading ? <Loader2 className="animate-spin" /> : icon}
        {children}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
