import { redirect } from "react-router-dom"
import { login } from '../utils/session'

export const action = async ({ params }) => {
  await login()
  return redirect("/tableros")
}