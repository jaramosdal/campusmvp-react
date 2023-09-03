import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import Root from './routes/root'
import ErrorPage from './error-page'
import Index, { loader as indexLoader } from './routes'
import Photo, { loader as photoLoader } from './routes/photo'
import Vote, { action as voteAction } from './routes/vote'
import Voted from './routes/voted'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
    <Route errorElement={<ErrorPage />}>
      <Route index element={<Index />} loader={indexLoader} />
      <Route path="photos/:imageId" element={<Photo />} loader={photoLoader}>
        <Route index element={<Vote />} action={voteAction} />
        <Route path="voted" element={<Voted />} />
      </Route>
    </Route>
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
