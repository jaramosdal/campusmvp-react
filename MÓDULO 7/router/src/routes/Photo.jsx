import { Outlet } from "react-router-dom";

// routes/photo.jsx
export default function Photo() {
  // datos de ejemplo
  const title = "Foto de ejemplo";
  const author = "Alice Robertson";
  const votes = 10;
  const url = "https://source.unsplash.com/400x400/?cat";

  return (
    <figure>
      <figcaption>
        <p>
          <em>{title}</em> por <strong>{author}</strong>
        </p>
        <p className="pill">
          <span>Votos</span>
          <span>{votes}</span>
        </p>
      </figcaption>

      <img src={url} />
      <Outlet />
    </figure>
  );
}
