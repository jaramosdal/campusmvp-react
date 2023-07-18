export default function Product({ author, title, stock }) {
  return (
    <figure>
      <img src="/images/book.svg" />
      
      <figcaption>
        <p><em>{title}</em> por <strong>{author}</strong></p>
        {stock > 0 
        ? <><button>Tomar prestado</button>(quedan {stock})</>
        : <button disabled>No hay existencias</button>} 
      </figcaption>
    </figure>
  )
}