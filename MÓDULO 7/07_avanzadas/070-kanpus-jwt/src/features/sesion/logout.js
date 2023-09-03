import { redirect } from "react-router-dom"
import Sesion from './api'
import { store } from "../../app/store"
import { sessionCerrada } from "./authSlice"

export const loader = async () => {
  await Sesion.logout()
  store.dispatch(sessionCerrada())
  return redirect("/")
}
