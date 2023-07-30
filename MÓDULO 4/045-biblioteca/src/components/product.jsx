export default function Product({ author, title, stock, onPrestar }) {
  return (
    <figure>
      <img src="/images/book.svg" />
      
      <figcaption>
        <p><em>{title}</em> por <strong>{author}</strong></p>
        { stock > 0
        ? <><button onClick={onPrestar}>Tomar prestado</button> (quedan {stock})</>
        : <button disabled>Sin existencias</button>
        }
      </figcaption>
    </figure>
  )
}