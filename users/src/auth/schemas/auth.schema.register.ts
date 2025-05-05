import { Schema, Document } from 'mongoose';

// Esquema de Mongoose basado en el RegisterDto
export const RegisterSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: [String], default: [] },  // Los roles son opcionales, por lo que si no se pasa, por defecto será un array vacío
});

// Interfaz para el tipo de documento
export interface Register extends Document {
  id: string;
  username: string;
  password: string;
  roles?: string[];
}
