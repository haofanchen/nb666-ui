import { FloatButton, Icon } from "nb666-ui"
import type { ComponentDoc } from "../data/types"

export const generalComponents2: ComponentDoc[] = [
  {
    name: "FloatButton",
    path: "/components/float-button",
    title: "悬浮按钮 FloatButton",
    description: "悬浮于页面右下角的操作按钮，用于提供快捷操作入口。",
    categoryKey: "general",
    whenToUse: "当需要提供全局快捷操作（如回到顶部、发起会话）时使用。",
    importCode: `import { FloatButton } from "nb666-ui"`,
    demos: [
      {
        id: "basic",
        title: "基础用法",
        description: "默认为 fixed 定位在页面右下角；示例中改为 static 以便在文档内展示。",
        code: `import { FloatButton, Icon, Space } from "nb666-ui"

export default function Demo() {
  return (
    <Space>
      <FloatButton className="!static" icon={<Icon name="plus" size={20} />} />
      <FloatButton className="!static" type="primary" icon={<Icon name="edit" size={20} />} />
      <FloatButton className="!static" shape="square">帮助</FloatButton>
    </Space>
  )
}`,
        element: (
          <div className="flex items-center gap-3">
            <FloatButton className="!static" icon={<Icon name="plus" size={20} />} />
            <FloatButton className="!static" type="primary" icon={<Icon name="edit" size={20} />} />
            <FloatButton className="!static" shape="square">帮助</FloatButton>
          </div>
        ),
      },
    ],
    api: [
      { name: "icon", description: "按钮图标", type: "React.ReactNode", default: "-" },
      { name: "type", description: "按钮类型", type: `"default" | "primary"`, default: "default" },
      { name: "shape", description: "形状", type: `"circle" | "square"`, default: "circle" },
      { name: "onClick", description: "点击回调", type: "() => void", default: "-" },
    ],
  },
]
