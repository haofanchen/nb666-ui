import { Button, Flex, Header, Content, Footer, Layout, Sider } from "aurora-ui"
import type { ComponentDoc } from "../data/types"

export const layoutComponents2: ComponentDoc[] = [
  {
    name: "Layout",
    path: "/components/layout",
    title: "布局 Layout",
    description: "页面级整体布局，包含 Header、Sider、Content、Footer 等子组件。",
    categoryKey: "layout",
    whenToUse: "当需要搭建整体页面框架（顶栏、侧栏、内容、页脚）时使用。",
    importCode: `import { Layout, Header, Sider, Content, Footer } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础结构",
        description: "组合 Header、Sider、Content、Footer 构建经典后台布局。",
        code: `import { Content, Footer, Header, Layout, Sider } from "aurora-ui"

export default function Demo() {
  return (
    <Layout className="rounded-lg border overflow-hidden" style={{ height: 360 }}>
      <Header className="bg-primary/10">Header</Header>
      <Layout hasSider className="flex-1">
        <Sider width={140} className="bg-accent">Sider</Sider>
        <Content className="p-4">Content</Content>
      </Layout>
      <Footer className="bg-muted">Footer</Footer>
    </Layout>
  )
}`,
        element: (
          <Layout className="rounded-lg border overflow-hidden" style={{ height: 360 }}>
            <Header className="bg-primary/10">Header</Header>
            <Layout hasSider className="flex-1">
              <Sider width={140} className="bg-accent">Sider</Sider>
              <Content className="p-4">Content</Content>
            </Layout>
            <Footer className="bg-muted">Footer</Footer>
          </Layout>
        ),
      },
    ],
    api: [
      { name: "Layout.hasSider", description: "是否包含侧栏（横向排列）", type: "boolean", default: "false" },
      { name: "Header", description: "顶栏容器", type: "HTMLAttributes", default: "-" },
      { name: "Sider.width", description: "侧栏宽度", type: "number | string", default: "200" },
      { name: "Content", description: "内容区容器", type: "HTMLAttributes", default: "-" },
      { name: "Footer", description: "页脚容器", type: "HTMLAttributes", default: "-" },
    ],
  },
  {
    name: "Flex",
    path: "/components/flex",
    title: "弹性布局 Flex",
    description: "基于 Flexbox 的布局容器，提供更语义化的对齐与间距。",
    categoryKey: "layout",
    whenToUse: "当需要灵活排列元素并控制对齐与间距时使用。",
    importCode: `import { Flex } from "aurora-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "支持水平/垂直排列、间距、对齐与换行。",
        code: `import { Button, Flex } from "aurora-ui"

export default function Demo() {
  return (
    <Flex vertical gap="large" className="items-start">
      <Flex gap="middle">
        <Button type="primary">一</Button>
        <Button type="default">二</Button>
        <Button type="dashed">三</Button>
      </Flex>
      <Flex gap="middle" justify="space-between" className="w-full">
        <Button type="text">左</Button>
        <Button type="text">右</Button>
      </Flex>
    </Flex>
  )
}`,
        element: (
          <Flex vertical gap="large" className="items-start">
            <Flex gap="middle">
              <Button type="primary">一</Button>
              <Button type="default">二</Button>
              <Button type="dashed">三</Button>
            </Flex>
            <Flex gap="middle" justify="space-between" className="w-full">
              <Button type="text">左</Button>
              <Button type="text">右</Button>
            </Flex>
          </Flex>
        ),
      },
    ],
    api: [
      { name: "vertical", description: "是否纵向排列", type: "boolean", default: "false" },
      { name: "gap", description: "间距", type: `number | "small" | "middle" | "large"`, default: "-" },
      { name: "align", description: "垂直对齐", type: `"start" | "end" | "center" | "baseline" | "stretch"`, default: "-" },
      { name: "justify", description: "水平排列", type: `"start" | "end" | "center" | "space-between" | "space-around"`, default: "-" },
      { name: "wrap", description: "是否换行", type: "boolean", default: "false" },
    ],
  },
]
