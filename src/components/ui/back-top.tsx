import * as React from "react"
import { ChevronUp } from "lucide-react"
import { cn } from "../../lib/utils"

export interface BackTopProps extends React.HTMLAttributes<HTMLButtonElement> {
  visibilityHeight?: number
  target?: () => HTMLElement | Window
  duration?: number
}

export function BackTop({
  visibilityHeight = 400,
  target,
  duration = 300,
  className,
  ...props
}: BackTopProps) {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = target ? target() : window
    function onScroll() {
      const top = el instanceof Window ? el.scrollY : el.scrollTop
      setVisible(top >= visibilityHeight)
    }
    onScroll()
    el.addEventListener("scroll", onScroll)
    return () => el.removeEventListener("scroll", onScroll)
  }, [visibilityHeight, target])

  function scrollTop() {
    const el = target ? target() : window
    if (el instanceof Window) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      el.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={scrollTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 flex size-10 items-center justify-center rounded-full border bg-background text-foreground shadow-card transition-colors hover:border-primary hover:text-primary",
        className,
      )}
      aria-label="回到顶部"
      style={{ transitionDuration: `${duration}ms` }}
      {...props}
    >
      <ChevronUp className="size-5" />
    </button>
  )
}
