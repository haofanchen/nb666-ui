import { useState } from "react"
import { Button, Calendar, Carousel, Countdown, Descriptions, Image, InfiniteScroll, List, Popover, Skeleton, Sortable, Space, Statistic, Timeline, Tree, Watermark } from "nb666-ui"
import type { ComponentDoc } from "../data/types"

const treeData = [
  { key: "1", title: "根节点" },
  {
    key: "2",
    title: "目录",
    children: [
      { key: "2-1", title: "子节点 1" },
      {
        key: "2-2",
        title: "子节点 2",
        children: [{ key: "2-2-1", title: "叶子节点" }],
      },
    ],
  },
  { key: "3", title: "另一个根节点" },

]

function InfiniteScrollDemo() {
  const [list, setList] = useState(Array.from({ length: 10 }, (_, i) => i + 1))
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  function loadMore() {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      const next = [...list, ...Array.from({ length: 5 }, (_, i) => list.length + i + 1)]
      if (next.length >= 30) setHasMore(false)
      setList(next)
      setLoading(false)
    }, 800)
  }

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      height={240}
      className="rounded-lg border p-2"
    >
      {list.map((n) => (
        <div key={n} className="rounded px-3 py-2 text-sm hover:bg-accent/60">
          第 {n} 条数据
        </div>
      ))}
    </InfiniteScroll>
  )
}

export const dataDisplayComponents2: ComponentDoc[] = [
  {
    name: "Statistic",
    path: "/components/statistic",
    title: "统计数值 Statistic",
    description: "突出展示统计数值，支持前缀、后缀与精度。",
    categoryKey: "data-display",
    whenToUse: "当需要在仪表盘突出展示关键指标时使用。",
    importCode: `import { Statistic } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "展示标题与数值，支持前缀、后缀与精度。",
        code: `import { Space, Statistic } from "nb666-ui"

export default function Demo() {
  return (
    <Space size="large">
      <Statistic title="用户总数" value={8846} />
      <Statistic title="今日新增" value={128} prefix="+" />
      <Statistic title="转化率" value={0.8721} precision={2} suffix="%" />
    </Space>
  )
}`,
        element: (
          <Space size="large" align="center" wrap>
            <Statistic title="用户总数" value={8846} />
            <Statistic title="今日新增" value={128} prefix="+" />
            <Statistic title="转化率" value={0.8721} precision={2} suffix="%" />
          </Space>
        ),
      },
    ],
    api: [
      { name: "title", description: "标题", type: "React.ReactNode", default: "-" },
      { name: "value", description: "数值", type: "React.ReactNode", default: "-", required: true },
      { name: "precision", description: "小数精度", type: "number", default: "-" },
      { name: "prefix", description: "前缀", type: "React.ReactNode", default: "-" },
      { name: "suffix", description: "后缀", type: "React.ReactNode", default: "-" },
      { name: "valueStyle", description: "数值样式", type: "CSSProperties", default: "-" },
    ],
  },
  {
    name: "Timeline",
    path: "/components/timeline",
    title: "时间轴 Timeline",
    description: "按时间顺序展示一系列信息。",
    categoryKey: "data-display",
    whenToUse: "当需要展示按时间推进的事件流时使用。",
    importCode: `import { Timeline } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "每个 item 表示一个时间节点。",
        code: `import { Timeline } from "nb666-ui"

export default function Demo() {
  return (
    <Timeline
      items={[
        { content: "创建服务 2026-08-28 09:00", color: "#6c5ce7" },
        { content: "部署到生产环境 10:30", color: "#16a34a" },
        { content: "发布上线完成 11:00" },
      ]}
    />
  )
}`,
        element: (
          <Timeline
            items={[
              { content: "创建服务 2026-08-28 09:00", color: "#6c5ce7" },
              { content: "部署到生产环境 10:30", color: "#16a34a" },
              { content: "发布上线完成 11:00" },
            ]}
          />
        ),
      },
    ],
    api: [
      { name: "items", description: "时间轴项", type: "TimelineItem[]", default: "-", required: true },
      { name: "pending", description: "最后一个待处理项", type: "React.ReactNode", default: "-" },
      { name: "reverse", description: "是否倒序", type: "boolean", default: "false" },
      { name: "item.content", description: "节点内容", type: "React.ReactNode", default: "-" },
      { name: "item.color", description: "节点颜色", type: "string", default: "主色" },
    ],
  },
  {
    name: "Descriptions",
    path: "/components/descriptions",
    title: "描述列表 Descriptions",
    description: "成组展示只读字段信息。",
    categoryKey: "data-display",
    whenToUse: "当需要以标签-值形式展示详情信息时使用。",
    importCode: `import { Descriptions } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "通过 column 控制列数，span 控制单个字段跨度。",
        code: `import { Descriptions } from "nb666-ui"

export default function Demo() {
  return (
    <Descriptions
      title="用户信息"
      column={2}
      bordered
      items={[
        { label: "姓名", content: "张三" },
        { label: "手机号", content: "138****8888" },
        { label: "城市", content: "北京" },
        { label: "状态", content: "在职" },
      ]}
    />
  )
}`,
        element: (
          <Descriptions
            title="用户信息"
            column={2}
            bordered
            items={[
              { label: "姓名", content: "张三" },
              { label: "手机号", content: "138****8888" },
              { label: "城市", content: "北京" },
              { label: "状态", content: "在职" },
            ]}
          />
        ),
      },
    ],
    api: [
      { name: "items", description: "字段配置", type: "DescriptionsItem[]", default: "-", required: true },
      { name: "title", description: "标题", type: "React.ReactNode", default: "-" },
      { name: "column", description: "列数", type: "number", default: "3" },
      { name: "bordered", description: "是否带边框", type: "boolean", default: "false" },
      { name: "size", description: "尺寸", type: `"small" | "middle" | "default"`, default: "default" },
      { name: "item.span", description: "字段跨度", type: "number", default: "1" },
    ],
  },
  {
    name: "List",
    path: "/components/list",
    title: "列表 List",
    description: "通用列表，用于展示一组数据。",
    categoryKey: "data-display",
    whenToUse: "当需要展示一组结构相似的数据时使用。",
    importCode: `import { List } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "通过 dataSource 与 renderItem 渲染列表。",
        code: `import { List } from "nb666-ui"

export default function Demo() {
  return (
    <List
      header="最近消息"
      className="max-w-sm"
      dataSource={["项目 A 已发布", "任务 B 已完成", "用户 C 已注册"]}
      renderItem={(item) => <span>{item}</span>}
    />
  )
}`,
        element: (
          <List
            header="最近消息"
            className="max-w-sm"
            dataSource={["项目 A 已发布", "任务 B 已完成", "用户 C 已注册"]}
            renderItem={(item) => <span>{item}</span>}
          />
        ),
      },
    ],
    api: [
      { name: "dataSource", description: "数据源", type: "T[]", default: "-", required: true },
      { name: "renderItem", description: "渲染每一项", type: "(item, index) => ReactNode", default: "-", required: true },
      { name: "header", description: "列表头部", type: "React.ReactNode", default: "-" },
      { name: "footer", description: "列表底部", type: "React.ReactNode", default: "-" },
      { name: "bordered", description: "是否带边框", type: "boolean", default: "true" },
      { name: "size", description: "尺寸", type: `"small" | "default" | "large"`, default: "default" },
      { name: "loading", description: "加载状态", type: "boolean", default: "false" },
    ],
  },
  {
    name: "Popover",
    path: "/components/popover",
    title: "气泡卡片 Popover",
    description: "点击或悬停元素时弹出的卡片容器。",
    categoryKey: "data-display",
    whenToUse: "当需要展示比 Tooltip 更丰富的内容时使用。",
    importCode: `import { Popover } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "支持标题与内容，点击触发。",
        code: `import { Button, Popover, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space>
      <Popover title="标题" content="这里是气泡卡片内容。">
        <Button type="primary">点击</Button>
      </Popover>
      <Popover content="悬停展示" trigger="hover" placement="bottom">
        <Button>悬停</Button>
      </Popover>
    </Space>
  )
}`,
        element: (
          <Space>
            <Popover title="标题" content="这里是气泡卡片内容。">
              <Button type="primary">点击</Button>
            </Popover>
            <Popover content="悬停展示" trigger="hover" placement="bottom">
              <Button>悬停</Button>
            </Popover>
          </Space>
        ),
      },
    ],
    api: [
      { name: "content", description: "卡片内容", type: "React.ReactNode", default: "-", required: true },
      { name: "title", description: "卡片标题", type: "React.ReactNode", default: "-" },
      { name: "placement", description: "弹出位置", type: `"top" | "bottom" | "left" | "right"`, default: "top" },
      { name: "trigger", description: "触发方式", type: `"hover" | "click"`, default: "click" },
      { name: "children", description: "被包裹元素", type: "React.ReactElement", default: "-", required: true },
    ],
  },
  {
    name: "Carousel",
    path: "/components/carousel",
    title: "走马灯 Carousel",
    description: "旋转木马，用于展示一组轮播内容。",
    categoryKey: "data-display",
    whenToUse: "当需要轮播展示图片或内容时使用。",
    importCode: `import { Carousel } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "支持自动播放、指示点与切换箭头。",
        code: `import { Carousel } from "nb666-ui"

export default function Demo() {
  return (
    <Carousel autoplay className="max-w-md">
      <div className="flex h-40 items-center justify-center bg-primary/20 text-primary">第一页</div>
      <div className="flex h-40 items-center justify-center bg-success/20 text-success">第二页</div>
      <div className="flex h-40 items-center justify-center bg-warning/20 text-warning">第三页</div>
    </Carousel>
  )
}`,
        element: (
          <Carousel autoplay className="max-w-md">
            <div className="flex h-40 items-center justify-center bg-primary/20 text-primary">第一页</div>
            <div className="flex h-40 items-center justify-center bg-success/20 text-success">第二页</div>
            <div className="flex h-40 items-center justify-center bg-warning/20 text-warning">第三页</div>
          </Carousel>
        ),
      },
    ],
    api: [
      { name: "autoplay", description: "是否自动播放", type: "boolean", default: "false" },
      { name: "interval", description: "自动播放间隔（毫秒）", type: "number", default: "3000" },
      { name: "dots", description: "是否显示指示点", type: "boolean", default: "true" },
      { name: "arrows", description: "是否显示切换箭头", type: "boolean", default: "true" },
      { name: "children", description: "轮播页", type: "React.ReactNode[]", default: "-", required: true },
    ],
  },
  {
    name: "Image",
    path: "/components/image",
    title: "图片 Image",
    description: "可预览的图片组件，支持占位与加载失败兜底。",
    categoryKey: "data-display",
    whenToUse: "当需要展示图片并支持点击预览时使用。",
    importCode: `import { Image } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "点击图片可全屏预览。",
        code: `import { Image } from "nb666-ui"

export default function Demo() {
  return (
    <Image
      width={320}
      src="https://picsum.photos/seed/nb666/640/360"
      alt="示例图片"
    />
  )
}`,
        element: (
          <Image
            width={320}
            src="https://picsum.photos/seed/nb666/640/360"
            alt="示例图片"
          />
        ),
      },
    ],
    api: [
      { name: "src", description: "图片地址", type: "string", default: "-", required: true },
      { name: "preview", description: "是否可预览", type: "boolean", default: "true" },
      { name: "fallback", description: "加载失败兜底地址", type: "string", default: "-" },
      { name: "placeholder", description: "加载占位内容", type: "React.ReactNode", default: "-" },
      { name: "alt", description: "替代文本", type: "string", default: "-" },
    ],
  },
  {
    name: "Skeleton",
    path: "/components/skeleton",
    title: "骨架屏 Skeleton",
    description: "在数据加载前展示占位骨架。",
    categoryKey: "data-display",
    whenToUse: "当内容加载需要等待时，用骨架屏代替空白。",
    importCode: `import { Skeleton } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "支持头像、标题与段落占位。",
        code: `import { Skeleton } from "nb666-ui"

export default function Demo() {
  return (
    <div className="w-full max-w-sm">
      <Skeleton active avatar title={{ width: "50%" }} paragraph={{ rows: 3 }} />
    </div>
  )
}`,
        element: (
          <div className="w-full max-w-sm">
            <Skeleton active avatar title={{ width: "50%" }} paragraph={{ rows: 3 }} />
          </div>
        ),
      },
    ],
    api: [
      { name: "loading", description: "是否加载中", type: "boolean", default: "true" },
      { name: "active", description: "是否显示动画", type: "boolean", default: "true" },
      { name: "avatar", description: "是否显示头像", type: "boolean", default: "false" },
      { name: "title", description: "标题占位", type: "boolean | { width }", default: "true" },
      { name: "paragraph", description: "段落占位", type: "boolean | { rows, width }", default: "true" },
      { name: "children", description: "加载完成后渲染的内容", type: "React.ReactNode", default: "-" },
    ],
  },

  {
    name: "Tree",
    path: "/components/tree",
    title: "树形控件 Tree",
    description: "层级结构数据的展示与操作，支持展开、选中、勾选与连接线。",
    categoryKey: "data-display",
    whenToUse: "当需要展示具有层级关系的数据（如目录、组织架构）时使用。",
    importCode: `import { Tree } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "点击箭头展开/折叠，点击标题选中节点。",
        code: `import { Tree } from "nb666-ui"

export default function Demo() {
  return (
    <Tree
      defaultExpandAll
      treeData={[
        { key: "1", title: "根节点" },
        {
          key: "2",
          title: "目录",
          children: [
            { key: "2-1", title: "子节点 1" },
            { key: "2-2", title: "子节点 2", children: [{ key: "2-2-1", title: "叶子节点" }] },
          ],
        },
      ]}
    />
  )
}`,
        element: (
          <Tree
            defaultExpandAll
            treeData={[
              { key: "1", title: "根节点" },
              {
                key: "2",
                title: "目录",
                children: [
                  { key: "2-1", title: "子节点 1" },
                  { key: "2-2", title: "子节点 2", children: [{ key: "2-2-1", title: "叶子节点" }] },
                ],
              },
            ]}
          />
        ),
      },
      {
        id: "checkable",
        title: "可勾选",
        description: "checkable 开启勾选，父子节点联动并显示半选状态。",
        code: `import { Tree } from "nb666-ui"

export default function Demo() {
  return (
    <Tree
      checkable
      defaultExpandAll
      defaultCheckedKeys={["1", "2-1"]}
      treeData={[
        { key: "1", title: "根节点" },
        {
          key: "2",
          title: "目录",
          children: [
            { key: "2-1", title: "子节点 1" },
            { key: "2-2", title: "子节点 2", children: [{ key: "2-2-1", title: "叶子节点" }] },
          ],
        },
      ]}
    />
  )
}`,
        element: (
          <Tree
            checkable
            defaultExpandAll
            defaultCheckedKeys={["1", "2-1"]}
            treeData={treeData}
          />
        ),
      },
      {
        id: "multiple",
        title: "多选",
        description: "multiple 开启多选，点击节点可追加或取消选中。",
        code: `import { Tree } from "nb666-ui"

export default function Demo() {
  return (
    <Tree
      multiple
      defaultExpandAll
      defaultSelectedKeys={["1", "2-1"]}
      treeData={[
        { key: "1", title: "根节点" },
        {
          key: "2",
          title: "目录",
          children: [
            { key: "2-1", title: "子节点 1" },
            { key: "2-2", title: "子节点 2" },
          ],
        },
      ]}
    />
  )
}`,
        element: (
          <Tree
            multiple
            defaultExpandAll
            defaultSelectedKeys={["1", "2-1"]}
            treeData={treeData}
          />
        ),
      },
      {
        id: "line",
        title: "连接线",
        description: "showLine 显示层级之间的连接线。",
        code: `import { Tree } from "nb666-ui"

export default function Demo() {
  return <Tree showLine defaultExpandAll treeData={treeData} />
}`,
        element: <Tree showLine defaultExpandAll treeData={treeData} />,
      },
    ],
    api: [
      { name: "treeData", description: "树形数据", type: "TreeDataNode[]", default: "-", required: true },
      { name: "checkable", description: "是否可勾选", type: "boolean", default: "false" },
      { name: "checkedKeys", description: "勾选节点（受控）", type: "string[]", default: "-" },
      { name: "defaultCheckedKeys", description: "默认勾选节点", type: "string[]", default: "[]" },
      { name: "onCheck", description: "勾选回调", type: "(keys, info) => void", default: "-" },
      { name: "expandedKeys", description: "展开节点（受控）", type: "string[]", default: "-" },
      { name: "defaultExpandedKeys", description: "默认展开节点", type: "string[]", default: "[]" },
      { name: "defaultExpandAll", description: "默认展开全部", type: "boolean", default: "false" },
      { name: "onExpand", description: "展开回调", type: "(keys, info) => void", default: "-" },
      { name: "selectedKeys", description: "选中节点（受控）", type: "string[]", default: "-" },
      { name: "multiple", description: "是否多选", type: "boolean", default: "false" },
      { name: "onSelect", description: "选中回调", type: "(keys, info) => void", default: "-" },
      { name: "showLine", description: "是否显示连接线", type: "boolean", default: "false" },
    ],
  },
  {
    name: "Calendar",
    path: "/components/calendar",
    title: "日历 Calendar",
    description: "以日历形式展示日期，可选中日期并自定义单元格内容。",
    categoryKey: "data-display",
    whenToUse: "当需要以月视图呈现日期、并展示每天的相关信息时使用。",
    importCode: `import { Calendar } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "点击日期触发 onChange，今天与选中日期会高亮。",
        code: `import { Calendar } from "nb666-ui"

export default function Demo() {
  return <Calendar defaultValue={new Date()} onChange={(date) => console.log(date)} />
}`,
        element: <Calendar defaultValue={new Date()} onChange={(date) => console.log(date)} />,
      },
      {
        id: "cell",
        title: "自定义单元格",
        description: "dateCellRender 可以渲染每天的自定义内容。",
        code: `import { Calendar } from "nb666-ui"

export default function Demo() {
  const events = {
    "2026-08-28": ["评审"],
    "2026-08-30": ["发布"],
  }
  return (
    <Calendar
      defaultValue={new Date(2026, 7, 28)}
      dateCellRender={(date) => {
        const key = \`\${date.getFullYear()}-\${String(date.getMonth() + 1).padStart(2, "0")}-\${String(date.getDate()).padStart(2, "0")}\`
        const list = events[key] ?? []
        return (
          <div>
            <span>{date.getDate()}</span>
            {list.map((e) => (
              <span key={e} className="mt-0.5 block truncate rounded bg-primary/10 px-1 text-xs text-primary">{e}</span>
            ))}
          </div>
        )
      }}
    />
  )
}`,
        element: (
          <Calendar
            defaultValue={new Date(2026, 7, 28)}
            dateCellRender={(date) => {
              const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
              const list = (["2026-08-28", "2026-08-30"].includes(key) ? ["评审", "发布"] : [])
              return (
                <div>
                  <span>{date.getDate()}</span>
                  {list.map((e) => (
                    <span key={e} className="mt-0.5 block truncate rounded bg-primary/10 px-1 text-xs text-primary">{e}</span>
                  ))}
                </div>
              )
            }}
          />
        ),
      },
      {
        id: "fullscreen",
        title: "全屏日历",
        description: "fullscreen 开启大尺寸月视图，适合嵌入页面作为日程面板。",
        code: `import { Calendar } from "nb666-ui"

export default function Demo() {
  return <Calendar fullscreen defaultValue={new Date()} />
}`,
        element: <Calendar fullscreen defaultValue={new Date()} />,
      },
    ],
    api: [
      { name: "value", description: "选中日期（受控）", type: "Date | string", default: "-" },
      { name: "defaultValue", description: "默认选中日期", type: "Date | string", default: "今天" },
      { name: "onChange", description: "日期变化回调", type: "(date: Date) => void", default: "-" },
      { name: "onPanelChange", description: "面板月份变化回调", type: "(date: Date) => void", default: "-" },
      { name: "dateCellRender", description: "自定义日期单元格内容", type: "(date: Date) => ReactNode", default: "-" },
      { name: "dateFullCellRender", description: "完全自定义日期单元格", type: "(date: Date) => ReactNode", default: "-" },
      { name: "fullscreen", description: "是否全屏显示", type: "boolean", default: "false" },
      { name: "disabledDate", description: "不可选日期", type: "(date: Date) => boolean", default: "-" },
    ],
  },

  {
    name: "Watermark",
    path: "/components/watermark",
    title: "水印 Watermark",
    description: "在内容区域叠加文字或图片水印，防止信息被随意截图传播。",
    categoryKey: "data-display",
    whenToUse: "当需要为敏感页面或文档增加版权标识时使用。",
    importCode: `import { Watermark } from "nb666-ui"`,
    demos: [
      {
        id: "text",
        title: "文字水印",
        description: "content 支持字符串或数组，数组会分行渲染。",
        code: `import { Watermark } from "nb666-ui"

export default function Demo() {
  return (
    <Watermark
      className="rounded-lg border"
      content={["NB666 UI", "内部资料"]}
      gap={[80, 60]}
    >
      <div className="flex h-40 items-center justify-center px-6">
        <div>
          <div className="font-semibold">受保护内容区域</div>
          <p className="mt-1 text-sm text-muted-foreground">水印覆盖在内容之上，不可交互。</p>
        </div>
      </div>
    </Watermark>
  )
}`,
        element: (
          <Watermark
            className="rounded-lg border"
            content={["NB666 UI", "内部资料"]}
            gap={[80, 60]}
          >
            <div className="flex h-40 items-center justify-center px-6">
              <div>
                <div className="font-semibold">受保护内容区域</div>
                <p className="mt-1 text-sm text-muted-foreground">水印覆盖在内容之上，不可交互。</p>
              </div>
            </div>
          </Watermark>
        ),
      },
    ],
    api: [
      { name: "content", description: "水印文字", type: "string | string[]", default: "NB666 UI" },
      { name: "image", description: "水印图片地址", type: "string", default: "-" },
      { name: "width", description: "水印画布宽度", type: "number", default: "180" },
      { name: "height", description: "水印画布高度", type: "number", default: "140" },
      { name: "rotate", description: "旋转角度", type: "number", default: "-22" },
      { name: "fontSize", description: "字号", type: "number", default: "16" },
      { name: "fontColor", description: "字体颜色", type: "string", default: "rgba(31,34,51,0.08)" },
      { name: "gap", description: "水印间距", type: "[number, number]", default: "[100, 100]" },
      { name: "zIndex", description: "水印层级", type: "number", default: "9" },
    ],
  },

  {
    name: "Sortable",
    path: "/components/sortable",
    title: "拖拽排序 Sortable",
    description: "通过拖拽调整列表顺序，支持鼠标与触屏操作。",
    categoryKey: "data-display",
    whenToUse: "当需要让用户手动调整列表顺序（如排序、优先级）时使用。",
    importCode: `import { Sortable } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "拖拽整行即可调整顺序，onChange 返回调整后的数组。",
        code: `import { Sortable } from "nb666-ui"

export default function Demo() {
  return (
    <Sortable
      className="gap-2"
      dataSource={["苹果", "香蕉", "橙子", "葡萄", "西瓜"]}
      renderItem={(item) => <div className="px-3 py-2 text-sm">{item}</div>}
      onChange={(items, info) => console.log(items, info)}
    />
  )
}`,
        element: (
          <Sortable
            className="gap-2"
            dataSource={["苹果", "香蕉", "橙子", "葡萄", "西瓜"]}
            renderItem={(item) => <div className="px-3 py-2 text-sm">{item}</div>}
            onChange={(items, info) => console.log(items, info)}
          />
        ),
      },
      {
        id: "object",
        title: "复杂条目",
        description: "dataSource 支持对象，通过 rowKey 指定唯一键。",
        code: `import { Sortable } from "nb666-ui"

const data = [
  { id: 1, name: "首页", desc: "展示概览信息" },
  { id: 2, name: "订单", desc: "管理订单列表" },
  { id: 3, name: "用户", desc: "管理用户数据" },
]

export default function Demo() {
  return (
    <Sortable
      className="gap-2"
      dataSource={data}
      rowKey={(item) => item.id}
      renderItem={(item) => (
        <div className="px-3 py-2">
          <div className="text-sm font-medium">{item.name}</div>
          <div className="text-xs text-muted-foreground">{item.desc}</div>
        </div>
      )}
      onChange={(items) => console.log(items)}
    />
  )
}`,
        element: (
          <Sortable
            className="gap-2"
            dataSource={[
              { id: 1, name: "首页", desc: "展示概览信息" },
              { id: 2, name: "订单", desc: "管理订单列表" },
              { id: 3, name: "用户", desc: "管理用户数据" },
            ]}
            rowKey={(item) => item.id}
            renderItem={(item) => (
              <div className="px-3 py-2">
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            )}
            onChange={(items) => console.log(items)}
          />
        ),
      },
      {
        id: "scroll",
        title: "滚动容器内拖拽",
        description: "放在高度有限的滚动容器中，拖到上下边缘会自动滚动。",
        code: `import { Sortable } from "nb666-ui"

const data = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, name: \`任务 \${i + 1}\` }))

export default function Demo() {
  return (
    <div className="h-56 overflow-y-auto rounded-lg border p-2 scrollbar-thin">
      <Sortable
        className="gap-2"
        dataSource={data}
        rowKey={(item) => item.id}
        renderItem={(item) => <div className="px-3 py-2 text-sm">{item.name}</div>}
      />
    </div>
  )
}`,
        element: (
          <div className="h-56 overflow-y-auto rounded-lg border p-2 scrollbar-thin">
            <Sortable
              className="gap-2"
              dataSource={Array.from({ length: 12 }, (_, i) => ({ id: i + 1, name: `任务 ${i + 1}` }))}
              rowKey={(item) => item.id}
              renderItem={(item) => <div className="px-3 py-2 text-sm">{item.name}</div>}
            />
          </div>
        ),
      },
    ],
    api: [
      { name: "dataSource", description: "排序数据源", type: "T[]", default: "-", required: true },
      { name: "renderItem", description: "条目渲染函数", type: "(item, index) => ReactNode", default: "-", required: true },
      { name: "rowKey", description: "条目唯一键", type: "(item, index) => string | number", default: "index" },
      { name: "onChange", description: "排序完成回调", type: "(items, { from, to }) => void", default: "-" },
      { name: "disabled", description: "是否禁用拖拽", type: "boolean", default: "false" },
      { name: "showHandle", description: "是否显示拖拽手柄", type: "boolean", default: "true" },
    ],
  },

  {
    name: "Countdown",
    path: "/components/countdown",
    title: "倒计时 Countdown",
    description: "以天/时/分/秒展示到目标时间的剩余时长，支持自定义格式与结束回调。",
    categoryKey: "data-display",
    whenToUse: "当需要展示活动剩余时间、抢购倒计时等场景时使用。",
    importCode: `import { Countdown } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "value 传入目标时间戳或 Date，每秒自动更新。",
        code: `import { Countdown } from "nb666-ui"

export default function Demo() {
  const target = Date.now() + 1000 * 60 * 60 * 5
  return <Countdown title="距活动结束" value={target} onFinish={() => console.log("结束")} />
}`,
        element: <Countdown title="距活动结束" value={Date.now() + 1000 * 60 * 60 * 5} onFinish={() => console.log("结束")} />,
      },
      {
        id: "format",
        title: "自定义格式",
        description: "format 支持 DD / HH / mm / ss 占位符，也可用 render 完全自定义。",
        code: `import { Countdown } from "nb666-ui"

export default function Demo() {
  const target = Date.now() + 1000 * 60 * 60 * 26
  return (
    <Countdown
      title="自定义格式"
      value={target}
      format="DD 天 HH 时 mm 分 ss 秒"
    />
  )
}`,
        element: (
          <Countdown
            title="自定义格式"
            value={Date.now() + 1000 * 60 * 60 * 26}
            format="DD 天 HH 时 mm 分 ss 秒"
          />
        ),
      },
    ],
    api: [
      { name: "value", description: "目标时间（受控）", type: "number | string | Date", default: "-" },
      { name: "defaultValue", description: "默认目标时间", type: "number | string | Date", default: "-" },
      { name: "title", description: "标题", type: "React.ReactNode", default: "-" },
      { name: "format", description: "展示格式", type: "string", default: "HH:mm:ss" },
      { name: "prefix", description: "前缀", type: "React.ReactNode", default: "-" },
      { name: "suffix", description: "后缀", type: "React.ReactNode", default: "-" },
      { name: "onFinish", description: "倒计时结束回调", type: "() => void", default: "-" },
      { name: "onChange", description: "剩余时长变化回调", type: "(remaining: number) => void", default: "-" },
      { name: "render", description: "自定义渲染", type: "(remaining: number) => ReactNode", default: "-" },
    ],
  },

  {
    name: "InfiniteScroll",
    path: "/components/infinite-scroll",
    title: "无限滚动 InfiniteScroll",
    description: "滚动到底部时自动加载更多数据，支持加载中与结束提示。",
    categoryKey: "data-display",
    whenToUse: "当列表数据量较大、需要滚动分页加载时使用。",
    importCode: `import { InfiniteScroll } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "滚动到接近底部时触发 onLoadMore，加载结束后显示 endMessage。",
        code: `import { useState } from "react"
import { InfiniteScroll } from "nb666-ui"

export default function Demo() {
  const [list, setList] = useState(Array.from({ length: 10 }, (_, i) => i + 1))
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  function loadMore() {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setList((prev) => {
        const next = [...prev, ...Array.from({ length: 5 }, (_, i) => prev.length + i + 1)]
        if (next.length >= 30) setHasMore(false)
        return next
      })
      setLoading(false)
    }, 800)
  }

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      height={240}
      endMessage="没有更多数据了"
      className="rounded-lg border p-2"
    >
      {list.map((n) => (
        <div key={n} className="rounded px-3 py-2 text-sm hover:bg-accent/60">
          第 {n} 条数据
        </div>
      ))}
    </InfiniteScroll>
  )
}`,
        element: <InfiniteScrollDemo />,
      },
    ],
    api: [
      { name: "hasMore", description: "是否还有更多数据", type: "boolean", default: "false" },
      { name: "loading", description: "是否加载中", type: "boolean", default: "false" },
      { name: "onLoadMore", description: "加载更多回调", type: "() => void", default: "-" },
      { name: "height", description: "滚动容器高度", type: "number | string", default: "320" },
      { name: "threshold", description: "触发加载的底部阈值", type: "number", default: "40" },
      { name: "loader", description: "自定义加载指示", type: "React.ReactNode", default: "加载图标" },
      { name: "endMessage", description: "结束提示", type: "React.ReactNode", default: "-" },
    ],
  },

]