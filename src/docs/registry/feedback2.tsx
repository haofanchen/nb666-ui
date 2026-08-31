import * as React from "react"
import { Button, Drawer, notification, Popconfirm, Result, Space, Tour } from "nb666-ui"
import type { ComponentDoc } from "../data/types"

function DrawerDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>打开抽屉</Button>
      <Drawer open={open} title="抽屉标题" onClose={() => setOpen(false)}>
        这是抽屉内容区域，可从右侧滑出展示更多信息。
      </Drawer>
    </>
  )
}

function TourDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>开始引导</Button>
      <div className="mt-4 flex gap-2">
        <div id="nb666-tour-step-1" className="rounded-md border px-4 py-3">步骤一：概览</div>
        <div id="nb666-tour-step-2" className="rounded-md border px-4 py-3">步骤二：设置</div>
        <div id="nb666-tour-step-3" className="rounded-md border px-4 py-3">步骤三：完成</div>
      </div>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        onFinish={() => setOpen(false)}
        steps={[
          { target: "#nb666-tour-step-1", title: "概览", description: "这是第一步，介绍整体概览。" },
          { target: "#nb666-tour-step-2", title: "设置", description: "这是第二步，介绍配置项。" },
          { target: "#nb666-tour-step-3", title: "完成", description: "最后一步，介绍完成操作。" },
        ]}
      />
    </>
  )
}

export const feedbackComponents2: ComponentDoc[] = [
  {
    name: "Drawer",
    path: "/components/drawer",
    title: "抽屉 Drawer",
    description: "从屏幕边缘滑出的面板，用于承载辅助内容。",
    categoryKey: "feedback",
    whenToUse: "当需要在当前页面旁展示详情或表单而不离开当前上下文时使用。",
    importCode: `import { Drawer } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "通过 open 控制显示，placement 控制滑出方向。",
        code: `import { useState } from "react"
import { Button, Drawer } from "nb666-ui"

export default function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>打开抽屉</Button>
      <Drawer open={open} title="抽屉标题" onClose={() => setOpen(false)}>
        这是抽屉内容区域。
      </Drawer>
    </>
  )
}`,
        element: <DrawerDemo />,
      },
    ],
    api: [
      { name: "open", description: "是否显示", type: "boolean", default: "false" },
      { name: "title", description: "标题", type: "React.ReactNode", default: "-" },
      { name: "placement", description: "滑出方向", type: `"left" | "right" | "top" | "bottom"`, default: "right" },
      { name: "width", description: "左右抽屉宽度", type: "number | string", default: "378" },
      { name: "height", description: "上下抽屉高度", type: "number | string", default: "378" },
      { name: "onClose", description: "关闭回调", type: "() => void", default: "-" },
      { name: "maskClosable", description: "点击遮罩关闭", type: "boolean", default: "true" },
    ],
  },
  {
    name: "Notification",
    path: "/components/notification",
    title: "通知提醒框 Notification",
    description: "在页面右上角全局展示通知信息。",
    categoryKey: "feedback",
    whenToUse: "当需要展示较为完整的通知（标题 + 描述）时使用。",
    importCode: `import { notification } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "调用不同方法展示对应类型的通知。",
        code: `import { Button, notification, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space wrap>
      <Button type="primary" onClick={() => notification.success("操作成功", "数据已保存")}>成功</Button>
      <Button type="default" onClick={() => notification.info("提示", "这是一条信息")}>信息</Button>
      <Button type="default" onClick={() => notification.warning("警告", "请注意检查")}>警告</Button>
      <Button type="default" onClick={() => notification.error("错误", "操作失败")}>错误</Button>
    </Space>
  )
}`,
        element: (
          <Space wrap>
            <Button type="primary" onClick={() => notification.success("操作成功", "数据已保存")}>成功</Button>
            <Button type="default" onClick={() => notification.info("提示", "这是一条信息")}>信息</Button>
            <Button type="default" onClick={() => notification.warning("警告", "请注意检查")}>警告</Button>
            <Button type="default" onClick={() => notification.error("错误", "操作失败")}>错误</Button>
          </Space>
        ),
      },
    ],
    api: [
      { name: "notification.success", description: "成功通知", type: "(message, description?, duration?) => void", default: "-" },
      { name: "notification.info", description: "信息通知", type: "(message, description?, duration?) => void", default: "-" },
      { name: "notification.warning", description: "警告通知", type: "(message, description?, duration?) => void", default: "-" },
      { name: "notification.error", description: "错误通知", type: "(message, description?, duration?) => void", default: "-" },
      { name: "notification.destroy", description: "清空所有通知", type: "() => void", default: "-" },
    ],
  },
  {
    name: "Result",
    path: "/components/result",
    title: "结果 Result",
    description: "反馈一系列操作任务的处理结果。",
    categoryKey: "feedback",
    whenToUse: "当需要展示操作成功或失败等结果状态时使用。",
    importCode: `import { Result } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "内置多种状态图标。",
        code: `import { Button, Result } from "nb666-ui"

export default function Demo() {
  return (
    <Result
      status="success"
      title="提交成功"
      subTitle="你的信息已成功提交，我们将在 1-2 个工作日内处理。"
      extra={<Button type="primary">返回首页</Button>}
    />
  )
}`,
        element: (
          <Result
            status="success"
            title="提交成功"
            subTitle="你的信息已成功提交，我们将在 1-2 个工作日内处理。"
            extra={<Button type="primary">返回首页</Button>}
          />
        ),
      },
    ],
    api: [
      { name: "status", description: "结果状态", type: `"success" | "info" | "warning" | "error" | "403" | "404" | "500"`, default: "info" },
      { name: "title", description: "标题", type: "React.ReactNode", default: "-", required: true },
      { name: "subTitle", description: "副标题", type: "React.ReactNode", default: "-" },
      { name: "extra", description: "操作区", type: "React.ReactNode", default: "-" },
      { name: "icon", description: "自定义图标", type: "React.ReactNode", default: "-" },
    ],
  },
  {
    name: "Popconfirm",
    path: "/components/popconfirm",
    title: "气泡确认框 Popconfirm",
    description: "点击元素后弹出确认气泡，用于二次确认操作。",
    categoryKey: "feedback",
    whenToUse: "当操作不可逆或风险较高、需要二次确认时使用。",
    importCode: `import { Popconfirm } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "确认后触发 onConfirm。",
        code: `import { Button, Popconfirm } from "nb666-ui"

export default function Demo() {
  return (
    <Popconfirm
      title="确定删除该记录吗？"
      description="删除后不可恢复"
      onConfirm={() => console.log("确认删除")}
    >
      <Button type="primary" danger>删除</Button>
    </Popconfirm>
  )
}`,
        element: (
          <Popconfirm
            title="确定删除该记录吗？"
            description="删除后不可恢复"
            onConfirm={() => console.log("确认删除")}
          >
            <Button type="primary" danger>删除</Button>
          </Popconfirm>
        ),
      },
    ],
    api: [
      { name: "title", description: "确认标题", type: "React.ReactNode", default: "-", required: true },
      { name: "description", description: "补充说明", type: "React.ReactNode", default: "-" },
      { name: "okText", description: "确认按钮文字", type: "React.ReactNode", default: "确定" },
      { name: "cancelText", description: "取消按钮文字", type: "React.ReactNode", default: "取消" },
      { name: "onConfirm", description: "确认回调", type: "() => void", default: "-" },
      { name: "onCancel", description: "取消回调", type: "() => void", default: "-" },
      { name: "placement", description: "弹出位置", type: `"top" | "bottom" | "left" | "right"`, default: "top" },
    ],
  },
  {
    name: "Tour",
    path: "/components/tour",
    title: "分步引导 Tour",
    description: "通过遮罩与高亮逐步引导用户熟悉页面功能。",
    categoryKey: "feedback",
    whenToUse: "当新功能上线、需要引导用户按步骤操作时使用。",
    importCode: `import { Tour } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "steps 配置每一步的目标元素、标题与描述。",
        code: `import { useState } from "react"
import { Button, Tour } from "nb666-ui"

export default function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>开始引导</Button>
      <div className="mt-4 flex gap-2">
        <div id="step-1" className="rounded-md border px-4 py-3">步骤一</div>
        <div id="step-2" className="rounded-md border px-4 py-3">步骤二</div>
      </div>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        onFinish={() => setOpen(false)}
        steps={[
          { target: "#step-1", title: "第一步", description: "介绍第一步内容。" },
          { target: "#step-2", title: "第二步", description: "介绍第二步内容。" },
        ]}
      />
    </>
  )
}`,
        element: <TourDemo />,
      },
    ],
    api: [
      { name: "open", description: "是否显示（受控）", type: "boolean", default: "-" },
      { name: "defaultOpen", description: "默认是否显示", type: "boolean", default: "false" },
      { name: "steps", description: "引导步骤", type: "TourStep[]", default: "-", required: true },
      { name: "current", description: "当前步骤（受控）", type: "number", default: "0" },
      { name: "onChange", description: "步骤变化回调", type: "(current) => void", default: "-" },
      { name: "onClose", description: "关闭回调", type: "() => void", default: "-" },
      { name: "onFinish", description: "完成回调", type: "() => void", default: "-" },
      { name: "mask", description: "是否显示遮罩", type: "boolean", default: "true" },
    ],
  },

]
