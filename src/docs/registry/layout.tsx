import { Button, Col, Divider, Row, Space } from "aurora-ui"
import type { ComponentDoc } from "../data/types"

export const layoutComponents: ComponentDoc[] = [
  {
    name: "Space",
    path: "/components/space",
    title: "间距 Space",
    description: "设置组件之间的间距，避免重复书写 margin。",
    categoryKey: "layout",
    whenToUse: "当多个组件需要水平或垂直排列并保持统一间距时使用。",
    importCode: `import { Space } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "相邻组件水平间距。",
        code: `import { Button, Space } from "aurora-ui"

export default function Demo() {
  return (
    <Space>
      <Button type="primary">按钮一</Button>
      <Button type="default">按钮二</Button>
      <Button type="dashed">按钮三</Button>
    </Space>
  )
}`,
        element: (
          <Space>
            <Button>按钮一</Button>
            <Button>按钮二</Button>
            <Button>按钮三</Button>
          </Space>
        ),
      },
      {
        id: "vertical",
        title: "垂直排列",
        description: "设置 direction 为 vertical 可垂直排列，size 控制间距大小。",
        code: `import { Button, Space } from "aurora-ui"

export default function Demo() {
  return (
    <Space direction="vertical" size="large" className="items-start">
      <Button type="primary">按钮一</Button>
      <Button type="default">按钮二</Button>
      <Button type="dashed">按钮三</Button>
    </Space>
  )
}`,
        element: (
          <Space direction="vertical" size="large" className="items-start">
            <Button type="primary">按钮一</Button>
            <Button type="default">按钮二</Button>
            <Button type="dashed">按钮三</Button>
          </Space>
        ),
      },
      {
        id: "compact",
        title: "紧凑组合",
        description: "Space.Compact 将相邻控件拼接为一个整体。",
        code: `import { Button, Space } from "aurora-ui"

export default function Demo() {
  return (
    <Space.Compact>
      <Button type="primary">编辑</Button>
      <Button type="default">删除</Button>
      <Button type="default">分享</Button>
    </Space.Compact>
  )
}`,
        element: (
          <Space.Compact>
            <Button type="primary">编辑</Button>
            <Button type="default">删除</Button>
            <Button type="default">分享</Button>
          </Space.Compact>
        ),
      },
      {
        id: "split",
        title: "分割符",
        description: "split 属性在相邻元素间插入分割符。",
        code: `import { Button, Divider, Space } from "aurora-ui"

export default function Demo() {
  return (
    <Space split={<Divider type="vertical" />}>
      <Button type="text">链接一</Button>
      <Button type="text">链接二</Button>
      <Button type="text">链接三</Button>
    </Space>
  )
}`,
        element: (
          <Space split={<Divider type="vertical" />}>
            <Button type="text">链接一</Button>
            <Button type="text">链接二</Button>
            <Button type="text">链接三</Button>
          </Space>
        ),
      },
    ],
    api: [
      { name: "direction", description: "排列方向", type: `"horizontal" | "vertical"`, default: "horizontal" },
      { name: "size", description: "间距大小", type: `"small" | "middle" | "large" | number`, default: "middle" },
      { name: "align", description: "对齐方式", type: `"start" | "end" | "center" | "baseline"`, default: "-" },
      { name: "wrap", description: "是否自动换行", type: "boolean", default: "false" },
      { name: "split", description: "设置拆分元素", type: "React.ReactNode", default: "-" },
    ],
  },
  {
    name: "Divider",
    path: "/components/divider",
    title: "分割线 Divider",
    description: "区隔内容的分割线，支持水平与垂直方向。",
    categoryKey: "layout",
    whenToUse: "当需要对不同内容进行分组或分隔时使用。",
    importCode: `import { Divider } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "默认为水平分割线，可插入文字。",
        code: `import { Divider } from "aurora-ui"

export default function Demo() {
  return (
    <div className="w-full">
      <p className="mb-4 text-sm text-muted-foreground">上方内容</p>
      <Divider />
      <p className="my-4 text-sm text-muted-foreground">中间内容</p>
      <Divider>居中文案</Divider>
      <p className="mt-4 text-sm text-muted-foreground">下方内容</p>
    </div>
  )
}`,
        element: (
          <div className="w-full">
            <p className="mb-4 text-sm text-muted-foreground">上方内容</p>
            <Divider />
            <p className="my-4 text-sm text-muted-foreground">中间内容</p>
            <Divider>居中文案</Divider>
            <p className="mt-4 text-sm text-muted-foreground">下方内容</p>
          </div>
        ),
      },
      {
        id: "dashed",
        title: "虚线样式",
        description: "dashed 属性切换为虚线，orientation 控制文字位置。",
        code: `import { Divider } from "aurora-ui"

export default function Demo() {
  return (
    <div className="w-full space-y-4">
      <Divider dashed orientation="left">左侧标题</Divider>
      <Divider dashed>居中标题</Divider>
      <Divider dashed orientation="right">右侧标题</Divider>
    </div>
  )
}`,
        element: (
          <div className="w-full space-y-4">
            <Divider dashed orientation="left">左侧标题</Divider>
            <Divider dashed>居中标题</Divider>
            <Divider dashed orientation="right">右侧标题</Divider>
          </div>
        ),
      },
      {
        id: "vertical",
        title: "垂直分割线",
        description: "设置 type 为 vertical 使用垂直分割线。",
        code: `import { Divider } from "aurora-ui"

export default function Demo() {
  return (
    <div className="flex items-center gap-2 text-sm">
      文字一
      <Divider type="vertical" />
      文字二
      <Divider type="vertical" dashed />
      文字三
    </div>
  )
}`,
        element: (
          <div className="flex items-center gap-2 text-sm">
            文字一
            <Divider type="vertical" />
            文字二
            <Divider type="vertical" dashed />
            文字三
          </div>
        ),
      },
    ],
    api: [
      { name: "orientation", description: "分割线标题位置", type: `"left" | "center" | "right"`, default: "center" },
      { name: "dashed", description: "是否虚线", type: "boolean", default: "false" },
      { name: "type", description: "水平还是垂直", type: `"horizontal" | "vertical"`, default: "horizontal" },
      { name: "plain", description: "文字是否视为普通文字（不添加线条）", type: "boolean", default: "false" },
    ],
  },
  {
    name: "Grid",
    path: "/components/grid",
    title: "栅格 Grid",
    description: "24 栅格系统，通过 Row 与 Col 构建响应式布局。",
    categoryKey: "layout",
    whenToUse: "当需要按栅格排列内容并支持响应式时使用。",
    importCode: `import { Row, Col } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础栅格",
        description: "Col 的 span 范围为 1-24，共 24 等份。",
        code: `import { Col, Row } from "aurora-ui"

export default function Demo() {
  return (
    <Row gutter={12}>
      <Col span={12}><div className="h-10 rounded bg-primary/20" /></Col>
      <Col span={12}><div className="h-10 rounded bg-primary/30" /></Col>
      <Col span={8}><div className="mt-3 h-10 rounded bg-primary/20" /></Col>
      <Col span={8}><div className="mt-3 h-10 rounded bg-primary/30" /></Col>
      <Col span={8}><div className="mt-3 h-10 rounded bg-primary/40" /></Col>
    </Row>
  )
}`,
        element: (
          <Row gutter={12}>
            <Col span={12}><div className="h-10 rounded bg-primary/20" /></Col>
            <Col span={12}><div className="h-10 rounded bg-primary/30" /></Col>
            <Col span={8}><div className="mt-3 h-10 rounded bg-primary/20" /></Col>
            <Col span={8}><div className="mt-3 h-10 rounded bg-primary/30" /></Col>
            <Col span={8}><div className="mt-3 h-10 rounded bg-primary/40" /></Col>
          </Row>
        ),
      },
      {
        id: "offset",
        title: "列偏移",
        description: "offset 属性让列向右偏移指定份数。",
        code: `import { Col, Row } from "aurora-ui"

export default function Demo() {
  return (
    <Row gutter={12}>
      <Col span={8}><div className="h-10 rounded bg-primary/20" /></Col>
      <Col span={8} offset={8}><div className="h-10 rounded bg-primary/40" /></Col>
    </Row>
  )
}`,
        element: (
          <Row gutter={12}>
            <Col span={8}><div className="h-10 rounded bg-primary/20" /></Col>
            <Col span={8} offset={8}><div className="h-10 rounded bg-primary/40" /></Col>
          </Row>
        ),
      },
      {
        id: "responsive",
        title: "响应式栅格",
        description: "通过 xs / sm / md / lg / xl 在不同断点下调整列宽。",
        code: `import { Col, Row } from "aurora-ui"

export default function Demo() {
  return (
    <Row gutter={12}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <div className="h-10 rounded bg-primary/20" />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <div className="h-10 rounded bg-primary/30" />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <div className="h-10 rounded bg-primary/40" />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <div className="h-10 rounded bg-primary/50" />
      </Col>
    </Row>
  )
}`,
        element: (
          <Row gutter={12}>
            <Col xs={24} sm={12} md={8} lg={6}><div className="h-10 rounded bg-primary/20" /></Col>
            <Col xs={24} sm={12} md={8} lg={6}><div className="h-10 rounded bg-primary/30" /></Col>
            <Col xs={24} sm={12} md={8} lg={6}><div className="h-10 rounded bg-primary/40" /></Col>
            <Col xs={24} sm={12} md={8} lg={6}><div className="h-10 rounded bg-primary/50" /></Col>
          </Row>
        ),
      },
    ],
    api: [
      { name: "Row.gutter", description: "栅格间隔", type: "number | [number, number]", default: "0" },
      { name: "Row.align", description: "垂直对齐方式", type: `"top" | "middle" | "bottom"`, default: "top" },
      { name: "Row.justify", description: "水平排列方式", type: `"start" | "end" | "center" | "space-between" | "space-around"`, default: "start" },
      { name: "Col.span", description: "栅格占位格数（0-24）", type: "number", default: "24" },
      { name: "Col.offset", description: "栅格左侧间隔格数", type: "number", default: "0" },
      { name: "Col.flex", description: "flex 布局属性", type: "string | number", default: "-" },
      { name: "Col.xs / sm / md / lg / xl", description: "响应式栅格占位格数", type: "number", default: "-" },
    ],
  },
]
