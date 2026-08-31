import { Link } from "react-router-dom"
import { ArrowRight, BookOpen, Component, Github, Palette, Sparkles, Zap } from "lucide-react"
import { Button } from "nb666-ui"
import { categories, meta } from "../data/meta"
import { allComponents } from "../registry"
import { ThemeToggle } from "@/components/theme-toggle"

const highlights = [
  {
    icon: Component,
    title: "组件丰富",
    description: `${allComponents.length} 个高质量组件，覆盖布局、导航、录入、展示与反馈全场景。`,
  },
  {
    icon: Palette,
    title: "设计语言",
    description: "紫色系主色调与语义色体系，支持亮暗双主题与 CSS 变量定制。",
  },
  {
    icon: Zap,
    title: "开箱即用",
    description: "TypeScript 类型完备，按需引入，与 React 19 + Vite 无缝集成。",
  },
  {
    icon: BookOpen,
    title: "文档完善",
    description: "每个组件提供实时示例、代码片段、引用方式与 API 说明。",
  },
]

export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6c5ce7] to-[#8b7cf6] text-sm text-white">
              A
            </span>
            {meta.name}
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            <Link to="/docs" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              文档
            </Link>
            <Link to="/components/button" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              组件
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={meta.repo}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-md border p-2 transition-colors hover:border-primary hover:text-primary sm:inline-flex"
              aria-label="GitHub"
            >
              <Github className="size-4" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        <section className="flex flex-col items-center gap-6 py-20 text-center sm:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground">
            <Sparkles className="size-4 text-primary" />
            {meta.slogan} · v{meta.version}
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            用 <span className="bg-gradient-to-r from-[#6c5ce7] to-[#a78bfa] bg-clip-text text-transparent">{meta.name}</span>
            <br />
            构建优雅的企业级界面
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            {meta.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/docs">
              <Button type="primary" size="large">
                开始使用
                <ArrowRight />
              </Button>
            </Link>
            <Link to="/components/button">
              <Button type="default" size="large">
                浏览组件
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-card">
              <item.icon className="size-6 text-primary" />
              <h2 className="mt-3 font-semibold">{item.title}</h2>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="py-20">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">组件总览</h2>
            <p className="mt-2 text-muted-foreground">按类别浏览全部组件</p>
          </div>
          <div className="space-y-8">
            {categories.map((category) => {
              const items = allComponents.filter((c) => c.categoryKey === category.key)
              return (
                <div key={category.key}>
                  <h3 className="mb-3 font-semibold">{category.title}</h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((c) => (
                      <Link
                        key={c.path}
                        to={c.path}
                        className="group rounded-lg border bg-card p-4 transition-colors hover:border-primary"
                      >
                        <div className="font-medium group-hover:text-primary">{c.title}</div>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <footer className="border-t py-10 text-center text-sm text-muted-foreground">
        {meta.name} · 使用 React 19 + Vite + TypeScript + Tailwind CSS 构建
      </footer>
    </div>
  )
}
