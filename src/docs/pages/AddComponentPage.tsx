import { Alert, Divider, Space, Typography } from "nb666-ui"
import { CodeBlock } from "../components/CodeBlock"

const { Title, Paragraph, Text } = Typography

const componentCode = `// src/components/ui/badge.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count?: number
  color?: string
  children?: React.ReactNode
}

export function Badge({ count, color = "#6c5ce7", className, children, ...props }: BadgeProps) {
  const show = count != null && count > 0

  return (
    <span className={cn("relative inline-flex", className)} {...props}>
      {children}
      {show && (
        <span
          className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-medium text-white"
          style={{ background: color }}
        >
          {count}
        </span>
      )}
    </span>
  )
}`

const exportCode = `// src/components/ui/index.ts
// 数据展示 Data Display 分类下补充导出
export { Badge } from "./badge"
export type { BadgeProps } from "./badge"`

const registryCode = `// src/docs/registry/data-display.tsx
{
  name: "Badge",
  path: "/components/badge",
  title: "徽标 Badge",
  description: "用于展示消息数量或状态的小徽标。",
  categoryKey: "data-display",
  importCode: \`import { Badge } from "nb666-ui"\`,
  demos: [
    {
      id: "basic",
      title: "基础用法",
      code: \`import { Badge } from "nb666-ui"

export default function Demo() {
  return (
    <Badge count={5}>
      <span className="inline-flex h-10 items-center rounded-md border px-4">消息</span>
    </Badge>
  )
}\`,
      element: (
        <Badge count={5}>
          <span className="inline-flex h-10 items-center rounded-md border px-4">消息</span>
        </Badge>
      ),
    },
  ],
  api: [
    { name: "count", description: "徽标数值，为 0 时不显示", type: "number", default: "-" },
    { name: "color", description: "自定义颜色", type: "string", default: "#6c5ce7" },
  ],
}`

const verifyCode = `npx tsc -b
npm run build`

function BadgePreview() {
  return (
    <span className="relative inline-flex">
      <span className="inline-flex h-10 items-center rounded-md border px-4">消息</span>
      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-medium text-primary-foreground">
        5
      </span>
    </span>
  )
}

export function AddComponentPage() {
  return (
    <div className="space-y-10">
      <section>
        <Title level={1}>新增组件</Title>
        <Paragraph type="secondary">
          本文以添加一个简化的 <Text code>Badge</Text> 为例，完整演示如何为 NB666 UI 新增组件。整个过程遵循「实现 → 导出 → 文档 → 验证」四步。
        </Paragraph>
      </section>

      <section className="space-y-3">
        <Title level={2}>示例预览</Title>
        <Paragraph>完成本文步骤后，你将在文档站得到这样一个可交互演示：</Paragraph>
        <div className="flex items-center justify-center rounded-lg border bg-card px-6 py-8">
          <BadgePreview />
        </div>
      </section>

      <Divider />

      <section className="space-y-3">
        <Title level={2}>1. 编写组件</Title>
        <Paragraph>
          在 <Text code>src/components/ui/</Text> 下新建 <Text code>badge.tsx</Text>。组件需导出 <Text code>Props</Text> 接口与组件本身，内部样式用 <Text code>cn</Text> 拼接，保持与现有组件一致。
        </Paragraph>
        <CodeBlock code={componentCode} />
        <Alert type="info" showIcon message="约定">
          组件文件以 kebab-case 命名；Props 接口命名为 <Text code>组件名 + Props</Text>，并尽量复用 HTML 属性类型。
        </Alert>
      </section>

      <section className="space-y-3">
        <Title level={2}>2. 导出组件</Title>
        <Paragraph>
          在 <Text code>src/components/ui/index.ts</Text> 的对应分类下补充 value 与 type 导出，即可通过 <Text code>nb666-ui</Text> 别名按需引入。
        </Paragraph>
        <CodeBlock code={exportCode} />
      </section>

      <section className="space-y-3">
        <Title level={2}>3. 注册文档</Title>
        <Paragraph>
          在 <Text code>src/docs/registry/</Text> 对应分类文件中追加一个 <Text code>ComponentDoc</Text> 对象。文档站会自动读取 <Text code>demos</Text> 生成演示，读取 <Text code>api</Text> 生成参数表。
        </Paragraph>
        <CodeBlock code={registryCode} />
        <Alert type="warning" showIcon message="注意">
          分类键可选：<Text code>general</Text>、<Text code>layout</Text>、<Text code>navigation</Text>、<Text code>data-entry</Text>、<Text code>data-display</Text>、<Text code>feedback</Text>，需与 <Text code>src/docs/data/meta.ts</Text> 保持一致。
        </Alert>
      </section>

      <section className="space-y-3">
        <Title level={2}>4. 验证构建</Title>
        <Paragraph>运行类型检查与构建，确保没有遗漏或报错。</Paragraph>
        <CodeBlock code={verifyCode} language="bash" />
      </section>

      <Divider />

      <section className="space-y-4">
        <Title level={2}>推荐写法</Title>
        <Space direction="vertical" size="small" className="items-start">
          <Paragraph>· 受控/非受控统一使用 <Text code>useControllableState</Text>。</Paragraph>
          <Paragraph>· 弹层定位复用 <Text code>overlayPlacement</Text>，下拉面板复用 <Text code>popupPanelClass</Text>。</Paragraph>
          <Paragraph>· 表单尺寸与校验态复用 <Text code>controlHeight</Text> / <Text code>fieldStatusClass</Text>。</Paragraph>
          <Paragraph>· 点击外部关闭使用 <Text code>useClickOutside</Text>。</Paragraph>
          <Paragraph>· Tailwind 类名不要动态拼接，使用显式映射或 <Text code>cn</Text> + 完整类名。</Paragraph>
        </Space>
      </section>

      <section className="space-y-3">
        <Title level={2}>目录约定</Title>
        <Space direction="vertical" size="small" className="items-start">
          <Paragraph>· 组件实现：<Text code>src/components/ui/</Text></Paragraph>
          <Paragraph>· 全局样式与 token：<Text code>src/index.css</Text>、<Text code>src/lib/styles.ts</Text></Paragraph>
          <Paragraph>· 通用 hooks：<Text code>src/hooks/</Text></Paragraph>
          <Paragraph>· 文档注册表：<Text code>src/docs/registry/</Text></Paragraph>
        </Space>
      </section>

      <Alert type="success" showIcon message="完成标准">
        新增组件应同时具备可交互演示、完整 API 说明，并通过 <Text code>npx tsc -b</Text> 与 <Text code>npm run build</Text>。
      </Alert>
    </div>
  )
}
