import * as React from "react"
import {
  Home, Search, User, Heart, Star, Settings, Bell, Mail, Phone, Camera,
  Check, X, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Plus, Minus,
  Download, Upload, Trash2, Edit, Copy, Eye, EyeOff, Info, AlertTriangle,
  CheckCircle, XCircle, Loader2, Menu, MoreHorizontal, RefreshCw, ExternalLink,
  Github, Calendar, Clock, MapPin, FileText, Folder, Link as LinkIcon, Send,
  ThumbsUp, MessageSquare, Share2, Bookmark, Zap, Globe, Lock, Unlock, Filter,
} from "lucide-react"
import dynamicIconImports from "lucide-react/dynamicIconImports"
import { cn } from "@/lib/utils"

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>

// 常用图标静态引入，保证即时渲染
export const icons: Record<string, IconComponent> = {
  home: Home, search: Search, user: User, heart: Heart, star: Star,
  settings: Settings, bell: Bell, mail: Mail, phone: Phone, camera: Camera,
  check: Check, x: X, "chevron-down": ChevronDown, "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight, "chevron-up": ChevronUp, plus: Plus, minus: Minus,
  download: Download, upload: Upload, trash: Trash2, edit: Edit, copy: Copy,
  eye: Eye, "eye-off": EyeOff, info: Info, warning: AlertTriangle,
  "check-circle": CheckCircle, "x-circle": XCircle, loading: Loader2,
  menu: Menu, more: MoreHorizontal, refresh: RefreshCw, external: ExternalLink,
  github: Github, calendar: Calendar, clock: Clock, pin: MapPin,
  file: FileText, folder: Folder, link: LinkIcon, send: Send, like: ThumbsUp,
  message: MessageSquare, share: Share2, bookmark: Bookmark, zap: Zap,
  globe: Globe, lock: Lock, unlock: Unlock, filter: Filter,
}

const lazyCache = new Map<string, React.LazyExoticComponent<IconComponent>>()

function getLazyIcon(name: string): React.LazyExoticComponent<IconComponent> | null {
  const loaders = dynamicIconImports as unknown as Record<
    string,
    () => Promise<{ default: IconComponent }>
  >
  if (!loaders[name]) return null

  let component = lazyCache.get(name)
  if (!component) {
    component = React.lazy(loaders[name])
    lazyCache.set(name, component)
  }
  return component
}

export const iconNames: string[] = Object.keys(dynamicIconImports)

export const commonIconNames: string[] = [
  "home", "search", "user", "users", "heart", "star", "settings", "bell", "bell-off",
  "mail", "mail-open", "phone", "camera", "image", "video", "music", "mic",
  "check", "x", "plus", "minus", "download", "upload", "trash-2", "edit", "copy",
  "save", "eye", "eye-off", "info", "circle-alert", "triangle-alert", "check-circle",
  "x-circle", "circle-help", "loader", "loader-circle", "menu", "ellipsis", "refresh-cw",
  "rotate-ccw", "rotate-cw", "external-link", "github", "calendar", "clock", "map-pin",
  "file", "file-text", "file-plus", "folder", "folder-open", "link", "send", "thumbs-up",
  "thumbs-down", "message-square", "message-circle", "share-2", "bookmark", "zap", "globe",
  "lock", "unlock", "filter", "database", "cloud", "sun", "moon", "activity", "award",
  "target", "flag", "wifi", "bluetooth", "battery", "signal", "shopping-cart", "credit-card",
  "wallet", "gift", "package", "truck", "trending-up", "trending-down", "log-in", "log-out",
  "power", "user-plus", "user-check", "user-x", "at-sign", "grid-3x3", "list", "layout-grid",
  "columns-3", "chevron-up", "chevron-down", "chevron-left", "chevron-right", "chevrons-up",
  "chevrons-down", "arrow-up", "arrow-down", "arrow-left", "arrow-right", "play", "pause",
  "printer", "wrench", "tag", "tags", "layout-dashboard", "chart-pie",
]

export interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, "color"> {
  name: string
  size?: number | string
  color?: string
  spin?: boolean
  rotate?: number
  strokeWidth?: number
}

export function Icon({
  name,
  size = 16,
  color,
  spin = false,
  rotate,
  strokeWidth,
  className,
  style,
  ...props
}: IconProps) {
  const svgProps = {
    width: size,
    height: size,
    strokeWidth,
    style: { color, transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style },
    className: cn(spin && "animate-spin", className),
    ...props,
  }

  const Static = icons[name]
  if (Static) return <Static {...svgProps} />

  const Lazy = getLazyIcon(name)
  if (!Lazy) return null

  return (
    <React.Suspense
      fallback={
        <span
          className={cn("inline-block", className)}
          style={{ width: size, height: size, ...style }}
        />
      }
    >
      <Lazy {...svgProps} />
    </React.Suspense>
  )
}
