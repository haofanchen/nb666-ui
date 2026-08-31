import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "../../lib/utils"
import { useControllableState } from "../../hooks/use-controllable"

export interface RateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  defaultValue?: number
  count?: number
  disabled?: boolean
  allowClear?: boolean
  allowHalf?: boolean
  onChange?: (value: number) => void
}

export function Rate({
  value,
  defaultValue = 0,
  count = 5,
  disabled = false,
  allowClear = true,
  allowHalf = false,
  onChange,
  className,
  ...props
}: RateProps) {
  const [current, setCurrent] = useControllableState(value, defaultValue)
  const [hover, setHover] = React.useState<number>(0)
  const display = hover || current

  function starValue(e: React.MouseEvent<HTMLButtonElement>, star: number) {
    if (!allowHalf) return star
    const rect = e.currentTarget.getBoundingClientRect()
    return e.clientX - rect.left < rect.width / 2 ? star - 0.5 : star
  }

  function select(next: number) {
    if (disabled) return
    const value = allowClear && current === next ? 0 : next
    setCurrent(value)
    onChange?.(value)
  }

  return (
    <div className={cn("inline-flex items-center gap-0.5", disabled && "opacity-50", className)} {...props}>
      {Array.from({ length: count }, (_, i) => i + 1).map((star) => {
        const full = display >= star
        const half = allowHalf && !full && display >= star - 0.5

        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={(e) => select(starValue(e, star))}
            onMouseMove={(e) => !disabled && setHover(starValue(e, star))}
            onMouseLeave={() => setHover(0)}
            className="p-0.5 transition-transform hover:scale-110 disabled:pointer-events-none"
            aria-label={`${star} 星`}
          >
            <span className="relative block size-5">
              <Star className="absolute inset-0 size-5 fill-muted text-muted" />
              {full && <Star className="absolute inset-0 size-5 fill-warning text-warning" />}
              {half && (
                <span className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                  <Star className="size-5 fill-warning text-warning" />
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
