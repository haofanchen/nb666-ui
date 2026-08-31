import { useEffect, useState } from "react"

const breakpoints = [
  { name: "xs", query: "(min-width: 0px)" },
  { name: "sm", query: "(min-width: 640px)" },
  { name: "md", query: "(min-width: 768px)" },
  { name: "lg", query: "(min-width: 1024px)" },
  { name: "xl", query: "(min-width: 1280px)" },
] as const

export type Breakpoint = (typeof breakpoints)[number]["name"]

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("xs")

  useEffect(() => {
    const queries = breakpoints.map((b) => ({
      name: b.name,
      mql: window.matchMedia(b.query),
    }))

    function update() {
      for (let i = queries.length - 1; i >= 0; i--) {
        if (queries[i].mql.matches) {
          setBp(queries[i].name)
          return
        }
      }
      setBp("xs")
    }

    update()
    queries.forEach((q) => q.mql.addEventListener("change", update))
    return () => queries.forEach((q) => q.mql.removeEventListener("change", update))
  }, [])

  return bp
}
