import * as React from "react"
import { cn } from "../../lib/utils"

type FormLayout = "horizontal" | "vertical" | "inline"

export type NamePath = string | (string | number)[]

export interface FormRule {
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  message?: string
  validator?: (value: unknown) => string | undefined
}

type Path = (string | number)[]

function normalizePath(name: NamePath): Path {
  return Array.isArray(name) ? name : [name]
}

function pathKey(path: Path) {
  return path.join(".")
}

function getByPath(obj: unknown, path: Path): unknown {
  return path.reduce<unknown>((acc, key) => {
    if (acc == null) return undefined
    return (acc as Record<string | number, unknown>)[key]
  }, obj)
}

function setByPath(obj: unknown, path: Path, value: unknown): unknown {
  if (path.length === 0) return value
  const [head, ...rest] = path
  const isArray = typeof rest[0] === "number"
  const base: Record<string | number, unknown> = obj && typeof obj === "object"
    ? Array.isArray(obj)
      ? ([...obj] as unknown as Record<string | number, unknown>)
      : ({ ...(obj as Record<string, unknown>) } as Record<string | number, unknown>)
    : isArray
      ? ([] as unknown as Record<string | number, unknown>)
      : {}
  base[head] = setByPath(base[head], rest, value)
  return base
}

function mergeValues(target: unknown, patch: unknown): unknown {
  if (patch == null || typeof patch !== "object" || Array.isArray(patch)) return patch
  const base =
    target && typeof target === "object" && !Array.isArray(target)
      ? { ...(target as Record<string, unknown>) }
      : {}
  for (const [key, value] of Object.entries(patch as Record<string, unknown>)) {
    base[key] = mergeValues(base[key], value)
  }
  return base
}

function deepClone<T>(value: T): T {
  if (Array.isArray(value)) return value.map(deepClone) as unknown as T
  if (value && typeof value === "object") {
    const result: Record<string, unknown> = {}
    for (const [key, item] of Object.entries(value)) result[key] = deepClone(item)
    return result as unknown as T
  }
  return value
}

function validate(value: unknown, rules: FormRule[]): string | null {
  for (const rule of rules) {
    const isEmpty = value == null || value === ""
    if (rule.required && isEmpty) return rule.message ?? "此项为必填项"
    if (isEmpty) continue
    if (rule.pattern && !rule.pattern.test(String(value))) return rule.message ?? "格式不正确"
    if (rule.min != null && Number(value) < rule.min) return rule.message ?? `不能小于 ${rule.min}`
    if (rule.max != null && Number(value) > rule.max) return rule.message ?? `不能大于 ${rule.max}`
    if (rule.validator) {
      const result = rule.validator(value)
      if (result) return result
    }
  }
  return null
}

export interface FormInternalApi {
  getValues: () => Record<string, unknown>
  getValue: (name: NamePath) => unknown
  setValue: (name: NamePath, value: unknown) => void
  setValues: (values: Record<string, unknown>) => void
  setFields: (fields: { name: NamePath; value?: unknown; errors?: string[]; touched?: boolean }[]) => void
  reset: (names?: NamePath[]) => void
  validate: (names?: NamePath[]) => Promise<void>
  getError: (name: NamePath) => string | null
  getErrors: () => Record<string, string | null>
  getTouched: (name: NamePath) => boolean
  isFieldsTouched: (names?: NamePath[]) => boolean
  subscribe: (listener: () => void) => () => void
}

export interface FormInstance {
  getFieldValue: (name: NamePath) => unknown
  getFieldsValue: (names?: NamePath[]) => Record<string, unknown>
  setFieldValue: (name: NamePath, value: unknown) => void
  setFieldsValue: (values: Record<string, unknown>) => void
  resetFields: (names?: NamePath[]) => void
  setFields: (fields: { name: NamePath; value?: unknown; errors?: string[]; touched?: boolean }[]) => void
  validateFields: (names?: NamePath[]) => Promise<Record<string, unknown>>
  validateField: (name: NamePath) => Promise<void>
  getFieldError: (name: NamePath) => string | null
  getFieldsError: (names?: NamePath[]) => Record<string, string | null>
  isFieldTouched: (name: NamePath) => boolean
  isFieldsTouched: (names?: NamePath[]) => boolean
  __registerForm: (api: FormInternalApi) => void
  __unregisterForm: () => void
  __subscribe: (listener: () => void) => () => void
  __getValue: (name: NamePath) => unknown
}

export function useForm(): [FormInstance] {
  const apiRef = React.useRef<FormInternalApi | null>(null)
  const listenersRef = React.useRef(new Set<() => void>())
  const unsubscribeRef = React.useRef<(() => void) | null>(null)

  const instance = React.useMemo<FormInstance>(() => {
    return {
      getFieldValue(name) {
        return apiRef.current?.getValue(name)
      },
      getFieldsValue(names?) {
        const all = apiRef.current?.getValues() ?? {}
        if (!names) return deepClone(all)
        return names.reduce<Record<string, unknown>>((acc, name) => {
          const path = normalizePath(name)
          return setByPath(acc, path, getByPath(all, path)) as Record<string, unknown>
        }, {})
      },
      setFieldValue(name, value) {
        apiRef.current?.setValue(name, value)
      },
      setFieldsValue(values) {
        apiRef.current?.setValues(values)
      },
      setFields(fields) {
        apiRef.current?.setFields(fields)
      },
      resetFields(names) {
        apiRef.current?.reset(names)
      },
      async validateFields(names?) {
        await apiRef.current?.validate(names)
        return apiRef.current?.getValues() ?? {}
      },
      async validateField(name) {
        await apiRef.current?.validate([normalizePath(name)])
      },
      getFieldError(name) {
        return apiRef.current?.getError(name) ?? null
      },
      getFieldsError(names?) {
        const errors = apiRef.current?.getErrors() ?? {}
        if (!names) return errors
        return names.reduce<Record<string, string | null>>((acc, name) => {
          const key = pathKey(normalizePath(name))
          acc[key] = errors[key] ?? null
          return acc
        }, {})
      },
      isFieldTouched(name) {
        return apiRef.current?.getTouched(name) ?? false
      },
      isFieldsTouched(names) {
        return apiRef.current?.isFieldsTouched(names) ?? false
      },
      __registerForm(api) {
        apiRef.current = api
        unsubscribeRef.current?.()
        if (listenersRef.current.size > 0) {
          unsubscribeRef.current = api.subscribe(() => {
            listenersRef.current.forEach((listener) => listener())
          })
          listenersRef.current.forEach((listener) => listener())
        }
      },
      __unregisterForm() {
        unsubscribeRef.current?.()
        unsubscribeRef.current = null
        apiRef.current = null
      },
      __subscribe(listener) {
        listenersRef.current.add(listener)
        return () => listenersRef.current.delete(listener)
      },
      __getValue(name) {
        return apiRef.current?.getValue(name)
      },
    }
  }, [])

  return [instance]
}

interface FormContextValue {
  layout: FormLayout
  values: Record<string, unknown>
  errors: Record<string, string | null>
  setValue: (name: NamePath, value: unknown) => void
  setError: (name: NamePath, error: string | null) => void
  registerField: (name: NamePath, rules: FormRule[]) => () => void
  submit: () => void
  subscribe: (listener: () => void) => () => void
  getValue: (name: NamePath) => unknown
}

const FormContext = React.createContext<FormContextValue | null>(null)

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  layout?: FormLayout
  initialValues?: Record<string, unknown>
  form?: FormInstance
  onFinish?: (values: Record<string, unknown>) => void
  onValuesChange?: (changedValues: Record<string, unknown>, allValues: Record<string, unknown>) => void
}

function FormImpl({
  layout = "vertical",
  initialValues = {},
  form,
  onFinish,
  onValuesChange,
  className,
  children,
  ...props
}: FormProps) {
  const [values, setValues] = React.useState<Record<string, unknown>>(() => deepClone(initialValues))
  const [errors, setErrors] = React.useState<Record<string, string | null>>({})
  const valuesRef = React.useRef(values)
  const errorsRef = React.useRef(errors)
  const touchedRef = React.useRef<Record<string, boolean>>({})
  const rulesRef = React.useRef<Record<string, FormRule[]>>({})
  const pathByKeyRef = React.useRef<Record<string, Path>>({})
  const initialValuesRef = React.useRef<Record<string, unknown>>(deepClone(initialValues))
  const listenersRef = React.useRef(new Set<() => void>())
  const onValuesChangeRef = React.useRef(onValuesChange)
  onValuesChangeRef.current = onValuesChange

  const notify = React.useCallback(() => {
    listenersRef.current.forEach((listener) => listener())
  }, [])

  const subscribe = React.useCallback((listener: () => void) => {
    listenersRef.current.add(listener)
    return () => listenersRef.current.delete(listener)
  }, [])

  const getValue = React.useCallback((name: NamePath) => getByPath(valuesRef.current, normalizePath(name)), [])

  const setValue = React.useCallback(
    (name: NamePath, value: unknown) => {
      const path = normalizePath(name)
      const next = setByPath(valuesRef.current, path, value) as Record<string, unknown>
      valuesRef.current = next
      setValues(next)
      touchedRef.current[pathKey(path)] = true
      const changed = setByPath({}, path, value) as Record<string, unknown>
      onValuesChangeRef.current?.(changed, next)
      notify()
    },
    [notify],
  )

  const setValuesBatch = React.useCallback(
    (patch: Record<string, unknown>) => {
      const next = mergeValues(valuesRef.current, patch) as Record<string, unknown>
      valuesRef.current = next
      setValues(next)
      notify()
    },
    [notify],
  )

  const setFieldsBatch = React.useCallback(
    (fields: { name: NamePath; value?: unknown; errors?: string[]; touched?: boolean }[]) => {
      let nextValues = valuesRef.current
      const nextErrors = { ...errorsRef.current }
      for (const field of fields) {
        const path = normalizePath(field.name)
        const key = pathKey(path)
        if (field.value !== undefined) {
          nextValues = setByPath(nextValues, path, field.value) as Record<string, unknown>
        }
        if (field.errors) nextErrors[key] = field.errors[0] ?? null
        if (field.touched != null) touchedRef.current[key] = field.touched
      }
      valuesRef.current = nextValues
      errorsRef.current = nextErrors
      setValues(nextValues)
      setErrors(nextErrors)
      notify()
    },
    [notify],
  )

  const resetValues = React.useCallback((names?: NamePath[]) => {
    const initial = deepClone(initialValuesRef.current)
    let next: Record<string, unknown>
    if (!names || names.length === 0) {
      next = initial
    } else {
      next = valuesRef.current
      for (const name of names) {
        const path = normalizePath(name)
        next = setByPath(next, path, getByPath(initial, path)) as Record<string, unknown>
      }
    }
    valuesRef.current = next
    setValues(next)
    const nextErrors = { ...errorsRef.current }
    for (const key of Object.keys(nextErrors)) {
      if (!names || names.some((name) => pathKey(normalizePath(name)) === key)) nextErrors[key] = null
    }
    errorsRef.current = nextErrors
    setErrors(nextErrors)
    if (!names) touchedRef.current = {}
    else names.forEach((name) => delete touchedRef.current[pathKey(normalizePath(name))])
    notify()
  }, [notify])

  const setError = React.useCallback((name: NamePath, error: string | null) => {
    setErrors((prev) => {
      const next = { ...prev, [pathKey(normalizePath(name))]: error }
      errorsRef.current = next
      return next
    })
  }, [])

  const registerField = React.useCallback((name: NamePath, rules: FormRule[]) => {
    const path = normalizePath(name)
    const key = pathKey(path)
    rulesRef.current[key] = rules
    pathByKeyRef.current[key] = path
    return () => {
      delete rulesRef.current[key]
      delete pathByKeyRef.current[key]
    }
  }, [])

  const validateFields = React.useCallback(async (names?: NamePath[]) => {
    const nextErrors: Record<string, string | null> = { ...errorsRef.current }
    let valid = true
    for (const [key, rules] of Object.entries(rulesRef.current)) {
      if (names && !names.some((name) => pathKey(normalizePath(name)) === key)) continue
      const path = pathByKeyRef.current[key] ?? key.split(".").map((part) => (/^\d+$/.test(part) ? Number(part) : part))
      const value = getByPath(valuesRef.current, path)
      const error = validate(value, rules)
      nextErrors[key] = error
      if (error) valid = false
    }
    errorsRef.current = nextErrors
    setErrors(nextErrors)
    notify()
    if (!valid) throw new Error("VALIDATION_FAILED")
  }, [notify])

  const getError = React.useCallback((name: NamePath) => errorsRef.current[pathKey(normalizePath(name))] ?? null, [])
  const getErrors = React.useCallback(() => ({ ...errorsRef.current }), [])
  const getTouched = React.useCallback((name: NamePath) => touchedRef.current[pathKey(normalizePath(name))] ?? false, [])
  const isFieldsTouched = React.useCallback((names?: NamePath[]) => {
    if (!names) return Object.values(touchedRef.current).some(Boolean)
    return names.some((name) => touchedRef.current[pathKey(normalizePath(name))])
  }, [])

  const submit = React.useCallback(async () => {
    try {
      await validateFields()
      onFinish?.({ ...valuesRef.current })
    } catch {
      // 校验失败时不再触发 onFinish
    }
  }, [validateFields, onFinish])

  const apiRef = React.useRef<FormInternalApi | null>(null)
  apiRef.current = {
    getValues: () => valuesRef.current,
    getValue,
    setValue,
    setValues: setValuesBatch,
    setFields: setFieldsBatch,
    reset: resetValues,
    validate: validateFields,
    getError,
    getErrors,
    getTouched,
    isFieldsTouched,
    subscribe,
  }

  React.useEffect(() => {
    if (!form) return
    form.__registerForm(apiRef.current!)
    return () => form.__unregisterForm()
  }, [form])

  const contextValue = React.useMemo<FormContextValue>(
    () => ({ layout, values, errors, setValue, setError, registerField, submit, subscribe, getValue }),
    [layout, values, errors, setValue, setError, registerField, submit, subscribe, getValue],
  )

  return (
    <FormContext.Provider value={contextValue}>
      <form
        className={cn(
          layout === "inline" ? "flex flex-wrap items-start gap-x-4 gap-y-4" : "flex flex-col gap-4",
          className,
        )}
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}

export function useWatch(name: NamePath, form?: FormInstance): unknown {
  if (form) {
    return React.useSyncExternalStore(
      form.__subscribe,
      () => form.__getValue(name),
      () => form.__getValue(name),
    )
  }
  const ctx = React.useContext(FormContext)
  if (!ctx) throw new Error("useWatch 必须在 Form 内使用，或传入 form 实例")
  return React.useSyncExternalStore(
    ctx.subscribe,
    () => ctx.getValue(name),
    () => ctx.getValue(name),
  )
}

export interface FormItemProps {
  label?: React.ReactNode
  name?: NamePath
  required?: boolean
  rules?: FormRule[]
  valuePropName?: string
  help?: React.ReactNode
  extra?: React.ReactNode
  dependencies?: NamePath[]
  shouldUpdate?: boolean | ((prev: Record<string, unknown>, current: Record<string, unknown>) => boolean)
  children: React.ReactElement
}

export function FormItem({
  label,
  name,
  required,
  rules = [],
  valuePropName = "value",
  help,
  extra,
  dependencies,
  shouldUpdate,
  children,
}: FormItemProps) {
  const form = React.useContext(FormContext)
  const [localError, setLocalError] = React.useState<string | null>(null)
  const rulesRef = React.useRef(rules)
  rulesRef.current = rules

  const path = React.useMemo(() => (name ? normalizePath(name) : null), [name])

  React.useEffect(() => {
    if (!form || !path) return
    return form.registerField(path, rulesRef.current)
  }, [form, path])

  // 依赖或 shouldUpdate 时订阅任意值变化以触发重渲染
  const active = (dependencies && dependencies.length > 0) || shouldUpdate != null
  React.useSyncExternalStore(
    active && form ? form.subscribe : () => () => {},
    () => (form ? form.values : {}),
    () => (form ? form.values : {}),
  )

  if (!form) return <>{children}</>

  const { layout } = form
  const isRequired = required ?? rules.some((rule) => rule.required)
  const error = path ? (form.errors[pathKey(path)] ?? localError) : localError
  const value = path ? getByPath(form.values, path) : undefined

  const containerClass =
    layout === "horizontal"
      ? "grid items-start gap-x-4 sm:grid-cols-[10rem_1fr]"
      : layout === "inline"
        ? "flex items-center gap-2"
        : "flex flex-col gap-1.5"

  const child = React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    [valuePropName]: value,
    onChange: (arg: unknown) => {
      ;(children.props as { onChange?: (arg: unknown) => void }).onChange?.(arg)
      if (!path) return
      const next = (arg as { target?: { value: unknown } })?.target?.value ?? arg
      form.setValue(path, next)
      const nextError = validate(next, rules)
      setLocalError(nextError)
      form.setError(path, nextError)
    },
    onBlur: (e: React.FocusEvent) => {
      ;(children.props as { onBlur?: (e: React.FocusEvent) => void }).onBlur?.(e)
      if (!path) return
      const nextError = validate(getByPath(form.values, path), rules)
      setLocalError(nextError)
      form.setError(path, nextError)
    },
  })

  return (
    <div className={containerClass}>
      {label && (
        <label className={cn("flex items-center gap-0.5 text-sm font-medium", layout !== "vertical" && "pt-1.5")}>
          {isRequired && <span className="text-error">*</span>}
          {label}
        </label>
      )}
      <div className="min-w-0 flex-1">
        {child}
        {error ? (
          <div className="mt-1 text-xs text-error">{error}</div>
        ) : help ? (
          <div className="mt-1 text-xs text-muted-foreground">{help}</div>
        ) : null}
        {extra && <div className="mt-1 text-xs text-muted-foreground">{extra}</div>}
      </div>
    </div>
  )
}

export interface FormListFieldData {
  key: number
  name: number
}

export interface FormListOperations {
  add: (defaultValue?: unknown, insertIndex?: number) => void
  remove: (index: number | number[]) => void
  move: (from: number, to: number) => void
}

export interface FormListProps {
  name: NamePath
  children: (fields: FormListFieldData[], operations: FormListOperations) => React.ReactNode
}

function FormList({ name, children }: FormListProps) {
  const form = React.useContext(FormContext)
  if (!form) throw new Error("Form.List 必须在 Form 内使用")
  const path = normalizePath(name)
  const list = (useWatch(name) as unknown[]) ?? []
  const keyListRef = React.useRef<number[]>([])
  const keyCounterRef = React.useRef(0)

  function ensureKeys(count: number) {
    const keys = keyListRef.current
    if (keys.length === count) return keys
    if (keys.length > count) {
      keyListRef.current = keys.slice(0, count)
    } else {
      for (let i = keys.length; i < count; i++) keys.push(keyCounterRef.current++)
    }
    return keyListRef.current
  }

  function add(defaultValue: unknown = {}, insertIndex = list.length) {
    const next = [...list]
    next.splice(insertIndex, 0, defaultValue)
    const keys = [...keyListRef.current]
    keys.splice(insertIndex, 0, keyCounterRef.current++)
    keyListRef.current = keys
    form!.setValue(path, next)
  }

  function remove(index: number | number[]) {
    const indexes = Array.isArray(index) ? index : [index]
    const next = list.filter((_, i) => !indexes.includes(i))
    keyListRef.current = keyListRef.current.filter((_, i) => !indexes.includes(i))
    form!.setValue(path, next)
  }

  function move(from: number, to: number) {
    const next = [...list]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    const keys = [...keyListRef.current]
    const [movedKey] = keys.splice(from, 1)
    keys.splice(to, 0, movedKey)
    keyListRef.current = keys
    form!.setValue(path, next)
  }

  const keys = ensureKeys(list.length)
  const fields: FormListFieldData[] = list.map((_, index) => ({ key: keys[index], name: index }))

  return <>{children(fields, { add, remove, move })}</>
}

export const Form = Object.assign(FormImpl, {
  useForm,
  useWatch,
  List: FormList,
}) as typeof FormImpl & {
  useForm: typeof useForm
  useWatch: typeof useWatch
  List: typeof FormList
}

export { FormList }
