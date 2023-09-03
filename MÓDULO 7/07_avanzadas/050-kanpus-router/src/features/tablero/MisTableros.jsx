import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useCreateTableroMutation, useGetTablerosQuery } from "../api/apiSlice"
import { CampoBoton } from "../utils/ui";

export const loader = async ({ params }) => {
  return { user: "alice" }
}

const MisTableros = () => {
  const { user } = useLoaderData()
  const {
    data: tableros,
    isSuccess,
    isLoading,
    isFetching
  } = useGetTablerosQuery(user)

  const [nombreTablero, setNombreTablero] = useState("")
  const [crearTablero, resultado] = useCreateTableroMutation()

  const handleSubmit = event => {
    event.preventDefault()
    crearTablero({ nombre: nombreTablero, cuenta: user })
  }

  return (
    <div className="p-6 max-w-[60rem] m-auto">
      {isLoading 
      ? "Cargando tus tableros..."
      : <div className={isFetching ? "animate-pulse" : ""}>
        {tableros.map(t => 
        <Link key={t.id} to={`/tableros/${t.id}`} className="block p-6 text-xl bg-gray-300 dark:bg-gray-600 rounded mb-6 hover:brightness-125 shadow-lg focus:brightness-125">
          { t.nombre }
        </Link>)}
      </div>
      }
      <form className="text-xl flex flex-row gap-3" onSubmit={handleSubmit}>
        <CampoBoton
          input={{ placeholder: "Nuevo tablero", value: nombreTablero, onChange: e => setNombreTablero(e.target.value) }}
          boton={{ primario: true, type: "submit", children: "Crear" }} />
      </form>
    </div>
  )
}

export default MisTableros