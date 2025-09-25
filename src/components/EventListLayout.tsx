'use client'

import { ReactNode } from 'react'
import Layout from './Layout'

interface EventListLayoutProps {
  children: ReactNode
}

export function EventListLayout({ children }: EventListLayoutProps) {
  return (
    <Layout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </Layout>
  )
}
