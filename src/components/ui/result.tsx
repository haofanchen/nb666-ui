import * as React from "react"
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react"
import { cn } from "../../lib/utils"

export interface ResultProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  status?: "success" | "info" | "warning" | "error" | "403" | "404" | "500"
  title: React.ReactNode
  subTitle?: React.ReactNode
  extra?: React.ReactNode
  icon?: React.ReactNode
}

export function Result({
  status = "info",
  title,
  subTitle,
  extra,
  icon,
  className,
  ...props
}: ResultProps) {
  const defaultIcon =
    status === "success" ? (
      <CheckCircle2 className="size-16 text-success" />
    ) : status === "warning" ? (
      <TriangleAlert className="size-16 text-warning" />
    ) : status === "error" || status === "500" ? (
      <AlertCircle className="size-16 text-error" />
    ) : status === "403" || status === "404" ? (
      <span className="text-5xl font-bold text-muted-foreground">{status}</span>
    ) : (
      <Info className="size-16 text-info" />
    )

  return (
    <div className={cn("flex flex-col items-center gap-2 py-10 text-center", className)} {...props}>
      <div className="mb-2">{icon ?? defaultIcon}</div>
      <div className="text-2xl font-semibold">{title}</div>
      {subTitle != null && <div className="max-w-md text-sm leading-6 text-muted-foreground">{subTitle}</div>}
      {extra != null && <div className="mt-3">{extra}</div>}
    </div>
  )
}
