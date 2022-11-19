import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useContext } from 'react'

import { AddPostPage } from './pages/posts/AddPostPage'
import { BarLayout } from './layouts/BarLayout'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LoginPage } from './pages/auth/LoginPage'
import { LogoutPage } from './pages/auth/LogoutPage'
import { PostsPage } from './pages/posts/PostsPage'
import { ProfilePage } from './pages/users/ProfilePage'
import { UserContext } from './contexts/UserContext'
import { localRoutes } from './api/routesBuilder'

import './App.css'
import { RegisterPage } from "./pages/auth/RegisterPage/RegisterPage";
import { PostPage } from "./pages/posts/PostPage/PostPage";
import { UserPage } from "./pages/users/UserPage/UserPage";


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
        element: <PostPage/>
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
        element: <UserPage/>
      }
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
