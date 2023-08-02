import { useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { sesionIniciada, sesionCerrada } from './features/panel/panelSlice'

function App() {
  const usuario = useSelector(s => s.panel.usuario)
  const dispatch = useDispatch()
  const iniciarSesion = () => dispatch(sesionIniciada({ usuario: "david" }))
  const cerrarSesion = () => dispatch(sesionCerrada())

  return (
    <div className="App">
      <h1>
        {usuario !== null ? <>¡Hola de nuevo, {usuario}!</> : <>Inicia sesión</>}
      </h1>
      {usuario 
      ? <button onClick={cerrarSesion}>Cerrar sesion</button>
      : <button onClick={iniciarSesion}>Iniciar sesion</button>}
    </div>
  )
}

export default App
