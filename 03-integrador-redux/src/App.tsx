import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store/store";
import { agregar, eliminar, cambiarEstado } from "./store/tareasSlice";
import { TareaItem } from "./components/TareaItem";
import type { EstadoTarea } from "./models/Tarea";

function App() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const tareas = useSelector((state: RootState) => state.tareas.lista);
  const dispatch = useDispatch<AppDispatch>();

  const agregarTarea = () => {
    if (!titulo.trim()) return;
    dispatch(agregar({ titulo, descripcion }));
    setTitulo("");
    setDescripcion("");
  };

  const eliminarTarea = (id: number) => {
    dispatch(eliminar({ id }));
  };

  const cambiarEstadoTarea = (id: number, estado: EstadoTarea) => {
    dispatch(cambiarEstado({ id, estado }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ejercicio integrador React</h1>
      <h3>Gestor de Tareas con <code>Redux Toolkit</code></h3>

      <input
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        style={{ marginRight: "0.5rem" }}
      />
      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        style={{ marginRight: "0.5rem" }}
      />
      <button onClick={agregarTarea}>Agregar</button>

      {tareas.map((tarea) => (
        <TareaItem
          key={tarea.id}
          tarea={tarea}
          onEliminar={eliminarTarea}
          onCambiarEstado={cambiarEstadoTarea}
        />
      ))}
    </div>
  );
}

export default App;
