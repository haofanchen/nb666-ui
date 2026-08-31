import { generalComponents } from "./general"
import { generalComponents2 } from "./general2"
import { layoutComponents } from "./layout"
import { layoutComponents2 } from "./layout2"
import { navigationComponents } from "./navigation"
import { navigationComponents2 } from "./navigation2"
import { dataEntryComponents } from "./data-entry"
import { dataEntryComponents2 } from "./data-entry2"
import { dataDisplayComponents } from "./data-display"
import { dataDisplayComponents2 } from "./data-display2"
import { feedbackComponents } from "./feedback"
import { feedbackComponents2 } from "./feedback2"
import type { ComponentDoc } from "../data/types"

export const allComponents: ComponentDoc[] = [
  ...generalComponents,
  ...generalComponents2,
  ...layoutComponents,
  ...layoutComponents2,
  ...navigationComponents,
  ...navigationComponents2,
  ...dataEntryComponents,
  ...dataEntryComponents2,
  ...dataDisplayComponents,
  ...dataDisplayComponents2,
  ...feedbackComponents,
  ...feedbackComponents2,
]

export function getComponent(path: string): ComponentDoc | undefined {
  return allComponents.find((c) => c.path === path)
}

export function getComponentsByCategory(categoryKey: string): ComponentDoc[] {
  return allComponents.filter((c) => c.categoryKey === categoryKey)
}
