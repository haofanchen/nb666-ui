import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

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
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    if (!autoplay || count <= 1) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), interval)
    return () => clearInterval(timer)
  }, [autoplay, interval, count])

  function go(next: number) {
    setIndex((next + count) % count)
  }

  return (
    <div className={cn("group relative overflow-hidden rounded-lg", className)} {...props}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full shrink-0">
            {slide}
          </div>
        ))}
      </div>

      {arrows && count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="absolute left-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-0 transition-opacity hover:bg-black/50 group-hover:opacity-100"
            aria-label="上一张"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-0 transition-opacity hover:bg-black/50 group-hover:opacity-100"
            aria-label="下一张"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      {dots && count > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80",
              )}
              aria-label={`第 ${i + 1} 张`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
