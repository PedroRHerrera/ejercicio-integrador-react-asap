import type { Tarea, EstadoTarea } from "../models/Tarea";

export type TareaAction =
  | { type: "AGREGAR"; payload: { titulo: string; descripcion: string } }
  | { type: "ELIMINAR"; payload: { id: number } }
  | { type: "CAMBIAR_ESTADO"; payload: { id: number; estado: EstadoTarea } };

export function tareaReducer(state: Tarea[], action: TareaAction): Tarea[] {
  switch (action.type) {
    case "AGREGAR":
      const nuevaTarea: Tarea = {
        id: Date.now(),
        titulo: action.payload.titulo,
        descripcion: action.payload.descripcion,
        estado: "pendiente",
      };
      return [...state, nuevaTarea];

    case "ELIMINAR":
      return state.filter((tarea) => tarea.id !== action.payload.id);

    case "CAMBIAR_ESTADO":
      return state.map((tarea) =>
        tarea.id === action.payload.id
          ? { ...tarea, estado: action.payload.estado }
          : tarea
      );

    default:
      return state;
  }
}