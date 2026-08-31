import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"
import { useControllableState } from "../../hooks/use-controllable"
import { Button } from "./button"

export interface TourStep {
  target?: string
  title?: React.ReactNode
  description?: React.ReactNode
  cover?: React.ReactNode
  placement?: "top" | "bottom" | "left" | "right"
}

export interface TourProps {
  open?: boolean
  defaultOpen?: boolean
  steps: TourStep[]
  current?: number
  onChange?: (current: number) => void
  onClose?: () => void
  onFinish?: () => void
  mask?: boolean
  zIndex?: number
  className?: string
}

const CARD_WIDTH = 320
const GAP = 10

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function Tour({
  open,
  defaultOpen = false,
  steps,
  current: controlledCurrent,
  onChange,
  onClose,
  onFinish,
  mask = true,
  zIndex = 1000,
  className,
}: TourProps) {
  const [visible, setVisible] = useControllableState(open, defaultOpen)
  const [internalCurrent, setInternalCurrent] = React.useState(0)
  const current = controlledCurrent ?? internalCurrent
  const step = steps[current]
  const [rect, setRect] = React.useState<DOMRect | null>(null)

  React.useEffect(() => {
    if (!visible || !step?.target) {
      setRect(null)
      return
    }
    function measure() {
      const el = document.querySelector<HTMLElement>(step!.target!)
      setRect(el ? el.getBoundingClientRect() : null)
    }
    measure()
    window.addEventListener("resize", measure)
    window.addEventListener("scroll", measure, true)
    return () => {
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", measure, true)
    }
  }, [visible, step])

  if (!visible || !step) return null

  const placement = step.placement ?? "bottom"
  const hasPrev = current > 0
  const isLast = current === steps.length - 1

  function go(next: number) {
    const clamped = clamp(next, 0, steps.length - 1)
    setInternalCurrent(clamped)
    onChange?.(clamped)
  }

  function close() {
    setVisible(false)
    onClose?.()
  }

  function finish() {
    setVisible(false)
    onFinish?.()
  }

  const cardPos = React.useMemo(() => {
    if (!rect) return { left: 0, top: 0 }
    const vw = window.innerWidth
    const vh = window.innerHeight
    let left = 0
    let top = 0

    if (placement === "bottom") {
      top = rect.bottom + GAP
      left = clamp(rect.left + rect.width / 2 - CARD_WIDTH / 2, 12, vw - CARD_WIDTH - 12)
      if (top + 200 > vh) top = rect.top - GAP - 200
    } else if (placement === "top") {
      top = rect.top - GAP - 200
      left = clamp(rect.left + rect.width / 2 - CARD_WIDTH / 2, 12, vw - CARD_WIDTH - 12)
      if (top < 12) top = rect.bottom + GAP
    } else if (placement === "right") {
      left = rect.right + GAP
      top = clamp(rect.top, 12, vh - 200)
      if (left + CARD_WIDTH > vw) left = rect.left - GAP - CARD_WIDTH
    } else {
      left = rect.left - GAP - CARD_WIDTH
      top = clamp(rect.top, 12, vh - 200)
      if (left < 12) left = rect.right + GAP
    }

    return { left: clamp(left, 12, vw - CARD_WIDTH - 12), top: clamp(top, 12, vh - 220) }
  }, [rect, placement])

  const maskRects = rect
    ? [
        { top: 0, left: 0, right: 0, bottom: rect.top, width: "100%", height: rect.top },
        { top: rect.bottom, left: 0, right: 0, bottom: 0, width: "100%", height: `calc(100% - ${rect.bottom}px)` },
        { top: rect.top, left: 0, right: rect.left, bottom: rect.bottom, width: rect.left, height: rect.height },
        { top: rect.top, left: rect.right, right: 0, bottom: rect.bottom, width: `calc(100% - ${rect.right}px)`, height: rect.height },
      ]
    : []

  return createPortal(
    <div className={cn("fixed inset-0", className)} style={{ zIndex }}>
      {mask && rect && (
        <>
          {maskRects.map((item, i) => (
            <div
              key={i}
              className="fixed bg-black/45"
              style={{ left: item.left, top: item.top, width: item.width, height: item.height }}
            />
          ))}
          <div
            className="pointer-events-none fixed rounded-lg ring-2 ring-primary ring-offset-2 ring-offset-black/0"
            style={{ left: rect.left - 4, top: rect.top - 4, width: rect.width + 8, height: rect.height + 8 }}
          />
        </>
      )}

      <div
        className="fixed w-80 rounded-lg border bg-card p-4 shadow-card-lg"
        style={{ left: cardPos.left, top: cardPos.top, width: CARD_WIDTH }}
      >
        {step.cover && <div className="mb-3 overflow-hidden rounded-md">{step.cover}</div>}
        {step.title != null && <div className="font-semibold">{step.title}</div>}
        {step.description != null && <div className="mt-1.5 text-sm leading-6 text-muted-foreground">{step.description}</div>}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {current + 1} / {steps.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={close}
              className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              跳过
            </button>
            {hasPrev && (
              <Button size="small" type="default" onClick={() => go(current - 1)}>
                上一步
              </Button>
            )}
            {isLast ? (
              <Button size="small" type="primary" onClick={finish}>
                完成
              </Button>
            ) : (
              <Button size="small" type="primary" onClick={() => go(current + 1)}>
                下一步
              </Button>
            )}
            <button
              type="button"
              onClick={close}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="关闭"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
