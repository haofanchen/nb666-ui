import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "../../lib/utils"

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLUListElement>, "onChange"> {
  current?: number
  defaultCurrent?: number
  total?: number
  pageSize?: number
  defaultPageSize?: number
  onChange?: (page: number, pageSize: number) => void
  showSizeChanger?: boolean
  pageSizeOptions?: number[]
  showTotal?: (total: number, range: [number, number]) => React.ReactNode
  showQuickJumper?: boolean
  simple?: boolean
  disabled?: boolean
  hideOnSinglePage?: boolean
}

function getRange(total: number, current: number, pageSize: number): [number, number] {
  const start = total === 0 ? 0 : (current - 1) * pageSize + 1
  const end = Math.min(current * pageSize, total)
  return [start, end]
}

function getPages(current: number, pageCount: number): (number | "ellipsis")[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1)
  const pages: (number | "ellipsis")[] = [1]
  const left = Math.max(2, current - 1)
  const right = Math.min(pageCount - 1, current + 1)
  if (left > 2) pages.push("ellipsis")
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < pageCount - 1) pages.push("ellipsis")
  pages.push(pageCount)
  return pages
}

export function Pagination({
  current: controlledCurrent,
  defaultCurrent = 1,
  total = 0,
  pageSize: controlledPageSize,
  defaultPageSize = 10,
  onChange,
  showSizeChanger = false,
  pageSizeOptions = [10, 20, 50, 100],
  showTotal,
  showQuickJumper = false,
  simple = false,
  disabled = false,
  hideOnSinglePage = false,
  className,
  ...props
}: PaginationProps) {
  const [internalCurrent, setInternalCurrent] = React.useState(defaultCurrent)
  const [internalPageSize, setInternalPageSize] = React.useState(defaultPageSize)
  const [jumpValue, setJumpValue] = React.useState("")
  const current = controlledCurrent ?? internalCurrent
  const pageSize = controlledPageSize ?? internalPageSize
  const pageCount = Math.max(1, Math.ceil(total / pageSize))

  if (hideOnSinglePage && pageCount <= 1) return null

  function changePage(page: number) {
    if (disabled) return
    const next = Math.min(Math.max(1, page), pageCount)
    setInternalCurrent(next)
    onChange?.(next, pageSize)
  }

  function changeSize(size: number) {
    if (disabled) return
    setInternalPageSize(size)
    setInternalCurrent(1)
    onChange?.(1, size)
  }

  function jump(page: number) {
    if (disabled || !page) return
    changePage(page)
    setJumpValue("")
  }

  const itemClass = "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm transition-colors"

  if (simple) {
    return (
      <div className={cn("flex items-center gap-3 text-sm", className)}>
        <button
          type="button"
          disabled={disabled || current <= 1}
          onClick={() => changePage(current - 1)}
          className={cn(itemClass, "border hover:border-primary hover:text-primary disabled:opacity-40")}
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-muted-foreground">
          {current} / {pageCount}
        </span>
        <button
          type="button"
          disabled={disabled || current >= pageCount}
          onClick={() => changePage(current + 1)}
          className={cn(itemClass, "border hover:border-primary hover:text-primary disabled:opacity-40")}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    )
  }

  const range = getRange(total, current, pageSize)

  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      {showTotal && <span className="text-sm text-muted-foreground">{showTotal(total, range)}</span>}
      <ul className="flex items-center gap-1" {...props}>
        <li>
          <button
            type="button"
            disabled={disabled || current <= 1}
            onClick={() => changePage(current - 1)}
            className={cn(itemClass, "border hover:border-primary hover:text-primary disabled:opacity-40")}
            aria-label="上一页"
          >
            <ChevronLeft className="size-4" />
          </button>
        </li>
        {getPages(current, pageCount).map((page, i) =>
          page === "ellipsis" ? (
            <li key={`e-${i}`}>
              <span className={cn(itemClass, "text-muted-foreground")}>
                <MoreHorizontal className="size-4" />
              </span>
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => changePage(page)}
                className={cn(
                  itemClass,
                  "border",
                  page === current
                    ? "border-primary bg-primary text-primary-foreground"
                    : "hover:border-primary hover:text-primary",
                )}
              >
                {page}
              </button>
            </li>
          ),
        )}
        <li>
          <button
            type="button"
            disabled={disabled || current >= pageCount}
            onClick={() => changePage(current + 1)}
            className={cn(itemClass, "border hover:border-primary hover:text-primary disabled:opacity-40")}
            aria-label="下一页"
          >
            <ChevronRight className="size-4" />
          </button>
        </li>
      </ul>
      {showSizeChanger && (
        <select
          value={pageSize}
          disabled={disabled}
          onChange={(e) => changeSize(Number(e.target.value))}
          className="h-8 rounded-md border bg-background px-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt} 条/页
            </option>
          ))}
        </select>
      )}
      {showQuickJumper && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          跳至
          <input
            type="number"
            min={1}
            max={pageCount}
            value={jumpValue}
            disabled={disabled}
            onChange={(e) => setJumpValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && jump(Number(jumpValue))}
            onBlur={() => jump(Number(jumpValue))}
            className="h-8 w-14 rounded-md border bg-background px-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30 disabled:opacity-50"
          />
          页
        </div>
      )}
    </div>
  )
}
