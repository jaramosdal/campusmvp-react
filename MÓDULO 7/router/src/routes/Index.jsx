import { Link } from "react-router-dom";

// routes/index.jsx
export default function Index() {
  // datos de ejemplo
  const images = ["a", "b", "c"];

  return (
    <>
      <p className="content">
        Haz clic en cada imagen para ver más detalles y votar por ella.
      </p>
      <div id="gallery">
        {images.map((id) => (
          <Link key={id} to={`photos/${id}`}>
            <img src="{`/images/${id}.jpg`}/" />
          </Link>
        ))}
      </div>
    </>
  );
}
