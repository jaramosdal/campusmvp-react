const Tarea = ({ titulo, completada }) => (
  <li className={completada ? "done" : "todo"}>
    <label>
      <input type="checkbox" defaultChecked={completada} />
      {completada ? "DONE" : "TODO"}
    </label>

    {titulo}
    {completada && <button>Eliminar</button>}
    {completada || <button>Editar</button>}
  </li>
);

export default Tarea;
