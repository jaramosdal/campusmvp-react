const Tarea = ({ titulo, completada }) => {
  const eliminarTarea = (event) => {
    // acciones para eliminar una tarea...
    console.log(`Tarea "${titulo}" eliminada.`);
  };

  return (
    <li className={completada ? "done" : "todo"}>
      <label>
        <input type="checkbox" defaultChecked={completada} />
        {completada ? "DONE" : "TODO"}
      </label>

      {titulo}
      {completada && <button onClick={eliminarTarea}>Eliminar</button>}
      {completada || <button>Editar</button>}
    </li>
  );
};
export default Tarea;
