import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useContext } from 'react'

import { AddPostPage } from './pages/posts/AddPostPage'
import { BarLayout } from './layouts/BarLayout'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LoginPage } from './pages/auth/LoginPage'
import { LogoutPage } from './pages/auth/LogoutPage'
import { PostsPage } from './pages/posts/PostsPage'
import { ProfilePage } from './pages/auth/ProfilePage'
import { UserContext } from './contexts/UserContext'
import { localRoutes } from './api/routesBuilder'

import './App.css'


const router = createBrowserRouter([
  {
    path: localRoutes.root,
    element: <BarLayout/>,
    children: [
      {
        path: localRoutes.imagePosts.root,
        element: <PostsPage/>,
      },
      {
        path: localRoutes.login,
        element: <LoginPage/>,
      },
      {
        path: localRoutes.logout,
        element: <LogoutPage/>,
      },
      {
        path: localRoutes.imagePosts.add,
        element: <AddPostPage/>,
      },
      {
        path: localRoutes.profile,
        element: <ProfilePage/>,
      },
    ],
  },
])

export const App = () => (
  <ThemeProvider
    theme={useContext(UserContext).theme}>
    <CssBaseline/>
    <RouterProvider router={router}/>
  </ThemeProvider>
)
