import { Alert, Divider, Typography } from "nb666-ui"
import { CodeBlock } from "../components/CodeBlock"
import { meta } from "../data/meta"

const { Title, Paragraph, Text, Link } = Typography

const installCode = `# npm
npm install nb666-ui

# yarn
yarn add nb666-ui

# pnpm
pnpm add nb666-ui`

const quickStart = `import { createRoot } from "react-dom/client"
import { Button } from "nb666-ui"
import "nb666-ui/styles.css"

function App() {
  return (
    <Button type="primary" onClick={() => alert("Hello NB666 UI")}>
      点击我
    </Button>
  )
}

createRoot(document.getElementById("root")!).render(<App />)`

const importCode = `// 具名导入：按需引入组件
import { Button, Table, Modal } from "nb666-ui"

// 引入组件类型
import type { ButtonProps } from "nb666-ui"

// 方法式组件
import { message } from "nb666-ui"

message.success("操作成功")`

const themeCode = `:root {
  --primary: #6c5ce7;       /* 主色 */
  --success: #16a34a;       /* 成功 */
  --warning: #f59e0b;       /* 警告 */
  --error: #dc2626;         /* 错误 */
  --radius: 0.5rem;         /* 圆角 */
}

.dark {
  --primary: #8b7cf6;
}`

const palette = [
  { name: "Primary", value: "#6c5ce7", text: "#ffffff" },
  { name: "Success", value: "#16a34a", text: "#ffffff" },
  { name: "Warning", value: "#f59e0b", text: "#ffffff" },
  { name: "Error", value: "#dc2626", text: "#ffffff" },
  { name: "Info", value: "#2563eb", text: "#ffffff" },
]

const autoImportUsage = `export default function App() {
  return (
    <div>
      <Button type="primary">按钮</Button>
      <Table dataSource={[]} columns={[]} />
      <Modal open={false}>内容</Modal>
    </div>
  )
}

// 无需手动书写：import { Button, Table, Modal } from "nb666-ui"`

const autoImportVite = `// vite.config.ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import AutoImport from "unplugin-auto-import/vite"
import { NB666UIResolver } from "nb666-ui"

export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: ["react"],
      resolvers: [NB666UIResolver],
      dts: "src/auto-imports.d.ts",
    }),
  ],
})`

const autoImportWebpack = `// webpack.config.js
const AutoImport = require("unplugin-auto-import/webpack").default
const { NB666UIResolver } = require("nb666-ui")

module.exports = {
  plugins: [
    AutoImport({
      imports: ["react"],
      resolvers: [NB666UIResolver],
      dts: "src/auto-imports.d.ts",
    }),
  ],
}`

export function GettingStartedPage() {
  return (
    <div className="space-y-10">
      <section>
        <Title level={1}>快速上手</Title>
        <Paragraph type="secondary">
          {meta.name} 是一套面向企业级中后台产品的 React 组件库。本文将介绍如何安装、引入并使用组件。
        </Paragraph>
      </section>

      <section className="space-y-3">
        <Title level={2}>安装</Title>
        <Paragraph>使用 npm、yarn 或 pnpm 安装依赖。</Paragraph>
        <CodeBlock code={installCode} language="bash" />
      </section>

      <section className="space-y-3">
        <Title level={2}>快速开始</Title>
        <Paragraph>引入样式后即可在应用中使用组件。</Paragraph>
        <CodeBlock code={quickStart} />
        <Alert type="info" showIcon message="提示" description="本工程已将样式内联于入口文件，并配置了 nb666-ui 别名，示例代码即为真实可用的引用方式。" />
      </section>

      <Divider />

      <section className="space-y-3">
        <Title level={2}>引用方式</Title>
        <Paragraph>
          组件通过具名导出提供，可自由按需引入；方法式组件（如 <Text code>message</Text>）同样从主入口导入。
        </Paragraph>
        <CodeBlock code={importCode} />
      </section>

      <section className="space-y-3">
        <Title level={2}>自动按需引入</Title>
        <Paragraph>
          借助 <Text code>unplugin-auto-import</Text> 与内置的 <Text code>NB666UIResolver</Text>，可在 Vite 或 Webpack 中自动按需导入组件，无需逐个 <Text code>import</Text>。
        </Paragraph>
        <CodeBlock code={autoImportUsage} />
        <Title level={3}>Vite</Title>
        <CodeBlock code={autoImportVite} />
        <Title level={3}>Webpack</Title>
        <CodeBlock code={autoImportWebpack} />
        <Alert
          type="info"
          showIcon
          message="Tree Shaking"
          description="组件使用 ESM 具名导出，且 package.json 已设置 sideEffects: false，配合构建工具可自动去除未使用的组件代码。"
        />
      </section>

      <section className="space-y-3">
        <Title level={2}>主题与定制</Title>
        <Paragraph>
          {meta.name} 基于 CSS 变量驱动主题，可通过覆盖变量实现品牌色与圆角的定制，并通过 <Text code>.dark</Text> 类切换暗色模式。
        </Paragraph>
        <CodeBlock code={themeCode} language="css" />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {palette.map((c) => (
            <div key={c.name} className="overflow-hidden rounded-lg border">
              <div className="h-16" style={{ background: c.value }} />
              <div className="p-3">
                <div className="text-sm font-medium">{c.name}</div>
                <div className="font-mono text-xs text-muted-foreground">{c.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <Title level={2}>下一步</Title>
        <Paragraph>
          前往 <Link href="/components/button">组件总览</Link> 浏览全部组件，每个组件页面都包含实时示例、代码、引用方式与 API 说明。
        </Paragraph>
      </section>
    </div>
  )
}
