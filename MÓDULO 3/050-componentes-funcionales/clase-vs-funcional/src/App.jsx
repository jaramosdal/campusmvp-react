import TodoClase from './clases/Todo'
import TodoFunc from './funcionales/Todo'

function App() {
  return (
    <div className="App">
      <div className='clase'>
        <TodoClase />
      </div>
      <div className="funcional">
        <TodoFunc />
      </div>
    </div>
  )
}

export default App
