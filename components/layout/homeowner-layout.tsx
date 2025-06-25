"use client"

import type { ReactNode } from "react"
import { HomeownerSidebar } from "./homeowner-sidebar"

interface HomeownerLayoutProps {
  children: ReactNode
}

export function HomeownerLayout({ children }: HomeownerLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HomeownerSidebar />
      <div className="lg:pl-64">
        <main className="py-6 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
