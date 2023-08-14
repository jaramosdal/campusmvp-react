import { useState, useEffect, Component } from 'react'

const API_BASEURL = "http://localhost:3000"
const api = (endpoint, method = "GET", body) => {
  return fetch(API_BASEURL + endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : null
  }).then(r => r.json())
}

const getBlog = () => api("/posts").then(ps => 
  ps.sort((a, b) => Date.parse(b.fecha) - Date.parse(a.fecha))
)
const getAuthor = autorId => api(`/cuentas/${autorId}`)
const editPost = (id, contenido) => api(`/posts/${id}`, "PATCH", { contenido })
const saveNewPost = contenido => api("/posts", "POST", {
  contenido, autoria: 1, fecha: (new Date()).toISOString()
})
const deletePost = id => api(`/posts/${id}`, "DELETE")

const Post = ({ id, contenido, fecha, autoria, onChange }) => {
  const [nombre, setNombre] = useState("Anónimo")
  const [postContent, setPostContent] = useState(contenido)
  const fechaObj = new Date(fecha)

  const handleSubmit = (event) => {
    event.preventDefault()
    editPost(id, postContent).then(onChange)
  }
  const _actualizarAutoria = () => {
    getAuthor(autoria).then(n => setNombre(n?.nombre))
  }
  useEffect(_actualizarAutoria, [autoria])
  useEffect(() => () => {console.log("Se ha eliminado un post")}, [])
  
  return (
    <div className="post">
      <div className="aut">{nombre}</div>
      <div className="date">{fechaObj.getDate()}/{fechaObj.getMonth()+1}/{fechaObj.getFullYear()}</div>
      <div className="text">{contenido}</div>
      <div className="opt">
        <button onClick={() => deletePost(id).then(onChange)}>Eliminar</button>
        <details>
          <summary>Editar...</summary>
          <form onSubmit={handleSubmit}>
            <textarea value={postContent} placeholder="Nuevo post" 
              onChange={(event) => setPostContent(event.target.value)} />
            <button type="submit">Publicar edición</button>
          </form>
        </details>
      </div>
    </div>
  )
}

const useFlag = (valorDefecto = false) => {
  const [valor, setValor] = useState(valorDefecto)
  return [valor, () => setValor(true), () => setValor(false)]
}

function App() {
  const [blog, setBlog] = useState([])
  const [obsoleto, set, unset] = useFlag()
  useEffect(() => {
    getBlog().then(setBlog)
    return unset
  }, [obsoleto])

  const [postContent, setPostContent] = useState("")
  const handleSubmit = event => {
    event.preventDefault()
    saveNewPost(postContent).then(set)
    setPostContent("")
  }

  return (
    <div className="App">
      <h1>Microblog personal</h1>
      <form onSubmit={handleSubmit} className='new'>
        <textarea value={postContent} placeholder="Nuevo post" 
          onChange={(event) => setPostContent(event.target.value)} />
        <button type="submit">Publicar</button>
      </form>
      {blog.map(p => <Post {...p} key={p.id} onChange={set} /> )}
    </div>
  )
}

export default App
