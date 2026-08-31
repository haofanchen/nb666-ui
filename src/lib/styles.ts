// 供表单控件复用的尺寸样式（高度 + 字号）
export const controlHeight = {
  small: "h-7 text-xs",
  middle: "h-9 text-sm",
  large: "h-11 text-base",
} as const

export type ControlSize = keyof typeof controlHeight

// 弹层定位（Tooltip / Popover / Popconfirm 共用）
export const overlayPlacement = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
} as const

export type OverlayPlacement = keyof typeof overlayPlacement

// 下拉弹层通用外观，新增下拉类组件可直接复用
export const popupPanelClass =
  "absolute left-0 top-full z-50 mt-1 overflow-hidden rounded-md border bg-popover p-1 shadow-card-lg"

// 表单控件校验状态边框
export const fieldStatusClass = {
  error: "border-error",
  warning: "border-warning",
} as const
