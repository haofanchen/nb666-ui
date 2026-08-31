import { AutoComplete, Button, Cascader, ColorPicker, DatePicker, Form, FormItem, Input, InputNumber, Mentions, message, RangePicker, Rate, Segmented, Select, Space, TextArea, TimePicker, Transfer, TreeSelect, Upload } from "nb666-ui"
import type { ComponentDoc } from "../data/types"

function FormInstanceDemo() {
  const [form] = Form.useForm()
  return (
    <div className="space-y-3">
      <Form form={form} layout="vertical" className="max-w-sm">
        <FormItem label="用户名" name="username" rules={[{ required: true, message: "请输入用户名" }]}>
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem label="邮箱" name="email">
          <Input placeholder="请输入邮箱" />
        </FormItem>
      </Form>
      <Space>
        <Button onClick={() => form.setFieldsValue({ username: "NB666", email: "hi@nb666.ui" })}>赋值</Button>
        <Button onClick={() => message.info(JSON.stringify(form.getFieldsValue()))}>取值</Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
      </Space>
    </div>
  )
}

function FormLinkageDemo() {
  const [form] = Form.useForm()
  const type = Form.useWatch("type", form)
  return (
    <Form form={form} layout="vertical" className="max-w-sm">
      <FormItem label="类型" name="type">
        <Select
          options={[
            { label: "普通", value: "normal" },
            { label: "自定义", value: "custom" },
          ]}
        />
      </FormItem>
      {type === "custom" && (
        <FormItem label="自定义内容" name="custom" rules={[{ required: true, message: "请输入自定义内容" }]}>
          <Input placeholder="请输入自定义内容" />
        </FormItem>
      )}
    </Form>
  )
}

function FormListDemo() {
  return (
    <Form className="max-w-md" initialValues={{ users: [{ name: "张三", age: 20 }] }}>
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <div className="space-y-3">
            {fields.map((field) => (
              <div key={field.key} className="flex items-start gap-3">
                <div className="flex-1">
                  <FormItem name={[field.name, "name"]} rules={[{ required: true, message: "请输入姓名" }]}>
                    <Input placeholder="姓名" />
                  </FormItem>
                </div>
                <div className="w-28">
                  <FormItem name={[field.name, "age"]}>
                    <InputNumber placeholder="年龄" />
                  </FormItem>
                </div>
                <Button type="text" danger onClick={() => remove(field.name)}>删除</Button>
              </div>
            ))}
            <Button type="dashed" block onClick={() => add({ name: "", age: undefined })}>添加一行</Button>
          </div>
        )}
      </Form.List>
    </Form>
  )
}

export const dataEntryComponents2: ComponentDoc[] = [
  {
    name: "Form",
    path: "/components/form",
    title: "表单 Form",
    description: "高性能表单容器，配合 Form.Item 提供标签、校验与布局。",
    categoryKey: "data-entry",
    whenToUse: "当需要收集、校验并提交用户输入时使用。",
    importCode: `import { Form, FormItem } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "Form 收集字段值，Form.Item 配置校验规则，提交时统一校验。",
        code: `import { Button, Form, FormItem, Input, InputNumber, message } from "nb666-ui"

export default function Demo() {
  return (
    <Form
      layout="vertical"
      className="max-w-sm"
      initialValues={{ username: "", age: 18 }}
      onFinish={(values) => message.success("提交成功：" + JSON.stringify(values))}
    >
      <FormItem label="用户名" name="username" rules={[{ required: true, message: "请输入用户名" }]}>
        <Input placeholder="请输入用户名" />
      </FormItem>
      <FormItem
        label="邮箱"
        name="email"
        rules={[
          { required: true, message: "请输入邮箱" },
          { pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "邮箱格式不正确" },
        ]}
      >
        <Input placeholder="请输入邮箱" />
      </FormItem>
      <FormItem label="年龄" name="age" rules={[{ min: 1, max: 120, message: "年龄需在 1-120 之间" }]}>
        <InputNumber min={0} />
      </FormItem>
      <Button type="primary" htmlType="submit">提交</Button>
    </Form>
  )
}`,
        element: (
          <Form
            layout="vertical"
            className="max-w-sm"
            initialValues={{ username: "", age: 18 }}
            onFinish={(values) => message.success("提交成功：" + JSON.stringify(values))}
          >
            <FormItem label="用户名" name="username" rules={[{ required: true, message: "请输入用户名" }]}>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: "请输入邮箱" },
                { pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "邮箱格式不正确" },
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </FormItem>
            <FormItem label="年龄" name="age" rules={[{ min: 1, max: 120, message: "年龄需在 1-120 之间" }]}>
              <InputNumber min={0} />
            </FormItem>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form>
        ),
      },
      {
        id: "layout",
        title: "布局",
        description: "支持 vertical、horizontal、inline 三种布局。",
        code: `import { Form, FormItem, Input } from "nb666-ui"

export default function Demo() {
  return (
    <Form layout="horizontal" className="max-w-xl">
      <FormItem label="用户名">
        <Input placeholder="请输入用户名" />
      </FormItem>
      <FormItem label="密码">
        <Input type="password" placeholder="请输入密码" />
      </FormItem>
    </Form>
  )
}`,
        element: (
          <Form layout="horizontal" className="max-w-xl">
            <FormItem label="用户名">
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem label="密码">
              <Input type="password" placeholder="请输入密码" />
            </FormItem>
          </Form>
        ),
      },
      {
        id: "instance",
        title: "表单实例",
        description: "useForm 提供赋值、取值、重置与校验等命令式方法。",
        code: `import { Button, Form, FormItem, Input, message, Space } from "nb666-ui"

export default function Demo() {
  const [form] = Form.useForm()
  return (
    <div className="space-y-3">
      <Form form={form} layout="vertical" className="max-w-sm">
        <FormItem label="用户名" name="username" rules={[{ required: true, message: "请输入用户名" }]}>
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem label="邮箱" name="email">
          <Input placeholder="请输入邮箱" />
        </FormItem>
      </Form>
      <Space>
        <Button onClick={() => form.setFieldsValue({ username: "NB666", email: "hi@nb666.ui" })}>赋值</Button>
        <Button onClick={() => message.info(JSON.stringify(form.getFieldsValue()))}>取值</Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
      </Space>
    </div>
  )
}`,
        element: <FormInstanceDemo />,
      },
      {
        id: "linkage",
        title: "字段联动",
        description: "useWatch 监听字段值，实现跨字段显隐联动。",
        code: `import { Form, FormItem, Input, Select } from "nb666-ui"

export default function Demo() {
  const [form] = Form.useForm()
  const type = Form.useWatch("type", form)
  return (
    <Form form={form} layout="vertical" className="max-w-sm">
      <FormItem label="类型" name="type">
        <Select options={[{ label: "普通", value: "normal" }, { label: "自定义", value: "custom" }]} />
      </FormItem>
      {type === "custom" && (
        <FormItem label="自定义内容" name="custom" rules={[{ required: true, message: "请输入自定义内容" }]}>
          <Input placeholder="请输入自定义内容" />
        </FormItem>
      )}
    </Form>
  )
}`,
        element: <FormLinkageDemo />,
      },
      {
        id: "list",
        title: "动态列表",
        description: "Form.List 支持动态增删行，字段名使用数组路径。",
        code: `import { Button, Form, FormItem, Input, InputNumber } from "nb666-ui"

export default function Demo() {
  return (
    <Form className="max-w-md" initialValues={{ users: [{ name: "张三", age: 20 }] }}>
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <div className="space-y-3">
            {fields.map((field) => (
              <div key={field.key} className="flex items-start gap-3">
                <div className="flex-1">
                  <FormItem name={[field.name, "name"]} rules={[{ required: true, message: "请输入姓名" }]}>
                    <Input placeholder="姓名" />
                  </FormItem>
                </div>
                <div className="w-28">
                  <FormItem name={[field.name, "age"]}>
                    <InputNumber placeholder="年龄" />
                  </FormItem>
                </div>
                <Button type="text" danger onClick={() => remove(field.name)}>删除</Button>
              </div>
            ))}
            <Button type="dashed" block onClick={() => add({ name: "", age: undefined })}>添加一行</Button>
          </div>
        )}
      </Form.List>
    </Form>
  )
}`,
        element: <FormListDemo />,
      },
    ],
    api: [
      { name: "Form.layout", description: "布局方式", type: `"vertical" | "horizontal" | "inline"`, default: "vertical" },
      { name: "Form.initialValues", description: "初始值", type: "Record<string, unknown>", default: "{}" },
      { name: "Form.onFinish", description: "校验通过后的提交回调", type: "(values) => void", default: "-" },
      { name: "Form.onValuesChange", description: "值变化回调", type: "(changed, all) => void", default: "-" },
      { name: "Form.form", description: "表单实例", type: "FormInstance", default: "-" },
      { name: "Form.useForm", description: "创建表单实例", type: "() => [FormInstance]", default: "-" },
      { name: "Form.useWatch", description: "监听字段值", type: "(name, form?) => unknown", default: "-" },
      { name: "Form.List", description: "动态列表子表单", type: "React.ComponentType<FormListProps>", default: "-" },
      { name: "FormItem.dependencies", description: "联动依赖字段", type: "NamePath[]", default: "-" },
      { name: "FormItem.shouldUpdate", description: "是否随值变化更新", type: "boolean | (prev, cur) => boolean", default: "-" },
      { name: "FormItem.label", description: "标签", type: "React.ReactNode", default: "-" },
      { name: "FormItem.name", description: "字段名（用于收集值）", type: "string", default: "-" },
      { name: "FormItem.required", description: "是否必填（显示星号）", type: "boolean", default: "false" },
      { name: "FormItem.rules", description: "校验规则", type: "FormRule[]", default: "[]" },
      { name: "FormItem.valuePropName", description: "值属性名（默认 value）", type: "string", default: "value" },
      { name: "FormItem.help", description: "帮助文案", type: "React.ReactNode", default: "-" },
      { name: "FormItem.extra", description: "附加说明", type: "React.ReactNode", default: "-" },
    ],
  },
  {
    name: "Rate",
    path: "/components/rate",
    title: "评分 Rate",
    description: "用于对事物进行星级评分。",
    categoryKey: "data-entry",
    whenToUse: "当需要用户对内容进行评分时使用。",
    importCode: `import { Rate } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "点击星星进行评分，再次点击可清除。",
        code: `import { Rate, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space direction="vertical" className="items-start">
      <Rate defaultValue={3} onChange={(v) => console.log(v)} />
      <Rate defaultValue={5} disabled />
    </Space>
  )
}`,
        element: (
          <div className="space-y-3">
            <Rate defaultValue={3} onChange={(v) => console.log(v)} />
            <Rate defaultValue={5} disabled />
          </div>
        ),
      },
      {
        id: "half",
        title: "半星评分",
        description: "allowHalf 支持半星，鼠标悬停与点击按半星计算。",
        code: `import { Rate } from "nb666-ui"

export default function Demo() {
  return <Rate allowHalf defaultValue={2.5} onChange={(v) => console.log(v)} />
}`,
        element: <Rate allowHalf defaultValue={2.5} onChange={(v) => console.log(v)} />,
      },
    ],
    api: [
      { name: "value", description: "当前值（受控）", type: "number", default: "-" },
      { name: "defaultValue", description: "默认值", type: "number", default: "0" },
      { name: "count", description: "星星数量", type: "number", default: "5" },
      { name: "disabled", description: "是否禁用", type: "boolean", default: "false" },
      { name: "allowClear", description: "再次点击是否清除", type: "boolean", default: "true" },
      { name: "allowHalf", description: "是否允许半星", type: "boolean", default: "false" },
      { name: "onChange", description: "变化回调", type: "(value: number) => void", default: "-" },
    ],
  },
  {
    name: "Segmented",
    path: "/components/segmented",
    title: "分段控件 Segmented",
    description: "用于在多个选项间切换，通常展示单选视图。",
    categoryKey: "data-entry",
    whenToUse: "当需要在少量选项间快速切换时使用。",
    importCode: `import { Segmented } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "通过 options 配置选项，value 控制选中项。",
        code: `import { Segmented } from "nb666-ui"

export default function Demo() {
  return (
    <Segmented
      defaultValue="list"
      options={[
        { label: "列表", value: "list" },
        { label: "卡片", value: "card" },
        { label: "表格", value: "table" },
      ]}
      onChange={(v) => console.log(v)}
    />
  )
}`,
        element: (
          <Segmented
            defaultValue="list"
            options={[
              { label: "列表", value: "list" },
              { label: "卡片", value: "card" },
              { label: "表格", value: "table" },
            ]}
            onChange={(v) => console.log(v)}
          />
        ),
      },
      {
        id: "size",
        title: "尺寸与块级",
        description: "支持三种尺寸，block 撑满父容器。",
        code: `import { Segmented } from "nb666-ui"

export default function Demo() {
  return (
    <div className="space-y-3">
      <Segmented size="small" options={[{ label: "小", value: "s" }, { label: "中", value: "m" }]} />
      <Segmented options={[{ label: "小", value: "s" }, { label: "中", value: "m" }]} />
      <Segmented size="large" block options={[{ label: "日", value: "d" }, { label: "周", value: "w" }, { label: "月", value: "m" }]} />
    </div>
  )
}`,
        element: (
          <div className="space-y-3">
            <Segmented size="small" options={[{ label: "小", value: "s" }, { label: "中", value: "m" }]} />
            <Segmented options={[{ label: "小", value: "s" }, { label: "中", value: "m" }]} />
            <Segmented size="large" block options={[{ label: "日", value: "d" }, { label: "周", value: "w" }, { label: "月", value: "m" }]} />
          </div>
        ),
      },
    ],
    api: [
      { name: "options", description: "选项配置", type: "SegmentedOption[]", default: "-", required: true },
      { name: "value", description: "选中值（受控）", type: "string | number", default: "-" },
      { name: "defaultValue", description: "默认选中值", type: "string | number", default: "-" },
      { name: "size", description: "尺寸", type: `"small" | "middle" | "large"`, default: "middle" },
      { name: "block", description: "是否撑满父容器", type: "boolean", default: "false" },
      { name: "onChange", description: "变化回调", type: "(value) => void", default: "-" },
    ],
  },
  {
    name: "Upload",
    path: "/components/upload",
    title: "上传 Upload",
    description: "文件选择与上传入口，支持多文件与数量限制。",
    categoryKey: "data-entry",
    whenToUse: "当需要用户选择或上传文件时使用。",
    importCode: `import { Upload } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "点击选择文件，支持多选与最大数量限制。",
        code: `import { Upload } from "nb666-ui"

export default function Demo() {
  return (
    <Upload
      multiple
      maxCount={3}
      className="max-w-sm"
      onChange={(files) => console.log(files)}
    />
  )
}`,
        element: (
          <Upload multiple maxCount={3} className="max-w-sm" onChange={(files) => console.log(files)} />
        ),
      },
      {
        id: "drag",
        title: "拖拽上传",
        description: "drag 支持拖拽文件到上传区域。",
        code: `import { Upload } from "nb666-ui"

export default function Demo() {
  return (
    <Upload
      drag
      multiple
      maxCount={5}
      className="max-w-sm"
      onChange={(files) => console.log(files)}
    />
  )
}`,
        element: (
          <Upload drag multiple maxCount={5} className="max-w-sm" onChange={(files) => console.log(files)} />
        ),
      },
    ],
    api: [
      { name: "accept", description: "接受的文件类型", type: "string", default: "-" },
      { name: "multiple", description: "是否多选", type: "boolean", default: "false" },
      { name: "maxCount", description: "最大文件数", type: "number", default: "-" },
      { name: "drag", description: "是否支持拖拽上传", type: "boolean", default: "false" },
      { name: "disabled", description: "是否禁用", type: "boolean", default: "false" },
      { name: "onChange", description: "文件变化回调", type: "(files: UploadFile[]) => void", default: "-" },
    ],
  },
  {
    name: "AutoComplete",
    path: "/components/auto-complete",
    title: "自动完成 AutoComplete",
    description: "输入时自动补全的输入框。",
    categoryKey: "data-entry",
    whenToUse: "当需要根据输入内容联想并快速选择时使用。",
    importCode: `import { AutoComplete } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "输入关键字后在下拉列表中过滤匹配项。",
        code: `import { AutoComplete } from "nb666-ui"

export default function Demo() {
  return (
    <AutoComplete
      className="max-w-xs"
      placeholder="输入城市"
      options={["北京", "上海", "广州", "深圳", "杭州"].map((v) => ({ label: v, value: v }))}
      onSelect={(v) => console.log(v)}
    />
  )
}`,
        element: (
          <AutoComplete
            className="max-w-xs"
            placeholder="输入城市"
            options={["北京", "上海", "广州", "深圳", "杭州"].map((v) => ({ label: v, value: v }))}
            onSelect={(v) => console.log(v)}
          />
        ),
      },
    ],
    api: [
      { name: "options", description: "候选选项", type: "AutoCompleteOption[]", default: "-" },
      { name: "size", description: "尺寸", type: `"small" | "middle" | "large"`, default: "middle" },
      { name: "onSelect", description: "选择回调", type: "(value, option) => void", default: "-" },
      { name: "placeholder", description: "占位文本", type: "string", default: "-" },
    ],
  },
  {
    name: "ColorPicker",
    path: "/components/color-picker",
    title: "颜色选择器 ColorPicker",
    description: "用于选择颜色，展示所选颜色值。",
    categoryKey: "data-entry",
    whenToUse: "当需要让用户选择颜色时使用。",
    importCode: `import { ColorPicker } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "点击色块选择颜色，onChange 返回十六进制色值。",
        code: `import { ColorPicker } from "nb666-ui"

export default function Demo() {
  return <ColorPicker defaultValue="#6c5ce7" onChange={(v) => console.log(v)} />
}`,
        element: <ColorPicker defaultValue="#6c5ce7" onChange={(v) => console.log(v)} />,
      },
    ],
    api: [
      { name: "value", description: "颜色值（受控）", type: "string", default: "-" },
      { name: "defaultValue", description: "默认颜色", type: "string", default: "#6c5ce7" },
      { name: "showText", description: "是否显示颜色值文本", type: "boolean", default: "true" },
      { name: "onChange", description: "变化回调", type: "(value: string) => void", default: "-" },
      { name: "disabled", description: "是否禁用", type: "boolean", default: "false" },
    ],
  },
  {
    name: "DatePicker",
    path: "/components/date-picker",
    title: "日期选择 DatePicker",
    description: "选择日期，返回 ISO 格式日期字符串。",
    categoryKey: "data-entry",
    whenToUse: "当需要选择单个日期时使用。",
    importCode: `import { DatePicker } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "点击打开日历面板，支持月份与年份视图切换。",
        code: `import { DatePicker, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space>
      <DatePicker className="w-52" onChange={(v) => console.log(v)} />
      <DatePicker className="w-52" disabled />
    </Space>
  )
}`,
        element: (
          <div className="flex flex-wrap gap-3">
            <DatePicker className="w-52" onChange={(v) => console.log(v)} />
            <DatePicker className="w-52" disabled />
          </div>
        ),
      },
      {
        id: "disabled-date",
        title: "禁用日期",
        description: "通过 disabledDate 禁用特定日期，这里禁用了周末。",
        code: `import { DatePicker } from "nb666-ui"

export default function Demo() {
  return (
    <DatePicker
      className="w-52"
      placeholder="不可选择周末"
      disabledDate={(date) => date.getDay() === 0 || date.getDay() === 6}
    />
  )
}`,
        element: (
          <DatePicker
            className="w-52"
            placeholder="不可选择周末"
            disabledDate={(date) => date.getDay() === 0 || date.getDay() === 6}
          />
        ),
      },
    ],
    api: [
      { name: "value", description: "日期值（受控，yyyy-mm-dd）", type: "string", default: "-" },
      { name: "defaultValue", description: "默认日期", type: "string", default: "-" },
      { name: "size", description: "尺寸", type: `"small" | "middle" | "large"`, default: "middle" },
      { name: "status", description: "校验状态", type: `"error" | "warning"`, default: "-" },
      { name: "allowClear", description: "是否可清空", type: "boolean", default: "true" },
      { name: "disabledDate", description: "禁用特定日期", type: "(date: Date) => boolean", default: "-" },
      { name: "onChange", description: "变化回调", type: "(value: string) => void", default: "-" },
      { name: "disabled", description: "是否禁用", type: "boolean", default: "false" },
    ],
  },

  {
    name: "TextArea",
    path: "/components/textarea",
    title: "文本域 TextArea",
    description: "用于多行文本输入，支持字数统计与校验状态。",
    categoryKey: "data-entry",
    whenToUse: "当需要输入较长的多行文本（如备注、描述）时使用。",
    importCode: `import { TextArea } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "支持多行输入、尺寸与字数统计。",
        code: `import { TextArea } from "nb666-ui"

export default function Demo() {
  return (
    <div className="space-y-3">
      <TextArea className="max-w-md" placeholder="请输入描述" rows={3} />
      <TextArea className="max-w-md" showCount maxLength={100} defaultValue="已有内容" />
    </div>
  )
}`,
        element: (
          <div className="space-y-3">
            <TextArea className="max-w-md" placeholder="请输入描述" rows={3} />
            <TextArea className="max-w-md" showCount maxLength={100} defaultValue="已有内容" />
          </div>
        ),
      },
    ],
    api: [
      { name: "size", description: "尺寸", type: `"small" | "middle" | "large"`, default: "middle" },
      { name: "showCount", description: "是否显示字数统计", type: "boolean", default: "false" },
      { name: "maxLength", description: "最大长度", type: "number", default: "-" },
      { name: "status", description: "校验状态", type: `"error" | "warning"`, default: "-" },
      { name: "rows", description: "默认行数", type: "number", default: "-" },
    ],
  },
  {
    name: "TimePicker",
    path: "/components/time-picker",
    title: "时间选择 TimePicker",
    description: "用于选择小时、分钟与秒，支持清空与快捷选择当前时间。",
    categoryKey: "data-entry",
    whenToUse: "当需要精确录入一天中的某个时刻时使用。",
    importCode: `import { TimePicker } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "点击展开时间面板，选择后通过 onChange 返回格式化字符串。",
        code: `import { Space, TimePicker } from "nb666-ui"

export default function Demo() {
  return (
    <Space>
      <TimePicker
        defaultValue="09:30:15"
        className="w-44"
        onChange={(value) => console.log(value)}
      />
      <TimePicker
        format="HH:mm"
        defaultValue="18:00"
        className="w-36"
      />
    </Space>
  )
}`,
        element: (
          <Space>
            <TimePicker
              defaultValue="09:30:15"
              className="w-44"
              onChange={(value) => console.log(value)}
            />
            <TimePicker format="HH:mm" defaultValue="18:00" className="w-36" />
          </Space>
        ),
      },
      {
        id: "clear",
        title: "清空与禁用",
        description: "allowClear 支持清空，disabled 禁用选择。",
        code: `import { Space, TimePicker } from "nb666-ui"

export default function Demo() {
  return (
    <Space>
      <TimePicker allowClear defaultValue="12:00:00" className="w-44" />
      <TimePicker disabled placeholder="禁用状态" className="w-44" />
    </Space>
  )
}`,
        element: (
          <Space>
            <TimePicker allowClear defaultValue="12:00:00" className="w-44" />
            <TimePicker disabled placeholder="禁用状态" className="w-44" />
          </Space>
        ),
      },
    ],
    api: [
      { name: "value", description: "当前时间（受控）", type: "string", default: "-" },
      { name: "defaultValue", description: "默认时间", type: "string", default: '""' },
      { name: "onChange", description: "时间变化回调", type: "(value: string) => void", default: "-" },
      { name: "format", description: "时间格式", type: `"HH:mm" | "HH:mm:ss"`, default: "HH:mm:ss" },
      { name: "size", description: "尺寸", type: `"small" | "middle" | "large"`, default: "middle" },
      { name: "allowClear", description: "是否可清空", type: "boolean", default: "true" },
      { name: "disabled", description: "是否禁用", type: "boolean", default: "false" },
      { name: "status", description: "校验状态", type: `"error" | "warning"`, default: "-" },
    ],
  },
  {
    name: "Transfer",
    path: "/components/transfer",
    title: "穿梭框 Transfer",
    description: "在左右两栏之间移动数据，常用于权限或成员分配。",
    categoryKey: "data-entry",
    whenToUse: "当需要从一组候选项中挑选多项并调整归属时使用。",
    importCode: `import { Transfer } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "通过 targetKeys 或 defaultTargetKeys 控制右侧数据。",
        code: `import { Transfer } from "nb666-ui"

const data = [
  { key: "1", title: "张三" },
  { key: "2", title: "李四" },
  { key: "3", title: "王五" },
  { key: "4", title: "赵六" },
]

export default function Demo() {
  return (
    <Transfer
      dataSource={data}
      defaultTargetKeys={["1", "2"]}
      titles={["候选成员", "已选成员"]}
      onChange={(keys, direction, moved) => console.log(keys, direction, moved)}
    />
  )
}`,
        element: (
          <Transfer
            dataSource={[
              { key: "1", title: "张三" },
              { key: "2", title: "李四" },
              { key: "3", title: "王五" },
              { key: "4", title: "赵六" },
            ]}
            defaultTargetKeys={["1", "2"]}
            titles={["候选成员", "已选成员"]}
            onChange={(keys, direction, moved) => console.log(keys, direction, moved)}
          />
        ),
      },
      {
        id: "search",
        title: "带搜索",
        description: "showSearch 在两栏中提供搜索过滤。",
        code: `import { Transfer } from "nb666-ui"

export default function Demo() {
  return (
    <Transfer
      showSearch
      titles={["可选", "已选"]}
      dataSource={[
        { key: "1", title: "北京" },
        { key: "2", title: "上海" },
        { key: "3", title: "广州" },
        { key: "4", title: "深圳" },
        { key: "5", title: "杭州" },
      ]}
    />
  )
}`,
        element: (
          <Transfer
            showSearch
            titles={["可选", "已选"]}
            dataSource={[
              { key: "1", title: "北京" },
              { key: "2", title: "上海" },
              { key: "3", title: "广州" },
              { key: "4", title: "深圳" },
              { key: "5", title: "杭州" },
            ]}
          />
        ),
      },
    ],
    api: [
      { name: "dataSource", description: "数据源", type: "TransferItem[]", default: "-", required: true },
      { name: "targetKeys", description: "右侧数据（受控）", type: "(string | number)[]", default: "-" },
      { name: "defaultTargetKeys", description: "默认右侧数据", type: "(string | number)[]", default: "[]" },
      { name: "onChange", description: "移动回调", type: "(keys, direction, movedKeys) => void", default: "-" },
      { name: "titles", description: "左右栏标题", type: "[ReactNode, ReactNode]", default: "源列表 / 目标列表" },
      { name: "showSearch", description: "是否显示搜索", type: "boolean", default: "false" },
      { name: "disabled", description: "是否禁用", type: "boolean", default: "false" },
      { name: "oneWay", description: "是否单向移动", type: "boolean", default: "false" },
      { name: "render", description: "自定义条目内容", type: "(item) => ReactNode", default: "-" },
    ],
  },

  {
    name: "TreeSelect",
    path: "/components/tree-select",
    title: "树选择 TreeSelect",
    description: "在树形结构中单选或多选值，适合选择层级化数据。",
    categoryKey: "data-entry",
    whenToUse: "当选项具有父子层级关系、需要按树选择时使用。",
    importCode: `import { TreeSelect } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "默认单选，选中后关闭下拉面板。",
        code: `import { TreeSelect } from "nb666-ui"

const data = [
  { key: "1", title: "公司", children: [
    { key: "1-1", title: "研发部" },
    { key: "1-2", title: "市场部" },
  ]},
  { key: "2", title: "分公司" },
]

export default function Demo() {
  return (
    <TreeSelect
      className="w-64"
      defaultValue="1-1"
      treeData={data}
      onChange={(value) => console.log(value)}
    />
  )
}`,
        element: (
          <TreeSelect
            className="w-64"
            defaultValue="1-1"
            treeData={[
              { key: "1", title: "公司", children: [
                { key: "1-1", title: "研发部" },
                { key: "1-2", title: "市场部" },
              ]},
              { key: "2", title: "分公司" },
            ]}
            onChange={(value) => console.log(value)}
          />
        ),
      },
      {
        id: "multiple",
        title: "多选与可勾选",
        description: "multiple 支持多选，treeCheckable 启用树勾选。",
        code: `import { Space, TreeSelect } from "nb666-ui"

const data = [
  { key: "1", title: "公司", children: [
    { key: "1-1", title: "研发部" },
    { key: "1-2", title: "市场部" },
  ]},
  { key: "2", title: "分公司" },
]

export default function Demo() {
  return (
    <Space>
      <TreeSelect multiple className="w-56" treeData={data} />
      <TreeSelect treeCheckable className="w-56" treeData={data} />
    </Space>
  )
}`,
        element: (
          <Space>
            <TreeSelect multiple className="w-56" treeData={[
              { key: "1", title: "公司", children: [
                { key: "1-1", title: "研发部" },
                { key: "1-2", title: "市场部" },
              ]},
              { key: "2", title: "分公司" },
            ]} />
            <TreeSelect treeCheckable className="w-56" treeData={[
              { key: "1", title: "公司", children: [
                { key: "1-1", title: "研发部" },
                { key: "1-2", title: "市场部" },
              ]},
              { key: "2", title: "分公司" },
            ]} />
          </Space>
        ),
      },
    ],
    api: [
      { name: "treeData", description: "树形数据", type: "TreeDataNode[]", default: "-", required: true },
      { name: "value", description: "选中值（受控）", type: "string | string[]", default: "-" },
      { name: "defaultValue", description: "默认选中值", type: "string | string[]", default: "-" },
      { name: "onChange", description: "选中变化回调", type: "(value: string | string[]) => void", default: "-" },
      { name: "multiple", description: "是否多选", type: "boolean", default: "false" },
      { name: "treeCheckable", description: "是否树形勾选", type: "boolean", default: "false" },
      { name: "showSearch", description: "是否显示搜索", type: "boolean", default: "false" },
      { name: "allowClear", description: "是否可清空", type: "boolean", default: "true" },
      { name: "disabled", description: "是否禁用", type: "boolean", default: "false" },
    ],
  },

  {
    name: "RangePicker",
    path: "/components/range-picker",
    title: "区间选择 RangePicker",
    description: "选择一段起止日期，支持双月面板、区间高亮与禁用日期。",
    categoryKey: "data-entry",
    whenToUse: "当需要录入一个时间范围（如活动周期、预订区间）时使用。",
    importCode: `import { RangePicker } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "先后选择开始与结束日期，onChange 返回完整区间。",
        code: `import { RangePicker } from "nb666-ui"

export default function Demo() {
  return (
    <RangePicker
      className="w-72"
      defaultValue={["2026-08-10", "2026-08-20"]}
      onChange={(value) => console.log(value)}
    />
  )
}`,
        element: (
          <RangePicker
            className="w-72"
            defaultValue={["2026-08-10", "2026-08-20"]}
            onChange={(value) => console.log(value)}
          />
        ),
      },
      {
        id: "disabled",
        title: "禁用日期",
        description: "disabledDate 可禁止选择指定日期。",
        code: `import { RangePicker } from "nb666-ui"

export default function Demo() {
  return (
    <RangePicker
      className="w-72"
      placeholder={["入住", "离店"]}
      disabledDate={(date) => date.getDay() === 0 || date.getDay() === 6}
    />
  )
}`,
        element: (
          <RangePicker
            className="w-72"
            placeholder={["入住", "离店"]}
            disabledDate={(date) => date.getDay() === 0 || date.getDay() === 6}
          />
        ),
      },
    ],
    api: [
      { name: "value", description: "当前区间（受控）", type: "[string, string]", default: "-" },
      { name: "defaultValue", description: "默认区间", type: "[string, string]", default: "null" },
      { name: "onChange", description: "区间变化回调", type: "(value: [string, string] | null) => void", default: "-" },
      { name: "placeholder", description: "占位文案", type: "[string, string]", default: "开始日期 / 结束日期" },
      { name: "size", description: "尺寸", type: `"small" | "middle" | "large"`, default: "middle" },
      { name: "allowClear", description: "是否可清空", type: "boolean", default: "true" },
      { name: "disabled", description: "是否禁用", type: "boolean", default: "false" },
      { name: "disabledDate", description: "不可选日期", type: "(date: Date) => boolean", default: "-" },
    ],
  },
  {
    name: "Cascader",
    path: "/components/cascader",
    title: "级联选择 Cascader",
    description: "在多级选项中选择一个完整路径，支持点击或悬停展开。",
    categoryKey: "data-entry",
    whenToUse: "当选项具有明确的层级关系（如省市区、分类）时使用。",
    importCode: `import { Cascader } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "默认点击展开，选中叶子节点后关闭并返回路径。",
        code: `import { Cascader } from "nb666-ui"

const options = [
  { value: "zhejiang", label: "浙江", children: [
    { value: "hangzhou", label: "杭州", children: [
      { value: "xihu", label: "西湖区" },
      { value: "binjiang", label: "滨江区" },
    ]},
    { value: "ningbo", label: "宁波" },
  ]},
  { value: "jiangsu", label: "江苏", children: [
    { value: "nanjing", label: "南京" },
    { value: "suzhou", label: "苏州" },
  ]},
]

export default function Demo() {
  return (
    <Cascader
      className="w-72"
      options={options}
      defaultValue={["zhejiang", "hangzhou", "xihu"]}
      onChange={(value, selected) => console.log(value, selected)}
    />
  )
}`,
        element: (
          <Cascader
            className="w-72"
            options={[
              { value: "zhejiang", label: "浙江", children: [
                { value: "hangzhou", label: "杭州", children: [
                  { value: "xihu", label: "西湖区" },
                  { value: "binjiang", label: "滨江区" },
                ]},
                { value: "ningbo", label: "宁波" },
              ]},
              { value: "jiangsu", label: "江苏", children: [
                { value: "nanjing", label: "南京" },
                { value: "suzhou", label: "苏州" },
              ]},
            ]}
            defaultValue={["zhejiang", "hangzhou", "xihu"]}
            onChange={(value, selected) => console.log(value, selected)}
          />
        ),
      },
      {
        id: "hover",
        title: "悬停展开",
        description: "expandTrigger 为 hover 时，鼠标悬停即可展开下一级。",
        code: `import { Cascader } from "nb666-ui"

export default function Demo() {
  return (
    <Cascader
      expandTrigger="hover"
      className="w-72"
      options={[
        { value: "a", label: "分类 A", children: [{ value: "a1", label: "子项 A1" }] },
        { value: "b", label: "分类 B", children: [{ value: "b1", label: "子项 B1" }] },
      ]}
    />
  )
}`,
        element: (
          <Cascader
            expandTrigger="hover"
            className="w-72"
            options={[
              { value: "a", label: "分类 A", children: [{ value: "a1", label: "子项 A1" }] },
              { value: "b", label: "分类 B", children: [{ value: "b1", label: "子项 B1" }] },
            ]}
          />
        ),
      },
    ],
    api: [
      { name: "options", description: "级联选项", type: "CascaderOption[]", default: "-", required: true },
      { name: "value", description: "选中路径（受控）", type: "(string | number)[]", default: "-" },
      { name: "defaultValue", description: "默认选中路径", type: "(string | number)[]", default: "[]" },
      { name: "onChange", description: "选中变化回调", type: "(value, selectedOptions) => void", default: "-" },
      { name: "expandTrigger", description: "展开方式", type: `"click" | "hover"`, default: "click" },
      { name: "size", description: "尺寸", type: `"small" | "middle" | "large"`, default: "middle" },
      { name: "allowClear", description: "是否可清空", type: "boolean", default: "true" },
      { name: "disabled", description: "是否禁用", type: "boolean", default: "false" },
      { name: "status", description: "校验状态", type: `"error" | "warning"`, default: "-" },
    ],
  },

  {
    name: "Mentions",
    path: "/components/mentions",
    title: "提及 Mentions",
    description: "输入 @ 触发候选列表，快速提及用户或对象。",
    categoryKey: "data-entry",
    whenToUse: "当需要在文本中通过 @ 提及用户、标签等对象时使用。",
    importCode: `import { Mentions } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "输入 @ 后从下拉列表中选择，自动拼接提及内容。",
        code: `import { Mentions } from "nb666-ui"

const users = ["张三", "李四", "王五", "赵六", "钱七"]

export default function Demo() {
  return (
    <Mentions
      className="max-w-md"
      options={users}
      onChange={(value) => console.log(value)}
    />
  )
}`,
        element: (
          <Mentions
            className="max-w-md"
            options={["张三", "李四", "王五", "赵六", "钱七"]}
            onChange={(value) => console.log(value)}
          />
        ),
      },
      {
        id: "object",
        title: "对象选项",
        description: "options 支持对象，label 用于展示，value 用于标识。",
        code: `import { Mentions } from "nb666-ui"

export default function Demo() {
  return (
    <Mentions
      className="max-w-md"
      options={[
        { label: "张三", value: "zhangsan" },
        { label: "李四", value: "lisi" },
      ]}
      onSelect={(option, prefix) => console.log(option, prefix)}
    />
  )
}`,
        element: (
          <Mentions
            className="max-w-md"
            options={[
              { label: "张三", value: "zhangsan" },
              { label: "李四", value: "lisi" },
            ]}
            onSelect={(option, prefix) => console.log(option, prefix)}
          />
        ),
      },
    ],
    api: [
      { name: "options", description: "候选列表", type: "string[] | MentionOption[]", default: "[]" },
      { name: "value", description: "文本值（受控）", type: "string", default: "-" },
      { name: "defaultValue", description: "默认文本值", type: "string", default: '""' },
      { name: "onChange", description: "文本变化回调", type: "(value: string) => void", default: "-" },
      { name: "onSelect", description: "选中提及回调", type: "(option, prefix) => void", default: "-" },
      { name: "prefix", description: "触发前缀", type: "string", default: "@" },
      { name: "rows", description: "输入行数", type: "number", default: "3" },
      { name: "disabled", description: "是否禁用", type: "boolean", default: "false" },
    ],
  },

]