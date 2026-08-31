import * as React from "react"
import { ChevronDown, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { controlHeight, popupPanelClass } from "@/lib/styles"
import { useClickOutside } from "@/hooks/use-click-outside"
import { Tree, type TreeDataNode } from "./tree"

export interface TreeSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value" | "defaultValue"> {
  treeData: TreeDataNode[]
  value?: string | string[]
  defaultValue?: string | string[]
  placeholder?: string
  size?: "small" | "middle" | "large"
  disabled?: boolean
  allowClear?: boolean
  showSearch?: boolean
  multiple?: boolean
  treeCheckable?: boolean
  onChange?: (value: string | string[]) => void
}

function flatten(nodes: TreeDataNode[]): TreeDataNode[] {
  return nodes.flatMap((node) => [node, ...(node.children ? flatten(node.children) : [])])
}

function filterTree(nodes: TreeDataNode[], query: string): TreeDataNode[] {
  const q = query.trim().toLowerCase()
  if (!q) return nodes
  return nodes.reduce<TreeDataNode[]>((acc, node) => {
    const children = node.children ? filterTree(node.children, q) : undefined
    const matched = String(node.title).toLowerCase().includes(q)
    if (matched || (children && children.length > 0)) {
      acc.push({ ...node, children })
    }
    return acc
  }, [])
}

export function TreeSelect({
  treeData,
  value: controlledValue,
  defaultValue,
  placeholder = "请选择",
  size = "middle",
  disabled = false,
  allowClear = true,
  showSearch = false,
  multiple = false,
  treeCheckable = false,
  onChange,
  className,
  ...props
}: TreeSelectProps) {
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    defaultValue ?? (multiple || treeCheckable ? [] : ""),
  )
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const rootRef = React.useRef<HTMLDivElement>(null)
  useClickOutside(rootRef, () => setOpen(false), open)

  const value = controlledValue ?? internalValue
  const keys = Array.isArray(value) ? value : value ? [value] : []
  const flatNodes = React.useMemo(() => flatten(treeData), [treeData])
  const selectedNodes = flatNodes.filter((node) => keys.includes(node.key))
  const filteredTree = React.useMemo(() => filterTree(treeData, search), [treeData, search])
  const height = controlHeight[size]

  function setValue(next: string | string[]) {
    setInternalValue(next)
    onChange?.(next)
  }

  function handleSelect(selectedKeys: string[]) {
    if (treeCheckable) {
      setValue(selectedKeys)
      return
    }
    if (multiple) {
      setValue(selectedKeys)
      return
    }
    const key = selectedKeys[0] ?? ""
    setValue(key)
    setOpen(false)
  }

  function handleCheck(checkedKeys: string[]) {
    setValue(checkedKeys)
  }

  function clear() {
    setValue(multiple || treeCheckable ? [] : "")
  }

  return (
    <div ref={rootRef} className={cn("relative inline-block w-full min-w-40", className)} {...props}>
      <div
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="tree"
        aria-expanded={open}
        aria-disabled={disabled}
        onClick={() => {
          if (disabled) return
          setOpen((o) => !o)
        }}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
            e.preventDefault()
            setOpen(true)
          } else if (e.key === "Escape") {
            setOpen(false)
          }
        }}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border bg-background px-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
          height,
          open && "border-primary ring-2 ring-ring/30",
        )}
      >
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
          {selectedNodes.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : multiple || treeCheckable ? (
            selectedNodes.map((node) => (
              <span key={node.key} className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs">
                <span className="truncate">{node.title}</span>
              </span>
            ))
          ) : (
            <span className="truncate">{selectedNodes[0]?.title}</span>
          )}
        </span>

        <span className="flex shrink-0 items-center gap-1 text-muted-foreground">
          {allowClear && selectedNodes.length > 0 && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation()
                clear()
              }}
              className="transition-colors hover:text-foreground"
              aria-label="清空"
            >
              <X className="size-3.5" />
            </button>
          )}
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
        </span>
      </div>

      {open && (
        <div className={cn(popupPanelClass, "w-full min-w-56 p-1.5")}>
          {showSearch && (
            <div className="flex items-center gap-2 border-b px-2 py-1.5">
              <Search className="size-3.5 text-muted-foreground" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          )}
          <div className="max-h-64 overflow-auto px-1 py-1 scrollbar-thin">
            {treeCheckable ? (
              <Tree
                checkable
                defaultExpandAll
                checkedKeys={keys}
                onCheck={handleCheck}
                treeData={filteredTree}
              />
            ) : (
              <Tree
                multiple={multiple}
                defaultExpandAll
                selectedKeys={keys}
                onSelect={handleSelect}
                treeData={filteredTree}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
