import { Boton, BotonPrimario, Campo, CampoInput, Tarjeta } from '../utils/ui'
import { useInput } from '../utils/hooks'
import { login } from '../utils/session'
import { Form, redirect } from 'react-router-dom'

export const action = async ({ params }) => {
  // Comprobar el usuario y la contraseña
  await login()
  return redirect("/tableros")
}

const FormularioSignup = () => {
  const [usuario, setUsuario] = useInput("")
  const [email, setEmail] = useInput("")
  const [fechaNacimiento, setFechaNacimiento] = useInput("")
  const [contrasena, setContrasena] = useInput("")
  const [bio, setBio] = useInput("")
  const [plan, setPlan] = useInput("g")
  
  const errores = {
    usuario: usuario.length > 0 && usuario.length < 3,
    email: email.length > 0 && email.match(/^[^@]+@[a-z0-9\-\.]+\.[a-z]{2,}$/i) === null,
    fechaNacimiento: Date.parse(fechaNacimiento) >= Date.now(),
    contrasena: contrasena.length > 0 && contrasena.length < 8
  }
  
  const manejarSubmit = (event) => {
    event.preventDefault()
  }
  
  return (
    <Form action="/registro" method="post">
      <fieldset>
        <Tarjeta 
          top="Crear una nueva cuenta"
          bottom={<BotonPrimario type="submit" disabled={Object.values(errores).some(v=>v)} className="w-full">Crear cuenta</BotonPrimario>}>
          <CampoInput id="usuario" type="text" placeholder="alice" 
            value={usuario} onChange={setUsuario} invalido={errores.usuario}
            error="El nombre de usuario debe tener al menos 3 caracteres."
            etiqueta="Nombre de usuario" required />
          <CampoInput id="email" type="email" placeholder="alice@example.org" value={email} onChange={setEmail}
            invalido={errores.email} error="Escribe una dirección de correo electrónico válida." required
            etiqueta="Correo electrónico" />
          <CampoInput id="pass" type="password" value={contrasena} onChange={setContrasena}
            invalido={errores.contrasena} error="La contraseña debe tener al menos 8 caracteres." required
            etiqueta="Contraseña" />
          <CampoInput id="fechaNacimiento" type="date" value={fechaNacimiento} onChange={setFechaNacimiento}
            invalido={errores.fechaNacimiento} error="La fecha de nacimiento no puede ser posterior al día actual."
            etiqueta="Fecha de nacimiento" />
          <Campo id="bio" etiqueta="Biografia">
            <textarea id='bio' name='bio' onChange={setBio} value={bio}  />
          </Campo>
          <Campo id="plan" etiqueta="Selecciona un plan">
            <select value={plan} onChange={setPlan} id="plan">
              <option value="g">Gratuito (0€)</option>
              <option value="p">Pro (12€/año)</option>
            </select>
          </Campo>
          
          {plan == "p" && <>
            <CampoInput id="tarjeta" maxLength="16" placeholder="1234 5678 1234 5678" etiqueta="Número de tarjeta" />
            <CampoInput id="caducidad" maxLength="6" placeholder="MMYYYY" etiqueta="Fecha de caducidad" />
            <CampoInput id="cvv" maxLength="3" placeholder="123" etiqueta="CVV" />
          </>}
          </Tarjeta>
        <p></p>
      </fieldset>
    </Form>
  )
}

const FormularioLogin = () => {
  const [usuario, setUsuario] = useInput("")
  const [contrasena, setContrasena] = useInput("")

  return (
    <Form method="post">
      <fieldset>
        <Tarjeta 
          top="Ya tengo una cuenta"
          bottom={<BotonPrimario type="submit" className="w-full">Iniciar sesión</BotonPrimario>}>
          <CampoInput id="usuarioLogin" type="text" placeholder="alice" required
            value={usuario} onChange={setUsuario} etiqueta="Nombre de usuario" />
          <CampoInput id="passLogin" type="password" required value={contrasena} onChange={setContrasena} etiqueta="Contraseña" />
        </Tarjeta>
      </fieldset>
    </Form>
  )
}

const PantallaLogin = () => {

  return (
    <div className="p-6 m-auto max-w-6xl">
      <p className="text-xl text-center pb-6">Con una cuenta de usuario podrás guardar 
      tus tableros de tareas y consultarlos en cualquier dispositivo</p>
      <div className="flex md:flex-row flex-col gap-6">
        <div className="grow shrink">
          <FormularioLogin />
        </div>
        <div className="grow shrink">
          <FormularioSignup />
        </div>
      </div>
    </div>
  )
}

export default PantallaLogin