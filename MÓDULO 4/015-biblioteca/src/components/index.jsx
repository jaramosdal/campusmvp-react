import { DB } from "../datos";
import Product from "./product";

export default function Index() {
  return (
    <>
      <p className="content">A continuación tienes la lista de libros disponibles en la biblioteca</p>
      <div id="gallery">
        {DB.libros.map(({ id, ...libro }) => 
          <Product key={id} {...libro} />
        )}
      </div>
    </>
  );
}