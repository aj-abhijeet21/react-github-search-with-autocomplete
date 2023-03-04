import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import RepoDetails from "./RepoDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/repoDetails",
    element: <RepoDetails />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
