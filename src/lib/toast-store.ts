export interface ToastItem {
  id: number
}

// 通用轻量外部存储，供 message / notification 等全局提示复用
export function createToastStore<T extends ToastItem>() {
  let items: T[] = []
  let counter = 0
  const listeners = new Set<() => void>()

  const emit = () => listeners.forEach((listener) => listener())

  function subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }

  function getSnapshot() {
    return items
  }

  function add(item: Omit<T, "id">) {
    const id = ++counter
    const next = { ...item, id } as T
    items = [...items, next]
    emit()
    return id
  }

  function remove(id: number) {
    items = items.filter((item) => item.id !== id)
    emit()
  }

  function clear() {
    items = []
    emit()
  }

  return { subscribe, getSnapshot, add, remove, clear }
}
