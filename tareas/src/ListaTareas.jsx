import Tarea from "./Tarea";

const ListaTareas = ({ tareas }) => {
  if (tareas.length == 0) {
    return null;
  }

  return (
    <ul>
      {tareas.map((tarea, i) => (
        <Tarea key={i} titulo={tarea.titulo} completada={tarea.completada} />
      ))}
    </ul>
  );
};

export default ListaTareas;
