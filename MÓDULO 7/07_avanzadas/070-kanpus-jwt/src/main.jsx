import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import Tablero, { loader as tableroLoader } from "./features/tablero/Tablero";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import PantallaAcceso from "./features/sesion/PantallaAcceso";
import FormularioRegistro, {
  action as registroAction,
} from "./features/sesion/Registro";
import MisTableros from "./features/tablero/MisTableros";
import EdicionListas from "./features/tablero/EdicionListas";
import PanelListas from "./features/tablero/PanelListas";
import {
  PaginaProtegida,
  loader as sesionLoader,
} from "./features/sesion/PaginaProtegida";
import { loader as logoutLoader } from "./features/sesion/logout";
import FormularioLogin, {
  action as loginAction,
  loader as loginLoader,
} from "./features/sesion/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="cuenta" />} />
      <Route path="cuenta" element={<PantallaAcceso />}>
        <Route index element={<Navigate to="acceder" />} />
        <Route
          path="acceder"
          element={<FormularioLogin />}
          action={loginAction}
          loader={loginLoader}
        />
        <Route
          path="crear"
          element={<FormularioRegistro />}
          action={registroAction}
        />
        <Route path="salir" loader={logoutLoader} />
      </Route>
      <Route element={<PaginaProtegida />} loader={sesionLoader} id="sesion">
        <Route path="tableros" element={<MisTableros />} />
        <Route
          path="tableros/:tableroId"
          element={<Tablero />}
          loader={tableroLoader}
        >
          <Route index element={<PanelListas />} loader={tableroLoader} />
          <Route
            path="edit"
            element={<EdicionListas />}
            loader={tableroLoader}
          />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
