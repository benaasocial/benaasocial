"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

/**
 * Provides React Query client to the app
 */
export default function QueryProvider({ children }: { children: React.ReactNode }) {

  /**
   * Create a new QueryClient instance
   */
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}