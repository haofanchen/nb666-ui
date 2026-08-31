import * as React from "react"
import { Check, Code2, Copy } from "lucide-react"
import { CodeBlock } from "./CodeBlock"
import { cn } from "@/lib/utils"

export interface DemoBoxProps {
  title?: string
  description?: string
  code?: string
  children: React.ReactNode
  background?: "default" | "checkerboard"
}

export function DemoBox({ title, description, code, children, background = "default" }: DemoBoxProps) {
  const [showCode, setShowCode] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = code
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="rounded-lg border bg-card">
      {(title || description) && (
        <div className="border-b px-5 py-4">
          {title && <h3 className="font-semibold">{title}</h3>}
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div
        className={cn(
          "px-6 py-8",
          background === "checkerboard" && "bg-[radial-gradient(circle,#e5e5ee_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(circle,#2c2d3d_1px,transparent_1px)]",
        )}
      >
        {children}
      </div>
      {code && (
        <div className="overflow-hidden rounded-b-lg">
          <div className="flex items-center justify-between border-t bg-muted/40 px-4 py-1.5">
            <span />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copied ? "已复制" : "复制"}
              </button>
              <button
                type="button"
                onClick={() => setShowCode((s) => !s)}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <Code2 className="size-3.5" />
                {showCode ? "收起代码" : "显示代码"}
              </button>
            </div>
          </div>
          {showCode && <CodeBlock code={code} className="rounded-none border-0" />}
        </div>
      )}
    </section>
  )
}
