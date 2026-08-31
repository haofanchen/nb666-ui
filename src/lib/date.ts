export const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"] as const
export const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"] as const

export function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`
}

export function toISO(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`
}

export function parseISO(value: string): Date | null {
  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(value)
  if (!match) return null
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  return Number.isNaN(date.getTime()) ? null : date
}

export function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

// 返回当月 1 号相对周一（0）的偏移
export function mondayOffset(year: number, month: number) {
  return (new Date(year, month, 1).getDay() + 6) % 7
}

export function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function addMonths(year: number, month: number, delta: number) {
  const next = month + delta
  return {
    year: year + Math.floor(next / 12),
    month: ((next % 12) + 12) % 12,
  }
}

export function clampDate(year: number, month: number, day: number) {
  const max = daysInMonth(year, month)
  return Math.min(Math.max(1, day), max)
}
