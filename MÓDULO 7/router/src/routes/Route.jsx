import { Link, Outlet } from "react-router-dom";

// routes/root.jsx
export default function Root() {
  return (
    <>
      <header>
        <h1>
          <Link to="/">Concurso de fotografía</Link>
        </h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        Todas las fotografías &copy; sus respectivos autores. Utilizadas bajo la
        licencia Unsplash.
      </footer>
    </>
  );
}
