// Aurora UI 统一导出入口。
// 新增组件后，按对应分类补充 value + type 导出即可。

// 通用 General
export { Button, buttonVariants } from "./button"
export type { ButtonProps } from "./button"

export { Icon, icons, iconNames, commonIconNames } from "./icon"
export type { IconProps } from "./icon"

export { Link, Paragraph, Text, Title, Typography } from "./typography"

export { FloatButton } from "./float-button"
export type { FloatButtonProps } from "./float-button"

// 布局 Layout
export { Space, SpaceCompact } from "./space"
export type { SpaceCompactProps, SpaceProps } from "./space"

export { Divider } from "./divider"
export type { DividerProps } from "./divider"

export { Col, Row } from "./grid"
export type { ColProps, RowProps } from "./grid"

export { Layout, Header, Sider, Content, Footer } from "./layout"
export type { LayoutProps } from "./layout"

export { Flex } from "./flex"
export type { FlexProps } from "./flex"

export { Affix } from "./affix"
export type { AffixProps } from "./affix"

// 导航 Navigation
export { Breadcrumb } from "./breadcrumb"
export type { BreadcrumbItem, BreadcrumbProps } from "./breadcrumb"

export { Anchor } from "./anchor"
export type { AnchorLink, AnchorProps } from "./anchor"

export { Tabs } from "./tabs"
export type { TabsItem, TabsProps, TabPosition } from "./tabs"

export { Pagination } from "./pagination"
export type { PaginationProps } from "./pagination"

export { Menu } from "./menu"
export type { MenuItemType, MenuProps } from "./menu"

export { Dropdown } from "./dropdown"
export type { DropdownMenuItem, DropdownProps } from "./dropdown"

export { Steps } from "./steps"
export type { StepItem, StepsProps } from "./steps"

export { BackTop } from "./back-top"
export type { BackTopProps } from "./back-top"

// 数据录入 Data Entry
export { Input } from "./input"
export type { InputProps } from "./input"

export { InputNumber } from "./input-number"
export type { InputNumberProps } from "./input-number"

export { Select } from "./select"
export type { SelectOption, SelectProps } from "./select"

export { Checkbox, CheckboxGroup } from "./checkbox"
export type { CheckboxGroupProps, CheckboxOption, CheckboxProps } from "./checkbox"

export { Radio, RadioGroup } from "./radio"
export type { RadioGroupProps, RadioOption, RadioProps } from "./radio"

export { Switch } from "./switch"
export type { SwitchProps } from "./switch"

export { Slider } from "./slider"
export type { SliderProps } from "./slider"

export { Form, FormItem, FormList } from "./form"
export type { FormInstance, FormItemProps, FormListFieldData, FormListOperations, FormListProps, FormRule, FormProps, NamePath } from "./form"

export { Rate } from "./rate"
export type { RateProps } from "./rate"

export { Segmented } from "./segmented"
export type { SegmentedOption, SegmentedProps } from "./segmented"

export { Upload } from "./upload"
export type { UploadFile, UploadProps } from "./upload"

export { AutoComplete } from "./auto-complete"
export type { AutoCompleteOption, AutoCompleteProps } from "./auto-complete"

export { ColorPicker } from "./color-picker"
export type { ColorPickerProps } from "./color-picker"

export { DatePicker } from "./date-picker"
export type { DatePickerProps } from "./date-picker"

export { TimePicker } from "./time-picker"
export type { TimePickerProps } from "./time-picker"

export { RangePicker } from "./range-picker"
export type { RangePickerProps } from "./range-picker"

export { Cascader } from "./cascader"
export type { CascaderOption, CascaderProps } from "./cascader"

export { Mentions } from "./mentions"
export type { MentionOption, MentionsProps } from "./mentions"

export { Transfer } from "./transfer"
export type { TransferItem, TransferProps } from "./transfer"

export { TreeSelect } from "./tree-select"
export type { TreeSelectProps } from "./tree-select"

export { TextArea } from "./textarea"
export type { TextAreaProps } from "./textarea"

// 数据展示 Data Display
export { Card, CardMeta } from "./card"
export type { CardMetaProps, CardProps } from "./card"

export { Table } from "./table"
export type { TableColumn, TablePagination, TableProps } from "./table"

export { Tag } from "./tag"
export type { TagProps } from "./tag"

export { Badge } from "./badge"
export type { BadgeProps } from "./badge"

export { Avatar, AvatarGroup } from "./avatar"
export type { AvatarGroupProps, AvatarProps } from "./avatar"

export { Tooltip } from "./tooltip"
export type { TooltipProps } from "./tooltip"

export { Alert } from "./alert"
export type { AlertProps } from "./alert"

export { Empty } from "./empty"
export type { EmptyProps } from "./empty"

export { Collapse } from "./collapse"
export type { CollapseItem, CollapseProps } from "./collapse"

export { Statistic } from "./statistic"
export type { StatisticProps } from "./statistic"

export { Countdown } from "./countdown"
export type { CountdownProps } from "./countdown"

export { Timeline } from "./timeline"
export type { TimelineItem, TimelineProps } from "./timeline"

export { Descriptions } from "./descriptions"
export type { DescriptionsItem, DescriptionsProps } from "./descriptions"

export { List } from "./list"
export type { ListProps } from "./list"

export { Popover } from "./popover"
export type { PopoverProps } from "./popover"

export { Carousel } from "./carousel"
export type { CarouselProps } from "./carousel"

export { Image } from "./image"
export type { ImageProps } from "./image"

export { Skeleton } from "./skeleton"
export type { SkeletonProps } from "./skeleton"

export { Tree } from "./tree"
export type { TreeDataNode, TreeProps } from "./tree"

export { Calendar } from "./calendar"
export type { CalendarProps } from "./calendar"

export { Watermark } from "./watermark"
export type { WatermarkProps } from "./watermark"

export { Sortable } from "./sortable"
export type { SortableProps } from "./sortable"

export { InfiniteScroll } from "./infinite-scroll"
export type { InfiniteScrollProps } from "./infinite-scroll"

// 反馈 Feedback
export { Modal } from "./modal"
export type { ModalProps } from "./modal"

export { modal, ModalHolder } from "./modal-confirm"
export type { ModalMethodOptions } from "./modal-confirm"

export { message, MessageHolder } from "./message"

export { Progress } from "./progress"
export type { ProgressProps } from "./progress"

export { Spin } from "./spin"
export type { SpinProps } from "./spin"

export { Drawer } from "./drawer"
export type { DrawerProps } from "./drawer"

export { notification, NotificationHolder } from "./notification"

export { Result } from "./result"
export type { ResultProps } from "./result"

export { Popconfirm } from "./popconfirm"
export type { PopconfirmProps } from "./popconfirm"

export { Tour } from "./tour"
export type { TourProps, TourStep } from "./tour"

// 自动导入工具
export { AuroraUIResolver, auroraComponentNames } from "./resolver"
export type { AuroraAutoImportResolver } from "./resolver"
