import { Schema, Document } from 'mongoose';

// Esquema de Mongoose basado en el LoginDto
export const LoginSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Interfaz para el tipo de documento
export interface Login extends Document {
  id: string;
  username: string;
  password: string;
}
