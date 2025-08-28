export type EstadoTarea = "pendiente" | "en proceso" | "terminada";

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  estado: EstadoTarea;
}