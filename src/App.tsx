import { HashRouter, Route, Routes } from "react-router-dom"
import { DocsLayout } from "@/docs/layout/DocsLayout"
import { HomePage } from "@/docs/pages/HomePage"
import { GettingStartedPage } from "@/docs/pages/GettingStartedPage"
import { AddComponentPage } from "@/docs/pages/AddComponentPage"
import { ComponentPage } from "@/docs/pages/ComponentPage"

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<DocsLayout />}>
          <Route path="/docs" element={<GettingStartedPage />} />
          <Route path="/docs/add-component" element={<AddComponentPage />} />
          <Route path="/components/:name" element={<ComponentPage />} />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </HashRouter>
  )
}
