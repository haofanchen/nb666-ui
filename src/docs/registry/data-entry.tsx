import { useState } from "react"
import { Checkbox, CheckboxGroup, Icon, Input, InputNumber, RadioGroup, Select, Slider, Space, Switch } from "nb666-ui"
import type { ComponentDoc } from "../data/types"

function CheckboxAllDemo() {
  const options = ["选项一", "选项二", "选项三"]
  const [checked, setChecked] = useState<string[]>([])

  const allChecked = checked.length === options.length
  const indeterminate = checked.length > 0 && !allChecked

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        onChange={(c) => setChecked(c ? [...options] : [])}
      >
        全选
      </Checkbox>
      {options.map((opt) => (
        <Checkbox
          key={opt}
          checked={checked.includes(opt)}
          onChange={(c) => setChecked((prev) => (c ? [...prev, opt] : prev.filter((x) => x !== opt)))}
        >
          {opt}
        </Checkbox>
      ))}
    </div>
  )
}

export const dataEntryComponents: ComponentDoc[] = [
  {
    name: "Input",
    path: "/components/input",
    title: "输入框 Input",
    description: "通过鼠标或键盘输入内容的基础表单组件。",
    categoryKey: "data-entry",
    whenToUse: "当需要用户输入单行文本时使用。",
    importCode: `import { Input } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "支持三种尺寸。",
        code: `import { Input, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space direction="vertical" className="w-full items-stretch">
      <Input size="small" placeholder="小尺寸输入框" />
      <Input size="middle" placeholder="中尺寸输入框" />
      <Input size="large" placeholder="大尺寸输入框" />
    </Space>
  )
}`,
        element: (
          <Space direction="vertical" className="w-full items-stretch">
            <Input size="small" placeholder="小尺寸输入框" />
            <Input size="middle" placeholder="中尺寸输入框" />
            <Input size="large" placeholder="大尺寸输入框" />
          </Space>
        ),
      },
      {
        id: "affix",
        title: "前后缀与附加元素",
        description: "prefix / suffix 添加前后缀，addonBefore / addonAfter 添加附加元素。",
        code: `import { Icon, Input, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space direction="vertical" className="w-full items-stretch">
      <Input prefix={<Icon name="search" size={16} />} placeholder="搜索" />
      <Input suffix={<Icon name="user" size={16} />} placeholder="用户名" />
      <Input addonBefore="https://" addonAfter=".com" placeholder="请输入域名" />
    </Space>
  )
}`,
        element: (
          <Space direction="vertical" className="w-full items-stretch">
            <Input prefix={<Icon name="search" size={16} />} placeholder="搜索" />
            <Input suffix={<Icon name="user" size={16} />} placeholder="用户名" />
            <Input addonBefore="https://" addonAfter=".com" placeholder="请输入域名" />
          </Space>
        ),
      },
      {
        id: "clear",
        title: "清除与状态",
        description: "allowClear 支持一键清空，status 表示校验状态。",
        code: `import { Input, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space direction="vertical" className="w-full items-stretch">
      <Input allowClear defaultValue="可清空的内容" placeholder="输入内容" />
      <Input status="warning" placeholder="警告状态" />
      <Input status="error" placeholder="错误状态" />
    </Space>
  )
}`,
        element: (
          <Space direction="vertical" className="w-full items-stretch">
            <Input allowClear defaultValue="可清空的内容" placeholder="输入内容" />
            <Input status="warning" placeholder="警告状态" />
            <Input status="error" placeholder="错误状态" />
          </Space>
        ),
      },
      {
        id: "password",
        title: "密码输入",
        description: "设置 type 为 password 时自动显示密码可见性切换。",
        code: `import { Input, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space direction="vertical" className="w-full items-stretch">
      <Input type="password" placeholder="请输入密码" />
      <Input type="password" defaultValue="123456" placeholder="带默认值" />
    </Space>
  )
}`,
        element: (
          <Space direction="vertical" className="w-full items-stretch">
            <Input type="password" placeholder="请输入密码" />
            <Input type="password" defaultValue="123456" placeholder="带默认值" />
          </Space>
        ),
      },
    ],
    api: [
      { name: "size", description: "输入框尺寸", type: `"small" | "middle" | "large"`, default: "middle" },
      { name: "prefix", description: "前缀图标", type: "React.ReactNode", default: "-" },
      { name: "suffix", description: "后缀图标", type: "React.ReactNode", default: "-" },
      { name: "addonBefore", description: "前置标签", type: "React.ReactNode", default: "-" },
      { name: "addonAfter", description: "后置标签", type: "React.ReactNode", default: "-" },
      { name: "allowClear", description: "是否可清空", type: "boolean", default: "false" },
      { name: "status", description: "校验状态", type: `"error" | "warning"`, default: "-" },
      { name: "disabled", description: "是否禁用", type: "boolean", default: "false" },
    ],
  },
  {
    name: "InputNumber",
    path: "/components/input-number",
    title: "数字输入框 InputNumber",
    description: "通过鼠标或键盘输入数值，支持步进调整。",
    categoryKey: "data-entry",
    whenToUse: "当需要输入数值并限制范围时使用。",
    importCode: `import { InputNumber } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "通过 step 控制步长，min / max 限制范围。",
        code: `import { InputNumber, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space>
      <InputNumber min={1} max={10} defaultValue={3} />
      <InputNumber step={0.1} defaultValue={1.5} />
      <InputNumber disabled defaultValue={10} />
    </Space>
  )
}`,
        element: (
          <Space>
            <InputNumber min={1} max={10} defaultValue={3} />
            <InputNumber step={0.1} defaultValue={1.5} />
            <InputNumber disabled defaultValue={10} />
          </Space>
        ),
      },
      {
        id: "size",
        title: "尺寸",
        description: "支持三种尺寸。",
        code: `import { InputNumber, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space align="center">
      <InputNumber size="small" defaultValue={1} />
      <InputNumber size="middle" defaultValue={1} />
      <InputNumber size="large" defaultValue={1} />
    </Space>
  )
}`,
        element: (
          <Space align="center">
            <InputNumber size="small" defaultValue={1} />
            <InputNumber size="middle" defaultValue={1} />
            <InputNumber size="large" defaultValue={1} />
          </Space>
        ),
      },
    ],
    api: [
      { name: "value", description: "当前值（受控）", type: "number | null", default: "-" },
      { name: "defaultValue", description: "默认值", type: "number", default: "-" },
      { name: "min", description: "最小值", type: "number", default: "-Infinity" },
      { name: "max", description: "最大值", type: "number", default: "Infinity" },
      { name: "step", description: "步长", type: "number", default: "1" },
      { name: "range", description: "是否区间模式", type: "boolean", default: "false" },
      { name: "onChange", description: "值变化回调", type: "(value: number | null) => void", default: "-" },
      { name: "size", description: "尺寸", type: `"small" | "middle" | "large"`, default: "middle" },
      { name: "controls", description: "是否显示步进按钮", type: "boolean", default: "true" },
    ],
  },
  {
    name: "Select",
    path: "/components/select",
    title: "选择器 Select",
    description: "从一组选项中选择一个值。",
    categoryKey: "data-entry",
    whenToUse: "当需要从预设选项中选择单个值时使用。",
    importCode: `import { Select } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "通过 options 配置选项。",
        code: `import { Select, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space>
      <Select
        placeholder="请选择城市"
        defaultValue="beijing"
        style={{ width: 200 }}
        options={[
          { label: "北京", value: "beijing" },
          { label: "上海", value: "shanghai" },
          { label: "广州", value: "guangzhou" },
          { label: "深圳", value: "shenzhen" },
        ]}
      />
      <Select
        disabled
        placeholder="禁用状态"
        style={{ width: 200 }}
        options={[{ label: "选项", value: "1" }]}
      />
    </Space>
  )
}`,
        element: (
          <Space>
            <Select
              placeholder="请选择城市"
              defaultValue="beijing"
              style={{ width: 200 }}
              options={[
                { label: "北京", value: "beijing" },
                { label: "上海", value: "shanghai" },
                { label: "广州", value: "guangzhou" },
                { label: "深圳", value: "shenzhen" },
              ]}
            />
            <Select disabled placeholder="禁用状态" style={{ width: 200 }} options={[{ label: "选项", value: "1" }]} />
          </Space>
        ),
      },
      {
        id: "search",
        title: "可搜索与清空",
        description: "showSearch 支持搜索，allowClear 支持清空。",
        code: `import { Select, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space>
      <Select
        showSearch
        allowClear
        placeholder="搜索选择"
        style={{ width: 220 }}
        options={["苹果", "香蕉", "橙子", "葡萄", "西瓜"].map((v) => ({ label: v, value: v }))}
      />
    </Space>
  )
}`,
        element: (
          <Space>
            <Select
              showSearch
              allowClear
              placeholder="搜索选择"
              style={{ width: 220 }}
              options={["苹果", "香蕉", "橙子", "葡萄", "西瓜"].map((v) => ({ label: v, value: v }))}
            />
          </Space>
        ),
      },
      {
        id: "multiple",
        title: "多选",
        description: "multiple 开启多选模式，选中项以标签展示。",
        code: `import { Select } from "nb666-ui"

export default function Demo() {
  return (
    <Select
      multiple
      allowClear
      placeholder="请选择水果"
      defaultValue={["apple", "orange"]}
      className="w-80"
      options={[
        { label: "苹果", value: "apple" },
        { label: "香蕉", value: "banana" },
        { label: "橙子", value: "orange" },
        { label: "葡萄", value: "grape" },
      ]}
    />
  )
}`,
        element: (
          <Select
            multiple
            allowClear
            placeholder="请选择水果"
            defaultValue={["apple", "orange"]}
            className="w-80"
            options={[
              { label: "苹果", value: "apple" },
              { label: "香蕉", value: "banana" },
              { label: "橙子", value: "orange" },
              { label: "葡萄", value: "grape" },
            ]}
          />
        ),
      },
    ],
    api: [
      { name: "options", description: "选项配置", type: "SelectOption[]", default: "-", required: true },
      { name: "value", description: "当前值（受控）", type: "string | number | (string | number)[] | null", default: "-" },
      { name: "defaultValue", description: "默认值", type: "string | number | (string | number)[] | null", default: "null" },
      { name: "placeholder", description: "占位文本", type: "string", default: "请选择" },
      { name: "size", description: "尺寸", type: `"small" | "middle" | "large"`, default: "middle" },
      { name: "multiple", description: "是否多选", type: "boolean", default: "false" },
      { name: "showSearch", description: "是否可搜索", type: "boolean", default: "false" },
      { name: "allowClear", description: "是否可清空", type: "boolean", default: "false" },
      { name: "onChange", description: "选择回调", type: "(value, option?) => void", default: "-" },
    ],
  },
  {
    name: "Checkbox",
    path: "/components/checkbox",
    title: "多选框 Checkbox",
    description: "在一组可选项中进行多项选择。",
    categoryKey: "data-entry",
    whenToUse: "当需要从一组选项中选择一个或多个值时使用。",
    importCode: `import { Checkbox, CheckboxGroup } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "单独使用 Checkbox，onChange 返回选中状态。",
        code: `import { Checkbox } from "nb666-ui"

export default function Demo() {
  return (
    <Checkbox defaultChecked onChange={(checked) => console.log(checked)}>
      同意用户协议
    </Checkbox>
  )
}`,
        element: <Checkbox defaultChecked onChange={(checked) => console.log(checked)}>同意用户协议</Checkbox>,
      },
      {
        id: "group",
        title: "选项组",
        description: "使用 CheckboxGroup 管理一组选项。",
        code: `import { CheckboxGroup } from "nb666-ui"

export default function Demo() {
  return (
    <CheckboxGroup
      defaultValue={["apple"]}
      options={[
        { label: "苹果", value: "apple" },
        { label: "香蕉", value: "banana" },
        { label: "橙子", value: "orange" },
        { label: "禁用项", value: "disabled", disabled: true },
      ]}
    />
  )
}`,
        element: (
          <CheckboxGroup
            defaultValue={["apple"]}
            options={[
              { label: "苹果", value: "apple" },
              { label: "香蕉", value: "banana" },
              { label: "橙子", value: "orange" },
              { label: "禁用项", value: "disabled", disabled: true },
            ]}
          />
        ),
      },
      {
        id: "indeterminate",
        title: "全选",
        description: "全选框通过 checked 与 indeterminate 联动子选项，实现全选、半选与取消。",
        code: `import { useState } from "react"
import { Checkbox } from "nb666-ui"

const options = ["选项一", "选项二", "选项三"]

export default function Demo() {
  const [checked, setChecked] = useState<string[]>([])

  const allChecked = checked.length === options.length
  const indeterminate = checked.length > 0 && !allChecked

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        onChange={(c) => setChecked(c ? [...options] : [])}
      >
        全选
      </Checkbox>
      {options.map((opt) => (
        <Checkbox
          key={opt}
          checked={checked.includes(opt)}
          onChange={(c) => setChecked((prev) => (c ? [...prev, opt] : prev.filter((x) => x !== opt)))}
        >
          {opt}
        </Checkbox>
      ))}
    </div>
  )
}`,
        element: <CheckboxAllDemo />,
      },
    ],
    api: [
      { name: "checked", description: "是否选中（受控）", type: "boolean", default: "-" },
      { name: "defaultChecked", description: "默认选中", type: "boolean", default: "false" },
      { name: "indeterminate", description: "半选状态", type: "boolean", default: "false" },
      { name: "onChange", description: "变化回调", type: "(checked: boolean) => void", default: "-" },
      { name: "Group.options", description: "选项组配置", type: "CheckboxOption[]", default: "-" },
      { name: "Group.value", description: "选中值（受控）", type: "(string | number)[]", default: "-" },
      { name: "Group.onChange", description: "变化回调", type: "(values) => void", default: "-" },
    ],
  },
  {
    name: "Radio",
    path: "/components/radio",
    title: "单选框 Radio",
    description: "在一组可选项中进行单项选择。",
    categoryKey: "data-entry",
    whenToUse: "当需要从一组选项中仅选择一个值时使用。",
    importCode: `import { Radio, RadioGroup } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "使用 RadioGroup 管理一组单选项。",
        code: `import { RadioGroup } from "nb666-ui"

export default function Demo() {
  return (
    <RadioGroup
      defaultValue="a"
      options={[
        { label: "选项 A", value: "a" },
        { label: "选项 B", value: "b" },
        { label: "选项 C", value: "c" },
        { label: "选项 D", value: "d", disabled: true },
      ]}
    />
  )
}`,
        element: (
          <RadioGroup
            defaultValue="a"
            options={[
              { label: "选项 A", value: "a" },
              { label: "选项 B", value: "b" },
              { label: "选项 C", value: "c" },
              { label: "选项 D", value: "d", disabled: true },
            ]}
          />
        ),
      },
      {
        id: "button",
        title: "按钮样式",
        description: "optionType 为 button 时使用按钮样式。",
        code: `import { RadioGroup } from "nb666-ui"

export default function Demo() {
  return (
    <RadioGroup
      optionType="button"
      defaultValue="day"
      options={[
        { label: "日", value: "day" },
        { label: "周", value: "week" },
        { label: "月", value: "month" },
      ]}
    />
  )
}`,
        element: (
          <RadioGroup
            optionType="button"
            defaultValue="day"
            options={[
              { label: "日", value: "day" },
              { label: "周", value: "week" },
              { label: "月", value: "month" },
            ]}
          />
        ),
      },
    ],
    api: [
      { name: "value", description: "值（受控）", type: "string | number", default: "-" },
      { name: "defaultValue", description: "默认值", type: "string | number", default: "-" },
      { name: "onChange", description: "变化回调", type: "(value) => void", default: "-" },
      { name: "options", description: "选项配置", type: "RadioOption[]", default: "-" },
      { name: "direction", description: "排列方向", type: `"horizontal" | "vertical"`, default: "horizontal" },
      { name: "optionType", description: "选项样式", type: `"default" | "button"`, default: "default" },
    ],
  },
  {
    name: "Switch",
    path: "/components/switch",
    title: "开关 Switch",
    description: "表示两种状态之间的切换。",
    categoryKey: "data-entry",
    whenToUse: "当需要表示开关状态或启停某项设置时使用。",
    importCode: `import { Switch } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "onChange 返回切换后的状态。",
        code: `import { Switch, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space>
      <Switch defaultChecked onChange={(checked) => console.log(checked)} />
      <Switch defaultChecked disabled />
      <Switch loading />
    </Space>
  )
}`,
        element: (
          <Space>
            <Switch defaultChecked onChange={(checked) => console.log(checked)} />
            <Switch defaultChecked disabled />
            <Switch loading />
          </Space>
        ),
      },
      {
        id: "text",
        title: "带文字与尺寸",
        description: "checkedChildren / unCheckedChildren 自定义开关文字。",
        code: `import { Switch, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space align="center">
      <Switch size="small" defaultChecked />
      <Switch defaultChecked />
      <Switch defaultChecked checkedChildren="开" unCheckedChildren="关" />
    </Space>
  )
}`,
        element: (
          <Space align="center">
            <Switch size="small" defaultChecked />
            <Switch defaultChecked />
            <Switch defaultChecked checkedChildren="开" unCheckedChildren="关" />
          </Space>
        ),
      },
    ],
    api: [
      { name: "checked", description: "是否选中（受控）", type: "boolean", default: "-" },
      { name: "defaultChecked", description: "默认选中", type: "boolean", default: "false" },
      { name: "onChange", description: "变化回调", type: "(checked: boolean) => void", default: "-" },
      { name: "size", description: "开关大小", type: `"small" | "default"`, default: "default" },
      { name: "loading", description: "加载状态", type: "boolean", default: "false" },
      { name: "checkedChildren", description: "选中时内容", type: "React.ReactNode", default: "-" },
      { name: "unCheckedChildren", description: "未选中时内容", type: "React.ReactNode", default: "-" },
    ],
  },
  {
    name: "Slider",
    path: "/components/slider",
    title: "滑动输入条 Slider",
    description: "通过拖动滑块在范围内选择数值。",
    categoryKey: "data-entry",
    whenToUse: "当需要在连续或离散范围内选择数值时使用。",
    importCode: `import { Slider } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "拖动滑块选择数值，onChange 返回当前值。",
        code: `import { Slider } from "nb666-ui"

export default function Demo() {
  return <Slider defaultValue={30} onChange={(value) => console.log(value)} />
}`,
        element: <Slider defaultValue={30} onChange={(value) => console.log(value)} />,
      },
      {
        id: "step",
        title: "步长与范围",
        description: "min / max / step 控制范围与步长。",
        code: `import { Slider, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space direction="vertical" className="w-full items-stretch">
      <Slider min={0} max={50} step={5} defaultValue={20} />
      <Slider min={1} max={10} defaultValue={5} disabled />
    </Space>
  )
}`,
        element: (
          <Space direction="vertical" className="w-full items-stretch">
            <Slider min={0} max={50} step={5} defaultValue={20} />
            <Slider min={1} max={10} defaultValue={5} disabled />
          </Space>
        ),
      },
      {
        id: "range",
        title: "区间选择",
        description: "range 开启双滑块，用于选择一个数值区间。",
        code: `import { Slider } from "nb666-ui"

export default function Demo() {
  return <Slider range defaultValue={[20, 60]} onChange={(value) => console.log(value)} />
}`,
        element: <Slider range defaultValue={[20, 60]} onChange={(value) => console.log(value)} />,
      },
    ],
    api: [
      { name: "value", description: "当前值（受控）", type: "number | [number, number]", default: "-" },
      { name: "defaultValue", description: "默认值", type: "number | [number, number]", default: "0" },
      { name: "min", description: "最小值", type: "number", default: "0" },
      { name: "max", description: "最大值", type: "number", default: "100" },
      { name: "step", description: "步长", type: "number", default: "1" },
      { name: "range", description: "是否区间模式", type: "boolean", default: "false" },
      { name: "disabled", description: "是否禁用", type: "boolean", default: "false" },
      { name: "onChange", description: "变化回调", type: "(value: number | [number, number]) => void", default: "-" },
    ],
  },
]
