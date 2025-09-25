'use client'

import { ReactNode } from 'react'
import Layout from './Layout'

interface SlotInformationLayoutProps {
  header: string
  description: ReactNode
  image: ReactNode
  actions: ReactNode
  children?: ReactNode
}

export function SlotInformationLayout({ 
  header, 
  description, 
  image, 
  actions, 
  children 
}: SlotInformationLayoutProps) {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            {image}
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            {header}
          </h1>
          
          <div className="mb-8">
            {description}
          </div>
          
          <div className="mb-8">
            {actions}
          </div>
          
          {children}
        </div>
      </div>
    </Layout>
  )
}
