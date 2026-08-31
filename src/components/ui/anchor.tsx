import * as React from "react"
import { cn } from "../../lib/utils"

export interface AnchorLink {
  key: string
  href: string
  title: React.ReactNode
}

export interface AnchorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onClick"> {
  items: AnchorLink[]
  offsetTop?: number
  bounds?: number
  getContainer?: () => HTMLElement | Window
  onClick?: (e: React.MouseEvent, link: AnchorLink) => void
  onChange?: (currentActiveLink: string) => void
}

function scrollTo(container: HTMLElement | Window, top: number) {
  if (container instanceof Window) {
    window.scrollTo({ top, behavior: "smooth" })
  } else {
    container.scrollTo({ top, behavior: "smooth" })
  }
}

export function Anchor({
  items,
  offsetTop = 0,
  bounds = 5,
  getContainer,
  onClick,
  onChange,
  className,
  ...props
}: AnchorProps) {
  const [active, setActive] = React.useState<string>(items[0]?.key ?? "")

  React.useEffect(() => {
    const container = getContainer ? getContainer() : window
    const targets = items
      .map((item) => {
        const root = container instanceof Window ? document : container
        const el = root.querySelector<HTMLElement>(item.href)
        return el ? { key: item.key, el } : null
      })
      .filter(Boolean) as { key: string; el: HTMLElement }[]

    if (targets.length === 0) return

    function onScroll() {
      let next = targets[0].key
      for (const target of targets) {
        if (target.el.getBoundingClientRect().top - offsetTop <= bounds) {
          next = target.key
        }
      }
      setActive(next)
      onChange?.(next)
    }

    onScroll()
    container.addEventListener("scroll", onScroll, { passive: true })
    return () => container.removeEventListener("scroll", onScroll)
  }, [items, offsetTop, bounds, getContainer, onChange])

  function handleClick(e: React.MouseEvent, item: AnchorLink) {
    onClick?.(e, item)
    if (e.defaultPrevented) return
    e.preventDefault()
    const container = getContainer ? getContainer() : window
    const root = container instanceof Window ? document : container
    const el = root.querySelector<HTMLElement>(item.href)
    if (!el) return
    if (container instanceof Window) {
      const top = el.getBoundingClientRect().top + window.scrollY - offsetTop
      scrollTo(container, top)
    } else {
      const top = el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - offsetTop
      scrollTo(container, top)
    }
    setActive(item.key)
    onChange?.(item.key)
  }

  return (
    <div className={cn("flex flex-col gap-0.5 text-sm", className)} {...props}>
      {items.map((item) => {
        const isActive = active === item.key
        return (
          <a
            key={item.key}
            href={item.href}
            onClick={(e) => handleClick(e, item)}
            className={cn(
              "relative rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground",
              isActive && "font-medium text-primary",
            )}
          >
            <span
              className={cn(
                "absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary transition-opacity",
                isActive ? "opacity-100" : "opacity-0",
              )}
            />
            {item.title}
          </a>
        )
      })}
    </div>
  )
}
