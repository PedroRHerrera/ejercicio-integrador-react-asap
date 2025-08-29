import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Tarea, EstadoTarea } from "../models/Tarea";

interface TareasState {
  lista: Tarea[];
}

const initialState: TareasState = {
  lista: [],
};

export const tareasSlice = createSlice({
  name: "tareas",
  initialState,
  reducers: {
    agregar: (state, action: PayloadAction<{ titulo: string; descripcion: string }>) => {
      const nuevaTarea: Tarea = {
        id: Date.now(),
        titulo: action.payload.titulo,
        descripcion: action.payload.descripcion,
        estado: "pendiente",
      };
      state.lista.push(nuevaTarea);
    },
    eliminar: (state, action: PayloadAction<{ id: number }>) => {
      state.lista = state.lista.filter((t) => t.id !== action.payload.id);
    },
    cambiarEstado: (state, action: PayloadAction<{ id: number; estado: EstadoTarea }>) => {
      const tarea = state.lista.find((t) => t.id === action.payload.id);
      if (tarea) {
        tarea.estado = action.payload.estado;
      }
    },
  },
});

export const { agregar, eliminar, cambiarEstado } = tareasSlice.actions;
export default tareasSlice.reducer;