import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocalStorageProvider } from "./context/LocalStorage.jsx";
import { TaskPreviewProvider } from "./context/TaskPreview.jsx";
import { ToasterProvider } from "./context/Toaster.jsx";

import About from "./pages/about/index.jsx";
import Analytics from "./pages/analytics/index.jsx";
import App from "./App.jsx";
import Boards from "./pages/boards/Page.jsx";
import Error from "./components/utility/Error.jsx";
import Home from "./pages/home/index.jsx";
import Overview from "./pages/overview/index.jsx";
import PublicLayout from "./PublicLayout.jsx";
import Setting from "./pages/Setting.jsx";
import Tasks from "./pages/mytasks/Page.jsx";
import User from "./pages/user/index.jsx";
import Conversation from "./pages/conversation/index.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
      ],
      errorElement: <Error />,
    },
    {
      path: "/user/:userId",
      element: <User />,
      errorElement: <Error />,
    },
    {
      path: "/workspaces/:workspaceId",
      element: <App />,
      children: [
        {
          index: true,
          element: <Overview />,
        },
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "modules/:moduleId/tasks",
          element: <Tasks />,
        },
        {
          path: "chats",
          element: <Conversation />,
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
