import { useState } from "react"
import { Button, Icon, Space, Typography, commonIconNames, iconNames } from "aurora-ui"
import type { ComponentDoc } from "../data/types"

const { Title, Text, Paragraph, Link } = Typography

function IconGalleryDemo() {
  const [query, setQuery] = useState("")
  const list = query.trim()
    ? iconNames.filter((n) => n.includes(query.trim().toLowerCase())).slice(0, 120)
    : commonIconNames

  return (
    <div className="w-full">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`搜索 ${iconNames.length} 个图标...`}
        className="mb-4 w-full max-w-xs rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
      />
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
        {list.map((name) => (
          <div
            key={name}
            className="flex flex-col items-center gap-1 rounded-md border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Icon name={name} size={20} />
            <span className="w-full truncate text-center text-[10px]">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const generalComponents: ComponentDoc[] = [
  {
    name: "Button",
    path: "/components/button",
    title: "按钮 Button",
    description: "按钮用于开始一个即时操作，标记了一个（或封装一组）操作命令。",
    categoryKey: "general",
    whenToUse: "当需要触发一个操作、提交表单或进行页面跳转时，使用按钮。",
    importCode: `import { Button } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "包含五种类型：主要按钮、默认按钮、虚线按钮、文本按钮和链接按钮。",
        code: `import { Button, Space } from "aurora-ui"

export default function Demo() {
  return (
    <Space>
      <Button type="primary">主要按钮</Button>
      <Button type="default">默认按钮</Button>
      <Button type="dashed">虚线按钮</Button>
      <Button type="text">文本按钮</Button>
      <Button type="link">链接按钮</Button>
    </Space>
  )
}`,
        element: (
          <Space>
            <Button type="primary">主要按钮</Button>
            <Button type="default">默认按钮</Button>
            <Button type="dashed">虚线按钮</Button>
            <Button type="text">文本按钮</Button>
            <Button type="link">链接按钮</Button>
          </Space>
        ),
      },
      {
        id: "size",
        title: "按钮尺寸",
        description: "按钮有大、中、小三种尺寸。",
        code: `import { Button, Space } from "aurora-ui"

export default function Demo() {
  return (
    <Space align="center">
      <Button type="primary" size="small">小按钮</Button>
      <Button type="primary" size="middle">中按钮</Button>
      <Button type="primary" size="large">大按钮</Button>
    </Space>
  )
}`,
        element: (
          <Space align="center">
            <Button type="primary" size="small">小按钮</Button>
            <Button type="primary" size="middle">中按钮</Button>
            <Button type="primary" size="large">大按钮</Button>
          </Space>
        ),
      },
      {
        id: "loading",
        title: "加载与禁用",
        description: "添加 loading 属性可让按钮进入加载状态，disabled 属性禁用按钮，danger 表示危险操作。",
        code: `import { Button, Space } from "aurora-ui"

export default function Demo() {
  return (
    <Space>
      <Button type="primary" loading>加载中</Button>
      <Button type="primary" disabled>禁用按钮</Button>
      <Button type="primary" danger>危险按钮</Button>
    </Space>
  )
}`,
        element: (
          <Space>
            <Button type="primary" loading>加载中</Button>
            <Button type="primary" disabled>禁用按钮</Button>
            <Button type="primary" danger>危险按钮</Button>
          </Space>
        ),
      },
      {
        id: "icon",
        title: "图标与块级按钮",
        description: "通过 icon 属性添加图标，block 属性可让按钮撑满父容器宽度。",
        code: `import { Button, Icon, Space } from "aurora-ui"

export default function Demo() {
  return (
    <Space direction="vertical" className="w-full">
      <Space>
        <Button type="primary" icon={<Icon name="search" />}>搜索</Button>
        <Button icon={<Icon name="download" />}>下载</Button>
        <Button type="text" icon={<Icon name="refresh" />} />
      </Space>
      <Button type="primary" block>块级按钮</Button>
    </Space>
  )
}`,
        element: (
          <Space direction="vertical" className="w-full">
            <Space>
              <Button type="primary" icon={<Icon name="search" />}>搜索</Button>
              <Button icon={<Icon name="download" />}>下载</Button>
              <Button type="text" icon={<Icon name="refresh" />} />
            </Space>
            <Button type="primary" block>块级按钮</Button>
          </Space>
        ),
      },
    ],
    api: [
      { name: "type", description: "设置按钮类型", type: `"primary" | "default" | "dashed" | "text" | "link"`, default: "default" },
      { name: "size", description: "设置按钮尺寸", type: `"small" | "middle" | "large"`, default: "middle" },
      { name: "danger", description: "设置危险按钮", type: "boolean", default: "false" },
      { name: "loading", description: "设置按钮载入状态", type: "boolean", default: "false" },
      { name: "block", description: "将按钮宽度调整为其父宽度", type: "boolean", default: "false" },
      { name: "icon", description: "设置按钮的图标组件", type: "React.ReactNode", default: "-" },
      { name: "disabled", description: "按钮失效状态", type: "boolean", default: "false" },
      { name: "htmlType", description: "原生 button 的 type 值", type: `"button" | "submit" | "reset"`, default: "button" },
    ],
  },
  {
    name: "Icon",
    path: "/components/icon",
    title: "图标 Icon",
    description: "语义化的矢量图标，封装全部 Lucide 图标（1600+），支持按需加载、缩放与旋转。",
    categoryKey: "general",
    whenToUse: "当需要用图形符号辅助表达语义、提升界面可读性时，使用图标。",
    importCode: `import { Icon } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "通过 name 属性指定图标，size 与 color 控制尺寸和颜色。",
        code: `import { Icon, Space } from "aurora-ui"

export default function Demo() {
  return (
    <Space size="large">
      <Icon name="home" size={24} />
      <Icon name="star" size={24} color="#f59e0b" />
      <Icon name="heart" size={24} color="#dc2626" />
      <Icon name="check-circle" size={24} color="#16a34a" />
      <Icon name="info" size={24} color="#2563eb" />
    </Space>
  )
}`,
        element: (
          <Space size="large">
            <Icon name="home" size={24} />
            <Icon name="star" size={24} color="#f59e0b" />
            <Icon name="heart" size={24} color="#dc2626" />
            <Icon name="check-circle" size={24} color="#16a34a" />
            <Icon name="info" size={24} color="#2563eb" />
          </Space>
        ),
      },
      {
        id: "spin",
        title: "旋转与加载",
        description: "spin 属性让图标旋转，rotate 属性指定固定角度。",
        code: `import { Icon, Space } from "aurora-ui"

export default function Demo() {
  return (
    <Space size="large">
      <Icon name="loading" spin size={24} />
      <Icon name="refresh" spin size={24} color="#6c5ce7" />
      <Icon name="chevron-right" rotate={90} size={24} />
      <Icon name="chevron-down" rotate={180} size={24} />
    </Space>
  )
}`,
        element: (
          <Space size="large">
            <Icon name="loading" spin size={24} />
            <Icon name="refresh" spin size={24} color="#6c5ce7" />
            <Icon name="chevron-right" rotate={90} size={24} />
            <Icon name="chevron-down" rotate={180} size={24} />
          </Space>
        ),
      },
      {
        id: "gallery",
        title: "图标集合",
        description: "内置全部 Lucide 图标（1600+），可搜索；常用图标静态引入，其余按需加载。",
        code: `import { useState } from "react"
import { Icon, iconNames } from "aurora-ui"

export default function Demo() {
  const [query, setQuery] = useState("")
  const list = (query ? iconNames.filter((n) => n.includes(query)) : iconNames.slice(0, 60)).slice(0, 120)

  return (
    <div className="w-full">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索图标"
        className="mb-4 w-full max-w-xs rounded-md border px-3 py-2 text-sm outline-none"
      />
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
        {list.map((name) => (
          <div key={name} className="flex flex-col items-center gap-1 rounded-md border p-2 text-xs">
            <Icon name={name} size={20} />
            <span className="truncate">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}`,
        element: <IconGalleryDemo />,
      },
    ],
    api: [
      { name: "name", description: "图标名称（Lucide kebab-case）", type: "string", default: "-", required: true },
      { name: "size", description: "图标大小", type: "number | string", default: "16" },
      { name: "color", description: "图标颜色", type: "string", default: "-" },
      { name: "spin", description: "是否旋转动画", type: "boolean", default: "false" },
      { name: "rotate", description: "旋转角度（度）", type: "number", default: "-" },
      { name: "strokeWidth", description: "描边宽度", type: "number", default: "2" },
    ],
  },
  {
    name: "Typography",
    path: "/components/typography",
    title: "排版 Typography",
    description: "文本的基本格式，包括标题、段落、文本样式与链接。",
    categoryKey: "general",
    whenToUse: "当需要展示标题、段落、强调文本或链接时，使用排版组件。",
    importCode: `import { Typography } from "aurora-ui"`,
    demos: [
      {
        id: "title",
        title: "标题",
        description: "Title 支持 1 至 5 级标题。",
        code: `import { Typography } from "aurora-ui"

const { Title } = Typography

export default function Demo() {
  return (
    <div className="space-y-2">
      <Title level={1}>一级标题</Title>
      <Title level={2}>二级标题</Title>
      <Title level={3}>三级标题</Title>
      <Title level={4}>四级标题</Title>
      <Title level={5}>五级标题</Title>
    </div>
  )
}`,
        element: (
          <div className="space-y-2">
            <Title level={1}>一级标题</Title>
            <Title level={2}>二级标题</Title>
            <Title level={3}>三级标题</Title>
            <Title level={4}>四级标题</Title>
            <Title level={5}>五级标题</Title>
          </div>
        ),
      },
      {
        id: "text",
        title: "文本样式",
        description: "Text 支持次级、成功、警告、危险等语义色，以及代码、标记、删除、加粗等样式。",
        code: `import { Typography, Space } from "aurora-ui"

const { Text } = Typography

export default function Demo() {
  return (
    <Space direction="vertical" size="small" className="items-start">
      <Text>默认文本</Text>
      <Text type="secondary">次级文本</Text>
      <Text type="success">成功文本</Text>
      <Text type="warning">警告文本</Text>
      <Text type="danger">危险文本</Text>
      <Space>
        <Text code>npm install</Text>
        <Text mark>标记文本</Text>
        <Text strong>加粗文本</Text>
        <Text delete>删除文本</Text>
        <Text underline>下划线文本</Text>
      </Space>
    </Space>
  )
}`,
        element: (
          <Space direction="vertical" size="small" className="items-start">
            <Text>默认文本</Text>
            <Text type="secondary">次级文本</Text>
            <Text type="success">成功文本</Text>
            <Text type="warning">警告文本</Text>
            <Text type="danger">危险文本</Text>
            <Space>
              <Text code>npm install</Text>
              <Text mark>标记文本</Text>
              <Text strong>加粗文本</Text>
              <Text delete>删除文本</Text>
              <Text underline>下划线文本</Text>
            </Space>
          </Space>
        ),
      },
      {
        id: "paragraph",
        title: "段落与链接",
        description: "Paragraph 用于多行文本，Link 用于可点击的链接。",
        code: `import { Typography } from "aurora-ui"

const { Paragraph, Link } = Typography

export default function Demo() {
  return (
    <div className="max-w-xl space-y-4">
      <Paragraph>
        Aurora UI 是一套面向企业级中后台产品的组件库，提供一致的设计语言与丰富的组件。
      </Paragraph>
      <Paragraph type="secondary">
        这是次级段落文本，用于展示辅助说明信息，颜色比正文更柔和。
      </Paragraph>
      <Paragraph>
        访问 <Link href="https://github.com/haofanchen/aurora-ui">GitHub</Link> 获取更多示例与源码。
      </Paragraph>
    </div>
  )
}`,
        element: (
          <div className="max-w-xl space-y-4">
            <Paragraph>
              Aurora UI 是一套面向企业级中后台产品的组件库，提供一致的设计语言与丰富的组件。
            </Paragraph>
            <Paragraph type="secondary">
              这是次级段落文本，用于展示辅助说明信息，颜色比正文更柔和。
            </Paragraph>
            <Paragraph>
              访问 <Link href="https://github.com/haofanchen/aurora-ui">GitHub</Link> 获取更多示例与源码。
            </Paragraph>
          </div>
        ),
      },
    ],
    api: [
      { name: "Typography.Title", description: "标题，level 为 1-5", type: "level: 1 | 2 | 3 | 4 | 5", default: "1" },
      { name: "Typography.Text", description: "文本，type 为语义色", type: `type: "secondary" | "success" | "warning" | "danger"`, default: "-" },
      { name: "Typography.Paragraph", description: "段落，支持 type", type: `type: "secondary" | "success" | "warning" | "danger"`, default: "-" },
      { name: "Typography.Link", description: "链接，继承 a 标签属性", type: "AnchorHTMLAttributes", default: "-" },
    ],
  },
]
