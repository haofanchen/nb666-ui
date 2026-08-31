import { Link, useParams } from "react-router-dom"
import { Breadcrumb, Divider, Typography } from "nb666-ui"
import { DemoBox } from "../components/DemoBox"
import { ApiTable } from "../components/ApiTable"
import { CodeBlock } from "../components/CodeBlock"
import { categories } from "../data/meta"
import { getComponent } from "../registry"

const { Title, Paragraph, Text } = Typography

export function ComponentPage() {
  const { name } = useParams<{ name: string }>()
  const component = name ? getComponent(`/components/${name}`) : undefined

  if (!component) {
    return (
      <div className="py-20 text-center">
        <Title level={2}>组件不存在</Title>
        <Paragraph type="secondary" className="mt-2">
          未找到对应的组件，<Link to="/components/button">返回组件列表</Link>。
        </Paragraph>
      </div>
    )
  }

  const category = categories.find((c) => c.key === component.categoryKey)

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { title: "首页", href: "/" },
          { title: "组件", href: "/components/button" },
          { title: category?.title ?? "" },
          { title: component.name },
        ]}
      />

      <header>
        <Title level={1}>{component.title}</Title>
        <Paragraph type="secondary" className="mt-3 max-w-3xl text-base">
          {component.description}
        </Paragraph>
      </header>

      {component.whenToUse && (
        <section className="rounded-lg border bg-muted/30 p-4 text-sm leading-6 text-muted-foreground">
          <Text strong className="text-foreground">何时使用</Text>
          <p className="mt-1">{component.whenToUse}</p>
        </section>
      )}

      <section className="space-y-3">
        <Title level={2}>引用方式</Title>
        <CodeBlock code={component.importCode} />
      </section>

      <Divider />

      <section className="space-y-6">
        <Title level={2}>代码演示</Title>
        {component.demos.map((demo) => (
          <DemoBox key={demo.id} title={demo.title} description={demo.description} code={demo.code}>
            {demo.element}
          </DemoBox>
        ))}
      </section>

      <Divider />

      <section className="space-y-3">
        <Title level={2}>API</Title>
        <Paragraph type="secondary">
          组件支持以下属性，未列出的属性将透传给原生元素。
        </Paragraph>
        <ApiTable items={component.api} />
      </section>
    </div>
  )
}
