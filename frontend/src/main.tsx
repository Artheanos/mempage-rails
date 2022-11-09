import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material";

const queryClient = new QueryClient()
const theme = createTheme({
  palette: {
    mode: 'dark',
    // background: {
    //   default: '#242424',
    //   paper: '#242424'
    // },
    // primary: {
    //   main: '#1a1a1a'
    // },
    // secondary: {
    //   main: '#eee'
    // },
    // text: {
    //   primary: '#eee',
    //   secondary: '#aaa'
    // }
  },
  typography: {
    fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
    button: {
      textTransform: 'none'
    }
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App/>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
)
