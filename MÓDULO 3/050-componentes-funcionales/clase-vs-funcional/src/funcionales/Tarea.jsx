function Tarea(props) {
  return (
    <li>
      <strong>{props.titulo}</strong>
      <p>{props.descripcion}</p>
    </li>
  );
}
  
export default Tarea;