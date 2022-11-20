import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useContext } from 'react'

import { AddPostPage } from './pages/posts/AddPostPage'
import { BarLayout } from './layouts/BarLayout'
import { localRoutes } from './api/routesBuilder'
import { LoginPage } from './pages/auth/LoginPage'
import { LogoutPage } from './pages/auth/LogoutPage'
import { PostPage } from './pages/posts/PostPage/PostPage'
import { PostsPage } from './pages/posts/PostsPage'
import { ProfilePage } from './pages/users/ProfilePage'
import { RegisterPage } from './pages/auth/RegisterPage/RegisterPage'
import { UserContext } from './contexts/UserContext'
import { UserPage } from './pages/users/UserPage/UserPage'

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
        path: localRoutes.imagePosts.show(),
        element: <PostPage/>,
      },
      {
        path: localRoutes.login,
        element: <LoginPage/>,
      },
      {
        path: localRoutes.register,
        element: <RegisterPage/>,
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
      {
        path: localRoutes.users.show(),
        element: <UserPage/>,
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
