import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './index.css'
import { UserContextProvider } from './contexts/UserContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <App/>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
