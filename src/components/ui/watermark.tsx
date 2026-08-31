import * as React from "react"
import { cn } from "../../lib/utils"

export interface WatermarkProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  content?: string | string[]
  image?: string
  width?: number
  height?: number
  rotate?: number
  fontSize?: number
  fontColor?: string
  gap?: [number, number]
  zIndex?: number
  children?: React.ReactNode
}

export function Watermark({
  content = "Aurora UI",
  image,
  width = 180,
  height = 140,
  rotate = -22,
  fontSize = 16,
  fontColor = "rgba(31, 34, 51, 0.08)",
  gap = [100, 100],
  zIndex = 9,
  className,
  children,
  ...props
}: WatermarkProps) {
  const [background, setBackground] = React.useState("")

  React.useEffect(() => {
    const canvas = document.createElement("canvas")
    const ratio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
    canvas.width = width * ratio
    canvas.height = height * ratio
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.scale(ratio, ratio)

    if (image) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        ctx.clearRect(0, 0, width, height)
        ctx.globalAlpha = 0.18
        ctx.drawImage(img, 0, 0, width, height)
        setBackground(`url(${canvas.toDataURL()})`)
      }
      img.src = image
      return
    }

    ctx.clearRect(0, 0, width, height)
    ctx.translate(width / 2, height / 2)
    ctx.rotate((rotate * Math.PI) / 180)
    ctx.fillStyle = fontColor
    ctx.font = `${fontSize}px "PingFang SC", "Microsoft YaHei", sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    const lines = Array.isArray(content) ? content : [content]
    const lineHeight = fontSize * 1.4
    const startY = ((lines.length - 1) * lineHeight) / 2
    lines.forEach((line, i) => {
      ctx.fillText(line, 0, startY - (i - (lines.length - 1) / 2) * lineHeight)
    })
    setBackground(`url(${canvas.toDataURL()})`)
  }, [content, image, width, height, rotate, fontSize, fontColor])

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: background,
          backgroundSize: `${width + gap[0]}px ${height + gap[1]}px`,
          backgroundPosition: "0 0",
          backgroundRepeat: "repeat",
          zIndex,
        }}
      />
      <div className="relative" style={{ zIndex: zIndex + 1 }}>
        {children}
      </div>
    </div>
  )
}
