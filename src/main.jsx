import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ToasterProvider from "./provider/ToasterProvider.jsx";
import TaskProvider from "./provider/TaskProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/utility/Error.jsx";
import Overview from "./pages/Overview.jsx";
import MyTasks from "./pages/MyTasks.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "tasks",
        element: <MyTasks />,
      },
    ],
    errorElement: <Error />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaskProvider>
      <ToasterProvider>
        <RouterProvider router={router} />
      </ToasterProvider>
    </TaskProvider>
  </StrictMode>
);
