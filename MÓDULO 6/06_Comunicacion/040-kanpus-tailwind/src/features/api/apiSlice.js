import { createAsyncThunk } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ["Tablero", "Lista"],
  endpoints: builder => ({
    getTablero: builder.query({
      query: () => "/tablero?_sort=orden",
      providesTags: ["Tablero"]
    }),
    getTareas: builder.query({
      query: () => "/tareas",
      providesTags: [{ type: "Lista", id: "TODAS" }]
    }),
    getListaTareas: builder.query({
      query: (id) => `/tareas/?lista=${id}`,
      providesTags: (result, error, id) => [{ type: "Lista", id }]
    }),
    createLista: builder.mutation({
      query: (nombre) => ({
        url: "/tablero",
        method: "POST",
        body: { nombre }
      }),
      invalidatesTags: ["Tablero"]
    }),
    updateLista: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/tablero/${id}`,
        method: "PATCH",
        body: patch
      }),
      invalidatesTags: ["Tablero"]
    }),
    deleteLista: builder.mutation({
      query: (id) => ({
        url: `/tablero/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Tablero"]
    }),
    createTarea: builder.mutation({
      query: ({ titulo, lista }) => ({
        url: "/tareas",
        method: "POST",
        body: { titulo, lista }
      }),
      invalidatesTags: (result, error, { lista }) => [{ type: "Lista", id: lista }, { type: "Lista", id: "TODAS" }]
    }),
    updateTarea: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/tareas/${id}`,
        method: "PATCH",
        body: patch
      }),
      invalidatesTags: ["Lista"]
    }),
    deleteTarea: builder.mutation({
      query: (id) => ({
        url: `/tareas/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Lista"]
    })
  })
})

export const intercambiarListas = createAsyncThunk(
  'tablero/adelante',
  async (primera, { dispatch, getState }) => {
    if (primera <= 0) return;
    const { data: tablero } = apiSlice.endpoints.getTablero.select()(getState())
    const prevIdx = tablero.findIndex(v => v.orden === primera)
    const nextIdx = tablero.findIndex(v => v.orden === (primera + 1))
    if (nextIdx !== -1) {
      await dispatch(apiSlice.endpoints.updateLista.initiate({ 
        id: tablero[prevIdx].id, 
        orden: primera + 1
      })).then(() => {
        dispatch(apiSlice.endpoints.updateLista.initiate({
          id: tablero[nextIdx].id,
          orden: primera
        }))
      })
    }
  }
)

export const tareaMovidaIzquierda = createAsyncThunk(
  'tareas/movidaIzq',
  async ({ id, lista }, { dispatch, getState }) => {
    // Consultar manualmente el tablero cargado por la API en el estado actual
    const { data: tablero } = apiSlice.endpoints.getTablero.select()(getState())
    // Averiguar la lista anterior a la actual
    const fromIdx = tablero.findIndex(v => v.id === lista)
    const toIdx = fromIdx - 1
    
    if (toIdx >= 0) {
      // Lanzar manualmente una actualización de la tarea para modificar su lista
      await dispatch(apiSlice.endpoints.updateTarea.initiate({ id, lista: tablero[toIdx].id }))
    }
  }
)
export const tareaMovidaDerecha = createAsyncThunk(
  'tareas/movidaDer',
  async ({ id, lista }, { dispatch, getState }) => {
    const { data: tablero } = apiSlice.endpoints.getTablero.select()(getState())
    const fromIdx = tablero.findIndex(v => v.id === lista)
    const toIdx = fromIdx + 1
    
    if (toIdx < tablero.length) {
      await dispatch(apiSlice.endpoints.updateTarea.initiate({ id, lista: tablero[toIdx].id }))
    }
  }
)

// Estos hooks se crean automáticamente al crear la api slice,
// nos permiten generar peticiones HTTP y obtener las respuestas
export const { 
  useGetTableroQuery, 
  useGetTareasQuery,
  useGetListaTareasQuery,
  useCreateListaMutation,
  useDeleteListaMutation,
  useCreateTareaMutation,
  useUpdateTareaMutation,
  useDeleteTareaMutation
} = apiSlice

export default apiSlice