import { Form, json, Link, redirect, useActionData } from "react-router-dom"
import { useInput } from "../utils/hooks"
import Sesion from './api'
import { BotonPrimario, Campo, CampoInput, Tarjeta } from "../utils/ui"

export const action = async ({ request }) => {
  const data = await request.formData()
  const success = await Sesion.signup(data.get("usuario"), data.get("pass"), data.get("email"))
  if (success) {
    const logged = await Sesion.login(data.get("usuario"), data.get("pass"))
    if (logged) {
      return redirect("/tableros")
    }
  }
  return json({ registroFallido: true })
}

const FormularioRegistro = () => {
  const registroFallido = useActionData()?.registroFallido
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
  
  return (
    <Form method="post">
      <fieldset>
        <Tarjeta 
          top="Crear una nueva cuenta"
          bottom={<>
            <BotonPrimario type="submit" disabled={Object.values(errores).some(v=>v)} className="w-full">Crear cuenta</BotonPrimario>
            {registroFallido && <p className="text-center text-red-500 pt-3">No se pudo registrar la cuenta debido a un error.</p>}
            <p className="pt-3 text-center">¿Ya tienes una cuenta? <Link to="../acceder" className="text-cyan-800 dark:text-cyan-300">Inicia sesión</Link></p>
          </>}>
          <CampoInput id="usuario" type="text" placeholder="alice" 
            value={usuario} onChange={setUsuario} invalido={errores.usuario}
            error="El nombre de usuario debe tener al menos 3 caracteres."
            etiqueta="Nombre de usuario" required />
          <CampoInput id="email" type="email" placeholder="alice@example.org" value={email} onChange={setEmail}
            invalido={errores.email} error="Escribe una dirección de correo electrónico válida." required
            etiqueta="Correo electrónico" />
          <CampoInput id="pass" type="password" value={contrasena} onChange={setContrasena}
            invalido={errores.contrasena} error="La contraseña debe tener al menos 8 caracteres." required autoComplete="new-password"
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

export default FormularioRegistro