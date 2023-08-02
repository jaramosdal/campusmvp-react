import { useState, createContext, useContext } from 'react'
import './FormSignup.css'

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

export default FormularioSignup