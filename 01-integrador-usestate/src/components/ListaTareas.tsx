import { useState } from "react";
import type { Tarea, EstadoTarea } from "../types";
import { TareaItem } from "./TareaItem";

export const ListaTareas = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  // Estados locales para el formulario
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Crear tarea
  const agregarTarea = (titulo: string, descripcion: string) => {
    const nueva: Tarea = {
      id: Date.now(),
      titulo,
      descripcion,
      estado: "pendiente",
    };
    setTareas([...tareas, nueva]);
  };

  // Eliminar
  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  // Cambiar estado
  const cambiarEstado = (id: number, nuevoEstado: EstadoTarea) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, estado: nuevoEstado } : t
      )
    );
  };

  // Manejar submit del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return; // evitar tareas vacías
    agregarTarea(titulo, descripcion);
    setTitulo("");      // limpiar inputs
    setDescripcion("");
  };

  return (
    <div>
      <h2>Gestor de Tareas</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Agregar</button>
      </form>

      {/* Listado */}
      <div>
        {tareas.map((t) => (
          <TareaItem
            key={t.id}
            tarea={t}
            onEliminar={eliminarTarea}
            onCambiarEstado={cambiarEstado}
          />
        ))}
      </div>
    </div>
  );
};