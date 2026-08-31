import * as React from "react"

/**
 * 点击元素外部时触发回调。
 *
 * - `active` 为 `false` 时不监听，适合弹层关闭后忽略外部点击。
 * - 使用 `handlerRef` 避免回调引用变化导致重复绑定。
 */
export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
  active = true,
) {
  const handlerRef = React.useRef(handler)

  React.useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  React.useEffect(() => {
    if (!active) return
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) handlerRef.current()
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [ref, active])
}
