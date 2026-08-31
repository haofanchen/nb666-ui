import * as React from "react"
import { createPortal } from "react-dom"
import { GripVertical } from "lucide-react"
import { cn } from "../../lib/utils"

export interface SortableProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  dataSource: T[]
  rowKey?: (item: T, index: number) => string | number
  renderItem: (item: T, index: number) => React.ReactNode
  onChange?: (items: T[], info: { from: number; to: number }) => void
  disabled?: boolean
  showHandle?: boolean
}

interface GhostState {
  left: number
  top: number
  width: number
}

const EDGE_THRESHOLD = 48
const SCROLL_SPEED = 3

function findScrollContainer(el: HTMLElement | null): HTMLElement | Window {
  let node = el?.parentElement ?? null
  while (node) {
    const style = window.getComputedStyle(node)
    if (/(auto|scroll|overlay)/.test(style.overflowY) && node.scrollHeight > node.clientHeight) {
      return node
    }
    node = node.parentElement
  }
  return window
}

export function Sortable<T>({
  dataSource,
  rowKey,
  renderItem,
  onChange,
  disabled = false,
  showHandle = true,
  className,
  ...props
}: SortableProps<T>) {
  const [items, setItems] = React.useState<T[]>(dataSource)
  const [draggingIndex, setDraggingIndex] = React.useState<number | null>(null)
  const [overIndex, setOverIndex] = React.useState<number | null>(null)
  const [ghost, setGhost] = React.useState<GhostState | null>(null)

  const draggingRef = React.useRef(false)
  const startIndexRef = React.useRef<number | null>(null)
  const draggingIndexRef = React.useRef<number | null>(null)
  const overIndexRef = React.useRef<number | null>(null)
  const itemsRef = React.useRef(items)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const firstPositionsRef = React.useRef(new Map<string, number>())
  const pointerOffsetRef = React.useRef({ x: 0, y: 0 })
  const pointerYRef = React.useRef(0)
  const scrollContainerRef = React.useRef<HTMLElement | Window>(window)
  const keyCache = React.useRef(new WeakMap<object, string>())
  const idCounter = React.useRef(0)

  React.useEffect(() => {
    if (!draggingRef.current) {
      setItems(dataSource)
      itemsRef.current = dataSource
    }
  }, [dataSource])

  function getStableKey(item: T, index: number): string {
    if (rowKey) return String(rowKey(item, index))
    if (typeof item === "object" && item !== null) {
      let key = keyCache.current.get(item)
      if (!key) {
        key = `item-${idCounter.current++}`
        keyCache.current.set(item, key)
      }
      return key
    }
    return String(item)
  }

  function capturePositions() {
    const map = new Map<string, number>()
    containerRef.current?.querySelectorAll<HTMLElement>("[data-sortable-item]").forEach((el) => {
      const key = el.dataset.sortableKey
      if (key) map.set(key, el.getBoundingClientRect().top)
    })
    firstPositionsRef.current = map
  }

  function indexFromPointer(clientY: number, currentIndex: number) {
    const container = containerRef.current
    if (!container) return currentIndex
    const children = Array.from(container.children) as HTMLElement[]
    let target = 0
    for (let i = 0; i < children.length; i++) {
      if (i === currentIndex) continue
      const rect = children[i].getBoundingClientRect()
      const middle = rect.top + rect.height / 2
      if (clientY < middle) break
      target++
    }
    return target
  }

  function updateDraggingIndex(value: number | null) {
    draggingIndexRef.current = value
    setDraggingIndex(value)
  }

  function updateOverIndex(value: number | null) {
    overIndexRef.current = value
    setOverIndex(value)
  }

  function reorderTo(clientY: number) {
    const current = draggingIndexRef.current
    if (current == null || disabled) return
    const target = indexFromPointer(clientY, current)

    if (target !== current) {
      capturePositions()
      setItems((prev) => {
        const next = [...prev]
        const [moved] = next.splice(current, 1)
        next.splice(target, 0, moved)
        itemsRef.current = next
        return next
      })
      updateDraggingIndex(target)
      updateOverIndex(target)
    } else if (target !== overIndexRef.current) {
      updateOverIndex(target)
    }
  }

  function handlePointerDown(e: React.PointerEvent, index: number) {
    if (disabled) return
    e.preventDefault()
    const element = (e.currentTarget as HTMLElement).closest<HTMLElement>("[data-sortable-item]")
    if (!element) return
    const rect = element.getBoundingClientRect()
    pointerOffsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    pointerYRef.current = e.clientY
    scrollContainerRef.current = findScrollContainer(element)

    draggingRef.current = true
    startIndexRef.current = index
    updateDraggingIndex(index)
    updateOverIndex(index)
    setGhost({ left: rect.left, top: rect.top, width: rect.width })
    element.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (draggingIndexRef.current == null || disabled) return
    pointerYRef.current = e.clientY
    setGhost((prev) =>
      prev
        ? { ...prev, top: e.clientY - pointerOffsetRef.current.y }
        : prev,
    )
    reorderTo(e.clientY)
  }

  const reorderToRef = React.useRef(reorderTo)
  reorderToRef.current = reorderTo

  function finishDrag() {
    if (draggingIndexRef.current == null) return
    onChange?.(
      itemsRef.current,
      { from: startIndexRef.current ?? draggingIndexRef.current, to: overIndexRef.current ?? draggingIndexRef.current },
    )
    draggingRef.current = false
    startIndexRef.current = null
    updateDraggingIndex(null)
    updateOverIndex(null)
    setGhost(null)
  }

  const finishDragRef = React.useRef(finishDrag)
  finishDragRef.current = finishDrag

  React.useEffect(() => {
    if (draggingIndex == null) return
    function handleGlobalUp() {
      finishDragRef.current()
    }
    window.addEventListener("pointerup", handleGlobalUp)
    window.addEventListener("pointercancel", handleGlobalUp)
    return () => {
      window.removeEventListener("pointerup", handleGlobalUp)
      window.removeEventListener("pointercancel", handleGlobalUp)
    }
  }, [draggingIndex])

  React.useEffect(() => {
    if (draggingIndex == null) return
    let raf = 0
    function tick() {
      const container = scrollContainerRef.current
      const y = pointerYRef.current

      if (container instanceof Window) {
        if (y < EDGE_THRESHOLD) window.scrollBy(0, -SCROLL_SPEED)
        else if (y > window.innerHeight - EDGE_THRESHOLD) window.scrollBy(0, SCROLL_SPEED)
      } else {
        const rect = container.getBoundingClientRect()
        if (y < rect.top + EDGE_THRESHOLD) container.scrollTop -= SCROLL_SPEED
        else if (y > rect.bottom - EDGE_THRESHOLD) container.scrollTop += SCROLL_SPEED
      }

      reorderToRef.current(y)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [draggingIndex])

  React.useLayoutEffect(() => {
    const first = firstPositionsRef.current
    const container = containerRef.current
    if (first.size === 0 || !container) return

    const elements = Array.from(container.querySelectorAll<HTMLElement>("[data-sortable-item]"))
    let hasDelta = false

    elements.forEach((el) => {
      const key = el.dataset.sortableKey
      if (!key) return
      const firstTop = first.get(key)
      if (firstTop == null) return
      const delta = firstTop - el.getBoundingClientRect().top
      if (Math.abs(delta) > 0.1) {
        el.style.transition = "none"
        el.style.transform = `translateY(${delta}px)`
        hasDelta = true
      }
    })

    firstPositionsRef.current = new Map()
    if (!hasDelta) return

    requestAnimationFrame(() => {
      elements.forEach((el) => {
        el.style.transition = "transform 220ms cubic-bezier(0.2, 0, 0, 1)"
        el.style.transform = ""
      })
      window.setTimeout(() => {
        elements.forEach((el) => {
          el.style.transition = ""
          el.style.transform = ""
        })
      }, 240)
    })
  }, [items])

  return (
    <>
      <div
        ref={containerRef}
        className={cn("flex flex-col", className)}
        {...props}
      >
        {items.map((item, index) => {
          const key = getStableKey(item, index)
          const isDragging = draggingIndex === index
          const showIndicator = overIndex === index && draggingIndex !== null && draggingIndex !== overIndex

          return (
            <div
              key={key}
              data-sortable-item
              data-sortable-key={key}
              onPointerDown={(e) => handlePointerDown(e, index)}
              onPointerMove={handlePointerMove}
              className={cn(
                "relative flex touch-none select-none items-center rounded-md border bg-card transition-[opacity,box-shadow]",
                disabled ? "cursor-default" : "cursor-grab active:cursor-grabbing",
                isDragging ? "opacity-40" : "hover:border-primary/60",
                showIndicator && "before:absolute before:inset-x-1 before:top-[-2px] before:h-0.5 before:rounded-full before:bg-primary",
              )}
            >
              {showHandle && (
                <span className="flex shrink-0 items-center justify-center pl-2 text-muted-foreground">
                  <GripVertical className="size-4" />
                </span>
              )}
              <div className="min-w-0 flex-1">{renderItem(item, index)}</div>
            </div>
          )
        })}
      </div>

      {ghost && draggingIndex != null &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[1000] rounded-md border border-primary/40 bg-card shadow-card-lg"
            style={{ left: ghost.left, top: ghost.top, width: ghost.width }}
          >
            <div className="flex items-center">
              {showHandle && (
                <span className="flex shrink-0 items-center justify-center pl-2 text-muted-foreground">
                  <GripVertical className="size-4" />
                </span>
              )}
              <div className="min-w-0 flex-1">{renderItem(items[draggingIndex], draggingIndex)}</div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
