import './App.css'

const FormularioBusqueda = () => {
  return <form action='/search' method='GET'>
    <input type='search' placeholder='Términos de búsqueda' />
    <button type='submit'>Buscar</button>
  </form>
}

const Cabecera = () => {
  return <div>
    <h1>Mi primera app React</h1>
    <FormularioBusqueda />
  </div>
}

const Desplegable = (props) => {
  return <details>
    <summary>{ props.titulo }</summary>
    <p>{ props.contenido }</p>
  </details>
}

function App() {
  return <div className='App'>
    <Cabecera />
    <Desplegable 
      titulo="Camiseta estampada" 
      contenido="Camiseta de 100% algodón con un estampado de la marca" />
    <Desplegable 
      titulo="Vaqueros slim" 
      contenido="Pantalones vaqueros de color azul oscuro con bolsillos" />
  </div>
}

export default App
