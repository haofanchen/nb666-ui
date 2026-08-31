import { Affix, Anchor, BackTop, Button, Dropdown, Icon, Steps } from "aurora-ui"
import type { ComponentDoc } from "../data/types"

export const navigationComponents2: ComponentDoc[] = [
  {
    name: "Dropdown",
    path: "/components/dropdown",
    title: "下拉菜单 Dropdown",
    description: "向下弹出的操作菜单，用于承载一组相关操作。",
    categoryKey: "navigation",
    whenToUse: "当操作较多、需要收纳为下拉列表时使用。",
    importCode: `import { Dropdown } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "点击触发，onSelect 返回选中的 key。",
        code: `import { Button, Dropdown, Icon } from "aurora-ui"

export default function Demo() {
  return (
    <Dropdown
      onSelect={(info) => console.log(info.key)}
      menu={[
        { key: "edit", label: "编辑", icon: <Icon name="edit" size={14} /> },
        { key: "copy", label: "复制", icon: <Icon name="copy" size={14} /> },
        { key: "delete", label: "删除", icon: <Icon name="trash" size={14} />, danger: true },
      ]}
    >
      <Button type="primary">更多操作</Button>
    </Dropdown>
  )
}`,
        element: (
          <Dropdown
            onSelect={(info) => console.log(info.key)}
            menu={[
              { key: "edit", label: "编辑", icon: <Icon name="edit" size={14} /> },
              { key: "copy", label: "复制", icon: <Icon name="copy" size={14} /> },
              { key: "delete", label: "删除", icon: <Icon name="trash" size={14} />, danger: true },
            ]}
          >
            <Button type="primary">更多操作</Button>
          </Dropdown>
        ),
      },
      {
        id: "submenu",
        title: "多级菜单",
        description: "菜单项支持 children，悬停展示二级菜单。",
        code: `import { Button, Dropdown, Icon } from "aurora-ui"

export default function Demo() {
  return (
    <Dropdown
      menu={[
        { key: "edit", label: "编辑" },
        {
          key: "export",
          label: "导出",
          icon: <Icon name="download" size={14} />,
          children: [
            { key: "csv", label: "导出 CSV" },
            { key: "excel", label: "导出 Excel" },
            { key: "pdf", label: "导出 PDF" },
          ],
        },
        { key: "delete", label: "删除", danger: true },
      ]}
    >
      <Button type="primary">更多操作</Button>
    </Dropdown>
  )
}`,
        element: (
          <Dropdown
            menu={[
              { key: "edit", label: "编辑" },
              {
                key: "export",
                label: "导出",
                icon: <Icon name="download" size={14} />,
                children: [
                  { key: "csv", label: "导出 CSV" },
                  { key: "excel", label: "导出 Excel" },
                  { key: "pdf", label: "导出 PDF" },
                ],
              },
              { key: "delete", label: "删除", danger: true },
            ]}
          >
            <Button type="primary">更多操作</Button>
          </Dropdown>
        ),
      },
    ],
    api: [
      { name: "menu", description: "菜单项配置", type: "DropdownMenuItem[]", default: "-", required: true },
      { name: "trigger", description: "触发方式", type: `"hover" | "click"`, default: "click" },
      { name: "placement", description: "弹出位置", type: `"bottom-start" | "bottom-end" | "top-start" | "top-end"`, default: "bottom-start" },
      { name: "onSelect", description: "选择回调", type: "(info: { key }) => void", default: "-" },
      { name: "disabled", description: "是否禁用", type: "boolean", default: "false" },
      { name: "item.danger", description: "危险项样式", type: "boolean", default: "false" },
      { name: "item.children", description: "子菜单项", type: "DropdownMenuItem[]", default: "-" },
    ],
  },
  {
    name: "Steps",
    path: "/components/steps",
    title: "步骤条 Steps",
    description: "引导用户按流程完成任务，展示当前进度。",
    categoryKey: "navigation",
    whenToUse: "当任务被拆分为多个明确步骤时使用。",
    importCode: `import { Steps } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "current 表示当前步骤，已完成步骤显示勾选。",
        code: `import { Steps } from "aurora-ui"

export default function Demo() {
  return (
    <Steps
      current={1}
      items={[
        { title: "填写信息", description: "基础信息" },
        { title: "确认信息", description: "信息核对" },
        { title: "完成", description: "提交成功" },
      ]}
    />
  )
}`,
        element: (
          <Steps
            current={1}
            items={[
              { title: "填写信息", description: "基础信息" },
              { title: "确认信息", description: "信息核对" },
              { title: "完成", description: "提交成功" },
            ]}
          />
        ),
      },
      {
        id: "vertical",
        title: "垂直步骤条",
        description: "direction 为 vertical 时纵向排列。",
        code: `import { Steps } from "aurora-ui"

export default function Demo() {
  return (
    <Steps
      direction="vertical"
      current={2}
      items={[
        { title: "创建项目", description: "初始化工程" },
        { title: "开发功能", description: "实现核心逻辑" },
        { title: "发布上线", description: "部署到生产" },
      ]}
    />
  )
}`,
        element: (
          <Steps
            direction="vertical"
            current={2}
            items={[
              { title: "创建项目", description: "初始化工程" },
              { title: "开发功能", description: "实现核心逻辑" },
              { title: "发布上线", description: "部署到生产" },
            ]}
          />
        ),
      },
      {
        id: "status",
        title: "步骤状态",
        description: "通过 status 指定完成、进行中、错误或等待状态。",
        code: `import { Steps } from "aurora-ui"

export default function Demo() {
  return (
    <Steps
      current={1}
      items={[
        { title: "已完成", status: "finish" },
        { title: "进行中", status: "process" },
        { title: "出错了", status: "error" },
        { title: "等待中", status: "wait" },
      ]}
    />
  )
}`,
        element: (
          <Steps
            current={1}
            items={[
              { title: "已完成", status: "finish" },
              { title: "进行中", status: "process" },
              { title: "出错了", status: "error" },
              { title: "等待中", status: "wait" },
            ]}
          />
        ),
      },
    ],
    api: [
      { name: "items", description: "步骤配置", type: "StepItem[]", default: "-", required: true },
      { name: "current", description: "当前步骤（从 0 开始）", type: "number", default: "0" },
      { name: "direction", description: "排列方向", type: `"horizontal" | "vertical"`, default: "horizontal" },
      { name: "size", description: "尺寸", type: `"small" | "default"`, default: "default" },
      { name: "onChange", description: "点击步骤回调", type: "(current: number) => void", default: "-" },
      { name: "item.status", description: "步骤状态", type: `"wait" | "process" | "finish" | "error"`, default: "-" },
      { name: "item.title", description: "步骤标题", type: "React.ReactNode", default: "-" },
      { name: "item.description", description: "步骤说明", type: "React.ReactNode", default: "-" },
    ],
  },
  {
    name: "Affix",
    path: "/components/affix",
    title: "固钉 Affix",
    description: "将元素固定在可视区域，常用于吸附导航或操作栏。",
    categoryKey: "navigation",
    whenToUse: "当需要让某个元素在滚动时保持可见时使用。",
    importCode: `import { Affix } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "使用 sticky 定位，offsetTop 控制吸顶距离。",
        code: `import { Affix, Button } from "aurora-ui"

export default function Demo() {
  return (
    <div className="h-40 overflow-auto rounded-lg border p-4">
      <Affix offsetTop={8}>
        <Button type="primary">吸顶按钮</Button>
      </Affix>
      <div className="mt-4 h-64 text-sm text-muted-foreground">向下滚动查看吸顶效果</div>
    </div>
  )
}`,
        element: (
          <div className="h-40 overflow-auto rounded-lg border p-4">
            <Affix offsetTop={8}>
              <Button type="primary">吸顶按钮</Button>
            </Affix>
            <div className="mt-4 h-64 text-sm text-muted-foreground">向下滚动查看吸顶效果</div>
          </div>
        ),
      },
    ],
    api: [
      { name: "offsetTop", description: "距离顶部偏移量", type: "number", default: "-" },
      { name: "offsetBottom", description: "距离底部偏移量", type: "number", default: "-" },
      { name: "children", description: "固钉内容", type: "React.ReactNode", default: "-", required: true },
    ],
  },
  {
    name: "BackTop",
    path: "/components/back-top",
    title: "回到顶部 BackTop",
    description: "返回页面顶部的悬浮按钮，滚动超过阈值后显示。",
    categoryKey: "navigation",
    whenToUse: "当页面较长、需要快捷回到顶部时使用。",
    importCode: `import { BackTop } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "默认 fixed 在右下角，示例改为 static 展示。",
        code: `import { BackTop } from "aurora-ui"

export default function Demo() {
  return <BackTop visibilityHeight={0} className="!static" />
}`,
        element: <BackTop visibilityHeight={0} className="!static" />,
      },
    ],
    api: [
      { name: "visibilityHeight", description: "滚动多少高度后显示", type: "number", default: "400" },
      { name: "target", description: "滚动容器", type: "() => HTMLElement | Window", default: "window" },
      { name: "duration", description: "滚动动画时长", type: "number", default: "300" },
    ],
  },
  {
    name: "Anchor",
    path: "/components/anchor",
    title: "锚点 Anchor",
    description: "用于页面内跳转的锚点导航，自动高亮当前所在区域。",
    categoryKey: "navigation",
    whenToUse: "当页面较长、需要快速定位到不同区块时使用。",
    importCode: `import { Anchor } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "配合 getContainer 指定滚动容器，滚动时自动高亮对应项。",
        code: `import { Anchor } from "aurora-ui"

export default function Demo() {
  const items = [
    { key: "1", href: "#aurora-anchor-demo-1", title: "基本信息" },
    { key: "2", href: "#aurora-anchor-demo-2", title: "表单设置" },
    { key: "3", href: "#aurora-anchor-demo-3", title: "提交说明" },
  ]
  return (
    <div className="flex gap-4">
      <Anchor
        items={items}
        className="w-28 shrink-0 border-r pr-2"
        getContainer={() => document.getElementById("aurora-anchor-demo")!}
      />
      <div id="aurora-anchor-demo" className="h-40 flex-1 space-y-6 overflow-y-auto pr-2">
        <section id="aurora-anchor-demo-1">
          <h3 className="font-medium">基本信息</h3>
          <p className="text-sm text-muted-foreground">填写项目名称与负责人。</p>
        </section>
        <section id="aurora-anchor-demo-2">
          <h3 className="font-medium">表单设置</h3>
          <p className="text-sm text-muted-foreground">配置字段、校验与默认值。</p>
        </section>
        <section id="aurora-anchor-demo-3">
          <h3 className="font-medium">提交说明</h3>
          <p className="text-sm text-muted-foreground">提交前请确认所有信息无误。</p>
        </section>
      </div>
    </div>
  )
}`,
        element: (
          <div className="flex gap-4">
            <Anchor
              items={[
                { key: "1", href: "#aurora-anchor-demo-1", title: "基本信息" },
                { key: "2", href: "#aurora-anchor-demo-2", title: "表单设置" },
                { key: "3", href: "#aurora-anchor-demo-3", title: "提交说明" },
              ]}
              className="w-28 shrink-0 border-r pr-2"
              getContainer={() => document.getElementById("aurora-anchor-demo")!}
            />
            <div id="aurora-anchor-demo" className="h-40 flex-1 space-y-6 overflow-y-auto pr-2">
              <section id="aurora-anchor-demo-1">
                <h3 className="font-medium">基本信息</h3>
                <p className="text-sm text-muted-foreground">填写项目名称与负责人。</p>
              </section>
              <section id="aurora-anchor-demo-2">
                <h3 className="font-medium">表单设置</h3>
                <p className="text-sm text-muted-foreground">配置字段、校验与默认值。</p>
              </section>
              <section id="aurora-anchor-demo-3">
                <h3 className="font-medium">提交说明</h3>
                <p className="text-sm text-muted-foreground">提交前请确认所有信息无误。</p>
              </section>
            </div>
          </div>
        ),
      },
    ],
    api: [
      { name: "items", description: "锚点项配置", type: "AnchorLink[]", default: "-", required: true },
      { name: "offsetTop", description: "距顶部偏移量", type: "number", default: "0" },
      { name: "bounds", description: "判定边界的阈值", type: "number", default: "5" },
      { name: "getContainer", description: "滚动容器", type: "() => HTMLElement | Window", default: "window" },
      { name: "onClick", description: "点击锚点回调", type: "(e, link) => void", default: "-" },
      { name: "onChange", description: "高亮项变化回调", type: "(currentActiveLink) => void", default: "-" },
    ],
  },

]
