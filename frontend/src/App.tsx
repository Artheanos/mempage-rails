import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css'
import { AddPostPage } from "./pages/posts/AddPostPage/AddPostPage";
import { BarLayout } from "./layouts/BarLayout";
import { LoginPage } from "./pages/auth/LoginPage/LoginPage";
import { PostsPage } from "./pages/posts/PostsPage/PostsPage";
import { localRoutes } from "./api/routesBuilder";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { LogoutPage } from "./pages/auth/LogoutPage";

const router = createBrowserRouter([
  {
    path: localRoutes.root,
    element: <BarLayout/>,
    children: [
      {
        path: localRoutes.imagePosts.root,
        element: <PostsPage/>
      },
      {
        path: localRoutes.login,
        element: <LoginPage/>
      },
      {
        path: localRoutes.logout,
        element: <LogoutPage/>
      },
      {
        path: localRoutes.imagePosts.add,
        element: <AddPostPage/>
      }
    ]
  }
]);

export const App = () => (
  <ThemeProvider
    theme={useContext(UserContext).theme}>
    <CssBaseline/>
    <RouterProvider router={router}/>
  </ThemeProvider>
)
