const Tarea = (props) => (
  <li>
    <input type="checkbox" defaultChecked={false} />
    {props.titulo}
    <button>Eliminar</button>
  </li>
);

export default Tarea;
