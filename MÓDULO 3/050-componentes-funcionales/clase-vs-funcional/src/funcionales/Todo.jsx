import { useState } from 'react';
import Tarea from './Tarea';

function TodoFunc() {
  const [nueva, setNueva] = useState('');
  const [tareas, setTareas] = useState([]);

  function handleChange(event) {
    setNueva(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (nueva.trim() !== '') {
      setTareas([...tareas, nueva]);
      setNueva('');
    }
  }

  return (
    <div>
      <h1>Lista de tareas funcional</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nueva tarea:
          <input type="text" value={nueva} onChange={handleChange} />
        </label>
        <button type="submit">Añadir</button>
      </form>
      <ul>
        {tareas.map((item, index) => (
          <Tarea key={index} titulo={item} />
        ))}
      </ul>
    </div>
  );
}

export default TodoFunc;