export default function Root({ children }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    fetch("/api/solicitudes/...")
  }

  return (
    <>
      <header>
        <h1>Biblioteca online</h1>
      </header>
      <main>
        { children }
      </main>
      <footer>
        <form onSubmit={handleSubmit}>
          Puedes solicitar un libro que no esté aún en nuestra biblioteca
          <input type="text" placeholder="Título y autoría" />
          <input type="submit" value="Enviar solicitud" />
        </form>
      </footer>
    </>
  );
}