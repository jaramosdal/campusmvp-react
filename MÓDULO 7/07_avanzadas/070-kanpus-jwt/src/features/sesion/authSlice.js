import { createSlice } from "@reduxjs/toolkit"

const noAuthState = {
  sesionIniciada: false,
  cuentaUsuario: null,
  token: null,
}
const initialState = localStorage.getItem('sesion')
  ? JSON.parse(localStorage.getItem('sesion'))
  : noAuthState

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sesionIniciada: (state, { payload }) => {
      state.sesionIniciada = true
      state.cuentaUsuario = payload.cuentaUsuario
      state.token = payload.token
    },
    sessionCerrada: (state) => {
      return noAuthState
    },
  },
})

export const {
  sesionIniciada,
  sessionCerrada
} = authSlice.actions

export default authSlice.reducer