import { BotonPrimario, CampoInput, Tarjeta } from '../utils/ui'
import { useInput } from '../utils/hooks'
import Sesion from './api'
import { Form, Link, redirect, useActionData } from 'react-router-dom'

export const action = async ({ request }) => {
  const data = await request.formData()
  // Comprobar el usuario y la contraseña
  const success = await Sesion.login(data.get("usuarioLogin"), data.get("passLogin"))

  if (success) {
    return redirect("/tableros")
  } else {
    return { inicioFallido: true }
  }
}

const FormularioLogin = () => {
  const inicioFallido = useActionData()?.inicioFallido
  const [usuario, setUsuario] = useInput("")
  const [contrasena, setContrasena] = useInput("")

  return (
    <Form method="post">
      <fieldset>
        <Tarjeta 
          top="Ya tengo una cuenta"
          bottom={<>
            <BotonPrimario type="submit" className="w-full">Iniciar sesión</BotonPrimario>
            {inicioFallido && <p className="text-center text-red-500 pt-3">El usuario o la contraseña son incorrectos.</p>}
            <p className="pt-3 text-center">¿No tienes una cuenta? <Link to="../crear" className="text-cyan-800 dark:text-cyan-300">Crea una nueva</Link></p>
          </>}>
          <CampoInput id="usuarioLogin" type="text" placeholder="alice" required
            value={usuario} onChange={setUsuario} etiqueta="Nombre de usuario" />
          <CampoInput id="passLogin" type="password" required value={contrasena} onChange={setContrasena} etiqueta="Contraseña" />
        </Tarjeta>
      </fieldset>
    </Form>
  )
}

export default FormularioLogin