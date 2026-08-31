import { cn } from "@/lib/utils"

export interface ApiItem {
  name: string
  description: string
  type: string
  default?: string
  required?: boolean
}

export function ApiTable({ items }: { items: ApiItem[] }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="overflow-auto scrollbar-thin">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-muted/60 text-left">
              <th className="border-b px-4 py-3 font-medium">属性</th>
              <th className="border-b px-4 py-3 font-medium">说明</th>
              <th className="border-b px-4 py-3 font-medium">类型</th>
              <th className="border-b px-4 py-3 font-medium">默认值</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.name} className="align-top transition-colors hover:bg-accent/40">
                <td className="border-b px-4 py-3">
                  <code className="font-mono text-[13px] text-primary">{item.name}</code>
                  {item.required && (
                    <span className="ml-2 rounded bg-error/10 px-1.5 py-0.5 text-xs text-error">必填</span>
                  )}
                </td>
                <td className="border-b px-4 py-3 leading-6 text-muted-foreground">{item.description}</td>
                <td className="border-b px-4 py-3">
                  <code className={cn("break-all font-mono text-[12px]", "text-sky-600 dark:text-sky-400")}>{item.type}</code>
                </td>
                <td className="border-b px-4 py-3">
                  <code className="font-mono text-[12px] text-muted-foreground">{item.default ?? "-"}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
