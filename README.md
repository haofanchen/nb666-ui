# Aurora UI

Aurora UI 是一套面向企业级中后台产品的 React 组件库，提供一致的设计语言、丰富的组件与类 Ant Design 的文档站。

## 链接

- GitHub 仓库：https://github.com/haofanchen/aurora-ui
- 在线文档：https://haofanchen.github.io/aurora-ui/

## 技术栈

- **React 19** + **Vite 6** + **TypeScript 5.7**
- **Tailwind CSS 4**（CSS-first 配置，CSS 变量驱动主题）
- **React Router 7** 客户端路由
- **class-variance-authority** + **clsx** + **tailwind-merge**
- **lucide-react** 图标集

## 特性

- 紫色系品牌主色 + 亮/暗双主题
- 70+ 组件，覆盖通用、布局、导航、数据录入、数据展示、反馈六大类
- 类 Ant Design 的文档站：实时示例、代码演示、引用方式、API 表格
- `aurora-ui` 具名导出，支持 Tree Shaking
- 内置 `unplugin-auto-import` 的 `AuroraUIResolver`，可自动按需引入

## 安装使用

```bash
npm install aurora-ui
```

```tsx
import { Button } from "aurora-ui"
import "aurora-ui/styles.css"

export default function App() {
  return <Button type="primary">按钮</Button>
}
```

## 本地开发

```bash
npm install
npm run dev
```

## 常用命令

```bash
npm run dev        # 启动文档站开发服务器
npm run build      # 类型检查 + 文档站构建（输出 docs-dist）
npm run build:lib  # 组件库构建（输出 dist，含 ESM/CJS/CSS/类型）
npm run preview    # 预览文档站生产构建
```

## 新增组件

参考文档站「新增组件」页，或查看 `src/components/ui/README.md`。简要流程：

1. 新建 `src/components/ui/<name>.tsx`
2. 在 `src/components/ui/index.ts` 补充导出
3. 在 `src/docs/registry/` 补充示例与 API
4. 运行 `npm run build:lib` 与 `npm run build` 验证

## 文档站路由

- `/` — 首页与组件总览
- `/docs` — 快速上手（安装、引用方式、主题定制、自动按需引入）
- `/docs/add-component` — 新增组件指南
- `/components/:name` — 组件详情（示例、代码、API）

## 目录结构

```text
src/
├── components/ui/      # 组件库（aurora-ui 入口 index.ts）
├── docs/               # 文档站
│   ├── components/     # CodeBlock / DemoBox / ApiTable / highlight
│   ├── layout/         # 侧边栏 + 顶栏布局
│   ├── pages/          # 首页 / 快速上手 / 新增组件 / 组件页
│   ├── registry/       # 组件示例与 API 元数据
│   └── data/           # 站点元信息与类型
├── hooks/              # use-breakpoint 等 hooks
├── App.tsx             # 路由
├── index.css           # Tailwind + 设计变量
└── main.tsx            # 入口
```

## 引用方式

组件通过 `aurora-ui` 具名导出：

```tsx
import { Button, Table, Modal } from "aurora-ui"
import { message } from "aurora-ui"
```
