import * as React from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { Boxes, Compass, Eye, Github, LayoutGrid, Menu as MenuIcon, MessageSquareWarning, PenLine, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { categories, meta } from "../data/meta"
import { allComponents } from "../registry"
import { MessageHolder, ModalHolder, NotificationHolder } from "aurora-ui"
import { ThemeToggle } from "@/components/theme-toggle"

const categoryIcons: Record<string, React.ReactNode> = {
  general: <Boxes className="size-4" />,
  layout: <LayoutGrid className="size-4" />,
  navigation: <Compass className="size-4" />,
  "data-entry": <PenLine className="size-4" />,
  "data-display": <Eye className="size-4" />,
  feedback: <MessageSquareWarning className="size-4" />,
}

export function DocsLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const location = useLocation()

  React.useEffect(() => {
    setMobileOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const filtered = query.trim()
    ? allComponents.filter(
        (c) =>
          c.title.toLowerCase().includes(query.trim().toLowerCase()) ||
          c.name.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : null

  const sidebar = (
    <aside className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-5">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6c5ce7] to-[#8b7cf6] text-sm font-bold text-white">
            A
          </span>
          <span>{meta.name}</span>
        </Link>
        <span className="ml-auto rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">
          v{meta.version}
        </span>
      </div>

      <div className="border-b p-3">
        <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索组件..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-auto scrollbar-thin p-3">
        <div className="mb-4 space-y-1">
          <NavLink
            to="/docs"
            end
            className={({ isActive }) =>
              cn(
                "block rounded-md px-3 py-2 text-sm transition-colors",
                isActive ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )
            }
          >
            快速上手
          </NavLink>
          <NavLink
            to="/docs/add-component"
            className={({ isActive }) =>
              cn(
                "block rounded-md px-3 py-2 text-sm transition-colors",
                isActive ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )
            }
          >
            新增组件
          </NavLink>
        </div>
        {filtered ? (
          <div className="space-y-1">
            {filtered.length === 0 ? (
              <p className="px-2 py-4 text-center text-sm text-muted-foreground">未找到相关组件</p>
            ) : (
              filtered.map((c) => (
                <NavLink
                  key={c.path}
                  to={c.path}
                  className={({ isActive }) =>
                    cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors",
                      isActive ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )
                  }
                >
                  {c.title}
                </NavLink>
              ))
            )}
          </div>
        ) : (
          categories.map((category) => {
            const items = allComponents.filter((c) => c.categoryKey === category.key)
            return (
              <div key={category.key} className="mb-4">
                <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {categoryIcons[category.key]}
                  {category.title}
                </div>
                <div className="space-y-0.5">
                  {items.map((c) => (
                    <NavLink
                      key={c.path}
                      to={c.path}
                      className={({ isActive }) =>
                        cn(
                          "block rounded-md px-3 py-1.5 text-sm transition-colors",
                          isActive ? "bg-primary/10 font-medium text-primary" : "text-foreground/80 hover:bg-accent hover:text-foreground",
                        )
                      }
                    >
                      {c.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </nav>
    </aside>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-md border p-2 lg:hidden"
          aria-label="打开菜单"
        >
          <MenuIcon className="size-4" />
        </button>
        <div className="hidden items-center gap-2 text-sm text-muted-foreground lg:flex">
          <Link to="/" className="transition-colors hover:text-foreground">首页</Link>
          <span>/</span>
          <Link to="/docs" className="transition-colors hover:text-foreground">文档</Link>
          <span>/</span>
          <span className="text-foreground">组件</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <a
            href={meta.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
          >
            <Github className="size-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        <div className="sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 lg:block">
          {sidebar}
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 h-full">{sidebar}</div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute left-[17rem] top-4 rounded-md border bg-background p-2"
              aria-label="关闭菜单"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <Outlet />
          </div>
        </main>
      </div>

      <MessageHolder />
      <NotificationHolder />
      <ModalHolder />
    </div>
  )
}
