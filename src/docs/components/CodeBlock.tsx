import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { highlight } from "./highlight"

export function CodeBlock({ code, language = "tsx", className }: { code: string; language?: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
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

  const lines = code.replace(/\n$/, "").split("\n")

  return (
    <div className={cn("group relative overflow-hidden rounded-lg border border-white/10 bg-[#161821]", className)}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs uppercase tracking-wider text-white/40">{language}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 text-xs text-white/60 transition-colors hover:text-white"
        >
          {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
          {copied ? "已复制" : "复制代码"}
        </button>
      </div>
      <div className="overflow-auto scrollbar-thin">
        <pre className="min-w-max p-4 text-[13px] leading-6">
          <code className="font-mono">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="mr-4 w-6 shrink-0 select-none text-right text-white/20">{i + 1}</span>
                <span className="whitespace-pre">{line ? highlight(line) : " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
