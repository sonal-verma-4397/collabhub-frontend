import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/utility/Error.jsx";
import Overview from "./pages/overview/Page.jsx";
import Tasks from "./pages/mytasks/Page.jsx";
import Completed from "./pages/Completed.jsx";
import Setting from "./pages/Setting.jsx";
import { LocalStorageProvider } from "./context/LocalStorage.jsx";
import { ToasterProvider } from "./context/Toaster.jsx";
import { TaskPreviewProvider } from "./context/TaskPreview.jsx";
import Boards from "./pages/boards/Page.jsx";
import Home from "./pages/home/index.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "overview",
          element: <Overview />,
        },
        {
          path: "tasks",
          element: <Tasks />,
        },
        {
          path: "completed",
          element: <Completed />,
        },
        {
          path: "settings",
          element: <Setting />,
        },
      ],
      errorElement: <Error />,
    },
  ],
  {
    // 👇 This is crucial for hydration support with lazy routes
    hydrateFallbackElement: (
      <div className="text-center mt-10 text-gray-500">Loading...</div>
    ),
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocalStorageProvider>
      <TaskPreviewProvider>
        <ToasterProvider>
          <Suspense
            fallback={<div className="text-center mt-10">Loading app...</div>}
          >
            <RouterProvider router={router} />
          </Suspense>
        </ToasterProvider>
      </TaskPreviewProvider>
    </LocalStorageProvider>
  </StrictMode>
);
