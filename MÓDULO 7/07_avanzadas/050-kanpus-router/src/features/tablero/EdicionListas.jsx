import { useState } from "react"
import { useDispatch } from "react-redux"
import { useLoaderData } from "react-router-dom"
import { intercambiarListas, useCreateListaMutation, useDeleteListaMutation, useGetListasQuery } from "../api/apiSlice"
import ui, { CampoBoton, Item, OpcionBoton, Tarjeta } from "../utils/ui"

const EdicionListas = () => {
    const { id } = useLoaderData()
    const { data: listas, isSuccess } = useGetListasQuery(id)
    const dispatch = useDispatch()
    const [eliminarLista, resEliminarLista] = useDeleteListaMutation()
    const [nuevaLista, setNuevaLista] = useState("")
    const [crearLista, resCrearLista] = useCreateListaMutation()

    const moverListas = (idLista) => () => dispatch(intercambiarListas({id, idLista}))
  
    const handleSubmit = event => {
      event.preventDefault()
      crearLista({ nombre: nuevaLista, tablero: id, orden: listas.length + 1 })
      setNuevaLista("")
    }
  
    return (<>
      <div className="p-6 max-w-[60rem] m-auto">
        <Tarjeta 
          top={"Editando listas"}
          bottom={
            <form onSubmit={handleSubmit}>
              <CampoBoton 
                input={{ type: "text", placeholder: "Nueva lista", value: nuevaLista, onChange: e => setNuevaLista(e.target.value) }}
                boton={{ type: "submit", children: "Crear lista" }}
                />
            </form>}
          >
            {isSuccess
            ? listas.map((val) => 
              <Item key={val.id} principal={<p>{val.nombre}</p>} opciones={<>
                <OpcionBoton onClick={moverListas(val.orden - 1)}>&uarr;</OpcionBoton>
                <OpcionBoton className={ui.opcion} onClick={moverListas(val.orden)}>&darr;</OpcionBoton>
                <OpcionBoton className={ui.opcion} onClick={() => eliminarLista(val.id)}>×</OpcionBoton>
              </>} />
            )
            : <>Cargando...</>}
        </Tarjeta>
      </div>
    </>
    )
  }

  export default EdicionListas