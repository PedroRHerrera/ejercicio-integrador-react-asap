import { useReducer, useState } from "react";
import { tareaReducer } from "./reducers/tareaReducer";
import type { Tarea, EstadoTarea } from "./models/Tarea";
import { TareaItem } from "./components/TareaItem";

function App() {
  const [tareas, dispatch] = useReducer(tareaReducer, [] as Tarea[]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const agregarTarea = () => {
    if (!titulo.trim()) return;
    dispatch({ type: "AGREGAR", payload: { titulo, descripcion } });
    setTitulo("");
    setDescripcion("");
  };

  const eliminarTarea = (id: number) => {
    dispatch({ type: "ELIMINAR", payload: { id } });
  };

  const cambiarEstado = (id: number, estado: EstadoTarea) => {
    dispatch({ type: "CAMBIAR_ESTADO", payload: { id, estado } });
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Ejercicio integrador React</h1>
      <h3>Gestor de Tareas con <code>useReducer</code></h3>

      <div>
        <input style={{ marginRight: "0.5rem" }}
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        style={{ marginRight: "0.5rem" }}
      />
      <button onClick={agregarTarea}>Agregar</button>
      </div>

      {tareas.map((tarea) => (
        <TareaItem
          key={tarea.id}
          tarea={tarea}
          onEliminar={eliminarTarea}
          onCambiarEstado={cambiarEstado}
        />
      ))}
    </div>
  );
}

export default App;