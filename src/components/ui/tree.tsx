import * as React from "react"
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "./checkbox"

export interface TreeDataNode {
  key: string
  title: React.ReactNode
  children?: TreeDataNode[]
  disabled?: boolean
  icon?: React.ReactNode
  disableCheckbox?: boolean
  selectable?: boolean
}

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  treeData: TreeDataNode[]
  checkable?: boolean
  defaultCheckedKeys?: string[]
  checkedKeys?: string[]
  onCheck?: (checkedKeys: string[], info: { node: TreeDataNode; checked: boolean }) => void
  expandedKeys?: string[]
  defaultExpandedKeys?: string[]
  defaultExpandAll?: boolean
  onExpand?: (expandedKeys: string[], info: { node: TreeDataNode; expanded: boolean }) => void
  selectedKeys?: string[]
  defaultSelectedKeys?: string[]
  multiple?: boolean
  onSelect?: (selectedKeys: string[], info: { node: TreeDataNode }) => void
  showLine?: boolean
}

function getAllKeys(nodes: TreeDataNode[]): string[] {
  return nodes.flatMap((node) => [node.key, ...(node.children ? getAllKeys(node.children) : [])])
}

function collectExpandableKeys(nodes: TreeDataNode[]): string[] {
  return nodes.flatMap((node) =>
    node.children && node.children.length > 0
      ? [node.key, ...collectExpandableKeys(node.children)]
      : [],
  )
}

function hasCheckedDescendant(node: TreeDataNode, checkedSet: Set<string>): boolean {
  return (
    node.children?.some((child) => checkedSet.has(child.key) || hasCheckedDescendant(child, checkedSet)) ??
    false
  )
}

function nodeCheckState(node: TreeDataNode, checkedSet: Set<string>): "checked" | "indeterminate" | "none" {
  if (node.children && node.children.length > 0) {
    if (checkedSet.has(node.key)) return "checked"
    return hasCheckedDescendant(node, checkedSet) ? "indeterminate" : "none"
  }
  return checkedSet.has(node.key) ? "checked" : "none"
}

function normalizeChecked(nodes: TreeDataNode[], checkedSet: Set<string>) {
  for (const node of nodes) {
    if (node.children && node.children.length > 0) {
      normalizeChecked(node.children, checkedSet)
      const allChildrenChecked = node.children.every((child) => checkedSet.has(child.key))
      if (allChildrenChecked) checkedSet.add(node.key)
      else checkedSet.delete(node.key)
    }
  }
}

interface TreeContextValue {
  expandedSet: Set<string>
  checkedSet: Set<string>
  selectedKeys: string[]
  checkable: boolean
  multiple: boolean
  showLine: boolean
  toggleExpand: (node: TreeDataNode) => void
  toggleCheck: (node: TreeDataNode, checked: boolean) => void
  select: (node: TreeDataNode) => void
}

const TreeContext = React.createContext<TreeContextValue | null>(null)

function TreeNode({ node, level }: { node: TreeDataNode; level: number }) {
  const tree = React.useContext(TreeContext)!
  const hasChildren = !!node.children && node.children.length > 0
  const expanded = tree.expandedSet.has(node.key)
  const checkState = nodeCheckState(node, tree.checkedSet)
  const selected = tree.selectedKeys.includes(node.key)
  const disabled = node.disabled

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 rounded-md py-1 pr-2 text-sm transition-colors",
          selected ? "bg-primary/10 text-primary" : "hover:bg-accent/60",
          disabled && "opacity-50",
        )}
        style={tree.showLine ? undefined : { paddingLeft: level * 20 + 4 }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => tree.toggleExpand(node)}
            className="flex size-5 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
            aria-label={expanded ? "折叠" : "展开"}
          >
            <ChevronRight className={cn("size-4 transition-transform", expanded && "rotate-90")} />
          </button>
        ) : (
          <span className="inline-block w-5 shrink-0" />
        )}

        {tree.checkable && !node.disableCheckbox && (
          <Checkbox
            checked={checkState === "checked"}
            indeterminate={checkState === "indeterminate"}
            disabled={disabled}
            onChange={(checked) => tree.toggleCheck(node, checked)}
          />
        )}

        <span
          className={cn("flex min-w-0 flex-1 cursor-pointer items-center gap-1.5")}
          onClick={() => tree.select(node)}
        >
          {node.icon ?? (hasChildren ? (expanded ? <FolderOpen className="size-4 shrink-0 text-muted-foreground" /> : <Folder className="size-4 shrink-0 text-muted-foreground" />) : <File className="size-4 shrink-0 text-muted-foreground" />)}
          <span className="truncate">{node.title}</span>
        </span>
      </div>

      {hasChildren && expanded && (
        <div className={tree.showLine ? "ml-[10px] border-l border-border pl-3" : undefined}>
          {node.children!.map((child) => (
            <TreeNode key={child.key} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function Tree({
  treeData,
  checkable = false,
  defaultCheckedKeys = [],
  checkedKeys,
  onCheck,
  expandedKeys,
  defaultExpandedKeys = [],
  defaultExpandAll = false,
  onExpand,
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  multiple = false,
  onSelect,
  showLine = false,
  className,
  ...props
}: TreeProps) {
  const [internalCheckedKeys, setInternalCheckedKeys] = React.useState<string[]>(defaultCheckedKeys)
  const [internalExpandedKeys, setInternalExpandedKeys] = React.useState<string[]>(
    defaultExpandAll ? collectExpandableKeys(treeData) : defaultExpandedKeys,
  )
  const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<string[]>(defaultSelectedKeys)

  React.useEffect(() => {
    if (defaultExpandAll && expandedKeys === undefined) {
      setInternalExpandedKeys(collectExpandableKeys(treeData))
    }
  }, [defaultExpandAll, treeData, expandedKeys])

  const currentCheckedKeys = checkedKeys ?? internalCheckedKeys
  const currentExpandedKeys = expandedKeys ?? internalExpandedKeys
  const currentSelectedKeys = controlledSelectedKeys ?? internalSelectedKeys

  const checkedSet = React.useMemo(() => new Set(currentCheckedKeys), [currentCheckedKeys])
  const expandedSet = React.useMemo(() => new Set(currentExpandedKeys), [currentExpandedKeys])

  function toggleExpand(node: TreeDataNode) {
    const next = expandedSet.has(node.key)
      ? currentExpandedKeys.filter((key) => key !== node.key)
      : [...currentExpandedKeys, node.key]
    setInternalExpandedKeys(next)
    onExpand?.(next, { node, expanded: !expandedSet.has(node.key) })
  }

  function toggleCheck(node: TreeDataNode, checked: boolean) {
    const nextSet = new Set(currentCheckedKeys)
    const keys = getAllKeys([node])
    keys.forEach((key) => (checked ? nextSet.add(key) : nextSet.delete(key)))
    normalizeChecked(treeData, nextSet)
    const next = [...nextSet]
    setInternalCheckedKeys(next)
    onCheck?.(next, { node, checked })
  }

  function select(node: TreeDataNode) {
    if (node.disabled || node.selectable === false) return
    const next = multiple
      ? currentSelectedKeys.includes(node.key)
        ? currentSelectedKeys.filter((key) => key !== node.key)
        : [...currentSelectedKeys, node.key]
      : [node.key]
    setInternalSelectedKeys(next)
    onSelect?.(next, { node })
  }

  const contextValue = React.useMemo<TreeContextValue>(
    () => ({
      expandedSet,
      checkedSet,
      selectedKeys: currentSelectedKeys,
      checkable,
      multiple,
      showLine,
      toggleExpand,
      toggleCheck,
      select,
    }),
    [expandedSet, checkedSet, currentSelectedKeys, checkable, multiple, showLine],
  )

  return (
    <TreeContext.Provider value={contextValue}>
      <div className={cn("text-sm", className)} {...props}>
        {treeData.map((node) => (
          <TreeNode key={node.key} node={node} level={0} />
        ))}
      </div>
    </TreeContext.Provider>
  )
}
