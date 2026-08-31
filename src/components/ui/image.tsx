import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  preview?: boolean
  fallback?: string
  placeholder?: React.ReactNode
}

export function Image({
  preview = true,
  fallback,
  placeholder,
  className,
  src,
  alt,
  onError,
  ...props
}: ImageProps) {
  const [error, setError] = React.useState(false)
  const [loaded, setLoaded] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div className={cn("relative inline-block", className)}>
        {!loaded && placeholder && (
          <span className="absolute inset-0 flex items-center justify-center bg-muted">{placeholder}</span>
        )}
        <img
          src={error && fallback ? fallback : src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            setError(true)
            onError?.(e)
          }}
          className={cn("block max-w-full rounded-md", preview && "cursor-zoom-in")}
          onClick={preview && !error ? () => setOpen(true) : undefined}
          {...props}
        />
      </div>

      {open && preview && !error && createPortal(
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-6" onClick={() => setOpen(false)}>
          <button type="button" className="absolute right-4 top-4 text-white/80 hover:text-white" aria-label="关闭">
            <X className="size-6" />
          </button>
          <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
        </div>,
        document.body,
      )}
    </>
  )
}
