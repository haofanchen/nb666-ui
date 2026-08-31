import { Breadcrumb, Button, Icon, Menu, Pagination, Tabs } from "aurora-ui"
import type { ComponentDoc } from "../data/types"

export const navigationComponents: ComponentDoc[] = [
  {
    name: "Breadcrumb",
    path: "/components/breadcrumb",
    title: "面包屑 Breadcrumb",
    description: "显示当前页面在系统层级结构中的位置。",
    categoryKey: "navigation",
    whenToUse: "当系统层级较深、需要让用户清晰感知当前位置与返回路径时使用。",
    importCode: `import { Breadcrumb } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "通过 items 配置每一级面包屑。",
        code: `import { Breadcrumb } from "aurora-ui"

export default function Demo() {
  return (
    <Breadcrumb
      items={[
        { title: "首页", href: "/" },
        { title: "组件", href: "/components" },
        { title: "通用" },
        { title: "面包屑" },
      ]}
    />
  )
}`,
        element: (
          <Breadcrumb
            items={[
              { title: "首页", href: "/" },
              { title: "组件", href: "/components" },
              { title: "通用" },
              { title: "面包屑" },
            ]}
          />
        ),
      },
      {
        id: "icon",
        title: "带图标与分隔符",
        description: "支持图标与自定义分隔符。",
        code: `import { Breadcrumb, Icon } from "aurora-ui"

export default function Demo() {
  return (
    <Breadcrumb
      separator="/"
      items={[
        { title: "首页", icon: <Icon name="home" size={14} />, href: "/" },
        { title: "用户", icon: <Icon name="user" size={14} />, href: "/users" },
        { title: "详情" },
      ]}
    />
  )
}`,
        element: (
          <Breadcrumb
            separator="/"
            items={[
              { title: "首页", icon: <Icon name="home" size={14} />, href: "/" },
              { title: "用户", icon: <Icon name="user" size={14} />, href: "/users" },
              { title: "详情" },
            ]}
          />
        ),
      },
    ],
    api: [
      { name: "items", description: "面包屑项配置", type: "BreadcrumbItem[]", default: "-" },
      { name: "separator", description: "分隔符", type: "React.ReactNode", default: ">" },
      { name: "item.title", description: "面包屑项标题", type: "React.ReactNode", default: "-", required: true },
      { name: "item.href", description: "链接地址", type: "string", default: "-" },
      { name: "item.icon", description: "图标", type: "React.ReactNode", default: "-" },
    ],
  },
  {
    name: "Tabs",
    path: "/components/tabs",
    title: "标签页 Tabs",
    description: "选项卡切换组件，用于承载同一层级下的不同内容。",
    categoryKey: "navigation",
    whenToUse: "当内容需要分组展示，且组间切换频率较高时使用。",
    importCode: `import { Tabs } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "默认选中第一项，通过 onChange 监听切换。",
        code: `import { Tabs } from "aurora-ui"

export default function Demo() {
  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        { key: "1", label: "标签一", children: "标签一的内容" },
        { key: "2", label: "标签二", children: "标签二的内容" },
        { key: "3", label: "标签三", children: "标签三的内容" },
      ]}
    />
  )
}`,
        element: (
          <Tabs
            defaultActiveKey="1"
            items={[
              { key: "1", label: "标签一", children: "标签一的内容" },
              { key: "2", label: "标签二", children: "标签二的内容" },
              { key: "3", label: "标签三", children: "标签三的内容" },
            ]}
          />
        ),
      },
      {
        id: "card",
        title: "卡片式标签页",
        description: "type 为 card 时使用卡片式标签页。",
        code: `import { Tabs } from "aurora-ui"

export default function Demo() {
  return (
    <Tabs
      type="card"
      defaultActiveKey="1"
      items={[
        { key: "1", label: "概览", children: "概览内容" },
        { key: "2", label: "设置", children: "设置内容" },
        { key: "3", label: "高级", children: "高级内容" },
      ]}
    />
  )
}`,
        element: (
          <Tabs
            type="card"
            defaultActiveKey="1"
            items={[
              { key: "1", label: "概览", children: "概览内容" },
              { key: "2", label: "设置", children: "设置内容" },
              { key: "3", label: "高级", children: "高级内容" },
            ]}
          />
        ),
      },
      {
        id: "icon",
        title: "带图标",
        description: "标签支持图标与禁用状态。",
        code: `import { Icon, Tabs } from "aurora-ui"

export default function Demo() {
  return (
    <Tabs
      items={[
        { key: "1", label: "用户", icon: <Icon name="user" size={14} />, children: "用户管理" },
        { key: "2", label: "设置", icon: <Icon name="settings" size={14} />, children: "系统设置" },
        { key: "3", label: "禁用项", disabled: true, children: "禁用" },
      ]}
    />
  )
}`,
        element: (
          <Tabs
            items={[
              { key: "1", label: "用户", icon: <Icon name="user" size={14} />, children: "用户管理" },
              { key: "2", label: "设置", icon: <Icon name="settings" size={14} />, children: "系统设置" },
              { key: "3", label: "禁用项", disabled: true, children: "禁用" },
            ]}
          />
        ),
      },
      {
        id: "extra",
        title: "附加内容",
        description: "extra 在标签栏右侧渲染附加内容。",
        code: `import { Button, Tabs } from "aurora-ui"

export default function Demo() {
  return (
    <Tabs
      defaultActiveKey="1"
      extra={<Button size="small">新建</Button>}
      items={[
        { key: "1", label: "标签一", children: "标签一的内容" },
        { key: "2", label: "标签二", children: "标签二的内容" },
      ]}
    />
  )
}`,
        element: (
          <Tabs
            defaultActiveKey="1"
            extra={<Button size="small">新建</Button>}
            items={[
              { key: "1", label: "标签一", children: "标签一的内容" },
              { key: "2", label: "标签二", children: "标签二的内容" },
            ]}
          />
        ),
      },
      {
        id: "position",
        title: "左侧标签页",
        description: "tabPosition 支持 top / bottom / left / right 四种布局。",
        code: `import { Tabs } from "aurora-ui"

export default function Demo() {
  return (
    <Tabs
      tabPosition="left"
      defaultActiveKey="1"
      items={[
        { key: "1", label: "概览", children: "项目概览信息" },
        { key: "2", label: "设置", children: "系统设置项" },
        { key: "3", label: "权限", children: "权限配置" },
      ]}
    />
  )
}`,
        element: (
          <Tabs
            tabPosition="left"
            defaultActiveKey="1"
            items={[
              { key: "1", label: "概览", children: "项目概览信息" },
              { key: "2", label: "设置", children: "系统设置项" },
              { key: "3", label: "权限", children: "权限配置" },
            ]}
          />
        ),
      },
    ],
    api: [
      { name: "items", description: "标签页配置", type: "TabsItem[]", default: "-", required: true },
      { name: "activeKey", description: "当前激活标签（受控）", type: "string", default: "-" },
      { name: "defaultActiveKey", description: "初始激活标签", type: "string", default: "第一项" },
      { name: "onChange", description: "切换回调", type: "(key: string) => void", default: "-" },
      { name: "type", description: "标签页样式", type: `"line" | "card"`, default: "line" },
      { name: "size", description: "标签大小", type: `"small" | "middle" | "large"`, default: "middle" },
      { name: "centered", description: "标签是否居中", type: "boolean", default: "false" },
      { name: "tabPosition", description: "标签栏位置", type: `"top" | "bottom" | "left" | "right"`, default: "top" },
      { name: "extra", description: "标签栏右侧附加内容", type: "React.ReactNode", default: "-" },
    ],
  },
  {
    name: "Pagination",
    path: "/components/pagination",
    title: "分页 Pagination",
    description: "数据分页展示，支持页码切换与每页条数设置。",
    categoryKey: "navigation",
    whenToUse: "当数据量较大、需要分页展示时使用。",
    importCode: `import { Pagination } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "通过 total 与 pageSize 计算总页数。",
        code: `import { Pagination } from "aurora-ui"

export default function Demo() {
  return <Pagination defaultCurrent={3} total={120} pageSize={10} />
}`,
        element: <Pagination defaultCurrent={3} total={120} pageSize={10} />,
      },
      {
        id: "total",
        title: "总数与条数设置",
        description: "showTotal 显示总数，showSizeChanger 允许切换每页条数。",
        code: `import { Pagination } from "aurora-ui"

export default function Demo() {
  return (
    <Pagination
      total={200}
      showSizeChanger
      showTotal={(total, range) => \`第 \${range[0]}-\${range[1]} 条 / 共 \${total} 条\`}
    />
  )
}`,
        element: (
          <Pagination
            total={200}
            showSizeChanger
            showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`}
          />
        ),
      },
      {
        id: "simple",
        title: "简洁模式",
        description: "simple 属性切换为简洁分页。",
        code: `import { Pagination } from "aurora-ui"

export default function Demo() {
  return <Pagination simple defaultCurrent={2} total={80} />
}`,
        element: <Pagination simple defaultCurrent={2} total={80} />,
      },
      {
        id: "quick-jumper",
        title: "快速跳转",
        description: "showQuickJumper 显示页码输入框，输入后回车或失焦即可跳转。",
        code: `import { Pagination } from "aurora-ui"

export default function Demo() {
  return <Pagination total={200} showQuickJumper />
}`,
        element: <Pagination total={200} showQuickJumper />,
      },
    ],
    api: [
      { name: "current", description: "当前页（受控）", type: "number", default: "1" },
      { name: "defaultCurrent", description: "默认当前页", type: "number", default: "1" },
      { name: "total", description: "数据总数", type: "number", default: "0" },
      { name: "pageSize", description: "每页条数（受控）", type: "number", default: "10" },
      { name: "onChange", description: "页码或条数变化回调", type: "(page, pageSize) => void", default: "-" },
      { name: "showSizeChanger", description: "是否显示每页条数切换", type: "boolean", default: "false" },
      { name: "showTotal", description: "显示总数", type: "(total, range) => ReactNode", default: "-" },
      { name: "showQuickJumper", description: "显示快速跳转输入框", type: "boolean", default: "false" },
      { name: "simple", description: "简洁分页", type: "boolean", default: "false" },
    ],
  },
  {
    name: "Menu",
    path: "/components/menu",
    title: "导航菜单 Menu",
    description: "为页面和功能提供导航的菜单列表，支持内嵌与水平模式。",
    categoryKey: "navigation",
    whenToUse: "当需要提供带层级的导航入口时使用。",
    importCode: `import { Menu } from "aurora-ui"`,
    demos: [
      {
        id: "inline",
        title: "内嵌菜单",
        description: "默认 mode 为 inline，支持多级子菜单。",
        code: `import { Icon, Menu } from "aurora-ui"

export default function Demo() {
  return (
    <Menu
      className="max-w-xs"
      defaultSelectedKeys={["1"]}
      items={[
        { key: "1", label: "概览", icon: <Icon name="home" size={16} /> },
        {
          key: "2",
          label: "数据管理",
          icon: <Icon name="file" size={16} />,
          children: [
            { key: "2-1", label: "用户数据" },
            { key: "2-2", label: "订单数据" },
          ],
        },
        {
          key: "3",
          label: "系统设置",
          icon: <Icon name="settings" size={16} />,
          children: [
            { key: "3-1", label: "基础设置" },
            { key: "3-2", label: "权限设置" },
          ],
        },
      ]}
    />
  )
}`,
        element: (
          <Menu
            className="max-w-xs"
            defaultSelectedKeys={["1"]}
            items={[
              { key: "1", label: "概览", icon: <Icon name="home" size={16} /> },
              { key: "2", label: "数据管理", icon: <Icon name="file" size={16} />, children: [{ key: "2-1", label: "用户数据" }, { key: "2-2", label: "订单数据" }] },
              { key: "3", label: "系统设置", icon: <Icon name="settings" size={16} />, children: [{ key: "3-1", label: "基础设置" }, { key: "3-2", label: "权限设置" }] },
            ]}
          />
        ),
      },
      {
        id: "horizontal",
        title: "水平菜单",
        description: "mode 为 horizontal 时使用顶部水平导航。",
        code: `import { Icon, Menu } from "aurora-ui"

export default function Demo() {
  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      items={[
        { key: "1", label: "首页", icon: <Icon name="home" size={16} /> },
        { key: "2", label: "产品", icon: <Icon name="zap" size={16} /> },
        { key: "3", label: "解决方案", icon: <Icon name="globe" size={16} /> },
        { key: "4", label: "关于", icon: <Icon name="info" size={16} /> },
      ]}
    />
  )
}`,
        element: (
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={[
              { key: "1", label: "首页", icon: <Icon name="home" size={16} /> },
              { key: "2", label: "产品", icon: <Icon name="zap" size={16} /> },
              { key: "3", label: "解决方案", icon: <Icon name="globe" size={16} /> },
              { key: "4", label: "关于", icon: <Icon name="info" size={16} /> },
            ]}
          />
        ),
      },
    ],
    api: [
      { name: "items", description: "菜单项配置", type: "MenuItemType[]", default: "-", required: true },
      { name: "mode", description: "菜单类型", type: `"inline" | "horizontal" | "vertical"`, default: "inline" },
      { name: "selectedKeys", description: "选中项（受控）", type: "string[]", default: "-" },
      { name: "defaultSelectedKeys", description: "默认选中项", type: "string[]", default: "[]" },
      { name: "defaultOpenKeys", description: "默认展开的子菜单", type: "string[]", default: "[]" },
      { name: "onClick", description: "点击菜单项回调", type: "(info: { key }) => void", default: "-" },
      { name: "theme", description: "主题色", type: `"light" | "dark"`, default: "light" },
    ],
  },
]
