import * as React from "react"
import { Button, message, modal, Modal, Progress, Space, Spin } from "aurora-ui"
import type { ComponentDoc } from "../data/types"

function ModalDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>打开对话框</Button>
      <Modal
        open={open}
        title="基础对话框"
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        这是一个基础的模态对话框，点击遮罩或右上角关闭按钮均可关闭。
      </Modal>
    </>
  )
}

function ModalNoFooterDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button type="default" onClick={() => setOpen(true)}>打开无底部对话框</Button>
      <Modal
        open={open}
        title="自定义底部"
        footer={null}
        onCancel={() => setOpen(false)}
      >
        该对话框隐藏了底部按钮区域，点击遮罩或关闭按钮均可关闭。
      </Modal>
    </>
  )
}

function SpinFullscreenDemo() {
  const [loading, setLoading] = React.useState(false)
  return (
    <>
      <Button type="primary" onClick={() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 2000)
      }}>
        显示全屏加载（2 秒）
      </Button>
      <Spin fullscreen spinning={loading} tip="加载中..." />
    </>
  )
}

export const feedbackComponents: ComponentDoc[] = [
  {
    name: "Modal",
    path: "/components/modal",
    title: "对话框 Modal",
    description: "模态对话框，在浮层中展示内容并引导用户完成操作。",
    categoryKey: "feedback",
    whenToUse: "当需要用户确认信息或完成一个独立任务时使用。",
    importCode: `import { Modal } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "通过 open 控制显示，onCancel / onOk 处理操作。",
        code: `import { useState } from "react"
import { Button, Modal } from "aurora-ui"

export default function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>打开对话框</Button>
      <Modal
        open={open}
        title="基础对话框"
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        这是一个基础的模态对话框。
      </Modal>
    </>
  )
}`,
        element: <ModalDemo />,
      },
      {
        id: "footer",
        title: "自定义底部",
        description: "footer 传入 null 可隐藏底部按钮。",
        code: `import { useState } from "react"
import { Button, Modal } from "aurora-ui"

export default function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="default" onClick={() => setOpen(true)}>打开无底部对话框</Button>
      <Modal
        open={open}
        title="自定义底部"
        footer={null}
        onCancel={() => setOpen(false)}
      >
        该对话框隐藏了底部按钮区域。
      </Modal>
    </>
  )
}`,
        element: <ModalNoFooterDemo />,
      },
    ],
    api: [
      { name: "open", description: "是否显示", type: "boolean", default: "false" },
      { name: "title", description: "标题", type: "React.ReactNode", default: "-" },
      { name: "onCancel", description: "取消回调", type: "() => void", default: "-" },
      { name: "onOk", description: "确认回调", type: "() => void", default: "-" },
      { name: "footer", description: "底部内容，null 隐藏，可为数组", type: "React.ReactNode | React.ReactNode[] | null", default: "-" },
      { name: "okText", description: "确认按钮文字", type: "React.ReactNode", default: "确定" },
      { name: "cancelText", description: "取消按钮文字", type: "React.ReactNode", default: "取消" },
      { name: "width", description: "宽度", type: "number | string", default: "520" },
      { name: "centered", description: "垂直居中", type: "boolean", default: "false" },
      { name: "maskClosable", description: "点击遮罩关闭", type: "boolean", default: "true" },
      { name: "confirmLoading", description: "确认按钮加载态", type: "boolean", default: "false" },
    ],
  },
  {
    name: "ModalConfirm",
    path: "/components/modal-confirm",
    title: "确认框 Modal.method",
    description: "通过 modal.confirm / info / success / warning / error 快捷弹出确认或提示对话框。",
    categoryKey: "feedback",
    whenToUse: "当需要在不声明 Modal 组件的情况下快速弹出确认框时使用。",
    importCode: `import { modal, ModalHolder } from "aurora-ui"

// 在应用根节点挂载一次
<ModalHolder />`,
    demos: [
      {
        id: "confirm",
        title: "确认框",
        description: "confirm 弹出带取消与确认按钮的对话框，onOk 支持异步。",
        code: `import { Button, modal } from "aurora-ui"

export default function Demo() {
  return (
    <Button
      type="primary"
      onClick={() =>
        modal.confirm({
          title: "确认删除该记录？",
          content: "删除后无法恢复，请谨慎操作。",
          okText: "删除",
          okButtonProps: { danger: true },
          onOk: () => console.log("已确认"),
        })
      }
    >
      确认框
    </Button>
  )
}`,
        element: (
          <Button
            type="primary"
            onClick={() =>
              modal.confirm({
                title: "确认删除该记录？",
                content: "删除后无法恢复，请谨慎操作。",
                okText: "删除",
                okButtonProps: { danger: true },
                onOk: () => console.log("已确认"),
              })
            }
          >
            确认框
          </Button>
        ),
      },
      {
        id: "status",
        title: "状态提示框",
        description: "info / success / warning / error 提供不同状态的单按钮提示框。",
        code: `import { Button, Space, modal } from "aurora-ui"

export default function Demo() {
  const show = (type) => modal[type]({ title: "提示", content: \`这是一条 \${type} 提示。\` })
  return (
    <Space>
      <Button onClick={() => show("info")}>Info</Button>
      <Button onClick={() => show("success")}>Success</Button>
      <Button onClick={() => show("warning")}>Warning</Button>
      <Button onClick={() => show("error")}>Error</Button>
    </Space>
  )
}`,
        element: (
          <Space>
            <Button onClick={() => modal.info({ title: "提示", content: "这是一条 info 提示。" })}>Info</Button>
            <Button onClick={() => modal.success({ title: "提示", content: "这是一条 success 提示。" })}>Success</Button>
            <Button onClick={() => modal.warning({ title: "提示", content: "这是一条 warning 提示。" })}>Warning</Button>
            <Button onClick={() => modal.error({ title: "提示", content: "这是一条 error 提示。" })}>Error</Button>
          </Space>
        ),
      },
    ],
    api: [
      { name: "modal.confirm", description: "确认框", type: "(options) => id", default: "-" },
      { name: "modal.info", description: "信息提示框", type: "(options) => id", default: "-" },
      { name: "modal.success", description: "成功提示框", type: "(options) => id", default: "-" },
      { name: "modal.warning", description: "警告提示框", type: "(options) => id", default: "-" },
      { name: "modal.error", description: "错误提示框", type: "(options) => id", default: "-" },
      { name: "modal.destroy", description: "关闭指定或全部", type: "(id?) => void", default: "-" },
      { name: "options.title", description: "标题", type: "React.ReactNode", default: "-" },
      { name: "options.content", description: "内容", type: "React.ReactNode", default: "-" },
      { name: "options.okText", description: "确认按钮文字", type: "React.ReactNode", default: "确定" },
      { name: "options.onOk", description: "确认回调，支持 Promise", type: "() => void | Promise<void>", default: "-" },
      { name: "options.onCancel", description: "取消回调", type: "() => void", default: "-" },
    ],
  },
  {
    name: "Message",
    path: "/components/message",
    title: "全局提示 Message",
    description: "全局展示操作反馈信息，支持多种类型。",
    categoryKey: "feedback",
    whenToUse: "当需要向用户反馈操作结果时使用，轻量且自动消失。",
    importCode: `import { message } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "调用 message 的不同方法展示对应类型的提示。",
        code: `import { Button, message, Space } from "aurora-ui"

export default function Demo() {
  return (
    <Space wrap>
      <Button type="primary" onClick={() => message.success("操作成功")}>成功</Button>
      <Button type="default" onClick={() => message.info("普通提示")}>信息</Button>
      <Button type="default" onClick={() => message.warning("警告提示")}>警告</Button>
      <Button type="default" onClick={() => message.error("错误提示")}>错误</Button>
      <Button type="default" onClick={() => message.loading("加载中...", 0)}>加载</Button>
    </Space>
  )
}`,
        element: (
          <Space wrap>
            <Button type="primary" onClick={() => message.success("操作成功")}>成功</Button>
            <Button type="default" onClick={() => message.info("普通提示")}>信息</Button>
            <Button type="default" onClick={() => message.warning("警告提示")}>警告</Button>
            <Button type="default" onClick={() => message.error("错误提示")}>错误</Button>
            <Button type="default" onClick={() => message.loading("加载中...", 0)}>加载</Button>
          </Space>
        ),
      },
    ],
    api: [
      { name: "message.success", description: "成功提示", type: "(content, duration?) => void", default: "-" },
      { name: "message.info", description: "普通提示", type: "(content, duration?) => void", default: "-" },
      { name: "message.warning", description: "警告提示", type: "(content, duration?) => void", default: "-" },
      { name: "message.error", description: "错误提示", type: "(content, duration?) => void", default: "-" },
      { name: "message.loading", description: "加载提示，duration 为 0 时不自动关闭", type: "(content, duration?) => void", default: "-" },
      { name: "message.destroy", description: "清空所有提示", type: "() => void", default: "-" },
    ],
  },
  {
    name: "Progress",
    path: "/components/progress",
    title: "进度条 Progress",
    description: "展示操作的当前进度，支持线形与环形。",
    categoryKey: "feedback",
    whenToUse: "当需要展示任务完成进度时使用。",
    importCode: `import { Progress } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "线形进度条，支持不同状态。",
        code: `import { Progress, Space } from "aurora-ui"

export default function Demo() {
  return (
    <Space direction="vertical" className="w-full items-stretch">
      <Progress percent={30} />
      <Progress percent={60} status="active" />
      <Progress percent={100} status="success" />
      <Progress percent={70} status="exception" />
    </Space>
  )
}`,
        element: (
          <Space direction="vertical" className="w-full items-stretch">
            <Progress percent={30} />
            <Progress percent={60} status="active" />
            <Progress percent={100} status="success" />
            <Progress percent={70} status="exception" />
          </Space>
        ),
      },
      {
        id: "circle",
        title: "环形进度条",
        description: "type 为 circle 时使用环形进度条。",
        code: `import { Progress, Space } from "aurora-ui"

export default function Demo() {
  return (
    <Space size="large">
      <Progress type="circle" percent={75} />
      <Progress type="circle" percent={100} status="success" />
      <Progress type="circle" percent={40} status="exception" />
    </Space>
  )
}`,
        element: (
          <Space size="large">
            <Progress type="circle" percent={75} />
            <Progress type="circle" percent={100} status="success" />
            <Progress type="circle" percent={40} status="exception" />
          </Space>
        ),
      },
      {
        id: "dashboard",
        title: "仪表盘进度",
        description: "type 为 dashboard 时使用半圆仪表盘样式。",
        code: `import { Progress, Space } from "aurora-ui"

export default function Demo() {
  return (
    <Space size="large">
      <Progress type="dashboard" percent={45} />
      <Progress type="dashboard" percent={100} status="success" />
      <Progress type="dashboard" percent={20} status="exception" />
    </Space>
  )
}`,
        element: (
          <Space size="large">
            <Progress type="dashboard" percent={45} />
            <Progress type="dashboard" percent={100} status="success" />
            <Progress type="dashboard" percent={20} status="exception" />
          </Space>
        ),
      },
      {
        id: "steps",
        title: "分段进度条",
        description: "steps 将进度条拆分为若干段展示。",
        code: `import { Progress, Space } from "aurora-ui"

export default function Demo() {
  return (
    <Space direction="vertical" className="w-full items-stretch">
      <Progress percent={40} steps={5} />
      <Progress percent={80} steps={10} status="success" />
    </Space>
  )
}`,
        element: (
          <Space direction="vertical" className="w-full items-stretch">
            <Progress percent={40} steps={5} />
            <Progress percent={80} steps={10} status="success" />
          </Space>
        ),
      },
    ],
    api: [
      { name: "percent", description: "进度百分比", type: "number", default: "0" },
      { name: "status", description: "进度状态", type: `"normal" | "active" | "success" | "exception"`, default: "normal" },
      { name: "type", description: "类型", type: `"line" | "circle" | "dashboard"`, default: "line" },
      { name: "size", description: "尺寸", type: "number | \"small\" | \"default\"", default: "default" },
      { name: "strokeWidth", description: "线条宽度", type: "number", default: "8" },
      { name: "steps", description: "分段数量（线形）", type: "number", default: "-" },
      { name: "showInfo", description: "是否显示数值", type: "boolean", default: "true" },
      { name: "format", description: "自定义数值展示", type: "(percent?) => ReactNode", default: "-" },
    ],
  },
  {
    name: "Spin",
    path: "/components/spin",
    title: "加载中 Spin",
    description: "用于页面和区块的加载中状态。",
    categoryKey: "feedback",
    whenToUse: "当数据加载需要等待时，展示加载状态。",
    importCode: `import { Spin } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "不同尺寸的加载指示。",
        code: `import { Space, Spin } from "aurora-ui"

export default function Demo() {
  return (
    <Space size="large" align="center">
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </Space>
  )
}`,
        element: (
          <Space size="large" align="center">
            <Spin size="small" />
            <Spin />
            <Spin size="large" />
          </Space>
        ),
      },
      {
        id: "wrap",
        title: "包裹内容",
        description: "作为容器包裹内容，加载时覆盖显示。",
        code: `import { Spin } from "aurora-ui"

export default function Demo() {
  return (
    <Spin spinning tip="加载中..." className="w-full">
      <div className="rounded-lg border p-6">
        这里是已加载完成的内容区域。
      </div>
    </Spin>
  )
}`,
        element: (
          <Spin spinning tip="加载中..." className="w-full">
            <div className="rounded-lg border p-6">这里是已加载完成的内容区域。</div>
          </Spin>
        ),
      },
      {
        id: "fullscreen",
        title: "全屏加载",
        description: "fullscreen 覆盖整个视口，用于页面级加载。",
        code: `import { useState } from "react"
import { Button, Spin } from "aurora-ui"

export default function Demo() {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 2000)
      }}>
        显示全屏加载（2 秒）
      </Button>
      <Spin fullscreen spinning={loading} tip="加载中..." />
    </>
  )
}`,
        element: <SpinFullscreenDemo />,
      },
    ],
    api: [
      { name: "spinning", description: "是否加载中", type: "boolean", default: "true" },
      { name: "size", description: "尺寸", type: `"small" | "default" | "large"`, default: "default" },
      { name: "tip", description: "加载提示文字", type: "React.ReactNode", default: "-" },
      { name: "fullscreen", description: "是否全屏加载", type: "boolean", default: "false" },
      { name: "children", description: "包裹的内容", type: "React.ReactNode", default: "-" },
    ],
  },
]
