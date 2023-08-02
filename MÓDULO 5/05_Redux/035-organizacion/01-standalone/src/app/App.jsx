import { createContext, useContext, useState } from 'react'
import './App.css'
import './FormSignup.css'
import { useSelector } from 'react-redux'

const temas = {
  claro: {
    "texto": "#3c3b3d",
    "fondo": "#eff1f5",
    "fondo2": "#ccd0da"
  },
  oscuro: {
    "texto": "#cdd6f4",
    "fondo": "#1e1e2e",
    "fondo2": "#313244"
  }
}

const ContextoTema = createContext()
const Boton = (props) => {
  const tema = useContext(ContextoTema)
  return (
    <button style={{background: tema.fondo2, color: tema.texto}} {...props}></button>
  )
}

const Cabecera = () => {
  const tareas = useSelector(state => Object.values(state.tareas.lista))
  if (tareas.length == 0) {
    return <p>¡Enhorabuena! No quedan tareas.</p>
  }

  const pendientes = tareas.reduce((cuenta, tarea) => cuenta + tarea.completada, 0)

  return <p>
    {tareas.length} tarea{(tareas.length > 1) && "s"},
    {pendientes} pendiente{(pendientes > 1) && "s"}
  </p>
}

const Tarea = ({ id, titulo, completada }) => {
  return (
    <li className={completada ? "done" : "todo"}>
      <label>
        <input type="checkbox" checked={completada} readOnly />
        {completada ? "DONE" : "TODO"}
      </label>
      <input type="text" value={titulo} disabled={completada} readOnly />
      <Boton>Eliminar</Boton>
    </li>
  )
}

const FormularioNueva = () => {
  const [nuevaTitulo, setNuevaTitulo] = useState("")

  const manejarSubmit = (event) => {
    event.preventDefault()
    setNuevaTitulo("")
  }

  return (
    <form onSubmit={manejarSubmit}>
      <input type="text" name="titulo" placeholder="Nueva tarea"
        onChange={event => setNuevaTitulo(event.target.value)}
        value={nuevaTitulo} />
    </form>
  )
}

const ListaTareas = () => {
  const tema = useContext(ContextoTema)
  const tareas = useSelector(state => state.tareas.lista)

  if (tareas.length == 0) {
    return null;
  }

  return (
    <>
      <Boton>
        Marcar como completadas
      </Boton>
      <ul style={{background: tema.fondo, color: tema.texto}}>
        {Object.entries(tareas).map(([id, tarea]) => <Tarea {...tarea} key={id} id={id} />)}
      </ul>
      <FormularioNueva />
    </>
  )
}

const Campo = ({ id, children, invalido = false, error = "", onValueChange = () => {}, ...props }) => {
  return (
    <div className="campo">
      <label htmlFor={id}>{ children }</label>
      <input {...props} name={id} id={id} onChange={e => onValueChange(e.target.value)} />
      {invalido && <p className='error'>{error}</p>}
    </div>
  )
}
  
const FormularioSignup = () => {
  const [usuario, setUsuario] = useState("")
  const [email, setEmail] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [bio, setBio] = useState("")
  const [plan, setPlan] = useState("g")
  
  const errores = {
    usuario: usuario.length < 3,
    email: email.match(/^[^@]+@[a-z0-9\-\.]+\.[a-z]{2,}$/i) === null,
    fechaNacimiento: Date.parse(fechaNacimiento) >= Date.now(),
    contrasena: contrasena.length < 8
  }
  
  const manejarSubmit = (event) => {
    event.preventDefault()
  }
  
  return (
    <form onSubmit={manejarSubmit}>
      <fieldset>
        <legend>Crear una cuenta</legend>
        <p>Con una cuenta de usuario podrás guardar tus tareas y consultarlas en cualquier dispositivo.</p>
        <Campo id="usuario" type="text" placeholder="alice" 
          value={usuario} onValueChange={setUsuario} invalido={errores.usuario}
          error="El nombre de usuario debe tener al menos 3 caracteres.">
          Nombre de usuario
        </Campo>
        <Campo id="email" type="email" placeholder="alice@example.org" value={email} onValueChange={setEmail}
          invalido={errores.email} error="Escribe una dirección de correo electrónico válida.">
          Correo electrónico
        </Campo>
        <Campo id="pass" type="password" value={contrasena} onValueChange={setContrasena}
          invalido={errores.contrasena} error="La contraseña debe tener al menos 8 caracteres.">
          Contraseña
        </Campo>
        <Campo id="fechaNacimiento" type="date" value={fechaNacimiento} onValueChange={setFechaNacimiento}
          invalido={errores.fechaNacimiento} error="La fecha de nacimiento no puede ser posterior al día actual.">
          Fecha de nacimiento
        </Campo>
        
        <label htmlFor="bio">Biografía</label>
        <textarea id='bio' name='bio' onChange={e => setBio(e.target.value)} value={bio}  />
        
        <label htmlFor="plan">Selecciona un plan</label>
        <select value={plan} onChange={e => setPlan(e.target.value)} id="plan">
          <option value="g">Gratuito (0€)</option>
          <option value="p">Pro (12€/año)</option>
        </select>
        {plan == "p" && <>
          <Campo id="tarjeta" maxLength="16" placeholder="1234 5678 1234 5678">Número de tarjeta</Campo>
          <Campo id="caducidad" maxLength="6" placeholder="MMYYYY">Fecha de caducidad</Campo>
          <Campo id="cvv" maxLength="3" placeholder="123">CVV</Campo>
        </>}
        
        <p><input type="submit" value="Crear cuenta" 
          disabled={Object.values(errores).some(v=>v)} /></p>
      </fieldset>
    </form>
  )
}

const App = () => {
  const [tema, setTema] = useState("claro")

  return (
    <ContextoTema.Provider value={temas[tema]}>
      <div className="App">
        <h1>Kanpus</h1>
        <details><summary>Crear cuenta</summary><FormularioSignup /></details>
        <Cabecera />
        <ListaTareas />
        <p>{tema == "claro" 
        ? <Boton onClick={() => setTema("oscuro")}>Activar tema oscuro</Boton>
        : <Boton onClick={() => setTema("claro")}>Activar tema claro</Boton>
        }</p>
      </div>
    </ContextoTema.Provider>
  )
}

export default App
