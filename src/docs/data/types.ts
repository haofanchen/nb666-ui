import type * as React from "react"
import type { ApiItem } from "../components/ApiTable"

export interface Demo {
  id: string
  title: string
  description?: string
  code: string
  element: React.ReactNode
}

export interface ComponentDoc {
  name: string
  path: string
  title: string
  description: string
  categoryKey: string
  whenToUse?: string
  importCode: string
  demos: Demo[]
  api: ApiItem[]
}

export interface Category {
  key: string
  title: string
  description: string
}
