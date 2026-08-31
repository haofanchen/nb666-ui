import * as React from "react"

/**
 * 受控/非受控值的统一封装。
 *
 * - 当 `controlled` 不为 `undefined` 时返回受控值，否则返回内部状态。
 * - 组件内部始终通过返回的 `setState` 更新，受控模式下该更新会被忽略。
 *
 * @example
 * const [value, setValue] = useControllableState(propValue, propDefaultValue)
 */
export function useControllableState<T>(controlled: T | undefined, defaultValue: T) {
  const [state, setState] = React.useState<T>(defaultValue)
  const value = controlled !== undefined ? controlled : state
  return [value, setState] as const
}
