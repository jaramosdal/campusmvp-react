import { useState } from "react";
import { DB } from "../datos";
import Product from "./product";

export default function Index() {
  const [libros, setLibros] = useState(DB.libros)

  const handlePrestar = (id) => () => {
    const i_libro = libros.findIndex(l => l.id === id)
    const libro = libros[i_libro]
    setLibros([
      ...libros.slice(0, i_libro),
      { ...libro, stock: libro.stock - 1 },
      ...libros.slice(i_libro + 1)
    ])
  }

  return (
    <>
      <p className="content">A continuación tienes la lista de libros disponibles en la biblioteca</p>
      <div id="gallery">
        {libros.map(({ id, ...libro }) => 
          <Product key={id} onPrestar={handlePrestar(id)} {...libro} />
        )}
      </div>
    </>
  );
}