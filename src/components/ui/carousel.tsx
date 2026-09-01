import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  autoplay?: boolean
  interval?: number
  dots?: boolean
  arrows?: boolean
  children: React.ReactNode[]
}

export function Carousel({
  autoplay = false,
  interval = 3000,
  dots = true,
  arrows = true,
  className,
  children,
  ...props
}: CarouselProps) {
  const slides = React.Children.toArray(children)
  const count = slides.length
  const loop = count > 1

  // current 的取值范围为 0..count+1，其中 1..count 对应真实幻灯片，
  // 0 与 count+1 分别对应首尾的克隆项，用于实现无缝循环。
  const [current, setCurrent] = React.useState(1)
  const [animated, setAnimated] = React.useState(true)
  const [paused, setPaused] = React.useState(false)
  const resumeTimer = React.useRef<number | null>(null)

  // 手动操作时暂停自动播放，停止操作 interval 毫秒后自动恢复。
  const pauseForInteraction = React.useCallback(() => {
    setPaused(true)
    if (resumeTimer.current != null) window.clearTimeout(resumeTimer.current)
    if (autoplay) {
      resumeTimer.current = window.setTimeout(() => {
        resumeTimer.current = null
        setPaused(false)
      }, interval)
    }
  }, [autoplay, interval])

  React.useEffect(() => {
    return () => {
      if (resumeTimer.current != null) window.clearTimeout(resumeTimer.current)
    }
  }, [])

  const next = React.useCallback(() => {
    pauseForInteraction()
    setAnimated(true)
    setCurrent((c) => Math.min(c + 1, count + 1))
  }, [count, pauseForInteraction])

  const prev = React.useCallback(() => {
    pauseForInteraction()
    setAnimated(true)
    setCurrent((c) => Math.max(c - 1, 0))
  }, [pauseForInteraction])

  const go = React.useCallback((i: number) => {
    pauseForInteraction()
    setAnimated(true)
    setCurrent(i + 1)
  }, [pauseForInteraction])

  function handleTransitionEnd() {
    if (current === count + 1) {
      setAnimated(false)
      setCurrent(1)
    } else if (current === 0) {
      setAnimated(false)
      setCurrent(count)
    }
  }

  React.useEffect(() => {
    if (!autoplay || !loop || paused) return
    const timer = setInterval(() => {
      setAnimated(true)
      setCurrent((c) => Math.min(c + 1, count + 1))
    }, interval)
    return () => clearInterval(timer)
  }, [autoplay, interval, count, loop, paused])

  if (count === 0) return null

  const ordered = loop ? [slides[count - 1], ...slides, slides[0]] : slides
  const offset = loop ? current : 0
  const active = ((current - 1) % count + count) % count

  return (
    <div className={cn("group relative overflow-hidden rounded-lg", className)} {...props}>
      <div
        className={cn("flex", animated && "transition-transform duration-500 ease-in-out")}
        style={{ transform: `translateX(-${offset * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {ordered.map((slide, i) => (
          <div key={i} className="min-w-full shrink-0">
            {slide}
          </div>
        ))}
      </div>

      {arrows && loop && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-0 transition-opacity hover:bg-black/50 group-hover:opacity-100"
            aria-label="上一张"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-0 transition-opacity hover:bg-black/50 group-hover:opacity-100"
            aria-label="下一张"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      {dots && loop && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80",
              )}
              aria-label={`第 ${i + 1} 张`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
