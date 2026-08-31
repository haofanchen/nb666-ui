import * as React from "react"
import { cn } from "@/lib/utils"

const textTypeClass: Record<string, string> = {
  secondary: "text-muted-foreground",
  success: "text-success",
  warning: "text-warning",
  danger: "text-error",
}

function Text({
  type,
  code,
  mark,
  strong,
  italic,
  underline,
  delete: deleted,
  disabled,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  type?: "secondary" | "success" | "warning" | "danger"
  code?: boolean
  mark?: boolean
  strong?: boolean
  italic?: boolean
  underline?: boolean
  delete?: boolean
  disabled?: boolean
}) {
  return (
    <span
      className={cn(
        type && textTypeClass[type],
        code && "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]",
        mark && "rounded bg-warning/20 px-0.5",
        strong && "font-semibold",
        italic && "italic",
        underline && "underline underline-offset-4",
        deleted && "line-through",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

const titleLevels: Record<number, string> = {
  1: "text-4xl font-semibold tracking-tight",
  2: "text-3xl font-semibold tracking-tight",
  3: "text-2xl font-semibold tracking-tight",
  4: "text-xl font-semibold",
  5: "text-base font-semibold",
}

function Title({
  level = 1,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { level?: 1 | 2 | 3 | 4 | 5 }) {
  const Tag = `h${level}` as const
  return (
    <Tag className={cn("text-foreground", titleLevels[level], className)} {...props}>
      {children}
    </Tag>
  )
}

function Paragraph({
  type,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  type?: "secondary" | "success" | "warning" | "danger"
}) {
  return (
    <p className={cn("leading-7", type && textTypeClass[type], className)} {...props}>
      {children}
    </p>
  )
}

function Link({
  href,
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn("text-primary underline-offset-4 hover:underline", className)}
      {...props}
    >
      {children}
    </a>
  )
}

export const Typography = { Title, Text, Paragraph, Link }
export { Text, Title, Paragraph, Link }
