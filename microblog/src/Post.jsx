function Post({ id, autoria, contenido, fecha, onChange }) {
  const [nombre, setNombre] = useState("Anónimo");
  const [postContent, setPostContent] = useState(contenido);
  const fechaObj = new Date(fecha);
  const handleSubmit = (event) => {
    event.preventDefault();
    editPost(id, postContent).then(onChange);
  };
  useEffect(() => {
    getAuthor(autoria).then((n) => setNombre(n?.nombre));
  }, [autoria]);

  return (
    <div className="post">
      <div className="aut">{nombre}</div>
      <div className="date">
        {fechaObj.getDate()}/{fechaObj.getMonth() + 1}/{fechaObj.getFullYear()}
      </div>
      <div className="text">{contenido}</div>
      <div className="opt">
        <button onClick={() => deletePost(id).then(onChange)}>Eliminar</button>
        <details>
          <summary>Editar...</summary>
          <form onSubmit={handleSubmit}>
            <textarea
              value={postContent}
              placeholder="Nuevo post"
              onChange={(event) => setPostContent(event.target.value)}
            />
            <button type="submit">Publicar edición</button>
          </form>
        </details>
      </div>
    </div>
  );
}
