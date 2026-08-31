import * as React from "react"
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"
import { Pagination } from "./pagination"
import { Checkbox } from "./checkbox"

export interface TableColumn<T = Record<string, unknown>> {
  title: React.ReactNode
  dataIndex?: string
  key?: string
  width?: number | string
  align?: "left" | "center" | "right"
  render?: (value: unknown, record: T, index: number) => React.ReactNode
  sorter?: (a: T, b: T) => number
}

export interface TablePagination {
  current?: number
  pageSize?: number
  total?: number
  showSizeChanger?: boolean
  onChange?: (page: number, pageSize: number) => void
}

export interface TableRowSelection<T> {
  selectedRowKeys?: (string | number)[]
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void
}

export interface TableProps<T = Record<string, unknown>> extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  columns: TableColumn<T>[]
  dataSource: T[]
  rowKey?: string | ((record: T) => string | number)
  loading?: boolean
  bordered?: boolean
  size?: "small" | "middle"
  pagination?: TablePagination | false
  rowSelection?: TableRowSelection<T>
}

export function Table<T extends Record<string, unknown>>({
  columns,
  dataSource,
  rowKey = "key",
  loading = false,
  bordered = false,
  size = "middle",
  pagination = { pageSize: 10 },
  rowSelection,
  className,
  ...props
}: TableProps<T>) {
  const [page, setPage] = React.useState(pagination !== false ? (pagination?.current ?? 1) : 1)
  const [pageSize, setPageSize] = React.useState(pagination !== false ? (pagination?.pageSize ?? 10) : 10)
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortOrder, setSortOrder] = React.useState<"ascend" | "descend">("ascend")
  const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<(string | number)[]>([])

  const current = pagination !== false && pagination.current !== undefined ? pagination.current : page
  const sizePerPage = pagination !== false && pagination.pageSize !== undefined ? pagination.pageSize : pageSize
  const total = pagination !== false && pagination.total !== undefined ? pagination.total : dataSource.length
  const selectedRowKeys = rowSelection?.selectedRowKeys ?? internalSelectedKeys

  function getRowKey(record: T, index: number): string | number {
    if (typeof rowKey === "function") return rowKey(record)
    return (record[rowKey] as string | number | undefined) ?? index
  }

  function updateSelected(next: (string | number)[]) {
    setInternalSelectedKeys(next)
    const selectedRows = dataSource.filter((record, i) => next.includes(getRowKey(record, i)))
    rowSelection?.onChange?.(next, selectedRows)
  }

  function toggleSort(col: TableColumn<T>) {
    if (!col.sorter) return
    const key = String(col.key ?? col.dataIndex ?? "")
    if (sortKey !== key) {
      setSortKey(key)
      setSortOrder("ascend")
    } else if (sortOrder === "ascend") {
      setSortOrder("descend")
    } else {
      setSortKey(null)
    }
  }

  const sortedData = React.useMemo(() => {
    if (!sortKey) return dataSource
    const col = columns.find((c) => String(c.key ?? c.dataIndex ?? "") === sortKey)
    if (!col?.sorter) return dataSource
    const sorted = [...dataSource].sort(col.sorter)
    return sortOrder === "descend" ? sorted.reverse() : sorted
  }, [dataSource, columns, sortKey, sortOrder])

  const pagedData =
    pagination === false ? sortedData : sortedData.slice((current - 1) * sizePerPage, current * sizePerPage)

  const pageKeys = pagedData.map((record) => getRowKey(record, sortedData.indexOf(record)))
  const allPageSelected = pageKeys.length > 0 && pageKeys.every((key) => selectedRowKeys.includes(key))
  const somePageSelected = pageKeys.some((key) => selectedRowKeys.includes(key)) && !allPageSelected

  const cellPadding = size === "small" ? "px-3 py-1.5" : "px-4 py-3"
  const alignClass: Record<string, string> = { left: "text-left", center: "text-center", right: "text-right" }
  const columnCount = columns.length + (rowSelection ? 1 : 0)

  return (
    <div className={cn("w-full overflow-hidden rounded-lg", bordered && "border", className)} {...props}>
      <div className="relative w-full overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-muted/60">
              {rowSelection && (
                <th className={cn("w-10 border-b border-border", bordered && "border-r")}>
                  <Checkbox
                    checked={allPageSelected}
                    indeterminate={somePageSelected}
                    onChange={(checked) => {
                      const next = checked
                        ? [...new Set([...selectedRowKeys, ...pageKeys])]
                        : selectedRowKeys.filter((key) => !pageKeys.includes(key))
                      updateSelected(next)
                    }}
                  />
                </th>
              )}
              {columns.map((col, i) => {
                const key = String(col.key ?? col.dataIndex ?? i)
                const isActive = sortKey === key
                return (
                  <th
                    key={key}
                    style={{ width: col.width }}
                    onClick={() => toggleSort(col)}
                    className={cn(
                      "border-b border-border font-medium text-foreground",
                      cellPadding,
                      alignClass[col.align ?? "left"],
                      bordered && "border-r last:border-r-0",
                      col.sorter && "cursor-pointer select-none hover:bg-accent/40",
                    )}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.title}
                      {col.sorter && (
                        <span className="flex flex-col">
                          <ChevronUp
                            className={cn(
                              "size-3 -mb-1",
                              isActive && sortOrder === "ascend" ? "text-primary" : "text-muted-foreground/50",
                            )}
                          />
                          <ChevronDown
                            className={cn(
                              "size-3",
                              isActive && sortOrder === "descend" ? "text-primary" : "text-muted-foreground/50",
                            )}
                          />
                        </span>
                      )}
                    </span>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {pagedData.map((record, i) => {
              const key = getRowKey(record, sortedData.indexOf(record))
              return (
                <tr key={key} className="transition-colors hover:bg-accent/40">
                  {rowSelection && (
                    <td className={cn("border-b border-border", bordered && "border-r")}>
                      <Checkbox
                        checked={selectedRowKeys.includes(key)}
                        onChange={(checked) => {
                          const next = checked
                            ? [...selectedRowKeys, key]
                            : selectedRowKeys.filter((k) => k !== key)
                          updateSelected(next)
                        }}
                      />
                    </td>
                  )}
                  {columns.map((col, j) => {
                    const value = col.dataIndex ? record[col.dataIndex] : undefined
                    return (
                      <td
                        key={col.key ?? col.dataIndex ?? j}
                        className={cn(
                          "border-b border-border text-foreground/90",
                          cellPadding,
                          alignClass[col.align ?? "left"],
                          bordered && "border-r last:border-r-0",
                        )}
                      >
                        {col.render ? col.render(value, record, i) : (value as React.ReactNode)}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            {pagedData.length === 0 && (
              <tr>
                <td colSpan={columnCount} className="py-12 text-center text-muted-foreground">
                  暂无数据
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
            <Loader2 className="size-6 animate-spin text-primary" />
          </div>
        )}
      </div>

      {pagination !== false && total > 0 && (
        <div className="flex justify-end border-t px-4 py-3">
          <Pagination
            current={current}
            pageSize={sizePerPage}
            total={total}
            showSizeChanger={pagination.showSizeChanger}
            onChange={(p, ps) => {
              setPage(p)
              setPageSize(ps)
              pagination.onChange?.(p, ps)
            }}
          />
        </div>
      )}
    </div>
  )
}
