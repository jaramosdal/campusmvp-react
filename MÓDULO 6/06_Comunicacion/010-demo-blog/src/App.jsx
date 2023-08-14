import { useState, useEffect } from 'react'
import { getAuthor, getBlog, editPost, saveNewPost, deletePost } from "./api"

function Post({ id, autoria, contenido, fecha, onChange }) {
  const [nombre, setNombre] = useState("Anónimo")
  const [postContent, setPostContent] = useState(contenido)
  const fechaObj = new Date(fecha)
  const handleSubmit = event => {
    event.preventDefault()
    editPost(id, postContent).then(onChange)
  }
  useEffect(() => {
    getAuthor(autoria).then(n => setNombre(n?.nombre))
  }, [autoria])
  const handleClick = () => {
    deletePost(id).then(onChange)
  } // eliminar post 
  
  return (
    <div className="post">
      <div className="aut">{nombre}</div>
      <div className="date">{fechaObj.getDate()}/{fechaObj.getMonth()+1}/{fechaObj.getFullYear()}</div>
      <div className="text">{contenido}</div>
      <div className="opt">
        <button onClick={handleClick}>Eliminar</button>
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
    const actualizaciones = setInterval(set, 10000)
    return () => clearInterval(actualizaciones)
  }, [])

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
