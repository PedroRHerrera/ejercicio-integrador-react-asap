import type { Tarea, EstadoTarea } from "../models/Tarea";

interface TareaProps {
  tarea: Tarea;
  onEliminar: (id: number) => void;
  onCambiarEstado: (id: number, estado: EstadoTarea) => void;
}

export const TareaItem = ({ tarea, onEliminar, onCambiarEstado }: TareaProps) => {
  return (
    <div style={{ border: "1px solid gray", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
      <h3>{tarea.titulo}</h3>
      <p>{tarea.descripcion}</p>
      
      <label>
        Estado:{" "}
        <select
          value={tarea.estado}
          onChange={(e) => onCambiarEstado(tarea.id, e.target.value as EstadoTarea)}
        >
          <option value="pendiente">Pendiente</option>
          <option value="en proceso">En Proceso</option>
          <option value="terminada">Terminada</option>
        </select>
      </label>
      
      <div style={{ marginTop: "0.5rem" }}>
        <button onClick={() => onEliminar(tarea.id)}>Eliminar</button>
      </div>
    </div>
  );
};