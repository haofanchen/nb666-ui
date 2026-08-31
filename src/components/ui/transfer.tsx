import * as React from "react"
import { ArrowLeft, ArrowRight, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "./checkbox"

export interface TransferItem {
  key: string | number
  title: React.ReactNode
  disabled?: boolean
}

export interface TransferProps {
  dataSource: TransferItem[]
  targetKeys?: (string | number)[]
  defaultTargetKeys?: (string | number)[]
  onChange?: (
    targetKeys: (string | number)[],
    direction: "left" | "right",
    movedKeys: (string | number)[],
  ) => void
  titles?: [React.ReactNode, React.ReactNode]
  showSearch?: boolean
  disabled?: boolean
  oneWay?: boolean
  render?: (item: TransferItem) => React.ReactNode
  className?: string
}

export function Transfer({
  dataSource,
  targetKeys: controlledTargetKeys,
  defaultTargetKeys = [],
  onChange,
  titles = ["源列表", "目标列表"],
  showSearch = false,
  disabled = false,
  oneWay = false,
  render,
  className,
}: TransferProps) {
  const [internalTargetKeys, setInternalTargetKeys] = React.useState<(string | number)[]>(defaultTargetKeys)
  const [leftSelected, setLeftSelected] = React.useState<(string | number)[]>([])
  const [rightSelected, setRightSelected] = React.useState<(string | number)[]>([])
  const [leftQuery, setLeftQuery] = React.useState("")
  const [rightQuery, setRightQuery] = React.useState("")

  const targetKeys = controlledTargetKeys ?? internalTargetKeys
  const targetSet = new Set(targetKeys)
  const leftItems = dataSource.filter((item) => !targetSet.has(item.key))
  const rightItems = dataSource.filter((item) => targetSet.has(item.key))

  function setTargets(next: (string | number)[]) {
    setInternalTargetKeys(next)
  }

  function moveLeft() {
    if (rightSelected.length === 0) return
    const next = targetKeys.filter((key) => !rightSelected.includes(key))
    setTargets(next)
    onChange?.(next, "left", rightSelected)
    setRightSelected([])
  }

  function moveRight() {
    if (leftSelected.length === 0) return
    const next = [...new Set([...targetKeys, ...leftSelected])]
    setTargets(next)
    onChange?.(next, "right", leftSelected)
    setLeftSelected([])
  }

  function renderPanel(
    side: "left" | "right",
    items: TransferItem[],
    selected: (string | number)[],
    setSelected: React.Dispatch<React.SetStateAction<(string | number)[]>>,
    query: string,
    setQuery: React.Dispatch<React.SetStateAction<string>>,
  ) {
    const filtered = query.trim()
      ? items.filter((item) => String(item.title).toLowerCase().includes(query.trim().toLowerCase()))
      : items
    const selectableKeys = filtered.filter((item) => !item.disabled).map((item) => item.key)
    const allChecked = selectableKeys.length > 0 && selectableKeys.every((key) => selected.includes(key))
    const someChecked = selectableKeys.some((key) => selected.includes(key)) && !allChecked

    function toggle(key: string | number) {
      setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
    }

    function toggleAll(checked: boolean) {
      setSelected((prev) => {
        const base = checked
          ? [...new Set([...prev, ...selectableKeys])]
          : prev.filter((key) => !selectableKeys.includes(key))
        return base
      })
    }

    return (
      <div className="flex h-64 min-w-0 flex-1 flex-col overflow-hidden rounded-lg border bg-card">
        <div className="flex items-center justify-between border-b bg-muted/40 px-3 py-2">
          <Checkbox checked={allChecked} indeterminate={someChecked} disabled={disabled} onChange={toggleAll}>
            {side === "left" ? titles[0] : titles[1]}
          </Checkbox>
          <span className="text-xs text-muted-foreground">
            {selected.filter((key) => selectableKeys.includes(key)).length}/{filtered.length}
          </span>
        </div>
        {showSearch && (
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <Search className="size-3.5 shrink-0 text-muted-foreground" />
            <input
              value={query}
              disabled={disabled}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        )}
        <ul className="flex-1 overflow-auto p-1.5 scrollbar-thin">
          {filtered.length === 0 ? (
            <li className="py-8 text-center text-sm text-muted-foreground">暂无数据</li>
          ) : (
            filtered.map((item) => (
              <li key={String(item.key)}>
                <label
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors hover:bg-accent/60",
                    item.disabled && "cursor-not-allowed opacity-50",
                  )}
                >
                  <Checkbox
                    checked={selected.includes(item.key)}
                    disabled={disabled || item.disabled}
                    onChange={() => toggle(item.key)}
                  />
                  <span className="truncate">{render ? render(item) : item.title}</span>
                </label>
              </li>
            ))
          )}
        </ul>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {renderPanel("left", leftItems, leftSelected, setLeftSelected, leftQuery, setLeftQuery)}
      <div className="flex shrink-0 flex-col gap-2">
        <button
          type="button"
          disabled={disabled || leftSelected.length === 0}
          onClick={moveRight}
          className="flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
          aria-label="移到右侧"
        >
          <ArrowRight className="size-4" />
        </button>
        {!oneWay && (
          <button
            type="button"
            disabled={disabled || rightSelected.length === 0}
            onClick={moveLeft}
            className="flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
            aria-label="移到左侧"
          >
            <ArrowLeft className="size-4" />
          </button>
        )}
      </div>
      {renderPanel("right", rightItems, rightSelected, setRightSelected, rightQuery, setRightQuery)}
    </div>
  )
}
