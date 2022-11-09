import './App.css'
import { PostsPage } from "./pages/posts/PostsPage/PostsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage/LoginPage";
import { UserContextProvider } from "./contexts/UserContext";
import { BarLayout } from "./layouts/BarLayout";
import { localRoutes } from "./api/routesBuilder";
import { AddPostPage } from "./pages/posts/AddPostPage/AddPostPage";

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
        path: localRoutes.imagePosts.add,
        element: <AddPostPage/>
      }
    ]
  }
]);

export const App = () => (
  <UserContextProvider>
    <RouterProvider router={router}/>
  </UserContextProvider>
);
