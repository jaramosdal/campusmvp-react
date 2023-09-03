import { createAsyncThunk } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ["Tablero", "Lista"],
  endpoints: builder => ({
    getTableros: builder.query({
      query: (cuenta) => `/tableros?cuenta=${cuenta}`,
      providesTags: ["MisTableros"]
    }),
    createTablero: builder.mutation({
      query: ({ nombre, cuenta }) => ({
        url: "/tableros",
        method: "POST",
        body: { nombre, cuenta }
      }),
      invalidatesTags: ["MisTableros"]
    }),
    deleteTablero: builder.mutation({
      query: (id) => ({
        url: `/tableros/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["MisTableros"]
    }),
    getListas: builder.query({
      query: (id) => `/listas?tablero=${id}&_sort=orden`,
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
      query: ({ nombre, tablero, orden }) => ({
        url: "/listas",
        method: "POST",
        body: { nombre, tablero, orden }
      }),
      invalidatesTags: ["Tablero"]
    }),
    updateLista: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/listas/${id}`,
        method: "PATCH",
        body: patch
      }),
      invalidatesTags: ["Tablero"]
    }),
    deleteLista: builder.mutation({
      query: (id) => ({
        url: `/listas/${id}`,
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
  async ({id, idLista}, { dispatch, getState }) => {
    if (idLista <= 0) return;
    const { data: tablero } = apiSlice.endpoints.getListas.select(id)(getState())
    const prevIdx = tablero.findIndex(v => v.orden === idLista)
    const nextIdx = tablero.findIndex(v => v.orden === (idLista + 1))
    if (nextIdx !== -1) {
      await dispatch(apiSlice.endpoints.updateLista.initiate({ 
        id: tablero[prevIdx].id, 
        orden: idLista + 1
      })).then(() => {
        dispatch(apiSlice.endpoints.updateLista.initiate({
          id: tablero[nextIdx].id,
          orden: idLista
        }))
      })
    }
  }
)

export const tareaMovidaIzquierda = createAsyncThunk(
  'tareas/movidaIzq',
  async ({ id, idLista, idTarea }, { dispatch, getState }) => {
    // Consultar manualmente el tablero cargado por la API en el estado actual
    const { data: tablero } = apiSlice.endpoints.getListas.select(id)(getState())
    // Averiguar la lista anterior a la actual
    const fromIdx = tablero.findIndex(v => v.id === idLista)
    const toIdx = fromIdx - 1
    
    if (toIdx >= 0) {
      // Lanzar manualmente una actualización de la tarea para modificar su lista
      await dispatch(apiSlice.endpoints.updateTarea.initiate({ id: idTarea, lista: tablero[toIdx].id }))
    }
  }
)
export const tareaMovidaDerecha = createAsyncThunk(
  'tareas/movidaDer',
  async ({ id, idLista, idTarea }, { dispatch, getState }) => {
    const { data: tablero } = apiSlice.endpoints.getListas.select(id)(getState())
    // Averiguar la lista posterior a la actual
    const fromIdx = tablero.findIndex(v => v.id === idLista)
    const toIdx = fromIdx + 1
    
    if (toIdx < tablero.length) {
      // Lanzar manualmente una actualización de la tarea para modificar su lista
      await dispatch(apiSlice.endpoints.updateTarea.initiate({ id: idTarea, lista: tablero[toIdx].id }))
    }
  }
)

// Estos hooks se crean automáticamente al crear la api slice,
// nos permiten generar peticiones HTTP y obtener las respuestas
export const { 
  useGetTablerosQuery,
  useCreateTableroMutation,
  useDeleteTableroMutation,
  useGetListasQuery, 
  useGetTareasQuery,
  useGetListaTareasQuery,
  useCreateListaMutation,
  useDeleteListaMutation,
  useCreateTareaMutation,
  useUpdateTareaMutation,
  useDeleteTareaMutation
} = apiSlice

export default apiSlice