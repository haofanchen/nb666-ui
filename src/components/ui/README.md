# Aurora UI 组件开发指引

新增一个组件只需 4 步：

1. 在 `src/components/ui/` 新建 `<name>.tsx`，导出组件与 `Props` 接口。
2. 在 `src/components/ui/index.ts` 的对应分类下补充 value / type 导出。
3. 在 `src/docs/registry/` 对应分类文件中追加 `ComponentDoc`，配置 `demos` 与 `api`。
4. 运行 `npx tsc -b && npm run build` 验证。

## 推荐写法

- 受控/非受控统一用 `useControllableState`。
- 弹层定位复用 `overlayPlacement`，下拉面板外观复用 `popupPanelClass`。
- 表单尺寸与校验态复用 `controlHeight` / `fieldStatusClass`。
- 需要点击外部关闭时使用 `useClickOutside`。
- Tailwind 类名不要动态拼接，使用显式映射或 `cn` + 完整类名。

## 目录约定

- 组件实现：`src/components/ui/`
- 全局样式与设计 token：`src/index.css`、`src/lib/styles.ts`
- 通用 hooks：`src/hooks/`
- 组件文档注册表：`src/docs/registry/`
