import * as React from "react"
import { FileText, Upload as UploadIcon, X } from "lucide-react"
import { cn } from "../../lib/utils"

export interface UploadFile {
  name: string
  size?: number
  status?: "done" | "error"
}

export interface UploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  accept?: string
  multiple?: boolean
  maxCount?: number
  disabled?: boolean
  drag?: boolean
  onChange?: (files: UploadFile[]) => void
}

export function Upload({
  accept,
  multiple = false,
  maxCount,
  disabled = false,
  drag = false,
  onChange,
  className,
  ...props
}: UploadProps) {
  const [files, setFiles] = React.useState<UploadFile[]>([])
  const [dragging, setDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleFiles(list: FileList | null) {
    if (!list) return
    const incoming = Array.from(list).map((f) => ({ name: f.name, size: f.size, status: "done" as const }))
    const next = multiple ? [...files, ...incoming] : incoming
    const limited = maxCount ? next.slice(0, maxCount) : next
    setFiles(limited)
    onChange?.(limited)
  }

  function remove(name: string) {
    const next = files.filter((f) => f.name !== name)
    setFiles(next)
    onChange?.(next)
  }

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragOver={drag ? (e) => {
          e.preventDefault()
          setDragging(true)
        } : undefined}
        onDragLeave={drag ? () => setDragging(false) : undefined}
        onDrop={drag ? (e) => {
          e.preventDefault()
          setDragging(false)
          handleFiles(e.dataTransfer.files)
        } : undefined}
        className={cn(
          "flex h-24 w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-50",
          dragging && "border-primary bg-primary/5 text-primary",
        )}
      >
        <UploadIcon className="size-5" />
        <span className="text-sm">{drag ? "点击或拖拽文件到此处上传" : "点击上传"}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {files.map((file) => (
        <div key={file.name} className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
          <FileText className="size-4 text-primary" />
          <span className="flex-1 truncate">{file.name}</span>
          {file.size != null && <span className="text-xs text-muted-foreground">{Math.round(file.size / 1024)}KB</span>}
          <button
            type="button"
            onClick={() => remove(file.name)}
            className="text-muted-foreground transition-colors hover:text-error"
            aria-label="移除"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
