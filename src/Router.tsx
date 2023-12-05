import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import BaseLayout from "./layouts/BaseLayout";

import Home from "./pages/home";
import NewCV from "./pages/new";
import View from "./pages/view";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.Suspense fallback={"Loading..."}>
        <Home />
      </React.Suspense>
    ),
  },
  {
    path: "/new",
    element: (
      <React.Suspense fallback={"Loading..."}>
        <BaseLayout>
          <NewCV />
        </BaseLayout>
      </React.Suspense>
    ),
  },
  {
    path: "/view",
    element: (
      <React.Suspense fallback={"Loading..."}>
        <View />
      </React.Suspense>
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
