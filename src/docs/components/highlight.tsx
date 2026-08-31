import * as React from "react"

const KEYWORDS = new Set([
  "import", "export", "from", "const", "let", "var", "function", "return",
  "if", "else", "for", "while", "new", "typeof", "instanceof", "class",
  "extends", "interface", "type", "as", "async", "await", "default", "yield",
  "switch", "case", "break", "continue", "delete", "void", "in", "of", "this",
  "super", "null", "undefined", "true", "false", "keyof", "satisfies",
])

const COLORS = {
  keyword: "#c678dd",
  string: "#98c379",
  comment: "#7f848e",
  number: "#d19a66",
  tag: "#61afef",
  punct: "#abb2bf",
  attr: "#e5c07b",
  expr: "#56b6c2",
  plain: "#abb2bf",
}

interface Token {
  type: keyof typeof COLORS | "identifier"
  value: string
  italic?: boolean
}

function readString(code: string, start: number): Token {
  const quote = code[start]
  let i = start + 1
  while (i < code.length) {
    if (code[i] === "\\") {
      i += 2
      continue
    }
    if (code[i] === quote) {
      i++
      break
    }
    i++
  }
  return { type: "string", value: code.slice(start, i) }
}

function readJsx(code: string, start: number): Token {
  let i = start
  let depth = 0
  while (i < code.length) {
    const c = code[i]
    if (c === '"' || c === "'") {
      const token = readString(code, i)
      i += token.value.length
      continue
    }
    if (c === "{") {
      let j = i + 1
      let brace = 1
      while (j < code.length && brace > 0) {
        if (code[j] === '"' || code[j] === "'") {
          const token = readString(code, j)
          j += token.value.length
          continue
        }
        if (code[j] === "{") brace++
        if (code[j] === "}") brace--
        j++
      }
      i = j
      continue
    }
    if (c === "<") depth++
    if (c === ">") {
      depth--
      i++
      if (depth === 0) break
      continue
    }
    i++
  }
  return { type: "tag", value: code.slice(start, i) }
}

function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  while (i < code.length) {
    const c = code[i]
    const next = code[i + 1]

    if (/\s/.test(c)) {
      let j = i
      while (j < code.length && /\s/.test(code[j])) j++
      tokens.push({ type: "plain", value: code.slice(i, j) })
      i = j
      continue
    }

    if (c === "/" && next === "/") {
      let j = i
      while (j < code.length && code[j] !== "\n") j++
      tokens.push({ type: "comment", value: code.slice(i, j), italic: true })
      i = j
      continue
    }

    if (c === "/" && next === "*") {
      const end = code.indexOf("*/", i + 2)
      const j = end === -1 ? code.length : end + 2
      tokens.push({ type: "comment", value: code.slice(i, j), italic: true })
      i = j
      continue
    }

    if (c === '"' || c === "'" || c === "`") {
      const token = readString(code, i)
      tokens.push(token)
      i += token.value.length
      continue
    }

    if (c === "<" && /[A-Za-z/]/.test(next ?? "")) {
      const token = readJsx(code, i)
      tokens.push(token)
      i += token.value.length
      continue
    }

    if (/[0-9]/.test(c)) {
      let j = i
      while (j < code.length && /[0-9._]/.test(code[j])) j++
      tokens.push({ type: "number", value: code.slice(i, j) })
      i = j
      continue
    }

    if (/[A-Za-z_$]/.test(c)) {
      let j = i
      while (j < code.length && /[A-Za-z0-9_$]/.test(code[j])) j++
      const word = code.slice(i, j)
      tokens.push({ type: KEYWORDS.has(word) ? "keyword" : "identifier", value: word })
      i = j
      continue
    }

    tokens.push({ type: "plain", value: c })
    i++
  }
  return tokens
}

function renderJsxTag(tag: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let i = 0
  let seenName = false
  let key = 0

  const push = (type: keyof typeof COLORS, value: string, italic = false) => {
    if (!value) return
    nodes.push(
      <span key={key++} style={{ color: COLORS[type], fontStyle: italic ? "italic" : undefined }}>
        {value}
      </span>,
    )
  }

  while (i < tag.length) {
    const c = tag[i]
    const two = tag.slice(i, i + 2)

    if (two === "</" || two === "/>" || two === "<>") {
      push("punct", two)
      i += 2
      continue
    }
    if (c === "<" || c === ">") {
      push("punct", c)
      i++
      continue
    }
    if (/\s/.test(c)) {
      let j = i
      while (j < tag.length && /\s/.test(tag[j])) j++
      push("plain", tag.slice(i, j))
      i = j
      continue
    }
    if (c === '"' || c === "'") {
      const token = readString(tag, i)
      push("string", token.value)
      i += token.value.length
      continue
    }
    if (c === "{") {
      let j = i + 1
      let depth = 1
      while (j < tag.length && depth > 0) {
        if (tag[j] === "{") depth++
        if (tag[j] === "}") depth--
        j++
      }
      push("expr", tag.slice(i, j))
      i = j
      continue
    }
    if (/[A-Za-z]/.test(c)) {
      let j = i
      while (j < tag.length && /[A-Za-z0-9_.-]/.test(tag[j])) j++
      const word = tag.slice(i, j)
      let k = j
      while (k < tag.length && /\s/.test(tag[k])) k++
      const isAttr = tag[k] === "="
      if (!seenName && !isAttr) {
        seenName = true
        push("tag", word)
      } else if (isAttr) {
        push("attr", word)
      } else {
        push("tag", word)
      }
      i = j
      continue
    }
    push("plain", c)
    i++
  }
  return nodes
}

export function highlight(code: string): React.ReactNode[] {
  const tokens = tokenize(code)
  return tokens.map((token, i) => {
    if (token.type === "tag") {
      return <span key={i}>{renderJsxTag(token.value)}</span>
    }
    if (token.type === "identifier") {
      return (
        <span key={i} style={{ color: COLORS.plain }}>
          {token.value}
        </span>
      )
    }
    return (
      <span key={i} style={{ color: COLORS[token.type], fontStyle: token.italic ? "italic" : undefined }}>
        {token.value}
      </span>
    )
  })
}
