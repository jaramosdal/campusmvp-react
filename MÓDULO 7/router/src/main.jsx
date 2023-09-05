import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import Root from "./routes/Root";
import Index, { loader as indexLoader } from "./routes/Index";

import Photo, { loader as photoLoader } from "./routes/Photo";
import Vote, { action as voteAction } from "./routes/Vote";
import Voted from "./routes/Voted";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} loader={indexLoader} />
        <Route path="photos/:imageId" element={<Photo />} loader={photoLoader}>
          <Route index element={<Vote />} action={voteAction} />
          <Route path="voted" element={<Voted />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
