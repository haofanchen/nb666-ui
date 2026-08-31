import { Alert, Avatar, AvatarGroup, Badge, Button, Card, CardMeta, Collapse, Empty, Icon, Space, Table, Tag, Tooltip } from "nb666-ui"
import type { ComponentDoc } from "../data/types"

const tableData = [
  { key: "1", name: "张三", age: 28, city: "北京", status: "活跃" },
  { key: "2", name: "李四", age: 34, city: "上海", status: "待审核" },
  { key: "3", name: "王五", age: 22, city: "广州", status: "活跃" },
  { key: "4", name: "赵六", age: 41, city: "深圳", status: "已停用" },
]

export const dataDisplayComponents: ComponentDoc[] = [
  {
    name: "Card",
    path: "/components/card",
    title: "卡片 Card",
    description: "通用卡片容器，可承载标题、内容与操作。",
    categoryKey: "data-display",
    whenToUse: "当需要将相关信息聚合在统一容器中展示时使用。",
    importCode: `import { Card } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "包含标题与操作区的卡片。",
        code: `import { Button, Card } from "nb666-ui"

export default function Demo() {
  return (
    <Card title="卡片标题" extra={<Button type="text" size="small">更多</Button>} className="max-w-sm">
      这是卡片内容，可以放置任意信息或组件。
    </Card>
  )
}`,
        element: (
          <Card title="卡片标题" extra={<Button type="text" size="small">更多</Button>} className="max-w-sm">
            这是卡片内容，可以放置任意信息或组件。
          </Card>
        ),
      },
      {
        id: "hoverable",
        title: "可悬浮与加载",
        description: "hoverable 增加悬浮阴影，loading 展示加载骨架。",
        code: `import { Card, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space className="items-start">
      <Card hoverable className="max-w-xs">悬浮卡片</Card>
      <Card loading title="加载中" className="max-w-xs">内容</Card>
    </Space>
  )
}`,
        element: (
          <Space className="items-start">
            <Card hoverable className="max-w-xs">悬浮卡片</Card>
            <Card loading title="加载中" className="max-w-xs">内容</Card>
          </Space>
        ),
      },
      {
        id: "meta",
        title: "Meta 信息",
        description: "CardMeta 提供头像、标题与描述的组合展示。",
        code: `import { Avatar, Card, CardMeta } from "nb666-ui"

export default function Demo() {
  return (
    <Card className="max-w-sm">
      <CardMeta
        avatar={<Avatar>A</Avatar>}
        title="NB666 UI"
        description="优雅、现代的 React 组件库"
      />
    </Card>
  )
}`,
        element: (
          <Card className="max-w-sm">
            <CardMeta
              avatar={<Avatar>A</Avatar>}
              title="NB666 UI"
              description="优雅、现代的 React 组件库"
            />
          </Card>
        ),
      },
    ],
    api: [
      { name: "title", description: "卡片标题", type: "React.ReactNode", default: "-" },
      { name: "extra", description: "右上角操作区", type: "React.ReactNode", default: "-" },
      { name: "bordered", description: "是否显示边框", type: "boolean", default: "true" },
      { name: "hoverable", description: "悬浮时是否加阴影", type: "boolean", default: "false" },
      { name: "loading", description: "加载状态", type: "boolean", default: "false" },
      { name: "size", description: "尺寸", type: `"default" | "small"`, default: "default" },
      { name: "cover", description: "封面", type: "React.ReactNode", default: "-" },
      { name: "actions", description: "底部操作区", type: "React.ReactNode[]", default: "-" },
      { name: "CardMeta.avatar", description: "头像或图标", type: "React.ReactNode", default: "-" },
      { name: "CardMeta.title", description: "标题", type: "React.ReactNode", default: "-" },
      { name: "CardMeta.description", description: "描述", type: "React.ReactNode", default: "-" },
    ],
  },
  {
    name: "Table",
    path: "/components/table",
    title: "表格 Table",
    description: "展示行列数据，支持自定义列渲染与分页。",
    categoryKey: "data-display",
    whenToUse: "当需要展示结构化数据并支持排序、分页等操作时使用。",
    importCode: `import { Table } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "columns 定义列，dataSource 传入数据。",
        code: `import { Table } from "nb666-ui"

const data = [
  { key: "1", name: "张三", age: 28, city: "北京" },
  { key: "2", name: "李四", age: 34, city: "上海" },
  { key: "3", name: "王五", age: 22, city: "广州" },
]

export default function Demo() {
  return (
    <Table
      columns={[
        { title: "姓名", dataIndex: "name" },
        { title: "年龄", dataIndex: "age" },
        { title: "城市", dataIndex: "city" },
      ]}
      dataSource={data}
    />
  )
}`,
        element: (
          <Table
            columns={[
              { title: "姓名", dataIndex: "name" },
              { title: "年龄", dataIndex: "age" },
              { title: "城市", dataIndex: "city" },
            ]}
            dataSource={tableData}
          />
        ),
      },
      {
        id: "render",
        title: "自定义列与状态",
        description: "render 自定义单元格，结合 Tag 展示状态。",
        code: `import { Table, Tag } from "nb666-ui"

export default function Demo() {
  return (
    <Table
      columns={[
        { title: "姓名", dataIndex: "name" },
        { title: "年龄", dataIndex: "age" },
        {
          title: "状态",
          dataIndex: "status",
          render: (value) => (
            <Tag color={value === "活跃" ? "success" : value === "待审核" ? "warning" : "error"}>
              {value}
            </Tag>
          ),
        },
      ]}
      dataSource={[
        { key: "1", name: "张三", age: 28, status: "活跃" },
        { key: "2", name: "李四", age: 34, status: "待审核" },
        { key: "3", name: "王五", age: 22, status: "已停用" },
      ]}
    />
  )
}`,
        element: (
          <Table
            columns={[
              { title: "姓名", dataIndex: "name" },
              { title: "年龄", dataIndex: "age" },
              {
                title: "状态",
                dataIndex: "status",
                render: (value) => (
                  <Tag color={value === "活跃" ? "success" : value === "待审核" ? "warning" : "error"}>{value as React.ReactNode}</Tag>
                ),
              },
            ]}
            dataSource={tableData}
          />
        ),
      },
      {
        id: "pagination",
        title: "分页表格",
        description: "传入 pagination 配置启用分页。",
        code: `import { Table } from "nb666-ui"

export default function Demo() {
  return (
    <Table
      pagination={{ pageSize: 2, showSizeChanger: true }}
      columns={[
        { title: "姓名", dataIndex: "name" },
        { title: "年龄", dataIndex: "age" },
        { title: "城市", dataIndex: "city" },
      ]}
      dataSource={Array.from({ length: 12 }, (_, i) => ({
        key: String(i),
        name: \`用户\${i + 1}\`,
        age: 20 + i,
        city: "上海",
      }))}
    />
  )
}`,
        element: (
          <Table
            pagination={{ pageSize: 2, showSizeChanger: true }}
            columns={[
              { title: "姓名", dataIndex: "name" },
              { title: "年龄", dataIndex: "age" },
              { title: "城市", dataIndex: "city" },
            ]}
            dataSource={Array.from({ length: 12 }, (_, i) => ({ key: String(i), name: `用户${i + 1}`, age: 20 + i, city: "上海" }))}
          />
        ),
      },
      {
        id: "sort",
        title: "排序",
        description: "在列上配置 sorter，点击表头切换升序 / 降序。",
        code: `import { Table } from "nb666-ui"

export default function Demo() {
  return (
    <Table
      pagination={false}
      columns={[
        { title: "姓名", dataIndex: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
        { title: "年龄", dataIndex: "age", sorter: (a, b) => a.age - b.age },
        { title: "城市", dataIndex: "city" },
      ]}
      dataSource={[
        { key: "1", name: "张三", age: 28, city: "北京" },
        { key: "2", name: "李四", age: 34, city: "上海" },
        { key: "3", name: "王五", age: 22, city: "广州" },
        { key: "4", name: "赵六", age: 41, city: "深圳" },
      ]}
    />
  )
}`,
        element: (
          <Table
            pagination={false}
            columns={[
              { title: "姓名", dataIndex: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
              { title: "年龄", dataIndex: "age", sorter: (a, b) => a.age - b.age },
              { title: "城市", dataIndex: "city" },
            ]}
            dataSource={tableData}
          />
        ),
      },
      {
        id: "selection",
        title: "行选择",
        description: "rowSelection 添加复选框列，支持全选与半选。",
        code: `import { Table } from "nb666-ui"

export default function Demo() {
  return (
    <Table
      pagination={false}
      rowSelection={{ onChange: (keys, rows) => console.log(keys, rows) }}
      columns={[
        { title: "姓名", dataIndex: "name" },
        { title: "年龄", dataIndex: "age" },
        { title: "城市", dataIndex: "city" },
      ]}
      dataSource={[
        { key: "1", name: "张三", age: 28, city: "北京" },
        { key: "2", name: "李四", age: 34, city: "上海" },
        { key: "3", name: "王五", age: 22, city: "广州" },
      ]}
    />
  )
}`,
        element: (
          <Table
            pagination={false}
            rowSelection={{ onChange: (keys, rows) => console.log(keys, rows) }}
            columns={[
              { title: "姓名", dataIndex: "name" },
              { title: "年龄", dataIndex: "age" },
              { title: "城市", dataIndex: "city" },
            ]}
            dataSource={tableData}
          />
        ),
      },
    ],
    api: [
      { name: "columns", description: "列配置", type: "TableColumn[]", default: "-", required: true },
      { name: "dataSource", description: "数据源", type: "Record<string, unknown>[]", default: "-", required: true },
      { name: "rowKey", description: "行唯一标识", type: "string | (record) => string", default: "key" },
      { name: "loading", description: "加载状态", type: "boolean", default: "false" },
      { name: "bordered", description: "是否显示边框", type: "boolean", default: "false" },
      { name: "size", description: "尺寸", type: `"small" | "middle"`, default: "middle" },
      { name: "pagination", description: "分页配置，false 关闭", type: "TablePagination | false", default: "{ pageSize: 10 }" },
      { name: "column.render", description: "自定义单元格渲染", type: "(value, record, index) => ReactNode", default: "-" },
      { name: "column.sorter", description: "列排序函数", type: "(a, b) => number", default: "-" },
      { name: "rowSelection", description: "行选择配置", type: "{ selectedRowKeys?, onChange? }", default: "-" },
    ],
  },
  {
    name: "Tag",
    path: "/components/tag",
    title: "标签 Tag",
    description: "进行标记和分类的小标签。",
    categoryKey: "data-display",
    whenToUse: "当需要标记状态、分类或属性时使用。",
    importCode: `import { Tag } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "内置四种语义色与处理中颜色。",
        code: `import { Space, Tag } from "nb666-ui"

export default function Demo() {
  return (
    <Space wrap>
      <Tag>默认</Tag>
      <Tag color="success">成功</Tag>
      <Tag color="processing">处理中</Tag>
      <Tag color="warning">警告</Tag>
      <Tag color="error">失败</Tag>
    </Space>
  )
}`,
        element: (
          <Space wrap>
            <Tag>默认</Tag>
            <Tag color="success">成功</Tag>
            <Tag color="processing">处理中</Tag>
            <Tag color="warning">警告</Tag>
            <Tag color="error">失败</Tag>
          </Space>
        ),
      },
      {
        id: "custom",
        title: "自定义颜色与关闭",
        description: "color 支持任意颜色，closable 支持关闭。",
        code: `import { Space, Tag } from "nb666-ui"

export default function Demo() {
  return (
    <Space wrap>
      <Tag color="#8b5cf6">紫色标签</Tag>
      <Tag color="#0ea5e9">蓝色标签</Tag>
      <Tag closable color="success">可关闭标签</Tag>
    </Space>
  )
}`,
        element: (
          <Space wrap>
            <Tag color="#8b5cf6">紫色标签</Tag>
            <Tag color="#0ea5e9">蓝色标签</Tag>
            <Tag closable color="success">可关闭标签</Tag>
          </Space>
        ),
      },
    ],
    api: [
      { name: "color", description: "标签颜色或预设语义色", type: "string", default: "-" },
      { name: "closable", description: "是否可关闭", type: "boolean", default: "false" },
      { name: "onClose", description: "关闭回调", type: "(e) => void", default: "-" },
      { name: "bordered", description: "是否显示边框", type: "boolean", default: "true" },
      { name: "icon", description: "图标", type: "React.ReactNode", default: "-" },
    ],
  },
  {
    name: "Badge",
    path: "/components/badge",
    title: "徽标数 Badge",
    description: "在元素右上角展示数字或状态点。",
    categoryKey: "data-display",
    whenToUse: "当需要提示未读消息数、数量或状态时使用。",
    importCode: `import { Badge } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "count 显示数量，overflowCount 限制最大显示值。",
        code: `import { Avatar, Badge, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space size="large">
      <Badge count={5}><Avatar /></Badge>
      <Badge count={120} overflowCount={99}><Avatar /></Badge>
      <Badge dot><Avatar /></Badge>
    </Space>
  )
}`,
        element: (
          <Space size="large">
            <Badge count={5}><Avatar /></Badge>
            <Badge count={120} overflowCount={99}><Avatar /></Badge>
            <Badge dot><Avatar /></Badge>
          </Space>
        ),
      },
      {
        id: "status",
        title: "状态点",
        description: "status 设置状态颜色，可脱离子元素独立使用。",
        code: `import { Badge, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space direction="vertical" size="small" className="items-start">
      <Badge status="success" count="运行中" />
      <Badge status="processing" count="处理中" />
      <Badge status="warning" count="警告" />
      <Badge status="error" count="异常" />
    </Space>
  )
}`,
        element: (
          <Space direction="vertical" size="small" className="items-start">
            <Badge status="success" count="运行中" />
            <Badge status="processing" count="处理中" />
            <Badge status="warning" count="警告" />
            <Badge status="error" count="异常" />
          </Space>
        ),
      },
    ],
    api: [
      { name: "count", description: "展示的数字", type: "React.ReactNode", default: "-" },
      { name: "overflowCount", description: "封顶数字", type: "number", default: "99" },
      { name: "dot", description: "是否只显示小红点", type: "boolean", default: "false" },
      { name: "showZero", description: "数值为 0 时是否显示", type: "boolean", default: "false" },
      { name: "status", description: "状态点颜色", type: `"success" | "processing" | "error" | "warning" | "default"`, default: "default" },
      { name: "color", description: "自定义颜色", type: "string", default: "-" },
    ],
  },
  {
    name: "Avatar",
    path: "/components/avatar",
    title: "头像 Avatar",
    description: "用来代表用户或事物，支持图片、图标或字符。",
    categoryKey: "data-display",
    whenToUse: "当需要展示用户头像或对象标识时使用。",
    importCode: `import { Avatar } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "支持图片、文字与图标三种形式。",
        code: `import { Avatar, Icon, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space size="large">
      <Avatar src="https://i.pravatar.cc/80?img=1" />
      <Avatar>A</Avatar>
      <Avatar icon={<Icon name="user" size={16} />} />
      <Avatar shape="square">B</Avatar>
    </Space>
  )
}`,
        element: (
          <Space size="large">
            <Avatar src="https://i.pravatar.cc/80?img=1" />
            <Avatar>A</Avatar>
            <Avatar icon={<Icon name="user" size={16} />} />
            <Avatar shape="square">B</Avatar>
          </Space>
        ),
      },
      {
        id: "size",
        title: "尺寸",
        description: "支持预设尺寸与自定义像素。",
        code: `import { Avatar, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space align="center" size="large">
      <Avatar size="small">S</Avatar>
      <Avatar>M</Avatar>
      <Avatar size="large">L</Avatar>
      <Avatar size={56}>XL</Avatar>
    </Space>
  )
}`,
        element: (
          <Space align="center" size="large">
            <Avatar size="small">S</Avatar>
            <Avatar>M</Avatar>
            <Avatar size="large">L</Avatar>
            <Avatar size={56}>XL</Avatar>
          </Space>
        ),
      },
      {
        id: "group",
        title: "头像组",
        description: "AvatarGroup 将多个头像重叠展示，超出部分以 +N 汇总。",
        code: `import { Avatar, AvatarGroup } from "nb666-ui"

export default function Demo() {
  return (
    <AvatarGroup max={4}>
      <Avatar>A</Avatar>
      <Avatar>B</Avatar>
      <Avatar>C</Avatar>
      <Avatar>D</Avatar>
      <Avatar>E</Avatar>
      <Avatar>F</Avatar>
    </AvatarGroup>
  )
}`,
        element: (
          <AvatarGroup max={4}>
            <Avatar>A</Avatar>
            <Avatar>B</Avatar>
            <Avatar>C</Avatar>
            <Avatar>D</Avatar>
            <Avatar>E</Avatar>
            <Avatar>F</Avatar>
          </AvatarGroup>
        ),
      },
    ],
    api: [
      { name: "src", description: "图片地址", type: "string", default: "-" },
      { name: "size", description: "尺寸", type: `"small" | "default" | "large" | number`, default: "default" },
      { name: "shape", description: "形状", type: `"circle" | "square"`, default: "circle" },
      { name: "icon", description: "图标", type: "React.ReactNode", default: "-" },
      { name: "alt", description: "图片替代文本", type: "string", default: "-" },
      { name: "AvatarGroup.max", description: "最多展示头像数", type: "number", default: "5" },
    ],
  },
  {
    name: "Tooltip",
    path: "/components/tooltip",
    title: "文字提示 Tooltip",
    description: "简单的文字提示气泡，悬停或点击触发。",
    categoryKey: "data-display",
    whenToUse: "当需要为元素补充说明文字时使用。",
    importCode: `import { Tooltip } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "悬停触发，placement 控制方向。",
        code: `import { Button, Space, Tooltip } from "nb666-ui"

export default function Demo() {
  return (
    <Space>
      <Tooltip title="这是提示文字" placement="top"><Button>上</Button></Tooltip>
      <Tooltip title="这是提示文字" placement="bottom"><Button>下</Button></Tooltip>
      <Tooltip title="这是提示文字" placement="left"><Button>左</Button></Tooltip>
      <Tooltip title="这是提示文字" placement="right"><Button>右</Button></Tooltip>
    </Space>
  )
}`,
        element: (
          <Space>
            <Tooltip title="这是提示文字" placement="top"><Button>上</Button></Tooltip>
            <Tooltip title="这是提示文字" placement="bottom"><Button>下</Button></Tooltip>
            <Tooltip title="这是提示文字" placement="left"><Button>左</Button></Tooltip>
            <Tooltip title="这是提示文字" placement="right"><Button>右</Button></Tooltip>
          </Space>
        ),
      },
      {
        id: "click",
        title: "点击触发",
        description: "trigger 为 click 时点击触发提示。",
        code: `import { Button, Tooltip } from "nb666-ui"

export default function Demo() {
  return (
    <Tooltip title="点击触发的提示" trigger="click">
      <Button>点击我</Button>
    </Tooltip>
  )
}`,
        element: (
          <Tooltip title="点击触发的提示" trigger="click">
            <Button>点击我</Button>
          </Tooltip>
        ),
      },
    ],
    api: [
      { name: "title", description: "提示内容", type: "React.ReactNode", default: "-", required: true },
      { name: "placement", description: "提示位置", type: `"top" | "bottom" | "left" | "right"`, default: "top" },
      { name: "trigger", description: "触发方式", type: `"hover" | "click"`, default: "hover" },
      { name: "children", description: "被包裹的元素", type: "React.ReactElement", default: "-", required: true },
    ],
  },
  {
    name: "Alert",
    path: "/components/alert",
    title: "警告提示 Alert",
    description: "页面展示警告信息，支持四种语义类型。",
    categoryKey: "data-display",
    whenToUse: "当需要向用户反馈明确的提示信息时使用。",
    importCode: `import { Alert } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "四种语义类型。",
        code: `import { Alert, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space direction="vertical" className="w-full items-stretch">
      <Alert type="success" message="操作成功" />
      <Alert type="info" message="这是一条普通提示" />
      <Alert type="warning" message="请注意检查配置" />
      <Alert type="error" message="操作失败，请重试" />
    </Space>
  )
}`,
        element: (
          <Space direction="vertical" className="w-full items-stretch">
            <Alert type="success" message="操作成功" />
            <Alert type="info" message="这是一条普通提示" />
            <Alert type="warning" message="请注意检查配置" />
            <Alert type="error" message="操作失败，请重试" />
          </Space>
        ),
      },
      {
        id: "desc",
        title: "带图标与描述",
        description: "showIcon 显示图标，description 展示辅助说明。",
        code: `import { Alert, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space direction="vertical" className="w-full items-stretch">
      <Alert type="success" showIcon message="部署成功" description="应用已成功发布到生产环境，可正常访问。" />
      <Alert type="error" showIcon closable message="校验失败" description="提交的表单存在错误，请检查后重新提交。" />
    </Space>
  )
}`,
        element: (
          <Space direction="vertical" className="w-full items-stretch">
            <Alert type="success" showIcon message="部署成功" description="应用已成功发布到生产环境，可正常访问。" />
            <Alert type="error" showIcon closable message="校验失败" description="提交的表单存在错误，请检查后重新提交。" />
          </Space>
        ),
      },
    ],
    api: [
      { name: "type", description: "提示类型", type: `"success" | "info" | "warning" | "error"`, default: "info" },
      { name: "message", description: "提示内容", type: "React.ReactNode", default: "-", required: true },
      { name: "description", description: "辅助说明", type: "React.ReactNode", default: "-" },
      { name: "showIcon", description: "是否显示图标", type: "boolean", default: "false" },
      { name: "closable", description: "是否可关闭", type: "boolean", default: "false" },
      { name: "banner", description: "是否作为顶部公告", type: "boolean", default: "false" },
    ],
  },
  {
    name: "Empty",
    path: "/components/empty",
    title: "空状态 Empty",
    description: "空状态时的占位提示。",
    categoryKey: "data-display",
    whenToUse: "当数据为空或加载失败时，展示空状态。",
    importCode: `import { Empty } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "自定义描述与操作区。",
        code: `import { Button, Empty } from "nb666-ui"

export default function Demo() {
  return (
    <Empty description="暂无数据">
      <Button type="primary">立即创建</Button>
    </Empty>
  )
}`,
        element: (
          <Empty description="暂无数据">
            <Button type="primary">立即创建</Button>
          </Empty>
        ),
      },
    ],
    api: [
      { name: "description", description: "描述文本", type: "React.ReactNode", default: "暂无数据" },
      { name: "image", description: "自定义图片或图标", type: "React.ReactNode", default: "-" },
      { name: "children", description: "补充操作区", type: "React.ReactNode", default: "-" },
    ],
  },
  {
    name: "Collapse",
    path: "/components/collapse",
    title: "折叠面板 Collapse",
    description: "对内容进行分组与折叠展示。",
    categoryKey: "data-display",
    whenToUse: "当内容较多、需要折叠隐藏部分信息时使用。",
    importCode: `import { Collapse } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "默认展开第一项。",
        code: `import { Collapse } from "nb666-ui"

export default function Demo() {
  return (
    <Collapse
      defaultActiveKey={["1"]}
      items={[
        { key: "1", label: "什么是 NB666 UI？", children: "NB666 UI 是一套现代的 React 组件库。" },
        { key: "2", label: "如何安装？", children: "使用 npm install nb666-ui 即可安装。" },
        { key: "3", label: "如何贡献？", children: "欢迎提交 Issue 与 Pull Request。" },
      ]}
    />
  )
}`,
        element: (
          <Collapse
            defaultActiveKey={["1"]}
            items={[
              { key: "1", label: "什么是 NB666 UI？", children: "NB666 UI 是一套现代的 React 组件库。" },
              { key: "2", label: "如何安装？", children: "使用 npm install nb666-ui 即可安装。" },
              { key: "3", label: "如何贡献？", children: "欢迎提交 Issue 与 Pull Request。" },
            ]}
          />
        ),
      },
      {
        id: "accordion",
        title: "手风琴模式",
        description: "accordion 开启手风琴，一次仅展开一项。",
        code: `import { Collapse } from "nb666-ui"

export default function Demo() {
  return (
    <Collapse
      accordion
      items={[
        { key: "1", label: "标题一", children: "内容一" },
        { key: "2", label: "标题二", children: "内容二" },
        { key: "3", label: "标题三", children: "内容三" },
      ]}
    />
  )
}`,
        element: (
          <Collapse
            accordion
            items={[
              { key: "1", label: "标题一", children: "内容一" },
              { key: "2", label: "标题二", children: "内容二" },
              { key: "3", label: "标题三", children: "内容三" },
            ]}
          />
        ),
      },
    ],
    api: [
      { name: "items", description: "面板配置", type: "CollapseItem[]", default: "-", required: true },
      { name: "accordion", description: "手风琴模式", type: "boolean", default: "false" },
      { name: "defaultActiveKey", description: "默认展开项", type: "string | string[]", default: "[]" },
      { name: "activeKey", description: "展开项（受控）", type: "string | string[]", default: "-" },
      { name: "onChange", description: "展开变化回调", type: "(keys: string[]) => void", default: "-" },
      { name: "bordered", description: "是否显示边框", type: "boolean", default: "true" },
    ],
  },
]
