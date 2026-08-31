import * as React from "react"
import { cn } from "@/lib/utils"

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  hasSider?: boolean
}

export function Layout({ hasSider = false, className, ...props }: LayoutProps) {
  return (
    <div
      className={cn("flex", hasSider ? "flex-row" : "flex-col", className)}
      {...props}
    />
  )
}

export function Header({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <header className={cn("flex h-16 items-center px-6", className)} {...props} />
}

export function Sider({
  width = 200,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLElement> & { width?: number | string }) {
  return (
    <aside
      className={cn("shrink-0", className)}
      style={{ width, ...style }}
      {...props}
    />
  )
}

export function Content({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <main className={cn("flex-1", className)} {...props} />
}

export function Footer({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <footer className={cn("px-6 py-4 text-center", className)} {...props} />
}
