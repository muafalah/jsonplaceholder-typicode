import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./pages/Root";
import DashboardPage from "./pages/Dashboard/Dashboard";
import ErrorPage from "./pages/Error";
import PostsPage from "./pages/Posts/Posts";
import DetailPostPage from "./pages/Posts/DetailPost";
import AlbumsPage from "./pages/Albums/Albums";
import DetailAlbumPage from "./pages/Albums/DetailAlbum";
import UsersPage from "./pages/Users/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "posts",
        children: [
          {
            index: true,
            element: <PostsPage />,
          },
          {
            path: ":postId",
            element: <DetailPostPage />,
          },
        ],
      },
      {
        path: "albums",
        children: [
          {
            index: true,
            element: <AlbumsPage />,
          },
          {
            path: ":albumId",
            element: <DetailAlbumPage />,
          },
        ],
      },
      {
        path: "users",
        element: <UsersPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
