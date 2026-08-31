import * as React from "react"
import { AtSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { useClickOutside } from "@/hooks/use-click-outside"

export interface MentionOption {
  label: string
  value: string
}

export interface MentionsProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value" | "defaultValue" | "onSelect"> {
  options?: string[] | MentionOption[]
  value?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  rows?: number
  prefix?: string
  onChange?: (value: string) => void
  onSelect?: (option: MentionOption, prefix: string) => void
}

function normalizeOptions(options: string[] | MentionOption[]): MentionOption[] {
  return options.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option,
  )
}

export function Mentions({
  options = [],
  value: controlledValue,
  defaultValue = "",
  placeholder = "输入 @ 提及他人",
  disabled = false,
  rows = 3,
  prefix = "@",
  onChange,
  onSelect,
  className,
  ...props
}: MentionsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  useClickOutside(rootRef, () => setOpen(false), open)

  const value = controlledValue !== undefined ? controlledValue : internalValue
  const normalized = React.useMemo(() => normalizeOptions(options), [options])

  const mentionState = React.useMemo(() => {
    const lastPrefix = value.lastIndexOf(prefix)
    if (lastPrefix === -1) return null
    const after = value.slice(lastPrefix + prefix.length)
    if (/[\s,，。;；]/.test(after)) return null
    return { start: lastPrefix, query: after }
  }, [value, prefix])

  const filtered = mentionState
    ? normalized.filter((option) => option.label.toLowerCase().includes(mentionState.query.toLowerCase()))
    : normalized

  function setValue(next: string) {
    setInternalValue(next)
    onChange?.(next)
  }

  function select(option: MentionOption) {
    if (!mentionState) return
    const before = value.slice(0, mentionState.start)
    const after = value.slice(mentionState.start + prefix.length + mentionState.query.length)
    setValue(`${before}${prefix}${option.label} ${after}`)
    onSelect?.(option, prefix)
    setOpen(false)
    requestAnimationFrame(() => textareaRef.current?.focus())
  }

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          rows={rows}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => {
            const next = e.target.value
            setValue(next)
            setOpen(next.includes(prefix))
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false)
          }}
          className={cn(
            "w-full resize-y rounded-md border bg-background px-3 py-2 text-foreground outline-none placeholder:text-muted-foreground transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
          )}
          {...props}
        />
        {mentionState && open && !disabled && (
          <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-md border bg-popover p-1 shadow-card-lg">
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">无匹配用户</div>
            ) : (
              filtered.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => select(option)}
                  className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
                >
                  <AtSign className="size-3.5 shrink-0 text-muted-foreground" />
                  <span className="truncate">{option.label}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
