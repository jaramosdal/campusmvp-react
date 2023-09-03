import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import Tablero, { loader as tableroLoader } from './features/tablero/Tablero'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import PantallaLogin, { action as loginAction } from './features/signup/PantallaLogin'
import { action as registroAction } from './features/signup/registro'
import MisTableros, { loader as misTablerosLoader } from './features/tablero/MisTableros'
import EdicionListas from './features/tablero/EdicionListas'
import PanelListas from './features/tablero/PanelListas'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />} >
    <Route index element={<Navigate to="/login" />} />
    <Route path='login' element={<PantallaLogin />} action={loginAction} />
    <Route path='registro' action={registroAction} />
    <Route path='tableros' element={<MisTableros />} loader={misTablerosLoader} />
    <Route path='tableros/:tableroId' element={<Tablero />} loader={tableroLoader}>
      <Route index element={<PanelListas />} loader={tableroLoader} />
      <Route path='edit' element={<EdicionListas />} loader={tableroLoader} />
    </Route>
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
