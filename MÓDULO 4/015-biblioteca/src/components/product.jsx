export default function Product({ author, title, stock }) {
  const handleClick = () => {
    alert(`Has tomado prestado el libro ${title}.`)
  }
  return (
    <figure onMouseEnter={() => console.log(`Has pasado el ratón por ${title}`)}>
      <img src="/images/book.svg" />
      
      <figcaption>
        <p><em>{title}</em> por <strong>{author}</strong></p>
        { stock > 0
        ? <><button onClick={handleClick}>Tomar prestado</button> (quedan {stock})</>
        : <button disabled>Sin existencias</button>
        }
      </figcaption>
    </figure>
  )
}