import { redirect } from "react-router-dom"
import Sesion from './api'

export const loader = async () => {
  await Sesion.logout()
  return redirect("/")
}
